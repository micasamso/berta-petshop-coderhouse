class Producto{
    constructor(nombre, codigo, precio, detalle, imagen, cantidad = 1){
        this.nombre = nombre;
        this.codigo = parseInt(codigo);
        this.precio = parseFloat(precio);
        this.detalle = detalle;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }

    agregarUno() {
        console.log('Agrego uno')
        this.cantidad++
        localStorage.setItem(this.codigo, JSON.stringify(this))
    }

    restarUno() {
        console.log('Resto uno')
        this.cantidad = Math.max(this.cantidad - 1, 1)
        localStorage.setItem(this.codigo, JSON.stringify(this))
    }

}