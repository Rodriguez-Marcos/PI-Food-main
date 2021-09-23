import React, { useEffect, useState } from 'react';
import { getRecetas, paginate } from '../../store/actions/recipes-actions';
import { connect } from 'react-redux';
import RecipeCards from '../recipecard/recipecard'
import { div, btnBack, btnNext } from './home.module.css'


function Home({ recipes, paginate, getRecetas }) {
    const [pagina, setPagina] = useState(9)
    useEffect(()=>{
        getRecetas();
    },[])



    function handleBack() {
        let ceil = pagina - 9;
        let floor = ceil - 9;
        if (recipes[ceil - 1]) {
            setPagina(ceil)
            paginate(recipes.slice(floor, ceil));
        }
    }
    function handleNext() {
        let floor = pagina;
        let ceil = pagina + 9;
        if (recipes[ceil - 8]) {
            setPagina(floor + 9);
            paginate(recipes.slice(floor, ceil));
        }
    }
    return (
        <div className={div}>
            {recipes[pagina - 10] &&<button className={btnBack} onClick={handleBack}>«</button>}
            {recipes[pagina + 1] &&<button className={btnNext} onClick={handleNext}>»</button>}
            <RecipeCards />
        </div>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        paginate: recipes => {
            dispatch(paginate(recipes))
        },
        getRecetas: () => {
            dispatch(getRecetas())
          },
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);