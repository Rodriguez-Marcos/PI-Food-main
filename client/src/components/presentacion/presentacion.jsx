import style from './presentacion.module.css'

import img from '../../assest/images/683488.png'
import { useHistory } from 'react-router-dom';


export default function Presentacion(){
    let history = useHistory();

    return(
        <div className={style.div}>
            <img onClick={e=>{setTimeout(()=>history.push('/recetas'),250)}} src={img} className={style.img}/>
        </div>
    )
}