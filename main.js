const arrayProductos = [];
const arrayCarrito = [];


// Objeto producto

class Producto{
    constructor(nombre, codigo, precio, detalle, imagen){
        this.nombre = nombre;
        this.codigo = parseInt(codigo);
        this.precio = parseFloat(precio);
        this.detalle = detalle;
        this.imagen = imagen;
        this.disponible = true;
    }
}


// Arreglo producto

const producto1 = new Producto ("Old Prince", 1, 6820, "Alimento Old Prince Novel Cordero y Arroz Perro Adulto Mediano Y Grande - 15 Kg", "../imagenes/alimento1.png");
const producto2 = new Producto ("Eukanuba", 2, 8545, "Alimento Eukanuba para Perro Adulto Raza Mediana - 15 Kg", "../imagenes/alimento2.png");
const producto3 = new Producto ("Royal canin", 3, 6040, "Alimento Royal Canin para Perro Mini Adulto - 7.5 Kg", "../imagenes/alimento3.png");
const producto4 = new Producto ("Excellent", 4, 7060, "Alimento Excellent para Perro Adulto Mediano y Grande - 20 Kg", "../imagenes/alimento4.png");
const producto5 = new Producto ("Pelota Dental", 5, 880, "Pelota Dental Rugby Celeste",  "../imagenes/accesorios1.png");
const producto6 = new Producto ("Pelota Kong", 6, 1500, "Pelota Kong Duramax - S",  "../imagenes/accesorios2.png");
const producto7 = new Producto ("Manta", 7, 2500, "Manta Huella Angostura Verde Militar",  "../imagenes/accesorios3.png")
const producto8 = new Producto ("Pelota Dental", 8, 650, "Pelota Dental Puppis Baseball Verde",  "../imagenes/accesorios4.png" )

arrayProductos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8);


for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let productoObtenido = localStorage.getItem(clave);
    // console.log(productoObtenido);
    productoObtenido = JSON.parse(productoObtenido);
    arrayCarrito.push(productoObtenido);
}

function agregarAlCarrito(codigo) {
    let productoAAgregar = arrayProductos.find(producto => producto.codigo == codigo)
    arrayCarrito.push(productoAAgregar);
    localStorage.setItem(productoAAgregar.codigo, JSON.stringify(productoAAgregar))
    console.log(arrayCarrito);
    Swal.fire({
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        title: 'Producto agregado',
        timer: 1500
        })
}


window.addEventListener('DOMContentLoaded', (event) => {
    for(let producto of arrayProductos){
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
    }
});