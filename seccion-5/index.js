import colors from "colors";
import {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  pausa,
} from "./helpers/inquirer.js";
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  // await pausa();

  do {
    opt = await inquirerMenu();
    // const tareas= new Tareas ()
    // const tarea=new Tarea('Comprar comida');
    // console.log(tarea)
    // tareas._listado[tarea.id]=tarea

    // console.log(tareas)

    switch (opt) {
      case "1":
        const desc = await leerInput("descripción: ");
        console.log(desc);
        tareas.crearTarea(desc);

        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids)
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Estas seguro");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("tarea borrada");
          }
        }
        break;

      default:
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
