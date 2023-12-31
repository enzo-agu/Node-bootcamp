import Role from "../seccion-9-10/models/role.js";
import Usuario from "../seccion-9-10/models/usuario.js";
import Categoria from "../seccion-9-10/models/categoria.js";
import Producto from "../seccion-9-10/models/producto.js";

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

export const existeCorreo = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`Correo ${correo} existente en DB`);
  }
};

export const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`ID ${id} no existe`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

const coleccionesPermitidas = (coleccion='', colecciones=[])=>{

  const incluida= colecciones.includes(coleccion)
  if(!incluida){
    throw new Error (`La colección ${coleccion} no es permitida - ${colecciones} `)
  }

  return true

}

export { esRoleValido,existeCategoriaPorId, existeProductoPorId, coleccionesPermitidas };
