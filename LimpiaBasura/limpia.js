// ==== Configuración inicial ====
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ancho = canvas.width = window.innerWidth * 0.9;
let alto = canvas.height = window.innerHeight * 0.7;

let basuras = [];
let puntaje = 0;
let puntajeMaximo = 0;
let fallos = 0;
let dificultad = 2000;
let tiempoJuego = 0;
let intervaloBasura;
let intervaloDificultad;
let intervaloTiempo;
let basureroVibrando = false;

const puntajeText = document.getElementById("puntaje");
const fallosText = document.getElementById("fallos");
const tiempoText = document.getElementById("tiempo");
const recordText = document.getElementById("record");

const mensajeFinal = document.getElementById("mensajeFinal");
const detalleFinal = document.getElementById("detalleFinal");
const recordFinal = document.getElementById("recordFinal");

window.addEventListener("resize", () => {
  ancho = canvas.width = window.innerWidth * 0.9;
  alto = canvas.height = window.innerHeight * 0.7;
});

const emojisBasura = ["🍌", "🍾", "🛍️", "🥤", "🍟", "🧃", "🥡"];
const fondoImg = new Image();
fondoImg.src = "fondo.jpg";

// ==== Crear basura ====
function crearBasura() {
  const basura = {
    x: Math.random() * (ancho - 50),
    y: 0,
    velocidad: 2 + (2000 - dificultad) / 200,
    size: 35,
    emoji: emojisBasura[Math.floor(Math.random() * emojisBasura.length)]
  };
  basuras.push(basura);
}

// ==== Dibujar ====
function dibujar() {
  ctx.drawImage(fondoImg, 0, 0, ancho, alto);
  
  basuras.forEach(b => {
    b.size += 0.05;
    ctx.font = b.size + "px Arial";
    ctx.fillText(b.emoji, b.x, b.y);
    b.y += b.velocidad;

    if (b.y > alto - b.size) {
      if (fallos < 5) fallos++;
      basuras = basuras.filter(obj => obj !== b);
      if (fallos >= 5) terminarJuego();
    }
  });

  puntajeText.textContent = "Basuras recogidas: " + puntaje;
  fallosText.textContent = "Basuras perdidas: " + fallos + " / 5";
  tiempoText.textContent = "Tiempo: " + tiempoJuego + "s";
  recordText.textContent = "Record: " + puntajeMaximo;

  ctx.font = "50px Arial";
  if (basureroVibrando) {
    let offsetX = (Math.random() - 0.5) * 10;
    let offsetY = (Math.random() - 0.5) * 10;
    ctx.fillText("🗑️", ancho - 60 + offsetX, alto - 20 + offsetY);
  } else {
    ctx.fillText("🗑️", ancho - 60, alto - 20);
  }

  requestAnimationFrame(dibujar);
}

// ==== Click / Toque sobre basura ====
function detectarClick(x, y) {
  basuras.forEach(b => {
    if (x >= b.x && x <= b.x + b.size && y >= b.y - b.size && y <= b.y) {
      puntaje++;
      basuras = basuras.filter(obj => obj !== b);

      basureroVibrando = true;
      setTimeout(() => { basureroVibrando = false; }, 300);
    }
  });
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  detectarClick(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  detectarClick(touch.clientX - rect.left, touch.clientY - rect.top);
}, { passive: false });

// ==== Dificultad ====
function aumentarDificultad() {
  dificultad = Math.max(300, dificultad - 200);
  clearInterval(intervaloBasura);
  intervaloBasura = setInterval(crearBasura, dificultad);
  crearBasura();
}

// ==== Tiempo ====
function iniciarTiempo() {
  tiempoJuego = 0;
  intervaloTiempo = setInterval(() => { tiempoJuego++; }, 1000);
}

// ==== Juego ====
function iniciarJuego() {
  puntaje = 0;
  fallos = 0;
  dificultad = 2000;
  basuras = [];
  mensajeFinal.style.display = "none";

  intervaloBasura = setInterval(crearBasura, dificultad);
  intervaloDificultad = setInterval(aumentarDificultad, 15000);
  iniciarTiempo();
  dibujar();
}

function terminarJuego() {
  clearInterval(intervaloBasura);
  clearInterval(intervaloDificultad);
  clearInterval(intervaloTiempo);

  if (puntaje > puntajeMaximo) puntajeMaximo = puntaje;

  mensajeFinal.style.display = "flex";
  detalleFinal.textContent = `Basuras recogidas: ${puntaje}. Tiempo jugado: ${tiempoJuego}s.`;
  recordFinal.textContent = `Record: ${puntajeMaximo}`;
}

function reiniciarJuego() {
  iniciarJuego();
}

iniciarJuego();
