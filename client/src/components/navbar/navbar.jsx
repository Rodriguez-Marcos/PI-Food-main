import React, { useEffect, useState } from 'react';
import './navbar.css';
import { coincidirRecetas, getRecetas, obtenerTipos, ordenarASC, ordenarDES, ordenarPunt } from '../../store/actions/recipes-actions';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';



function Nav({ tipos, fullRecipes, coincidirRecetas, getRecetas, obtenerTipos,ordenarASC, ordenarDES, ordenarPunt }) {
  const [value, setValue] = useState("")
  const [dietas, setDietas] = useState({});
  let location = useLocation();
  let history = useHistory();
  
  useEffect(() => {
    document.title = 'Foods PI';
    getRecetas();
    obtenerTipos();
  }, [])

  function filtro(recipeName, value) {
    if (!value || !recipeName)
      return true;
    return recipeName.includes(value);
  }

  function filtroTipo(dietasRecetas, dietasFiltro) {
    //dietasfiltro = {vegan:true,whole 30:true}                      Dietas recetas tiene que contener todas las dietas de dietas filtro
    //dietasRecetas = [{nombre:"vegan"},{nombre:"whole 30"}]
    let dr = [];
    let df = [];
    let falso = true;
    dietasRecetas.forEach(x => { // dr ---> ["vegan","whole 30"]
      dr.push(x.nombre);
    })

    df = Object.keys(dietasFiltro);// --> [vegan,whole 30]

    df.forEach(x => {
      if (!dr.includes(x)) {
        falso = false;
      }
    })
    if (falso)
      return true;
    return false;
  }

  function handleChange(e) {
    if (e.target.id === "busqueda")
      setValue(e.target.value);

    let copiaDietas = dietas;
    let recetasPorTipo = [];
    if (e.target.id !== "busqueda") {
      e.target.value = value;
      let { id } = e.target;

      if (e.target.checked) {
        setDietas({ ...dietas, [id]: e.target.checked })
        copiaDietas = { ...dietas, [id]: e.target.checked }
      } else {
        copiaDietas = dietas;
        delete copiaDietas[id]
        setDietas(copiaDietas)
      }


    }

    recetasPorTipo = fullRecipes.filter(recipe => filtroTipo(recipe.tipos, copiaDietas))

    let recetasPorNombre = fullRecipes.filter(recipe => filtro(recipe.nombre.toLowerCase(), e.target.value?.toLowerCase()));

    coincidirRecetas(recetasPorTipo, recetasPorNombre);

  }

  function handleFocus(e){
    if(location.pathname !== '/recetas'){
      history.push('/recetas');
    }
  }

  return (
    <nav className="navbar" >
      <span>
        <Link to='/'>
          Home
        </Link>
      </span>
      <div className='busqueda'>
        <form >
          <input onFocus={(e)=>handleFocus(e)} placeholder='Buscar receta por nombre' autoComplete='off' id="busqueda" type='text' onChange={(e) => handleChange(e)}></input>
        </form >{location.pathname==='/recetas'&&
        <div className='filterContainer'>
        <input className={'btn'} onClick={()=>{ordenarASC()}} type='submit' value='Ordenar ASC'></input>
        <input className={'btn'} onClick={()=>{ordenarDES()}} type='submit' value='Ordenar DES'></input>
        <input className={'btn'} onClick={()=>{ordenarPunt()}} type='submit' value='Ordenar Puntuacion'></input>
        </div>}

      </div>
      {location.pathname==='/recetas'&&<div className={'header'}>
        <ul className={'nav'}>
          <li><label>Dietas</label>
            <ul>
              {tipos.map(x => {
                return (
                  <li className={'list-item'} key={"dietas" + x.id}><input style={{backgrounColor: '#ff8d4f'}} onChange={handleChange} type="checkbox" id={x.nombre} /><label style={{padding: '10px'}} htmlFor={x.nombre}>{x.nombre}</label></li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>}
      <Link to='/crear'>
        <span>Crear Recetas</span>
      </Link>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    tipos: state.tipos,
    fullRecipes: state.fullRecipes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    coincidirRecetas: (recetasPorNombre, recetasPorTipo) => {
      dispatch(coincidirRecetas(recetasPorNombre, recetasPorTipo))
    },
    getRecetas: () => {
      dispatch(getRecetas())
    },
    obtenerTipos: () => {
      dispatch(obtenerTipos())
    },
    ordenarASC:()=>{
      dispatch(ordenarASC());
    },
    ordenarDES:()=>{
      dispatch(ordenarDES());
    },
    ordenarPunt:()=>{
      dispatch(ordenarPunt());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
