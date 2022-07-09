//! CRUD WITH MONGOOSE
const { response } = require("express")
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
//! GET with mongoose
app.get("/koders/:id", async (request, response)=>{
    const { id } = request.params
    //const koders = await Koders.find({})//!promise
    try{
        const koders = await Koders.findById(id)
        response.json({
            success:true,
            data:{
                koders
            }
        })
    } catch(error){
        response.status(400)
        response.json({
            success: false,
            error
        })
    }
})

//!PATCH WITH MONGOOSE

app.patch("/koders/:id", async (request, response) =>{
    const { modulo, edad } = request.body
    const {id} = request.params
    try{
        const koders = await Koders.findByIdAndUpdate( id, { modulo: modulo , edad: edad }  )
        response.json( koders )
    }catch( error ){
        response.status(404)
        response.json({
            success: false,
            message: error.message
        })
    }
})
//! POST WITH MONGOOSE
app.post("/koders", async (request, response)=>{

    try{
        const newKoder = await Koders.create(request.body)
        response.status(201)
        response.json({
            data:{
                newKoder
            }
        })
    }catch(err){
        response.status(400)
        response.json({
            success: false,
            message: err.message
        })

    }

})
//! DELETE USING MONGOOSE
app.delete("/koders/:id", async (request, response)=>{

    const {id} = request.params
    try {
        const deletedKoder =  Koders.findByIdAndDelete(id)
        response.status(202)
        response.json(
            `El koder con el ID ${id} ha sido eliminado satisfactoriamiente`
        )
    }catch(err){
        response.status(404) 
    }



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

