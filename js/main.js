// Objeto para almacenar reservas
let reservas = [];

// Función para realizar una reserva y notificar por HTML
function hacerReservaHTML(event) {
    event.preventDefault(); // Evita que se envíe el formulario y recargue la página

    let nombre = document.getElementById('nombreInput').value;
    let fecha = document.getElementById('fechaInput').value;
    let hora = document.getElementById('horaInput').value;
    let personas = document.getElementById('personasInput').value;

    // Verificar si ya existe una reserva para la misma fecha y hora
    const reservaExistente = reservas.find(reserva => reserva.fecha === fecha && reserva.hora === hora);

    if (reservaExistente) {
        document.getElementById('resultadoReservas').innerHTML = "¡Lo siento, esa fecha y hora ya están ocupadas!";
    } else {
        // Crear un objeto reserva
        let reserva = {
            nombre: nombre,
            fecha: fecha,
            hora: hora,
            personas: personas
        };

        // Agregar la reserva al array
        reservas.push(reserva);

        // Mostrar mensaje en HTML
        document.getElementById('resultadoReservas').innerHTML = "Reserva realizada con éxito. Gracias, " + nombre + "!";
    }
}

// Función para mostrar todas las reservas en HTML
function mostrarReservasHTML() {
    let resultadoHTML = "";

    if (reservas.length === 0) {
        resultadoHTML = "No hay reservas registradas.";
    } else {
        resultadoHTML = "<h2>Reservas:</h2>";
        for (let i = 0; i < reservas.length; i++) {
            resultadoHTML += "<p>Nombre: " + reservas[i].nombre +
                            "<br>Fecha: " + reservas[i].fecha +
                            "<br>Hora: " + reservas[i].hora +
                            "<br>Personas: " + reservas[i].personas + "</p>";
        }
    }

    // Mostrar resultado en HTML
    document.getElementById('resultadoReservas').innerHTML = resultadoHTML;
}

