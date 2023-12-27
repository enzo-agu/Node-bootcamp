import { check } from "express-validator";
import { body } from "express-validator";
import { Router } from "express";
// import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
} from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routercategories = Router();

// TODAS LAS CATEGORIAS 👇
routercategories.get("/", obtenerCategorias);

// UNA CATEGORIA 👇
routercategories.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo válido")
      .isMongoId()
      .bail()
      .custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// CREAR CATEGORIA 👇
routercategories.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// ACTUALLIZAR
routercategories.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// BORRAR CATEGORIA-ADMIN
routercategories.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID de Mongo válido")
      .isMongoId()
      .bail()
      .custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

export { routercategories };
