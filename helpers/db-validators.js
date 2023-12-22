import Role from "../seccion-9-10/models/role.js";
import Usuario from "../seccion-9-10/models/usuario.js";

const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error (`El rol ${rol} no esta registrado en la BD`)
    }
  }

  export const existeCorreo = async (correo = "")=>{
    const existeCorreo= await Usuario.findOne({correo})
  if(existeCorreo){
    throw new Error(`Correo ${correo} existente en DB`)
  }
  }

  export const existeUsuarioPorId = async (id = "")=>{
    const existeUsuario= await Usuario.findById(id)
  if(!existeUsuario){
    throw new Error(`ID ${id} no existe`)
  }
  }

  export {esRoleValido}