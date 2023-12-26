// Objeto para almacenar reservas
let reservas = [];

// Función para realizar una reserva
function hacerReserva() {
    let nombre = prompt("Ingrese su nombre:");
    let fecha = prompt("Ingrese la fecha de la reserva (DD/MM/YYYY):");
    let hora = prompt("Ingrese la hora de la reserva:");
    let personas = prompt("Ingrese el número de personas:");

    // Crear un objeto reserva
    let reserva = {
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        personas: personas
    };

    // Agregar la reserva al array
    reservas.push(reserva);

    alert("Reserva realizada con éxito. Gracias, " + nombre + "!");
}

// Función para mostrar todas las reservas
function mostrarReservas() {
    if (reservas.length === 0) {
        alert("No hay reservas registradas.");
    } else {
        let mensaje = "Reservas:\n";
        for (let i = 0; i < reservas.length; i++) {
            mensaje += "\nNombre: " + reservas[i].nombre +
                       "\nFecha: " + reservas[i].fecha +
                       "\nHora: " + reservas[i].hora +
                       "\nPersonas: " + reservas[i].personas + "\n";
        }
        alert(mensaje);
    }
}

// Función para buscar una reserva por nombre
function buscarReservaPorNombre() {
    let nombreBuscado = prompt("Ingrese el nombre a buscar:");
    let reservasEncontradas = reservas.filter(function(reserva) {
        return reserva.nombre.toLowerCase() === nombreBuscado.toLowerCase();
    });

    if (reservasEncontradas.length === 0) {
        alert("No se encontraron reservas para " + nombreBuscado);
    } else {
        let mensaje = "Reservas encontradas para " + nombreBuscado + ":\n";
        for (let i = 0; i < reservasEncontradas.length; i++) {
            mensaje += "\nFecha: " + reservasEncontradas[i].fecha +
                       "\nHora: " + reservasEncontradas[i].hora +
                       "\nPersonas: " + reservasEncontradas[i].personas + "\n";
        }
        alert(mensaje);
    }
}

// Variable booleana para controlar el bucle
let continuar = true;

// Menú de opciones
while (continuar) {
    let opcion = prompt("Seleccione una opción:\n1. Hacer una reserva\n2. Mostrar todas las reservas\n3. Buscar reserva por nombre\n4. Salir");

    switch (opcion) {
        case "1":
            hacerReserva();
            break;
        case "2":
            mostrarReservas();
            break;
        case "3":
            buscarReservaPorNombre();
            break;
        case "4":
            alert("¡Gracias por utilizar el sistema de reservas!");
            // Cambiar el valor de continuar para salir del bucle
            continuar = false;
            break;
        default:
            alert("Opción no válida. Por favor, seleccione una opción válida.");
    }
}