import { GET_RECIPES, PAGINATE, OBTENER_TIPOS, COINCIDIR_RECETAS, ORDENAR_ASC,ORDENAR_DES,ORDENAR_PUNTUACION } from "../actions/recipes-actions";

const initialState = {
    tipos: [],
    fullRecipes: [],
    recipes: [],
    pageRecipe: [],
    cambio: true,
    asc: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                pageRecipe: action.payload.slice(0, 9),
                fullRecipes: action.payload,
            }
            case OBTENER_TIPOS: {
                
                return {
                    ...state,
                    tipos: action.payload,
                }
            }
            case COINCIDIR_RECETAS: {
                return {
                    ...state,
                    recipes: action.payload.recetasPorNombre.filter(x => {
                        let estado = false;
                        action.payload.recetasPorTipo.forEach(y => {
                            if (x.id === y.id)
                            estado = true;
                        })
                        return estado;
                    }),
                }
            }
            case PAGINATE:
                return {
                    ...state,
                    pageRecipe: action.payload,
                }
        case ORDENAR_ASC:{
            return{
                ...state,
                recipes: state.recipes.sort(function (a, b) {
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                      return 1;
                    }
                    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  }),
                  cambio: !state.cambio,
            }
        }
        case ORDENAR_DES:{
            return{
                ...state,
                recipes: state.recipes.sort(function (a, b) {
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                      return -1;
                    }
                    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                      return 1;
                    }
                    // a must be equal to b
                    return 0;
                  }),
                  cambio: !state.cambio,
            }
        }
        case ORDENAR_PUNTUACION:{
            return{
                ...state,
                recipes: state.recipes.sort(function (a, b) {
                    if (a.salud < b.salud) {
                        if(state.asc)
                            return 1;
                            return -1;
                    }
                    if (a.salud > b.salud) {
                        if(state.asc)
                        return -1;
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                  }),
                  cambio: !state.cambio,
                  asc: !state.asc,
            }
        }
        default:
            return { ...state }
    }
}


export default reducer;