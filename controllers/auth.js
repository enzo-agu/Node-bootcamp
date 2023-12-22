import { request, response } from "express";
import Usuario from "../seccion-9-10/models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";

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

export { login };
