import express from "express";
import dotenv from "dotenv";
import { __dirName } from "../utils.js";
import cors from 'cors'
import { router } from "../../routes/user.js";
import { dbConnection } from "../../db/configMongoose.js";
import { routerAuth } from "../../routes/auth.js";
import { routercategories } from "../../routes/categorias.js";
import { routerProducts } from "../../routes/productos.js";
import { routerBusqueda } from "../../routes/buscar.js";

dotenv.config({ path: "../.env" });



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT_0;
    this.usuariosPath='/api/usuarios'
    this.authPath='/api/auth';
    this.productos='/api/productos'
    this.categorias='/api/categorias'
    this.buscar='/api/buscar'

    this.conectarDB()

    this.middlewares();

    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares() {

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static("./public"));
  }

  routes() {

    this.app.use(this.authPath, routerAuth)
    this.app.use(this.usuariosPath, router)
    this.app.use(this.categorias, routercategories)
    this.app.use(this.productos, routerProducts)
    this.app.use(this.buscar, routerBusqueda)

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} `);
    });
  }
}

export { Server };
