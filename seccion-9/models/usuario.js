import { Schema, model } from "mongoose";

const UsuarioSchema=Schema({
    nombre:{
        type:String, 
        required: [true, 'El nombre es obligatiorio']
    },
    correo:{
        type:String, 
        required: [true, 'El correo es obligatiorio'],
        unique:true
    },
    password:{
        type:String, 
        required: [true, 'La contraseña es obligatioria']
    },
    img:{
        type:String, 
    },
    rol:{
        type:String, 
        required: true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean, 
        default:true
    },
    google:{
        type:Boolean, 
        default: false 
    },
})

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario} =this.toObject()
    return usuario
}

export default model('Usuario', UsuarioSchema)