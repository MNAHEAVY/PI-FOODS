import {useState} from 'react'
import Cards from "./Cards";
import './styles/Pagination.css'


export default function Paginado({recipes,cantRecipe,refresh}){
    
    const cantPages = Math.round(recipes.length / cantRecipe);
    const [page,setPage] = useState(1)
    const lastRecipe = cantRecipe * page
    const firstRecipe = lastRecipe - cantRecipe
    let recipePerPage = recipes.slice(firstRecipe,lastRecipe)
    const numPage = []
    if(typeof recipes !== 'string'){
        for(let i = 1; i <= cantPages; i++){
            numPage.push(
                <button value={i} onClick={()=>{setPage(i)}}>
                    {i}
                </button>)
        }
    }

    if(page !== 1 && page > numPage.length){
        setPage(1)
    }

    return(
        <div className='pag-container'>
           
            <div className='pag-cont-cards'>
           {
                refresh && recipePerPage.length?
                typeof recipes !== 'string'?
                recipePerPage.map(r=>{
                    return(
                    <Cards id={r && r.id} image={r && r.image} name={r && r.name} diets={r && r.diets} />)
                })
                :
                <h2>{recipes}</h2>
                :
                <h1>Cargando</h1>
            }
            </div>
            <div className='pg-cont-butt'>
                {numPage}
            </div>
        </div>
    )
}