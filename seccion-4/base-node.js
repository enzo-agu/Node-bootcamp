const fs = require("fs");
const { crearArchivo } = require("./helpers/multiplicar");
const argv=require('../config/yargs')
const colors = require('colors')
const base = 5;
crearArchivo(argv.b, argv.l, argv.h).then(
    archivo=>console.log('CREADO',archivo.bgGreen)
)

// fs.writeFile( 'tabla.txt',salida, (err)=>{
//     if(err) throw err
//     console.log('creado')
// }  )

// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇
// fs.writeFile("tabla.json", JSON.stringify(array), null , (err) => {
//   console.log("creado");
// });

