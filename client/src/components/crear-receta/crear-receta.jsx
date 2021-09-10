import { useState } from "react";
import { connect } from "react-redux"
import style from './crear-receta.module.css'
import axios from "axios";
import { useHistory } from 'react-router-dom';
let urlCargando = 'https://acegif.com/wp-content/uploads/loading-9.gif';

function CrearReceta({ tipos }) {
    const [pasos, setPasos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [url, setUrl] = useState('');
    const [dietas, setDietas] = useState([]);
    const [salud, setSalud] = useState(0);
    const [spoonacularScore, setSpoonacularScore] = useState(0);
    let history = useHistory();



    function handleChange(e) {
        const id = e.target.id.slice(4, 5);
        let  value = {};
        value.step = e.target.value;
        const copia = pasos;
        copia[id] = value;
        setPasos([...copia]);

    };

    function handleChangeCheck(e) {
        let { id } = e.target;
        if (e.target.checked) {
            setDietas([...dietas, id])
        } else {
            setDietas(dietas.filter(x => {
                return x !== id;
            }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        let pasitos = JSON.stringify(pasos)

        var data = JSON.stringify({
            "nombre": nombre,
            "resumen": descripcion,
            "salud": salud,
            "pasos": pasitos,
            "url": url,
            "dietas": dietas,
            "spoonacularScore": spoonacularScore,
        });


        var config = {
            method: 'post',
            url: 'http://localhost:3001/recipes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        if (!nombre || !descripcion || !salud || !spoonacularScore) {
            alert("faltan algunos campos")
            return 0;
        }
        axios(config)
            .then(function (response) {
                history.push("/receta/" + JSON.stringify(response.data).slice(20, -1));

            })
            .catch(function (error) {
                alert("es probable que ya exista una receta con ese nombre")
            });
    }

    return (
        <div className={style.divPadre}>
            <div style={{ marginLeft: '10px', display: 'block' }}>
                <form onSubmit={handleSubmit}>
                    <h4>Creador de recetas:</h4>
                    <p style={{margin: '0px'}}>Nombre</p><input className={style.nombre} onChange={(e) => { setNombre(e.target.value) }} placeholder='Nombre'></input><br />
                    <p style={{margin: '0px'}}>Descripcion</p><textarea className={style.nombre} onChange={(e) => { setDescripcion(e.target.value) }} placeholder='Descripcion'></textarea><br />
                    <div style={{justifyContent: 'center', display: 'block', marginBottom: '0px'}}>
                    <p style={{display: 'contents'}}> Salud: </p><input className={style.salud} type='number' min="0" max="100" onChange={(e) => { setSalud(e.target.value) }}></input>
                    <p style={{display: 'contents'}}> Puntuacion: </p><input className={style.puntuacion} type='number' min="0" max="100" onChange={(e) => { setSpoonacularScore(e.target.value) }}></input>
                    </div>
                    <p style={{ display: 'contents', marginBottom: '0px'}}>Pasos</p><button className={style.btn} onClick={(e) => { e.preventDefault(); setPasos([...pasos, ""])}}>+</button>
                    {pasos.map((x, y) => {
                        return <div id={'paso' + y} key={y}> <textarea id={"paso" + y} onChange={handleChange} placeholder={'Paso ' + y}></textarea><br /></div>
                    })}
                    <p style={{margin: '5px 0px 0px 0px'}}>Url de la imagen</p><input autoComplete='off' className={style.url} onChange={(e) => { setUrl(e.target.value) }} id='url' placeholder='https://example.com/imagen.jpg'></input><br />
                    <label style={{marginTop: '10px'}}>Dietas</label><br />
                    <div className={style.divDietas}>
                        <ul className={style.liDietas}>
                            {tipos.map(x => {
                                return (
                                    <li className={style.dietasForm} key={"dietas" + x.id}><div ><label className={style.labelDietas} htmlFor={ x.nombre}>{x.nombre}</label><input  onChange={(e) => handleChangeCheck(e)} type="checkbox" id={x.nombre} /></div></li>
                                )
                            })}
                        </ul>
                    </div>
                    <br />
                    <input className={style.btn} type='submit' value='Crear Receta'></input>
                </form>
            
            </div>
            <div style={{display: 'block', justifyContent: "center", width: '400px', height: '553px', margin: '30px' }}>
            <div style={{display: 'block',  width: '400px', height: '321px',overflow: "hidden" }}>
                <h1 className={style.tituloForm}>{nombre}</h1>
                <img className={style.imagenForm} width='400px' height='321px' src={ url || urlCargando} alt="cargando" />
                </div>
                <ul className={style.liDietas}>
                            {dietas.map((x,y) => {
                                return (
                                    <li className={style.dietasForm} key={"dieta" + y}><label className={style.labelDietas} htmlFor={ x} >{x}</label></li>
                                )
                            })}
                        </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tipos: state.tipos,
    }
}

export default connect(mapStateToProps, null)(CrearReceta);