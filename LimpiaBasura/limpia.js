//-------------------------------------------------------------------------
//#EXPLICACION 1
  // ===== Selección del canvas y contexto =====
  const canvas = document.getElementById("gameCanvas"); // Selecciona el canvas del HTML
  const ctx = canvas.getContext("2d"); // Obtiene el contexto 2D para dibujar

  // ===== Ajuste inicial de tamaño =====
  let ancho = canvas.width = window.innerWidth * 0.9; // Ancho del canvas según ventana
  let alto = canvas.height = window.innerHeight * 0.7; // Alto del canvas según ventana


  // ===== Variables del juego =====
  let basuras = []; // Array que guarda todas las basuras
  let puntaje = 0; // Basuras recogidas
  let puntajeMaximo = 0; // Record histórico
  let fallos = 0; // Basuras perdidas
  let dificultad = 2000; // Intervalo en ms entre basuras
  let tiempoJuego = 0; // Tiempo transcurrido en segundos
  let intervaloBasura; // Timer para crear basuras
  let intervaloDificultad; // Timer para aumentar dificultad
  let intervaloTiempo; // Timer del tiempo transcurrido
  let basureroVibrando = false; //Vibracion del basurero
//-------------------------------------------------------------------------

// ===== Elementos HTML para mostrar stats =====
const puntajeText = document.getElementById("puntaje");
const fallosText = document.getElementById("fallos");
const tiempoText = document.getElementById("tiempo");
const recordText = document.getElementById("record");

const mensajeFinal = document.getElementById("mensajeFinal");
const detalleFinal = document.getElementById("detalleFinal");
const recordFinal = document.getElementById("recordFinal");

// ===== Responsive: ajustar canvas al cambiar tamaño de ventana =====
window.addEventListener("resize", () => {
  ancho = canvas.width = window.innerWidth * 0.9;
  alto = canvas.height = window.innerHeight * 0.7;
});

// ==================== Emojis de basura ====================
const emojisBasura = ["🍌", "🍾", "🛍️", "🥤", "🍟", "🧃", "🥡"];
//-------------------------------------------------------------------------
//#EXPLICACION 2
  // ===== Función para crear basura =====
  function crearBasura() {
    const basura = {
      x: Math.random() * (ancho - 50), // Posición horizontal aleatoria
      y: 0, // Inicia en la parte superior
      velocidad: 2 + (2000 - dificultad)/200, // Velocidad de caída
      size: 35, // Tamaño inicial
      emoji: emojisBasura[Math.floor(Math.random() * emojisBasura.length)]
    };
    basuras.push(basura); // Agrega la basura al array
  }
//-------------------------------------------------------------------------


// ===== Imagen de fondo =====
const fondoImg = new Image();
fondoImg.src = "fondo.jpg";

// ===== Función principal que dibuja y actualiza el juego =====
function dibujar() {
  // ==== Fondo con imagen ====
  ctx.drawImage(fondoImg, 0, 0, ancho, alto);
  
  // ===== Dibuja y mueve cada basura =====
  basuras.forEach(b => {
    b.size += 0.05; // Aumenta el tamaño mientras cae
    ctx.font = b.size + "px Arial"; // Establece tamaño y fuente
    ctx.fillText(b.emoji, b.x, b.y); // Dibuja el emoji
    b.y += b.velocidad; // Mueve hacia abajo
    
    // ===== Verifica si la basura tocó el suelo =====
    if(b.y > alto - b.size){ //se hace la resta con el tamaño para que se vea como la basura desaperece en el canvas, caso contrario no se veria
      if(fallos < 5) fallos++; // No suma más si llegó a 5
      basuras = basuras.filter(obj => obj !== b); // Elimina basura
      if(fallos >= 5) terminarJuego(); // Termina si se alcanzan 5 fallos
    }
  });

  // ===== Actualiza stats visibles fuera del canvas =====
  puntajeText.textContent = "Basuras recogidas: " + puntaje;
  fallosText.textContent = "Basuras perdidas: " + fallos + " / 5";
  tiempoText.textContent = "Tiempo: " + tiempoJuego + "s";
  recordText.textContent = "Record: " + puntajeMaximo;

  // === Dibujo del basurero con vibración ===
  ctx.font = "50px Arial";
  if (basureroVibrando) {
    let offsetX = (Math.random() - 0.5) * 10;
    let offsetY = (Math.random() - 0.5) * 10;
    ctx.fillText("🗑️", ancho - 60 + offsetX, alto - 20 + offsetY);
  } else {
    ctx.fillText("🗑️", ancho - 60, alto - 20);
  }

  requestAnimationFrame(dibujar); // Llama a dibujar de nuevo y funciona algo asi como un loop por eso es que no hay rastros de basura
}

// ===== Detecta click sobre basura =====
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect(); // Obtener posición relativa del canvas
  const mx = e.clientX - rect.left; // Coordenada X del click
  const my = e.clientY - rect.top; // Coordenada Y del click
  
  basuras.forEach(b => {
    if(mx >= b.x && mx <= b.x + b.size && my >= b.y - b.size && my <= b.y){
      puntaje++; // Aumenta puntaje si se clickea la basura
      basuras = basuras.filter(obj => obj !== b); // Elimina basura

      // === Activar vibración del basurero ===
      basureroVibrando = true;
      setTimeout(() => { basureroVibrando = false; }, 300);
    }
  });
});

//-------------------------------------------------------------------------
//#EXPLICACION 3
  // ===== Función para aumentar dificultad =====
  function aumentarDificultad() {
    dificultad = Math.max(300, dificultad - 200); // Reduce intervalo mínimo 300ms
    clearInterval(intervaloBasura); // Borramos el intervalo anterior de 2s por basura
    intervaloBasura = setInterval(crearBasura, dificultad); // Nuevo timer con nueva dificultad
    crearBasura(); // Genera una basura inmediatamente
  }
//-------------------------------------------------------------------------


// ===== Temporizador del juego =====
function iniciarTiempo() {
  tiempoJuego = 0;
  intervaloTiempo = setInterval(() => {tiempoJuego++; /*Aumenta tiempo cada segundo*/}, 1000);
}


//-------------------------------------------------------------------------
//#EXPLICACION 4
  // ===== Función para iniciar el juego =====
  function iniciarJuego() {
    puntaje = 0;
    fallos = 0;
    dificultad = 2000;
    basuras = [];
    mensajeFinal.style.display = "none"; // Oculta pantalla de derrota

    intervaloBasura = setInterval(crearBasura, dificultad); 
    intervaloDificultad = setInterval(aumentarDificultad, 15000); // Aumentar dificultad cada 15s
    iniciarTiempo(); // Inicia contador de tiempo
    dibujar(); // Empieza la animación
  }
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
//#EXPLICACION 5
// ===== Función para terminar el juego =====
  function terminarJuego() {
    clearInterval(intervaloBasura); // Detiene creación de basuras
    clearInterval(intervaloDificultad); // Detiene aumento de dificultad
    clearInterval(intervaloTiempo); // Detiene temporizador

    if(puntaje > puntajeMaximo) puntajeMaximo = puntaje; // Actualiza record

    mensajeFinal.style.display = "flex"; // Muestra pantalla de derrota
    detalleFinal.textContent = `Basuras recogidas: ${puntaje}. Tiempo jugado: ${tiempoJuego}s.`;
    recordFinal.textContent = `Record: ${puntajeMaximo}`; // Record en pantalla de derrota
  }

  // ===== Reiniciar juego =====
  function reiniciarJuego() {
    iniciarJuego(); // Llama a la función iniciarJuego() para volver a jugar el juego pero ya las estadisticas actualizadas
  }

  // ===== Inicio automático al cargar página =====
  iniciarJuego();
//-------------------------------------------------------------------------