document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosProductos().then((data) => {
    pintarProductos(data);
    cargarCarrito();
    });

    document.getElementById('btn-limpiar-carrito').addEventListener('click', () => {
    limpiarCarrito();
    });

    document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
    finalizarCompra();
    });
});


const finalizarCompra = () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    if (!nombre || !apellido || !correo || !telefono) {
    mostrarMensajeCamposIncompletos();
    } else if (carrito.length === 0) {
    mostrarMensajeCarritoVacio();
    } else {
    mostrarMensajeCompra();
    limpiarCarrito();
    limpiarFormulario();
    }
};

const mostrarMensajeCamposIncompletos = () => {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Por favor, complete sus datos',
    });
};

const mostrarMensajeCarritoVacio = () => {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Su carrito está vacío, por favor, seleccione los productos que desea',
    });
};

const mostrarMensajeCompra = () => {
    Swal.fire({
    icon: 'success',
    title: '¡Compra exitosa!',
    text: '¡Muchas gracias por su compra!',
    });
};

const limpiarCarrito = () => {
    carrito = [];
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

const limpiarFormulario = () => {
document.getElementById('nombre').value = '';
document.getElementById('apellido').value = '';
document.getElementById('correo').value = '';
document.getElementById('telefono').value = '';
};


