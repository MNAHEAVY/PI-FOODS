import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipesById } from '../actions';
import { useEffect } from 'react';
import './styles/detail.css'


export default function RecipeDetails(){
    let {id} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipesById(id));
    },[dispatch,id])
        
        let recipe = useSelector(store => store.recipe);

    return (
        <div className="recip-nav">
            <div className= "recip-navbar-up">
                <div> 
                
                   <Link to= '/home' >
                       <button>
                           <h1>Volver</h1>
                       </button>
                   </Link>
                <h1>Receta</h1>
             </div>
            
            
           
          
            { recipe.id?
                <div >
                    <div>                        
                    <img src={recipe.image} />
                    </div>

                    <div>
                    <h2> {recipe.name}</h2>
                    <h4>Tipos: {recipe.type}</h4>
                    <p>Resumen: {recipe.resume.replace(/<[^>]+>/g, '')}</p>
            
                    <p>Valor saludable: {recipe.healthScore}</p>
                    <p>Pasos: {recipe?.steps.map(p=>{
                                    return(
                                        <li>{p}</li>
                                        )
                                    })}</p>
                    
                     </div>
            
                </div> 
                   : 
                    <h2>Cargando...</h2>    

             
               
            }
                 
             </div>

        </div>
    )
}