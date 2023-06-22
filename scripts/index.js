function cargarContenido(url, contenedor) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById(contenedor).innerHTML = xhr.responseText;
        if (contenedor === "container") {
          cargarAdmin();
          cargarBlog();
        }
      } else {
        console.error("Error al cargar el contenido: " + xhr.status);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function cargarAdmin() {
  var script = document.createElement("script");
  script.src = "scripts/admin.js";
  document.body.appendChild(script);
}

function cargarBlog() {
    var script = document.createElement("script");
    script.src = "scripts/blog.js";
    document.body.appendChild(script);
  }