import { response } from "express";

const usuariosGet = (req, res = response) => {

  const {q,apiKey, porDefecto='algoMas'} = req.query

  res.json({
    msg: "get API - controlador",
    q,apiKey,porDefecto
  });
};

const usuariosPost = (req, res = response) => {
  const { id, name } = req.body;

  res.json({
    msg: "post API - controlador",
    id,
    name,
  });
};
const usuariosPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - controlador",
    id,
  });

};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
