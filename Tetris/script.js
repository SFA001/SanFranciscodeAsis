const canvas = document.getElementById('tetris'); // Busca en la página el espacio (canvas) llamado "tetris"
const contenido = canvas.getContext('2d'); // Prepara las herramientas para dibujar dentro del canvas

const filas = 20; // El tablero tendrá 20 filas
const columnas = 10; // El tablero tendrá 10 columnas
const tamaño_bloque = 30; // Cada bloque (pieza) mide 30 píxeles
const colores = ['#000','#f00','#0f0','#00f','#ff0','#f0f','#0ff','#ffa500','#800080',]; // Lista de colores posibles para las piezas
const formas = [ // Todas las formas de piezas que se usarán en el Tetris
    [[1,1,1,1]], // Línea
    [[1,1,1],[0,1,0]], // Forma de T pequeña
    [[1,1,0],[0,1,1]], // Z
    [[0,1,1],[1,1,0]], // S
    [[1,1],[1,1]], // Cuadrado
    [[1,0,0],[1,1,1]], // L
    [[1,0],[1,1]], //Mini L
    [[0,0,1],[1,1,1]], // J
    [[1,1,1],[0,1,0],[0,1,0]], //T
    [[1,1,1],[1,0,1]], //U
    [[0,1,0],[1,1,1],[0,1,0]], //Cruz
    [[0,0,0],[0,1,0],[0,0,0]], //Punto
    [[0,0,1],[0,1,0],[1,0,0]], // /
    [[1,1],[1,1],[1,0]] //P
];
const sonidoPerdida= new Audio("Voicy_Game Over- Tetris Sounds.mp3"); //Somido para el final del juego
const sonidoNuevoNivel= new Audio("Voicy_Next Level- Tetris Sounds.mp3"); //Sonido para un nuevo nivel
const sonidoRotacion=new Audio("Rotate.mp3"); //Spnido para la rotacion de las piezas
const sonidoLinea=new Audio("Empty_Line.mp3"); //Sonido para la eliminacion de las lineas

let tablero = Array.from({length: filas}, () => Array(columnas).fill(0)); // Crea el tablero vacío (lleno de ceros)
let formaActual = generarFormaAleatoria(); // Selecciona una pieza al azar para empezar
let posicion = {x: Math.floor(columnas/2)-1, y: 0}; // Posición inicial: arriba en el centro
let puntaje = 0; // El puntaje comienza en 0
let nivel = 1; // El nivel comienza en 1
let intervaloDeCaida = 1000; // La velocidad de caída (1 segundo por movimiento)
let tiempoDeCaida = 0; // Tiempo acumulado desde la última caída
let pausa=false; //Variable para pausar el juego

function dibujarTablero(){ // Función que dibuja el tablero con las piezas colocadas
    contenido.clearRect(0,0, canvas.width, canvas.height); // Limpia la pantalla
    for(let y=0;y<filas;y++){ // Recorre cada fila
        for(let x=0;x<columnas;x++){ // Recorre cada columna
            if(tablero[y][x]){ // Si hay un bloque en esa posición
                contenido.fillStyle = colores[tablero[y][x]]; // Elige el color correcto
                contenido.fillRect(x*tamaño_bloque, y*tamaño_bloque, tamaño_bloque, tamaño_bloque); // Dibuja un bloque lleno
                contenido.strokeRect(x*tamaño_bloque, y*tamaño_bloque, tamaño_bloque, tamaño_bloque); // Dibuja el borde del bloque
            }
        }
    }
}

function dibujarForma(){ // Dibuja la pieza que está cayendo en el tablero
    contenido.fillStyle = colores[formaActual.color]; // Usa el color de la pieza actual
    for(let y=0;y<formaActual.forma.length;y++){ // Recorre cada fila de la pieza
        for(let x=0; x<formaActual.forma[y].length; x++){ // Recorre cada columna de la pieza
            if(formaActual.forma[y][x]){ // Si esa parte de la pieza existe
                contenido.fillRect((posicion.x+x)*tamaño_bloque, (posicion.y+y)*tamaño_bloque, tamaño_bloque, tamaño_bloque); // La dibuja
                contenido.strokeRect((posicion.x+x)*tamaño_bloque,(posicion.y+y)*tamaño_bloque, tamaño_bloque, tamaño_bloque); // Le pone borde
            }
        }
    }
}

function generarFormaAleatoria(){ // Crea una pieza al azar
    const forma = formas[Math.floor(Math.random()*formas.length)]; // Selecciona una de las formas
    return {
        forma, // La forma de la pieza
        color: Math.floor(Math.random()*(colores.length-1)) + 1 // Elige un color (no el negro)
    };  
}

function moverForma(dx, dy){ // Mueve la pieza actual
    posicion.x += dx; // Cambia la posición en el eje X
    posicion.y += dy; // Cambia la posición en el eje Y
    if(colicion()){ // Si choca con algo
        posicion.x -= dx; // Deshace el movimiento en X
        posicion.y -= dy; // Deshace el movimiento en Y
    }
}

function colicion(){ // Revisa si la pieza choca con los bordes o con otras piezas
    for(let y=0;y<formaActual.forma.length;y++){ // Recorre las filas de la pieza
        for(let x=0;x<formaActual.forma[y].length;x++){ // Recorre las columnas de la pieza
            if(formaActual.forma[y][x]){ // Si hay bloque en esa parte de la pieza
                const tableroX = posicion.x+x; // Posición en el tablero (X)
                const tableroY = posicion.y+y; // Posición en el tablero (Y)
                if(tableroX<0 || tableroX>=columnas || tableroY >= filas || tablero[tableroY][tableroX]){ // Si se sale del tablero o toca otra pieza
                    return true; // Hay colisión
                }
            }
        }
    }
    return false; // Si no hay problemas, devuelve falso
}

function actualizar(){ // Actualiza el juego cada cierto tiempo
    if (pausa) return // Si la variable es true se pausa el juego
    dibujarTablero(); // Dibuja el tablero
    dibujarForma(); // Dibuja la pieza actual
    tiempoDeCaida += 100; // Aumenta el contador de tiempo
    if(tiempoDeCaida >= intervaloDeCaida){ // Si pasó el tiempo para bajar la pieza
        tiempoDeCaida = 0; // Reinicia el tiempo
        posicion.y++; // Baja la pieza
        if(colicion()){ // Si choca al bajar
            posicion.y--; // Devuelve la pieza a su lugar
            lugardeForma(); // La fija en el tablero
            formaActual = generarFormaAleatoria(); // Genera una nueva pieza
            posicion = { x: Math.floor(columnas/2)-1, y: 0}; // La coloca en la parte superior
            if(colicion()){ // Si la nueva pieza ya choca
                sonidoPerdida.play(); //Reproduce sonido de perdida
                alert("Has perdido!!"); // Termina el juego
                tablero = Array.from({length: filas}, () => Array(columnas).fill(0)); // Vacía el tablero
                puntaje = 0; // Reinicia el puntaje
                nivel = 1; // Reinicia el nivel
                actualizarPantalla(); // Actualiza la pantalla
            }
        }
        actualizarPantalla(); // Actualiza la pantalla siempre
    }
}

function lugardeForma(){ // Coloca la pieza actual en el tablero
    for(let y=0; y<formaActual.forma.length;y++){ // Recorre las filas de la pieza
        for(let x=0; x<formaActual.forma[y].length;x++){ // Recorre las columnas de la pieza
            if(formaActual.forma[y][x]){ // Si hay bloque en esa parte
                tablero[posicion.y + y][posicion.x + x] = formaActual.color; // Lo guarda en el tablero
            }
        }
    }
    borrarLineas(); // Revisa si hay líneas completas
}

function borrarLineas(){ // Elimina las filas completas
    for(let y=0;y<filas;y++){ // Recorre cada fila
        if(tablero[y].every(cell => cell)){ // Si toda la fila esta llena
            sonidoLinea.play(); //Reproduce sonido para indicar que la fila se elimino
            tablero.splice(y,1); // Borra la fila
            tablero.unshift(Array(columnas).fill(0)); // Agrega una fila vacia arriba
            puntaje += 100; // Suma 100 puntos
            if(puntaje % 500 === 0){ // Cada 500 puntos sube de nivel
                sonidoNuevoNivel.play(); //Reproduce un audio de nivel
                nivel++; // Sube un nivel
                intervaloDeCaida = Math.max(100, intervaloDeCaida - 100); // Hace que las piezas caigan más rápido
            }
        }
    }
}

function actualizarPantalla(){ // Actualiza la información en la pantalla
    document.getElementById('puntaje').textContent = puntaje; // Muestra el puntaje
    document.getElementById('nivel').textContent = nivel; // Muestra el nivel
}

function teclas(event){ // Reacciona cuando el jugador presiona teclas
    switch(event.key){
        case 'ArrowLeft': // Si presiona flecha izquierda
            moverForma(-1,0); // Mueve la pieza a la izquierda
            break;
        case 'ArrowRight': // Si presiona flecha derecha
            moverForma(1,0); // Mueve la pieza a la derecha
            break;
        case 'ArrowDown': // Si presiona flecha abajo
            moverForma(0,1); // Baja la pieza
            break;   
        case 'ArrowUp': // Si presiona flecha arriba
            rotarForma(); // Gira la pieza
            break;   
        case 'Escape': //Si presiona la tecla escape
            pausa=true; //Cambia el valor de la variable a true
            console.log("Juego pausado"); //Muestra en pantalla el mensaje
            break;
        case 'Enter'://Si presiona la tecla enter
            pausa=false; //Cambia el valor de la variable a false
    }
}

function rotarForma(){ // Gira la pieza actual
    const nuevaForma = formaActual.forma[0].map((_, i) =>
        formaActual.forma.map(fila => fila[i]).reverse() // Gira la matriz
    );
    const anterior = formaActual.forma; // Guarda la forma original
    formaActual.forma = nuevaForma; // Cambia a la nueva forma
    sonidoRotacion.play();
    if(colicion()){ // Si al girar choca
        formaActual.forma = anterior; // Vuelve a la forma anterior
        sonidoRotacion.play();
    }
}

document.addEventListener('keydown', teclas); // Escucha las teclas que el jugador presiona
setInterval(actualizar, 100); // Llama a la función actualizar cada 100 milisegundos
