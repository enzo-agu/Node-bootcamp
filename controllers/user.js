import { request, response } from "express";
import Usuario from "../seccion-9-10/models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 5 } = req.query;

  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite))
    .skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
    // resp
  });
};

const usuariosPost = async (req, res = response) => {
  // const errors = validationResult(req)
  // if (!errors.isEmpty()){
  //   return res.status(400).json(errors)
  // }

  const { nombre, correo, password, rol } = req.body;
  // const {id, nombre, edad, desarrollo, domicilio } = req.body
  const usuario = new Usuario({ nombre, correo, password, rol });

  // const existeCorreo= await Usuario.findOne({correo})
  // if(existeCorreo){
  //   return res.status(400).json({
  //     msg:'Correo existente en BD'
  //   })
  // }

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "post API - controlador",
    // id,nombre,edad,desarrollo,domicilio,
    usuario,
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};
const usuariosDelete = async (req, res = response) => {

  const {id} = req.params

  const uid = req.uid

  // BORRADO FISICO 👇
  // const usuario=await Usuario.findByIdAndDelete(id)

  // BORRADO DE ESTADO
  const usuarioBorradoEstado= await Usuario.findByIdAndUpdate(id, {estado:false})

  const usuarioAutenticado= req.usuario

  res.json({
    // usuario
    usuarioBorradoEstado,
    usuarioAutenticado
});
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
