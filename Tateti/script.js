
const cells = Array.from(document.querySelectorAll('.cell'));
const boardEl = document.getElementById('board');
const startBtn =  document.getElementById('startBtn');
const resetBoardBtn = document.getElementById('resetBoardBtn');
const newGameBtn = document.getElementById('newGameBtn');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const nameXLabel = document.getElementById('nameX');
const nameOLabel = document.getElementById('nameO');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const statusEl = document.getElementById('status');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const overlayClose = document.getElementById('overlayClose');
const soundToggle = document.getElementById('soundToggle');

// --- estado del juego ---
let board = ['', '', '', '', '', '', '', '', '']; // 9 posiciones
const winCombos = [
  [0,1,2],[3,4,5],[6,7,8], // filas
  [0,3,6],[1,4,7],[2,5,8], // columnas
  [0,4,8],[2,4,6]          // diagonales
];

let currentPlayer = 'X';  // 'X' o 'O'
let gameOver = false;     // true cuando hay ganador o empate
let gameActive = false;   // true cuando el juego está iniciado
let scores = { X: 0, O: 0 };

// AudioContext para sonido 
let audioCtx = null;

// --- utilidades de audio: genera un sonido corto al ganar ---
function playWinSound() {
  if (!soundToggle.checked) return; // si está desactivado, no suena
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  const t = audioCtx.currentTime;
  // crear oscilador y envolvente simple (tono corto)
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.value = 880; // la
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.45);
  // segundo tono (para hacer pequeño acorde)
  const o2 = audioCtx.createOscillator();
  const g2 = audioCtx.createGain();
  o2.type = 'sine';
  o2.frequency.value = 1100;
  g2.gain.setValueAtTime(0.0001, t + 0.06);
  g2.gain.exponentialRampToValueAtTime(0.12, t + 0.08);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
  o2.connect(g2);
  g2.connect(audioCtx.destination);
  o2.start(t + 0.06);
  o2.stop(t + 0.5);
}

// --- actualizar interfaz ---
function updateScoreboard() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
}
function updateNamesOnUI() {
  const nameX = playerXInput.value.trim() || 'X';
  const nameO = playerOInput.value.trim() || 'O';
  nameXLabel.textContent = nameX;
  nameOLabel.textContent = nameO;
}
function setStatus(text) {
  statusEl.textContent = text;
}

// Maneja si el tablero acepta clicks (según gameActive y gameOver)
function updateBoardInteractivity() {
  if (gameActive && !gameOver) boardEl.style.pointerEvents = 'auto';
  else boardEl.style.pointerEvents = 'none';
}

// --- comprobación de ganador / empate ---
// Devuelve array combo si hay ganador, devuelve 'tie' si empate, o null si sigue
function checkForResult() {
  for (const combo of winCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo; // retorna la combinación ganadora
    }
  }
  // empate si no quedan casillas vacías
  if (!board.includes('')) return 'tie';
  return null; // sigue el juego
}

// --- pintar una jugada en la UI ---
function paintCell(index) {
  const cell = cells[index];
  cell.textContent = board[index];
  cell.classList.remove('x','o','win');
  if (board[index] === 'X') cell.classList.add('x');
  if (board[index] === 'O') cell.classList.add('o');
}

// --- manejar clic en celda ---
function handleCellClick(e) {
  if (!gameActive || gameOver) return;
  const idx = Number(e.currentTarget.dataset.index);
  if (board[idx]) return; // ya ocupada
  board[idx] = currentPlayer;
  paintCell(idx);

  const result = checkForResult();
  if (Array.isArray(result)) {
    // hay ganador
    gameOver = true;
    // animar las celdas ganadoras con efecto serpentina
    result.forEach((cellIndex, order) => {
      const el = cells[cellIndex];
      el.classList.add('win');
      // delay para efecto serpentina
      el.style.animationDelay = `${order * 0.12}s`;
    });

    // actualizar puntaje y UI
    scores[currentPlayer] += 1;
    updateScoreboard();
    const winnerName = (currentPlayer === 'X' ? (playerXInput.value.trim() || 'X') : (playerOInput.value.trim() || 'O'));
    overlayText.textContent = `${winnerName} (${currentPlayer}) ¡ha ganado!`;
    overlay.classList.remove('hidden');
    setStatus(`${winnerName} ha ganado. Pulsa "Reiniciar partida" o "Jugar nueva partida".`);
    playWinSound();
    updateBoardInteractivity();
    return;
  } else if (result === 'tie') {
    // empate
    gameOver = true;
    overlayText.textContent = `Empate — nadie gana.`;
    overlay.classList.remove('hidden');
    setStatus('Empate. Pulsa "Reiniciar partida" o "Jugar nueva partida".');
    updateBoardInteractivity();
    return;
  }

  // si no terminó: cambiar turno
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const currentName = currentPlayer === 'X' ? (playerXInput.value.trim() || 'X') : (playerOInput.value.trim() || 'O');
  setStatus(`Turno de ${currentName} (${currentPlayer})`);
}

// --- iniciar el juego (habilita tablero, actualiza nombres) ---
function startGame() {
  // Si los inputs están vacíos, se usan X y O por defecto
  updateNamesOnUI();
  // dejar gameActive true y gameOver false y limpiar tablero
  gameActive = true;
  gameOver = false;
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(c => { c.textContent = ''; c.classList.remove('x','o','win'); c.style.animationDelay = ''; });
  currentPlayer = 'X'; // X comienza
  setStatus(`Turno de ${(playerXInput.value.trim() || 'X')} (X)`);
  updateBoardInteractivity();
}

// --- reiniciar solamente la partida actual (borra tablero, mantiene puntajes y nombres) ---
function resetBoard() {
  if (!gameActive && scores.X === 0 && scores.O === 0) {
    // si no se inició y no hay puntajes, mejor mostrar mensaje rápido
    setStatus('Pulsa "Iniciar juego" para comenzar');
    return;
  }
  gameOver = false;
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(c => { c.textContent = ''; c.classList.remove('x','o','win'); c.style.animationDelay = ''; });
  currentPlayer = 'X';
  updateNamesOnUI();
  setStatus(`Turno de ${(playerXInput.value.trim() || 'X')} (X)`);
  updateBoardInteractivity();
}

// --- reiniciar todo: nombres y puntajes (Jugar nueva partida) ---
function newGame() {
  // reset todo
  gameActive = false;
  gameOver = false;
  board = ['', '', '', '', '', '', '', '', ''];
  scores = { X: 0, O: 0 };
  updateScoreboard();
  playerXInput.value = '';
  playerOInput.value = '';
  updateNamesOnUI();
  cells.forEach(c => { c.textContent = ''; c.classList.remove('x','o','win'); c.style.animationDelay = ''; });
  setStatus('Pulsa "Iniciar juego" para comenzar');
  updateBoardInteractivity();
}

// --- eventos ---
cells.forEach(c => c.addEventListener('click', handleCellClick));
startBtn.addEventListener('click', startGame);
resetBoardBtn.addEventListener('click', resetBoard);
newGameBtn.addEventListener('click', newGame);
overlayClose.addEventListener('click', () => { overlay.classList.add('hidden'); });

// permitir cerrar overlay al hacer click fuera del contenido
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.add('hidden');
});

// activar audioContext en el primer gesto del usuario (compatibilidad)
['click','touchstart'].forEach(evt => {
  document.addEventListener(evt, function resumeAudio() {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    // no borrar el listener para que no de errores; es barato
  }, { passive:true });
});

// inicializar UI
updateScoreboard();
updateNamesOnUI();
updateBoardInteractivity();
setStatus('Pulsa "Iniciar juego" para comenzar');
