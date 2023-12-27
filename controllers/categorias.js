import { response } from "express";
import Categoria from "../seccion-9-10/models/categoria.js";

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));

  // const total = await Usuario.countDocuments(query);

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    categorias,
    // resp
  });
};

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuario.id,
  };

  const categoria = new Categoria(data);
  categoria.save();

  res.json({
    // msg:'ok',
    // nombre,
    // usuario:req.usuario.id
    categoria,
  });
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    msg: categoria,
  });
};

const borrarCategoria = async (req, res=response) => {
    const {id} =req.params

    const categoriaBorrada= await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json(categoriaBorrada)
};

export {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
