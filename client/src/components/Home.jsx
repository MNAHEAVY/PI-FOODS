import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAllRecipes, getAllDiets, orderPerAlfa, orderPerPunt, filterByDiets} from '../actions'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import './styles/home.css'
import r from './img/3580284.png'
import t from './img/new-recipe.png'


export default function Home(){
    const dispatch = useDispatch()
    const recipes = useSelector((store)=> store.recipes)
    const diets = useSelector((store)=> store.diets)
    const [cantRecipePage, setCantRecipePage] = useState(9)
    const [refresh, setRefresh] = useState(1)
  
 

    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getAllDiets())
    },[dispatch])
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllRecipes())
    }
    
    function filterDiet(e){
        e.preventDefault();
        dispatch(filterByDiets(e.target.value))
    }
    function ordenAlfa(e){
        e.preventDefault();
        setRefresh(refresh + 1)
        dispatch(orderPerAlfa(e.target.value))
    }
    function ordenPunt(e){
        e.preventDefault();
        setRefresh(refresh + 1)
        dispatch(orderPerPunt(e.target.value))
    }
    function changeCantRecipePage(e){
        e.preventDefault();
        setCantRecipePage(Number(e.target.value))
    }
    return(
        <div className='home-container'>
            <div className='home-nav'>
                <div className='home-navbar-up'>
                    <SearchBar/>
                    <h1>LA DIVINA COMIDA</h1>
                    <Link to='/recipecreate'>
                        <button id='crear-receta'>
                        <img src={t}/>
                    <span>Crear Receta</span>
                        </button>
                    </Link>
                </div>
                
                    <div className='home-navbar-d'>
                    <span>RECARGAR</span>
                    <button onClick={(e)=>{handleClick(e)}}>
                    <img src= {r} height="40px" widht="40px"/>
                    </button>
                    {/* <div>
                        <label>RECETAS POR PÁGINA</label>
                        <select onChange={(e)=>{changeCantRecipePage(e)}}>
                            <option value='9'>9</option>
                            <option value='12'>12</option>
                            <option value='24'>24</option>
                            <option value='36'>36</option>
                            <option value='100'>Todas</option>
                        </select>
                    </div> */}
                    <div>
                        <label>TIPO DE DIETA</label>
                        <select onChange={(e)=>{filterDiet(e)}}>
                            <option value='all'>TODAS</option>
                            {
                                diets&&diets.map(d=>{
                                    return(
                                        <>
                                            <option value={d.name} >{d.name.toUpperCase()}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>ORDEN ALFABÉTICO</label>
                        <select onChange={(e)=>{ordenAlfa(e)}}>
                            <option value='defect'>POR DEFECTO</option>
                            <option value='ascen'>ASCENDENTE</option>
                            <option value='descen'>DESCENTENDE</option>
                        </select>
                    </div>
                    <div>
                        <label>VALOR SALUDABLE</label>
                        <select onChange={(e)=>{ordenPunt(e)}}>
                            <option value='defect'>POR DEFECTO</option>
                            <option value='ascen'>ASCENDENTE</option>
                            <option value='descen'>DESCENDENTE</option>
                        </select>
                    </div>
                </div>
            </div>
            <Pagination recipes={recipes} cantRecipe={cantRecipePage} refresh={refresh}/>
        </div>
        )
}