import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './styles/cards.css'




export default function Cards({id,image,name, diets}){
    const dispatch = useDispatch()



    return(
        <div key={id} className='cards-container' >
            <Link to={`/recipe/${id}`}>
                    <div>
                        <h2>{name}</h2> 
                    </div> 
            </Link>
           
               <img  src= {image} alt=""/> 
           

                
            <p>Dieta/s: {diets}</p>
               
        </div>
    )
}