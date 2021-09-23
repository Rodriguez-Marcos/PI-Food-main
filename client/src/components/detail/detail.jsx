import axios from 'axios';
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getRecetas } from '../../store/actions/recipes-actions';
import style from './detail.module.css'

let recipe = {};
let pasos = [];
let url = '';

function Detail({ id, getRecetas, fullRecipes }) {
    const [cambio, setCambio] = useState([]);
    useEffect(() => {
        getRecetas();
    }, [])

    useEffect(() => {
        recipe = fullRecipes.find(x => {
            return x.id === parseInt(id);
        });
        selector = document.getElementById('Descripcion');
        selector.innerHTML = recipe?.resumen;
        if(recipe){
            pasos = JSON.parse(recipe.pasos);
            setCambio(cambio+1);
            url = recipe.url;
        }
    }, [fullRecipes])
    let selector;

    return (
        <div className={style.divPrincipal}>
            <h1>Detalle de la receta: {recipe?.nombre}</h1>
            <div style={{ display: 'block', minHeight: '230px' }}>
                {<img className={style.imagen} alt={`recetaNro:${id}`} src={url} />}
                <p className={style.parrafo} id='Descripcion'></p>
            </div>
            <hr style={{ backgroundColor: 'black' }} />
            <div style={{ display: 'inline-flex' }}>
                <div style={{ display: 'inline-flex' }}>
                    <h3 style={{margin: '10px', display: 'block'}}>Dietas: </h3>
                    <ul className={style.ul}>
                        {recipe?.tipos?.map((x, y) => {
                            return (
                                <li className={style.li} key={`dieta${y}`}>{x.nombre}</li>
                            )
                        })}
                    </ul>
                </div>
                <h3 style={{ margin: '10px', display: 'block' }}>Nivel de comida saludable: {recipe?.salud}%</h3>
                <h3 style={{ margin: '10px', display: 'block' }}>Puntaje: {recipe?.spoonacularScore}</h3>
            </div>
            <h3 style={{ margin: '10px'}}>Pasos: </h3>
            {Array.isArray(pasos)?pasos?.map((x,y)=>{
                return (
                    <div style={{ margin: '10px',display: 'inline'}}>
                        <h4 style={{ margin: '10px'}}>Paso nro: {y}</h4>
                        <p style={{ margin: '10px'}}>{x.step}</p>
                    </div>
                )
            }): <div>No hay pasos</div>}

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        fullRecipes: state.fullRecipes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecetas: () => {
            dispatch(getRecetas())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);