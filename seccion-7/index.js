import express from 'express'
import path from 'path'
import hbs from 'hbs'
import { __dirName } from './utils.js'

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app= express()
const PORT= process.env.PORT

app.set('view engine', 'hbs')

hbs.registerPartials(__dirName + '/views/partials', (err)=>{

})

app.use(express.static(path.join(__dirName, '../public')))

app.get('/', (req,res)=>{

    res.render('home',{
        nombre:'enzo',
        titulo:'curso-node'
    })

})

app.get('/generic', (req,res)=>{
    res.render('generic')
})

app.get('/elements', (req,res)=>{
    res.render('elements')
})

// app.get('/generic', (req,res)=>{

//     res.sendFile(path.join(__dirName,'../public/generic.html'))

// })
// app.get('/elements', (req,res)=>{

//     res.sendFile(path.join(__dirName,'../public/elements.html'))

// })

app.get('*', (req,res)=>{

    res.sendFile(path.join(__dirName,'../public/404.html'))

})

app.listen(PORT, ()=>{
    console.log(`Puerto corriendo en ${PORT}`)
})