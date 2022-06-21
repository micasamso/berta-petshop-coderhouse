const arrayCarrito = []

//---------------------------FUNCIONES----------------------------------------

function borrarCarrito() {
    localStorage.clear()
    arrayCarrito.length = 0
    location.reload()
}

function borrarProducto(producto){
    localStorage.removeItem(producto.codigo)
    arrayCarrito.splice(arrayCarrito.indexOf(producto), 1)
}

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let productoObtenido = localStorage.getItem(clave);
    console.log(productoObtenido);
    productoObtenido = JSON.parse(productoObtenido);
    arrayCarrito.push(new Producto(productoObtenido.nombre, productoObtenido.codigo, productoObtenido.precio, productoObtenido.detalle, productoObtenido.imagen, productoObtenido.cantidad));
}

function agregarUnoEn(codigoProducto){
    let producto = arrayCarrito.find(producto => producto.codigo == codigoProducto)
    producto.agregarUno()
    localStorage.setItem(codigoProducto, JSON.stringify(producto))
    actualizarPrciosEnDOM(codigoProducto)
}

function restarUnoEn(codigoProducto){
    let producto = arrayCarrito.find(producto => producto.codigo == codigoProducto)
    producto.restarUno()
    localStorage.setItem(codigoProducto, JSON.stringify(producto))
    actualizarPrciosEnDOM(codigoProducto)
}

function borrarProducto(codigoProducto) {
    localStorage.removeItem(codigoProducto)
    location.reload()
}

function actualizarPrciosEnDOM(codigoProducto = 0){
    if(codigoProducto != 0){
        let cantidadP = document.querySelector(`#cantidad-${codigoProducto}`)
        cantidadP.innerHTML = arrayCarrito.find(producto => producto.codigo == codigoProducto).cantidad

        let precioP = document.querySelector(`#precio-${codigoProducto}`)
        precioP.innerHTML = `$${arrayCarrito.find(producto => producto.codigo == codigoProducto).precio * arrayCarrito.find(producto => producto.codigo == codigoProducto).cantidad}`
    }

    let precioTotalP = document.querySelector(`#total-price H3`)
    precioTotalP.innerHTML = `TOTAL: $${arrayCarrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0)}`
}

setTimeout(() => {
    actualizarPrciosEnDOM()

    arrayCarrito.forEach(producto => {
        let card = document.createElement("div")
        card.classList.add("card-carrito")
        console.log("Precio", producto.precio)
        console.log("Cantidad", producto.cantidad)
        
        card.innerHTML = `  <div class="card-content">
                                <img class="card-img" src='${producto.imagen}'>
                                <p>${producto.nombre}</p>
                                <div class="amount">
                                    <button class="float-left" onClick='restarUnoEn(${producto.codigo})'>-</button>
                                    <p id="cantidad-${producto.codigo}" class="float-left">${producto.cantidad}</p>
                                    <button class="float-left" onClick='agregarUnoEn(${producto.codigo})'>+</button>
                                </div>
                                <p id="precio-${producto.codigo}">$${producto.precio * producto.cantidad}</p>
                                <button class="boton-borrar" onclick="borrarProducto(${producto.codigo})">Borrar</button>
                            </div>`
        document.getElementById('carrito-cards').append(card);
    })

    let botonBorrarCarrito = document.createElement("div")
    botonBorrarCarrito.classList.add("boton-borrar-carrito")
    botonBorrarCarrito.innerHTML = `<button onclick="borrarCarrito()">Borrar carrito</button>`
    document.body.append(botonBorrarCarrito);
}, 500)