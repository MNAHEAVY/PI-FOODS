import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {createRecipe, getAllDiets} from '../actions'
import {useDispatch,useSelector} from 'react-redux'
import './styles/form.css'


export default function CreateRecipe(){
    const allDiets = useSelector(store=> store.diets)
    const dispatch = useDispatch()
    const [indexPaso,setIndexPaso] = useState({})
    const [cantP,setCantP] = useState(1)
    const [error,setError] = useState({})
    const [inputForm,setInputForm] = useState({
        name: '',
        image: '',
        type: '',
        resume: '',
        healthScore: 0,
        steps: [],
        diets: []
    })
    
   
    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    function validate(input){
        let error = {}
        if(input.name.length >= 0 && !input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
            error.name = 'Solo se permiten letras y sin espacios al final!'
        }else error.name = null
        if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
            error.image = 'La imagen tiene que ser un URL'
        }else error.image = null
        if(input.type && input.type.length > 30){
            error.type = 'Tiene que contener máximo 30 caracteres'
        }else error.type = null
        if(input.resume && input.resume.length > 1000){
            error.resume = 'Tiene que contener máximo 1000 caracteres'
        }else error.resume = null
        if(input.healthScore > 100 || input.healthScore < 0){
            error.healthScore = 'Tiene que ser entre 0 y 100'
        }else error.healthScore = null
        if(input.diets && input.diets.length === 0){
            error.diets = 'Tienes que elegir al menos una dieta'
        }else error.diets = null
        return error
    }

    function handleChange(e){
        setInputForm({
            ...inputForm,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...inputForm,
            [e.target.name] : e.target.value
        }))
    } 
    function handleSelect(e){
        setInputForm({
            ...inputForm,
            diets : [...inputForm.diets,e.target.value]
        })
        setError(validate({
            ...inputForm,
            diets : [...inputForm.diets,e.target.value]
        }))
    } 
    function deleteSelect(e,id){
        e.preventDefault();
        setInputForm({
            ...inputForm,
            diets : inputForm.diets.filter(d=> d !== id)
        })
        setError(validate({
            ...inputForm,
            diets : inputForm.diets.filter(d=> d !== id)
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(error.name === null && error.image === null && 
        error.type === null && error.resume === null && 
        error.healthScore === null && error.diets === null){
            dispatch(createRecipe(inputForm))
            alert('Se ha creado la receta exitosamente')
            setInputForm({
                name: '',
                image: '',
                type: '',
                resume: '',
                healthScore: 0,
                steps: [],
                diets: []
            })
        }else{
            alert('Arregla los errores marcados y completa los espacios requeridos')
        }
    }
    
    function handleChangePasos(e,i){
        let pasitos2 = []
        setIndexPaso({
            ...indexPaso,
            [i] : e.target.value
        })
        for(let i=0;i<cantP-1;i++){
            pasitos2.push(indexPaso[i])
        }
        setInputForm({
            ...inputForm,
            steps: pasitos2
        })
    } 
    function addPaso(){
        let pasitos = []
        if(cantP <=13){setIndexPaso({
            ...indexPaso,
            [cantP] : ''
        })
        for(let i=0;i<cantP;i++){
            pasitos.push(indexPaso[i])
        }
        setCantP(1+cantP)
        setInputForm({
            ...inputForm,
            steps: pasitos
        }
        )}
    }
 
    
    return(
        <div id='container-createrecipe'>
            <div id='cont-btn-home'>
                <Link to='/home'>
                    <button>VOLVER AL MENÚ</button>
                </Link>
            </div>
            <div id='cont-title-form'>
                <h1>Creando Receta!</h1>
            </div>
            <form onSubmit={(e)=>{handleSubmit(e)}} id='form-create'>
                <div id='form-cont-left'>
                    <div id='input-name' className='form-inputs'>
                        <label>* Nombre:</label>
                        <input 
                            type='text' 
                            value={inputForm.name} 
                            name='name' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.name&& (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div id='input-img' className='form-inputs'>
                        <label>imagen:</label>
                        <input 
                            type='text' 
                            value={inputForm.image} 
                            name='image' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.image&& (
                            <p>{error.image}</p>
                        )}
                    </div>
                    <div id='input-tdp' className='form-inputs'>
                        <label>Tipo de plato:</label>
                        <input 
                            type='text' 
                            value={inputForm.type} 
                            name='type' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.type&& (
                            <p>{error.type}</p>
                        )}
                    </div>
                    <div id='input-nds' className='form-inputs'>
                        <label>* Valor saludable:</label>
                        <input 
                            type='number' 
                            value={inputForm.healthScore} 
                            name='healthScore' 
                            onChange={(e)=>{handleChange(e)}}/>
                        {error.healthScore&& (
                            <p>{error.healthScore}</p>
                        )}
                    </div>
                    <div id='input-rdp' className='form-inputs'>
                            <label>Resumen del plato:</label>
                            <input 
                                type='text' 
                                value={inputForm.resume} 
                                name='resume' 
                                onChange={(e)=>{handleChange(e)}}/>
                            {error.resume&& (
                                <p>{error.resume}</p>
                            )}
                    </div>
                    <div id='select-diets'  className='form-inputs'>
                        <label>*Dietas:</label>
                        <select onChange={(e)=>{handleSelect(e)}}>
                            <option> -Seleciona al menos una- </option>
                            {
                                allDiets&&allDiets.map(d=>{
                                    return(
                                        <option value={d.id}>{d.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div id='cont-diets'>
                        <ul>
                        {allDiets&&allDiets.map((d)=>{
                            if(inputForm && inputForm.diets.includes(d.id) ){
                                return(
                                        
                                        <li>{d.name} <button onClick={(e)=>{deleteSelect(e,d.id)}}>X</button></li>
                                )
                            }
                            return
                        })}
                        </ul>
                    </div>
                    <div id='cont-btn-submit'>
                        <button type='submit'>CREAR RECETA</button>
                    </div>
                </div>
                <div id='form-cont-right'>
                    <label>Pasos para la preparacion (Max 13):</label>
                    <button onClick={()=>{addPaso()}}>Añadir paso</button>
                   
                    {
                        indexPaso && inputForm.steps.map((p,i)=>{
                            return(
                                <input type='text' value={indexPaso[i]} name='steps' onChange={(e)=>{handleChangePasos(e,i)}} required/>        
                                )
                            })
                        }
                       
                </div>
            </form>
        </div>
    )
}