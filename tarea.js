const express = require("express")
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.get ("/", (request, response)=>{
    response.json({
        "message":"Endpoint de HOME"
    })
})

//!SCHEMA
const koderSchema = new mongoose.Schema({

    name:{ 
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    edad: {
        type: Number,
        min: 18,
        max:150
    },
    gen:{
        type: String,
        required: true
    },
    modulo:{
        type: String,
    },
    hobbie:{
        type: [String]
    },
    sexo:{
        type: String,
        enum:["F","M","O"]
    }

})

//!Models

const Koders = mongoose.model("koders", koderSchema)

//! ENDPOINTS

app.get("/koders/:id", async (request, response)=>{
    const { id } = request.params
    //const koders = await Koders.find({})//!promise

    const koders = await Koders.findById(id)
    .catch((err)=>{
        response.json(`El ID ${id} no existe`)
    })
    // const koderEncontrado = koders.filter((koder)=>{
    //     console.log("filtro", String(koder._id))
    //     console.log("enpoint id filtro", id)
    //     return  id == String(koder._id)
    // })
    // if(!koders.length){
    //     response.json(`El koder con el id ${id} no existe`)
    //     return
    // }
    // // console.log("koders", koders)
    // // console.log("koder endpoint id", id)
    response.json(koders)
})

mongoose.connect("mongodb+srv://francisco:holaeningles123@kodemia.gjhli.mongodb.net/kodemia")
.then(()=>{
    console.log("DB connected...")
    app.listen(8080, (request, response)=>{
        console.log("nuestro servidor esta escuchando")
    })
})
.catch((err)=>{
    console.log("No se pudo conectar la base de datos", err)
})
