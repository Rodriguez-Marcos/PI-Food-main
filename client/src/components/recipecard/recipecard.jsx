import { useEffect } from 'react';
import { connect } from 'react-redux';
import { div, divPadre, titulo, tipos, img, saludable,p } from './recipecard.module.css';
import { paginate } from '../../store/actions/recipes-actions';
import { useHistory } from 'react-router-dom';


function RecipeCards({ pageRecipe, recipes, paginate, cambio }) {
    let history = useHistory();
    useEffect(() => {
        paginate(recipes.slice(0, 9));
    }, [cambio, recipes])
    return (
        <div className={divPadre}>
            <p className={p}>Recetas encontradas: {recipes.length}</p>
            {pageRecipe?.map(x => {
                return (
                    <div onClick={(e) => { history.push('/receta/' + x.id) }} key={x.id} className={div}>
                    <p className={titulo}>{(x.nombre.length > 60) ? x.nombre.slice(0, 60) + "..." : x.nombre}</p>
                    {<img className={img} src={x.url}></img>}
                    <p className={tipos}>{x.tipos?.map(x => x.nombre + ', ')}</p>
                    <p className={saludable}>saludable: </p><div style={{ borderRadius: '50px', background: 'rgb(200, 20, 20)', height: '5px', width: '70%', margin:  '0px 10px', display: 'inline-block'}}><div style={{borderRadius: '50px',height: '5px', width: `${x.salud}%`, backgroundColor: '#16d114'}}/></div>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        pageRecipe: state.pageRecipe,
        recipes: state.recipes,
        cambio: state.cambio,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        paginate: (recipes) => {
            dispatch(paginate(recipes))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCards);