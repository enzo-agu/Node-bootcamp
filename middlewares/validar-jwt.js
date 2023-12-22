import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import Usuario from '../seccion-9-10/models/usuario.js';
// import usuario from '../seccion-9-10/models/usuario';

dotenv.config({ path: "./.env" });

const validarJWT = async (req= request,res=response, next) =>{

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:'No hay token'
        })
    }

    try {
       const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY)

       const usuario = await Usuario.findById(uid)

       if(!usuario){
        return res.status(401).json({
            msg:'Token no  válido - Usuario Inexistente'
        })
       }

       if(!usuario.estado){
        return res.status(401).json({
            msg:'Token no  válido - estado FALSE'
        })
       }


       req.usuario=usuario
        next()

    } catch (error) {

        console.log(error)
        res.status(401).json({
            msg:'Token no válido'
        })
        
    }


    
    

    next()
}

export {validarJWT}