/* ============================
     VARIABLES PRINCIPALES
     ============================ */
  const figure = document.getElementById('figure');
  const gameArea = document.getElementById('gameArea');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  const manual = document.getElementById('manual');
  const startBtn = document.getElementById('startBtn');
  const topBar = document.getElementById('topBar');
  const levelSelect = document.getElementById('levelSelect');

  let score = 0;
  let time = 30;
  let timerInterval;
  let currentLevel = 1;
  let disappearTimeout;

  // Lista de imágenes (íconos relacionados con computadoras)
  const icons = [
    "https://img.icons8.com/color/96/computer.png",
    "https://img.icons8.com/color/96/keyboard.png",
    "https://img.icons8.com/color/96/mouse.png",
    "https://img.icons8.com/color/96/laptop.png",
    "https://img.icons8.com/color/96/monitor.png",
    "https://img.icons8.com/color/96/usb-cable.png"
  ];

  /* ============================
     MOVER FIGURA ALEATORIAMENTE
     ============================ */
  function moveFigure() {
    const maxX = gameArea.clientWidth - figure.clientWidth;
    const maxY = gameArea.clientHeight - figure.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    figure.style.left = randomX + 'px';
    figure.style.top = randomY + 'px';

    // Cambiar imagen aleatoria
    figure.src = icons[Math.floor(Math.random() * icons.length)];

    if (currentLevel === 3) {
      clearTimeout(disappearTimeout);
      disappearTimeout = setTimeout(() => {
        figure.style.display = "none"; // Oculta si no se clickeó a tiempo
        setTimeout(() => {
          figure.style.display = "block";
          moveFigure();
        }, 800); // Reaparece después de 0.8s
      }, 1000); // 1 segundo para dar clic
    }
  }

  /* ============================
     CLICK EN LA FIGURA
     ============================ */
  figure.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    moveFigure();
  });

  /* ============================
     INICIAR JUEGO
     ============================ */
  function startGame() {
    manual.style.display = 'none';
    gameArea.style.display = 'block';
    topBar.style.display = 'flex';

    score = 0;
    time = 30;
    scoreElement.textContent = score;
    timerElement.textContent = time;

    // Leer nivel seleccionado
    currentLevel = parseInt(levelSelect.value);

    // Ajustar altura del área según el nivel
    if (currentLevel === 1) {
      gameArea.style.height = "50vh"; 
    } else if (currentLevel === 2) {
      gameArea.style.height = "80vh"; 
    } else if (currentLevel === 3) {
      gameArea.style.height = "120vh"; 
    }

    moveFigure();

    // Iniciar contador
    timerInterval = setInterval(() => {
      time--;
      timerElement.textContent = time;
      if (time <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  /* ============================
     FINALIZAR JUEGO
     ============================ */
  function endGame() {
    let message = '';
    if (score >= 40) {
        message = '¡Increíble! Eres un maestro del clic.';
    } else if (score >= 10) {
        message = '¡Bien hecho! Puedes mejorar.';
    } else {
        message = 'Necesitas practicar más.';
    }
    alert(`Tiempo terminado!\nPuntos: ${score}\n${message}`);

    // Volver al manual
    manual.style.display = 'block';
    gameArea.style.display = 'none';
    topBar.style.display = 'none';
  }

  /* ============================
     BOTÓN START
     ============================ */
  startBtn.addEventListener('click', startGame);