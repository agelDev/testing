// Variables
const carrito = document.querySelector("#carrito");
const cursos = document.getElementById("lista-cursos");
let infoCarrito = obtenerLocalStorage();
console.log(infoCarrito);

if (infoCarrito.length > 0) rellenarCarrito();

// Event Listeners

cursos.addEventListener("click", agregarCurso);
carrito.addEventListener("click", borrarCarrito);

// Funciones

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("button")) {
    agregarLocalStorage(e.target.parentElement);
  }
}

function obtenerLocalStorage() {
  if (JSON.parse(localStorage.getItem("carrito")) !== null) {
    return JSON.parse(localStorage.getItem("carrito"));
  } else {
    return [];
  }
}

function agregarLocalStorage(contenedor) {
  const curso = leerCurso(contenedor);
  console.log(curso);
  if (curso !== 0) {
    insertarCarrito(curso);
    mostrarMensaje("Curso Guradado");

    infoCarrito.push(curso);
    localStorage.setItem("carrito", JSON.stringify(infoCarrito));
  }
}

function leerCurso(curso) {
  let info = {
    img: curso.parentElement.querySelector("img").src,
    nombre: curso.querySelector("h4").innerText,
    precio: curso.querySelector(".precio span").innerText,
    id: curso.querySelector("a").getAttribute("data-id"),
  };
  infoCarrito.forEach((elemento) => {
    if (elemento.id === info.id) {
      info = 0;
    }
  });

  return info;
}

function rellenarCarrito() {
  infoCarrito.forEach((info) => {
    console.log(info.id + " ha sido agregado");
    insertarCarrito(info);
  });
}

function insertarCarrito(info) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
        <img src="${info.img}">
    </td>
    <td>
        ${info.nombre}
    </td>
    <td>
        ${info.precio}
    </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${info.id}">X</a>
    </td>
    `;
  carrito.querySelector("tbody").appendChild(tr);
}

function borrarCarrito(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    eliminarLocalStorage(e.target.getAttribute("data-id"));
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains("button")) {
    carrito.querySelector("tbody").innerText = "";
    infoCarrito = [];
    localStorage.setItem("carrito", JSON.stringify(infoCarrito));
  }
}

function eliminarLocalStorage(id) {
  infoCarrito.forEach((e, index) => {
    if (e.id === id) {
      infoCarrito.splice(index, 1);
    }
  });
  localStorage.setItem("carrito", JSON.stringify(infoCarrito));
}

function mostrarMensaje(texto) {
  let mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.innerText = texto;

  document.querySelector("body").appendChild(mensaje);
  setTimeout(function () {
    salidaMensaje(mensaje);
  }, 2000);
}

function salidaMensaje(mensaje) {
  mensaje.remove();
}
