import axios from 'axios'
import { ROUTE_RECIPES, ROUTE_TYPES } from '../../constants';

export const GET_RECIPES = 'GET_RECIPES';
export const PAGINATE = 'PAGINATE';
export const OBTENER_TIPOS = 'OBTENER_TIPOS';
export const CANTIDAD_RECETAS_ENCONTRADAS ='CANTIDAD_RECETAS_ENCONTRADAS'
export const COINCIDIR_RECETAS = 'COINCIDIR_RECETAS';
export const ORDENAR_ASC = 'ORDENAR_ASC';
export const ORDENAR_DES = 'ORDENAR_DES';
export const ORDENAR_PUNTUACION = 'ORDENAR_PUNTUACION';


export function getRecetas() {
    return async function (dispatch) {
        const response = await axios.get(ROUTE_RECIPES)
        dispatch({
            type: GET_RECIPES,
            payload: response.data,
        })
    };
};

export const obtenerTipos = () => {
    return async function (dispatch) {
        const response = await axios.get(ROUTE_TYPES)
        dispatch({
            type: OBTENER_TIPOS,
            payload: response.data,
        });
    };
};

export const paginate = (recipes) => {
    return {
        type: PAGINATE,
        payload: recipes,
    };
};

export const coincidirRecetas = (recetasPorTipo,recetasPorNombre) =>{
    return({type: COINCIDIR_RECETAS,
        payload: {
            recetasPorTipo,
            recetasPorNombre,
        }
    })
}

export const ordenarASC = ()=>{
    return({
        type: ORDENAR_ASC,
    })
}
export const ordenarDES = ()=>{
    return({
        type: ORDENAR_DES,
    })
}
export const ordenarPunt = ()=>{
    return({
        type: ORDENAR_PUNTUACION,
    })
}
