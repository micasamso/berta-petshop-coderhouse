//---------------------------VARIABLES----------------------------------------
const arrayProductos = [];
const arrayCarrito = [];

//---------------------------FUNCIONES----------------------------------------
// Funcion que devuelve true si el producto ya existe en el carrito
function existeEnElCarrito(codigoProducto){
    return localStorage.getItem(codigoProducto) != null
}

// Funcion para agregar un producto en el carrito
function agregarAlCarrito(codigo) {
    // Obtener producto segun el codigo
    const productoAAgregar = arrayProductos.find(producto => producto.codigo == codigo)

    // Si ya existe en el carrito le agrega una unidad y sino lo agrega al carrito por primera vez
    if (existeEnElCarrito(codigo)) {
        let productoEnCarrito = arrayCarrito.find(producto => producto.codigo == codigo)
        productoEnCarrito.agregarUno()
        localStorage.setItem(productoAAgregar.codigo, JSON.stringify(productoEnCarrito))
    } else {
        arrayCarrito.push(productoAAgregar);
        localStorage.setItem(productoAAgregar.codigo, JSON.stringify(productoAAgregar))
    }
    
    // Notificacion de que se agrego un producto al carrito correctamente
    Swal.fire({
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        title: 'Producto agregado',
        timer: 1500
        })
}


//---------------------------PROGRAMA----------------------------------------
//Obtenemos la lista de productos de productos.json y la guardamos en arrayProductos
fetch('../data/productos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(producto => {
            arrayProductos.push(new Producto(producto.nombre, producto.codigo, producto.precio, producto.detalle, producto.imagen));
        })
    })
    .catch(error => console.log(error))

//Obtenemos la lista de productos del carrito desde el LocalStorage y la guardamos en arrayCarrito
for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let productoObtenido = localStorage.getItem(clave);
    productoObtenido = JSON.parse(productoObtenido);
    arrayCarrito.push(new Producto(productoObtenido.nombre, productoObtenido.codigo, productoObtenido.precio, productoObtenido.detalle, productoObtenido.imagen, productoObtenido.cantidad));
}

//Pasado un tiempo para esperar que las promesas del fetch se resuelvan modelamos el DOM con los Cards de los productos en venta
setTimeout(() => {
    arrayProductos.forEach(producto => {
        let card = document.createElement("div");
        card.classList.add("col")
        card.innerHTML = `<img src='${producto.imagen}' class="card-img-top"  alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${producto.nombre}</h4>
                            <p class="card-text">${producto.detalle}</p>
                            <h4 class="precio-producto">$${producto.precio}</h4>
                        </div>
                        <div class="btn-comprar">
                        <button id="btnAgregar" onClick ="agregarAlCarrito(${producto.codigo})">Agregar</button>
                        </div>`
        document.getElementById('row-id').append(card);
    })
}, 500)