// Seleccionamos todos los elementos con la clase 'agujero' (los huecos donde aparece el topo)
const agujeros = document.querySelectorAll('.agujero');

// Seleccionamos el span donde se mostrará la puntuación
const puntuacionSpan = document.getElementById('puntuacion');

// Seleccionamos el span del cronómetro
const cronometroSpan = document.getElementById('cronometro');

// Seleccionamos el botón de inicio
const botonInicio = document.getElementById('boton-inicio');

// Seleccionamos el modal (ventana emergente) con las instrucciones
const manualModal = document.getElementById('manual-juego');

// Seleccionamos el botón para cerrar el manual
const cerrarManualBtn = document.getElementById('cerrar-manual');

// Seleccionamos el audio de la música durante el juego
const musicaJuego = document.getElementById('musica-juego');

// Seleccionamos el audio del golpe al topo
const sonidoGolpe = document.getElementById('sonido-golpe');

// Seleccionamos el modal que aparece al finalizar el juego
const modalFinJuego = document.getElementById('modal-fin-juego');

// Seleccionamos el span donde se mostrará la puntuación final
const puntuacionFinalSpan = document.getElementById('puntuacion-final');

// Seleccionamos el botón de reinicio dentro del modal
const reiniciarBtn = document.getElementById('reiniciar-juego');

// Seleccionamos la música del fin del juego
const musicaFinJuego = document.getElementById('musica-fin-juego');

// Seleccionamos el sonido que se reproduce al presionar botones
const sonidoBoton = document.getElementById('sonido-boton');

// Variables de control del juego
let puntuacion = 0;                // Almacena la puntuación actual
let ultimoAgujero;                 // Guarda el último agujero usado para no repetir
let tiempoJuegoTerminado = false;  // Indica si el juego ya terminó
let tiempoRestante = 30;           // Tiempo del cronómetro (20 segundos)
let cronometroInterval;            // Referencia al intervalo del cronómetro

// ---------------- FUNCIONES -----------------

// Función que elige un agujero al azar
function elegirAgujeroAlAzar(agujeros) {
    const idx = Math.floor(Math.random() * agujeros.length); // índice aleatorio
    const agujero = agujeros[idx]; // agujero elegido
    if (agujero === ultimoAgujero) { // evita repetir el mismo agujero
        return elegirAgujeroAlAzar(agujeros);
    }
    ultimoAgujero = agujero; // guardamos el último agujero usado
    return agujero;
}

// Función que genera un tiempo aleatorio entre un mínimo y un máximo
function tiempoAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Función que hace aparecer y desaparecer un topo
function mostrarTopo() {
    const tiempo = tiempoAleatorio(500, 1500); // tiempo visible del topo
    const agujero = elegirAgujeroAlAzar(agujeros); // agujero al azar
      
    agujero.classList.add('visible'); // se hace visible el topo
      
    setTimeout(() => {
        agujero.classList.remove('visible'); // el topo desaparece
        if (!tiempoJuegoTerminado) { // si el juego sigue activo
            mostrarTopo(); // vuelve a mostrar otro topo
        }
    }, tiempo);
}

// Función que inicia el cronómetro
function iniciarCronometro() {
    cronometroInterval = setInterval(() => {
        tiempoRestante--; // resta 1 segundo
        cronometroSpan.textContent = tiempoRestante; // muestra el tiempo en pantalla
        if (tiempoRestante <= 0) { // si llega a cero
            clearInterval(cronometroInterval); // detiene el cronómetro
            finalizarJuego(); // se termina el juego
        }
    }, 1000); // cada 1 segundo
}

// Función principal para iniciar el juego
function iniciarJuego() {
    manualModal.style.display = 'none'; // oculta el manual
    modalFinJuego.style.display = 'none'; // oculta el modal de fin de juego
    botonInicio.style.display = 'none'; // oculta el botón de inicio
    
    puntuacion = 0; // reinicia puntuación
    puntuacionSpan.textContent = puntuacion; // la muestra en pantalla
    tiempoJuegoTerminado = false; // habilita el juego
    tiempoRestante = 30; // reinicia cronómetro
    cronometroSpan.textContent = tiempoRestante;

    musicaJuego.currentTime = 0; // reinicia la música
    musicaJuego.play(); // comienza la música
    musicaFinJuego.pause(); // detiene música de fin
    
    mostrarTopo(); // muestra el primer topo
    iniciarCronometro(); // inicia el cronómetro
}

// Función que finaliza el juego
function finalizarJuego() {
    tiempoJuegoTerminado = true; // marca el juego como terminado
    musicaJuego.pause(); // pausa la música del juego
    
    agujeros.forEach(agujero => agujero.classList.remove('visible')); // oculta topos
    
    setTimeout(() => {
        puntuacionFinalSpan.textContent = puntuacion; // muestra la puntuación final
        modalFinJuego.style.display = 'flex'; // muestra el modal de fin
        musicaFinJuego.play(); // reproduce música de fin
    }, 500); 
}

// Función que detecta cuando se golpea un topo
function golpearTopo(e) {
    // Si el topo no es visible o el juego terminó, no hace nada
    if (!e.target.parentElement.classList.contains('visible') || tiempoJuegoTerminado) return;
    
    puntuacion++; // suma un punto
    puntuacionSpan.textContent = puntuacion; // actualiza en pantalla
    sonidoGolpe.currentTime = 0; // reinicia sonido
    sonidoGolpe.play(); // reproduce sonido de golpe
    
    const agujero = e.target.parentElement; // agujero golpeado
    const explosion = document.createElement('div'); // crea la animación de explosión
    explosion.className = 'explosion';
    agujero.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove(); // elimina la explosión después de 300ms
    }, 300);
    
    e.target.parentElement.classList.remove('visible'); // el topo desaparece
}

// Función para reproducir el sonido al presionar botones
function reproducirSonidoBoton() {
    sonidoBoton.currentTime = 0; 
    sonidoBoton.play();
}

// ---------------- EVENT LISTENERS -----------------

// Escucha los clics en cada agujero (golpear topo)
agujeros.forEach(agujero => agujero.addEventListener('click', golpearTopo));

// Cuando se hace clic en "Iniciar Juego", se muestra el manual
botonInicio.addEventListener('click', () => {
    reproducirSonidoBoton(); 
    manualModal.style.display = 'flex';
});

// Cuando se hace clic en "Entendido", inicia el juego
cerrarManualBtn.addEventListener('click', () => {
    reproducirSonidoBoton(); 
    manualModal.style.display = 'none';
    iniciarJuego();
});

// Cuando se hace clic en "Jugar de nuevo", reinicia el juego
reiniciarBtn.addEventListener('click', () => {
    reproducirSonidoBoton();
    iniciarJuego();
});
