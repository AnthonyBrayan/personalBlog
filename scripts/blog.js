function cargarItemsEnPagina() {
    var storedItems = JSON.parse(localStorage.getItem("items")) || [];
    var listaItems = document.getElementById("lista-items-blog");
  
    storedItems.forEach(function(item) {
      var listItem = document.createElement("li");
  
      var tituloElement = document.createElement("h2");
      tituloElement.textContent = item.titulo;
  
      var imagenElement = document.createElement("img");
      imagenElement.src = obtenerImagenLocal(item.imagen) || "";
      imagenElement.alt = item.titulo;
  
      var descripcionElement = document.createElement("p");
      descripcionElement.textContent = item.descripcion;
  
      listItem.appendChild(tituloElement);
      listItem.appendChild(imagenElement);
      listItem.appendChild(descripcionElement);
  
      listaItems.appendChild(listItem);
    });
  }

  cargarItemsEnPagina();
