const fs = require("fs");
require('colors')

let salida = "";
let consola=''
const crearArchivo = async (base = 3, listar=false, hasta=10) => {
  try {
    for (let index = 1; index <= hasta; index++) {
      salida += `${base} x ${index} = ${base * index} \n`;
      consola+= `${base} ${'x'.green} ${index} = ${base * index} \n`;

    }

    if(listar){
      console.log('===============')
      console.log('Tabla del ',base)
      console.log('===============')
      console.log(salida)

    }

    fs.writeFileSync(`../salida/tabla del ${base}.txt`, salida);

    return `tabla del ${base}.txt`


  } catch (error) {
    throw error
  }
};

module.exports = {
  crearArchivo,
};
