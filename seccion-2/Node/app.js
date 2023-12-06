// let nombre = "enzo";

// const saludar = (nombre) => {
//   return `saludo ${nombre}`;
// };
// console.log(saludar(nombre));

// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️

// console.log("inicio de programa");

// setTimeout(() => {
//   console.log("primero");
// }, 3000);

// setTimeout(() => {
//   console.log("segundo");
// }, 0);

// setTimeout(() => {
//   console.log("tercero");
// }, 0);

// console.log("fin de programa");

// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️

const num = null;

const empleado = () => {
  return new Promise((res, rej) => {
    num ? res(num) : rej(false);
  });
};

empleado().then((resp) => console.log(resp))
.catch(err=>console.log(err))

// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
