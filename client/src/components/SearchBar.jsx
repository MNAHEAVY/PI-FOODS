import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {getRecipesByName} from '../actions'
import i from './img/search_FILL0_wght400_GRAD0_opsz48.png'
import './styles/searchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input,setInput] = useState('')

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipesByName(input))
        setInput('')
    }
    console.log(input)
    return(
        <div className='cont-searchbar'>
            <form onSubmit={(e)=>{handleSubmit(e)}} >
                <button type='submit'><img src={i}/></button>
                <input value={input} onChange={(e)=>{handleChange(e)}} placeholder='Tipea tu busqueda...'/>
            </form>
        </div>
    )
}