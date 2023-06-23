var loginForm = document.getElementById("login-form");
var adminContent = document.getElementById("admin-content");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "anthony" && password === "123") {
    loginForm.style.display = "none";
    adminContent.style.display = "block";
    cargarItems();
  } else {
    alert("Credenciales de inicio de sesión incorrectas");
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});

function agregarItem() {
  var titulo = document.getElementById("titulo").value;
  var imagen = document.getElementById("imagen").files[0];
  var descripcion = document.getElementById("descripcion").value;

  var newItem = {
    titulo: titulo,
    imagen: "",
    descripcion: descripcion,
  };

  if (imagen) {
    newItem.imagen = imagen.name;
    guardarImagenLocal(imagen);
  }

  var storedItems = JSON.parse(localStorage.getItem("items")) || [];
  storedItems.push(newItem);
  localStorage.setItem("items", JSON.stringify(storedItems));

  appendItemToList(newItem);
  clearFormFields();
}

function appendItemToList(item) {
  console.log("Agregando item a la lista:", item);
  var listaItem = document.createElement("li");

  var elementoTitulo = document.createElement("h2");
  elementoTitulo.textContent = item.titulo;

  var elementoImagen = document.createElement("img");
  elementoImagen.src = obtenerImagenLocal(item.imagen) || elementoImagen.src;
  elementoImagen.alt = item.titulo;

  var elementoDescripcion = document.createElement("p");
  elementoDescripcion.textContent = item.descripcion;

  var botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.id = "btn-eliminar";
  botonEliminar.addEventListener("click", function () {
    eliminarItem(item);
  });

  var botonModificar = document.createElement("button");
  botonModificar.textContent = "Modificar";
  botonModificar.id = "btn-modificar";
  botonModificar.addEventListener("click", function () {
    modificarItem(item);
  });

  listaItem.appendChild(elementoTitulo);
  listaItem.appendChild(elementoImagen);
  listaItem.appendChild(elementoDescripcion);
  listaItem.appendChild(botonEliminar);
  listaItem.appendChild(botonModificar);

  document.getElementById("lista-items").appendChild(listaItem);
}

function modificarItem(item) {
  var formularioModificar = document.getElementById("modificar-form");
  var tituloModificar = document.getElementById("titulo-modificar");
  var imagenModificar = document.getElementById("imagen-modificar");
  var descripcionModificar = document.getElementById("descripcion-modificar");
  var guardarCambios = document.getElementById("guardar-cambios");

  tituloModificar.value = item.titulo;
  descripcionModificar.value = item.descripcion;

  document.getElementById("item-form").style.display = "none";
  formularioModificar.style.display = "block";

  guardarCambios.onclick = function () {
    var nuevoTitulo = tituloModificar.value;
    var nuevaImagen = imagenModificar.files[0];
    var nuevaDescripcion = descripcionModificar.value;

    var storedItems = JSON.parse(localStorage.getItem("items")) || [];

    var index = storedItems.findIndex(function (el) {
      return (
        el.titulo === item.titulo &&
        el.imagen === item.imagen &&
        el.descripcion === item.descripcion
      );
    });

    if (index > -1) {
      storedItems[index].titulo = nuevoTitulo;
      storedItems[index].descripcion = nuevaDescripcion;

      if (nuevaImagen) {
        storedItems[index].imagen = nuevaImagen.name;
        guardarImagenLocal(nuevaImagen);
      }

      localStorage.setItem("items", JSON.stringify(storedItems));

      limpiarListaItems();
      storedItems.forEach(function (item) {
        appendItemToList(item);
      });

      formularioModificar.reset();
      formularioModificar.style.display = "none";
      document.getElementById("item-form").style.display = "block";
    }
  };
}

function guardarImagenLocal(imagen) {
  var reader = new FileReader();

  reader.onload = function (event) {
    localStorage.setItem(imagen.name, event.target.result);
  };

  reader.readAsDataURL(imagen);
}

function obtenerImagenLocal(nombreImagen) {
  return localStorage.getItem(nombreImagen);
}

function eliminarItem(item) {
  var storedItems = JSON.parse(localStorage.getItem("items")) || [];
  var filteredItems = storedItems.filter(function (el) {
    return (
      el.titulo !== item.titulo ||
      el.imagen !== item.imagen ||
      el.descripcion !== item.descripcion
    );
  });

  localStorage.setItem("items", JSON.stringify(filteredItems));
  limpiarListaItems();
  filteredItems.forEach(function (item) {
    appendItemToList(item);
  });
}

function limpiarListaItems() {
  console.log("Limpiando lista de items");
  var listaItems = document.getElementById("lista-items");
  listaItems.innerHTML = "";
}

function clearFormFields() {
  document.getElementById("titulo").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("descripcion").value = "";
}

function cargarItems() {
  var storedItems = JSON.parse(localStorage.getItem("items")) || [];
  var listaItems = document.getElementById("lista-items");

  storedItems.forEach(function (item) {
    var listItem = document.createElement("li");

    var elementoTitulo = document.createElement("h2");
    elementoTitulo.textContent = item.titulo;

    var elementoImagen = document.createElement("img");
    elementoImagen.src = obtenerImagenLocal(item.imagen) || elementoImagen.src;
    elementoImagen.alt = item.titulo;

    var elementoDescripcion = document.createElement("p");
    elementoDescripcion.textContent = item.descripcion;

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function () {
      eliminarItem(item);
    });

    var botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar";
    botonModificar.addEventListener("click", function () {
      modificarItem(item);
    });

    listItem.appendChild(elementoTitulo);
    listItem.appendChild(elementoImagen);
    listItem.appendChild(elementoDescripcion);
    listItem.appendChild(botonEliminar);
    listItem.appendChild(botonModificar);

    listaItems.appendChild(listItem);
  });
}
