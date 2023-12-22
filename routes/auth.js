import { check } from "express-validator";
import { body } from "express-validator";
import { Router } from "express";
import { login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    check("correo", "El correo es obligatorio 🔴🔴").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
),
  validarCampos;
export { routerAuth };
