import express from "express";
import dotenv from "dotenv";
import { __dirName } from "../utils.js";
import cors from 'cors'
import { router } from "../../routes/user.js";

dotenv.config({ path: "../.env" });



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT_0;
    this.usuariosPath='/api/usuarios'

    this.middlewares();

    this.routes();
  }

  middlewares() {

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static("./public"));
  }

  routes() {
   
    this.app.use(this.usuariosPath, router)

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} `);
    });
  }
}

export { Server };
