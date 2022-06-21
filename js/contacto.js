// Cuando se envia la consulta se muestra un mensaje de confirmacion y se recarga la pagina
function enviarConsulta(){
    Swal.fire({
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        title: 'Consulta enviada',
        timer: 1500
        })
    
    setTimeout(() => {
        location.reload();
    }, 1500);
}