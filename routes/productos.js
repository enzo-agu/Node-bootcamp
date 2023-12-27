import { check } from "express-validator";
// import { body } from "express-validator";
import { Router } from "express";
// import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } from "../controllers/productos.js";
import { existeCategoriaPorId, existeProductoPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routerProducts = Router();

// TODAS LAS CATEGORIAS 👇
routerProducts.get("/", obtenerProductos);

// UNA CATEGORIA 👇
routerProducts.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo válido")
      .isMongoId()
      .bail()
      .custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// CREAR CATEGORIA 👇
routerProducts.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('categoria', 'No es un ID de MONGO').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// ACTUALLIZAR
routerProducts.put(
  "/:id",
  [
    validarJWT,
    // check('categoria', 'No es un ID de MONGO').isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// BORRAR CATEGORIA-ADMIN
routerProducts.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID de Mongo válido")
      .isMongoId()
      .bail()
      .custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

export { routerProducts };
