// const axios = require('axios');
const { Router } = require('express');
const {Recipe,Diet} = require('../db')

const router = Router();



router.post('/',async(req,res,next)=>{
    const {name,image,type,healthScore,resume,diets,steps} = req.body;
    try {
        await Recipe.create({name,image,type,healthScore,resume,steps})
        if(diets && diets.length && typeof diets === 'object'){
            const newReci = await Recipe.findOne({where: {name}});
            diets.forEach(async d=>{
                await newReci.addDiet(d)
            })
        }
        res.send('Receta creada')
    } catch (error) {
        next(error)
    }
})



module.exports = router;