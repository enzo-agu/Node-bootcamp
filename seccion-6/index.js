import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa,
} from "./helpers/inquirer.js";
import { Busqueda } from "./models/busqueda.js";
import colors from "colors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const main = async () => {
  const busquedas = new Busqueda();

  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad: ");

        const lugares = await busquedas.ciudad(termino);

        const id = await listarLugares(lugares);
        if (id==='0')continue

        const lugarSel = lugares.find((l) => l.id === id);

        busquedas.agregarHistorial(lugarSel.nombre)

        const clima= await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
        
        console.clear()
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ",lugarSel.nombre.green);
        console.log("Lat: ", lugarSel.lat);
        console.log("Lng: ", lugarSel.lng);
        console.log("Temperatura: ", clima.temp);
        console.log("Mínima", clima.min);
        console.log("Máxima",clima.max);
        console.log('Cómo esta el clima :', clima.desc.green)

        break;

        case 2:

        busquedas.historialCapitalizado.forEach((lugar,i)=>{
          const idx= `${i + 1}.`.green
          console.log(`${idx} ${lugar}`)
        })

        break

      default:
        break;
    }

    console.log({ opt });

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
