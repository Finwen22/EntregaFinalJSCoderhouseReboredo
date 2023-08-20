const pintarProductos = (data) => {
  const contenedor = document.getElementById("producto-contenedor");
  contenedor.innerHTML = '';

  data.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <div class="card-image">
        <img src=${producto.imagen}>
        <span class="card-title">${producto.nombre}</span>
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
      </div>
      <div class="card-content">
        <p>${producto.desc}</p>
        <p>$${producto.precio}</p>
      </div>
    `;
    contenedor.appendChild(div);
  });
};

const mostrarPopupPromocion = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Swal.fire({
        title: "¡Promoción Especial!",
        text: "Comprando en la próxima hora, tienes envío gratuito.",
        icon: "info"
      }).then(() => {
        resolve(); 
      });
    }, 5000); 
  });
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarPopupPromocion().then(() => {
    console.log("El usuario cerró el popup de promoción");
  });

  obtenerDatosProductos().then((data) => {
    pintarProductos(data);
  });
});

const obtenerDatosProductos = () => {
  const apiUrl = "../data/productos.json"; 
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      return data; 
    })
    .catch(error => {
      console.error("Error al obtener datos de productos:", error);
    });
};
