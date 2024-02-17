// Objeto para almacenar reservas
let reservas = [];

// Función para realizar una reserva y notificar por SweetAlert
function hacerReservaHTML(event) {
    event.preventDefault(); // Evita que se envíe el formulario y recargue la página

    let nombre = document.getElementById('nombreInput').value;
    let fecha = document.getElementById('fechaInput').value;
    let hora = document.getElementById('horaInput').value;
    let personasInput = document.getElementById('personasInput');
    let personas = parseInt(personasInput.value);

    // Validar que la fecha no sea anterior a la fecha actual
    let fechaActual = new Date();
    let fechaSeleccionada = new Date(fecha);
    if (fechaSeleccionada < fechaActual) {
        mostrarAlertaError("La fecha seleccionada ya ha pasado. Por favor, elige una fecha futura.");
        return; // Salir de la función si la validación falla
    }

    // Validar que la cantidad de personas sea un número positivo
    if (personas <= 0 || isNaN(personas)) {
        mostrarAlertaError("La cantidad de personas debe ser un número positivo.");
        return; // Salir de la función si la validación falla
    }

    // Verificar si ya existe una reserva para la misma fecha y hora
    const reservaExistente = reservas.find(reserva => reserva.fecha === fecha && reserva.hora === hora);

    if (reservaExistente) {
        mostrarAlertaError("Lo siento, esa fecha y hora ya están ocupadas!");
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

        // Guardamos las reservas en el localStorage
        localStorage.setItem('reservas', JSON.stringify(reservas));

        // Mostrar mensaje con SweetAlert
        mostrarAlertaExito(`Reserva realizada con éxito. Gracias, ${nombre}!`);
    }
}

// Función para mostrar una alerta de éxito con SweetAlert
function mostrarAlertaExito(mensaje) {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
    });
}

// Función para mostrar una alerta de error con SweetAlert
function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: mensaje,
    });
}

// Función para mostrar todas las reservas con SweetAlert
function mostrarReservasSweetAlert() {
    if (reservas.length === 0) {
        mostrarAlertaExito("No hay reservas registradas.");
    } else {
        for (let i = 0; i < reservas.length; i++) {
            mostrarAlertaReserva(reservas[i]);
        }
    }
}

// Función para mostrar una alerta de reserva con SweetAlert
function mostrarAlertaReserva(reserva) {
    Swal.fire({
        icon: 'info',
        title: 'Reserva',
        html: `<strong>Nombre:</strong> ${reserva.nombre}<br>` +
              `<strong>Fecha:</strong> ${reserva.fecha}<br>` +
              `<strong>Hora:</strong> ${reserva.hora}<br>` +
              `<strong>Personas:</strong> ${reserva.personas}`,
    });
}

// Objeto para almacenar posts
let posts = [];

// Función para cargar datos desde la API JSONPlaceholder
function cargarDatosDesdeAPI() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(datos => {
            posts = datos;
            mostrarDatosDesdeAPI(); // Llamar a la función para mostrar los datos
        })
        .catch(error => console.error('Error al cargar datos desde la API:', error));
}

// Función para mostrar posts en HTML
function mostrarDatosDesdeAPI() {
    const resultadoAPI = document.getElementById('resultadoAPI');

    if (posts.length === 0) {
        resultadoAPI.innerHTML = "No hay datos disponibles desde la API.";
    } else {
        const postsHTML = posts.map(generarPostHTML).join('');
        resultadoAPI.innerHTML = `<h2>Posts desde la API:</h2>${postsHTML}`;
    }
}

// Función para generar el HTML de cada post
function generarPostHTML(post) {
    return `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `;
}

// Ejecución de lógica al cargar la página
window.onload = function () {
    // Carga de reservas desde el localStorage al cargar la página
    const reservasGuardadas = localStorage.getItem('reservas');
    if (reservasGuardadas) {
        reservas = JSON.parse(reservasGuardadas);
        mostrarReservasHTML();
    }

    // Cargar datos desde la API al cargar la página
    cargarDatosDesdeAPI();
};

// Event listener para el formulario de reserva
document.getElementById('formularioReserva').addEventListener('submit', hacerReservaHTML);
