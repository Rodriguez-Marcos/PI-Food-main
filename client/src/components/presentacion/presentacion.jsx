import style from './presentacion.module.css'

import img from '../../assest/images/683488.png'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getRecetas, obtenerTipos } from '../../store/actions/recipes-actions';
import { connect } from 'react-redux';


function Presentacion({ getRecetas, obtenerTipos }){
    let history = useHistory();
    useEffect(()=>{
        obtenerTipos()
    },[]);

    return(
        <div className={style.div}>
            <img onClick={e=>{setTimeout(()=>history.push('/recetas'),250)}} src={img} className={style.img}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        obtenerTipos: ()=> {
            dispatch(obtenerTipos())
        },
        getRecetas: ()=> {
            dispatch(getRecetas())
        }

    }
}

export default connect(null,mapDispatchToProps)(Presentacion);