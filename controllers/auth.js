import { json, request, response } from "express";
import Usuario from "../seccion-9-10/models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "USUARIO / PASSWORD INCORRECTOS",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "ESTADO FALSE",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "PASSWORD INCORECTO",
      });
    }


    const token = await generarJWT (usuario.id)


    res.json({
     usuario,
     token
    });
    
  } catch (error) {
    res.json({
      msg: "ADMIN",
    });
  }

  // console.log(error);
  // return res.status(500).json({
  //   msg: "Hable con el administrador",
  // });
};

const googleSignIn = async (req, res=response) =>{

  const {id_token} = req.body

  try {

    const {correo, nombre, img}=await googleVerify(id_token)

    let usuario= await Usuario.findOne({correo})

    if(!usuario){
      const data={
        nombre,
        correo,
        password:':;',
        img,
        rol: "USER_ROLE",
        google:true

      }

      usuario=new Usuario(data)
      await usuario.save()
    }

    if(!usuario.estado){
      return res.status(401).json({
        msg:'Hable con el administrador, usuario bloqueado'
      })
    }

    const token = await generarJWT (usuario.id)

    res.json({
     usuario,
     token
    })
    
  } catch (error) {

    res.status(400).json({
      ok:false,
      msg:'El token no se pudo verificar'
    })
    
  }


}

export { login, googleSignIn };
