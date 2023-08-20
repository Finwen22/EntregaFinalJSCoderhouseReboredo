let carrito = [];

const productoContenedor = document.getElementById("producto-contenedor");

productoContenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar')) {
    validarProductoEnCarrito(e.target.id);
  }
});

const validarProductoEnCarrito = (id) => {
  const producto = productos.find(producto => producto.id == id);
  if (!producto) {
    return;
  }

  if (producto.cantidad <= 0) {
    mostrarMensajeSinStock();
    return;
  }

  const estaRepetido = carrito.some(productoEnCarrito => productoEnCarrito.id == id);

  if (!estaRepetido) {
    carrito.push({ ...producto, cantidad: 1 });
    pintarProductoCarrito(producto);
    actualizarTotalesCarrito(carrito);
  } else {
    const productoEnCarrito = carrito.find(productoEnCarrito => productoEnCarrito.id == id);
    productoEnCarrito.cantidad++;
    const cantidadElement = document.getElementById(`cantidad${productoEnCarrito.id}`);
    cantidadElement.innerText = `Cantidad: ${productoEnCarrito.cantidad}`;
    actualizarTotalesCarrito(carrito);
  }
};

const mostrarMensajeSinStock = () => {
  Swal.fire({
    icon: 'error',
    title: 'No hay stock disponible',
    text: 'Lo lamentamos, en este momento no tenemos stock de este artículo.',
  });
};

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor');
  const div = document.createElement('div');
  div.classList.add('productoEnCarrito');

  div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `;
  contenedor.appendChild(div);
};

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById('carrito-contenedor')

  contenedor.innerHTML = ''

  carrito.forEach(producto => {
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')

    div.innerHTML = `
      <p>${producto.nombre}</p>
      <p>$ ${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
  });
}

const eliminarProductoCarrito = (id) => {
  const productoIndex = carrito.findIndex(producto => producto.id == id)
  carrito.splice(productoIndex, 1)
  pintarCarrito(carrito)
  actualizarTotalesCarrito(carrito)
}

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  pintarTotalesCarrito(totalCantidad, totalCompra)
  guardarCarritoStorage(carrito)
}

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById('contador-carrito')
  const precioTotal = document.getElementById('precio-total')

  contadorCarrito.innerText = totalCantidad
  precioTotal.innerText = totalCompra
}

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
  return carritoStorage
}

const cargarCarrito = () => {
  if (localStorage.getItem('carrito')) {
    carrito = obtenerCarritoStorage()
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
  }
}