import {Link} from 'react-router-dom';
//import s from './img/blob-scene-haikei.svg';
import './styles/LandingPage.css'


export default function LandingPage(){

    
    return(
        <div id='lp-container' >
           <h3>BIENVENIDO</h3>
            <h1>LA DIVINA COMIDA</h1>
            <Link to='/home'>
                <button>INGRESAR</button>
            </Link>   
        </div>
        )
}