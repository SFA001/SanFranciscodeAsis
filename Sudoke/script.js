const tablero = document.getElementById("tablero");
const dificultadSelect = document.getElementById("dificultad");
const toggleHilerasBtn = document.getElementById("toggleHileras");
const temporizadorElemento = document.getElementById("temporizador");
const mensajeError = document.getElementById("mensaje-error");

let solucion = [];
let juego = [];
let hilerasVisible = true;
let segundos = 0, intervalo = null;

// ===============================
// Generación de Sudoku válido
// ===============================
function crearSudokuCompleto(){
  const grid = Array.from({length:9},()=>Array(9).fill(0));

  function esValido(num,row,col){
    for(let i=0;i<9;i++){
      if(grid[row][i]===num || grid[i][col]===num) return false;
    }
    const startRow = Math.floor(row/3)*3;
    const startCol = Math.floor(col/3)*3;
    for(let r=0;r<3;r++){
      for(let c=0;c<3;c++){
        if(grid[startRow+r][startCol+c]===num) return false;
      }
    }
    return true;
  }

  function resolverCelda(row,col){
    if(row===9) return true;
    const siguienteFila = col===8 ? row+1 : row;
    const siguienteCol = (col+1)%9;
    const numeros = [1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-0.5);
    for(const num of numeros){
      if(esValido(num,row,col)){
        grid[row][col]=num;
        if(resolverCelda(siguienteFila,siguienteCol)) return true;
        grid[row][col]=0;
      }
    }
    return false;
  }

  resolverCelda(0,0);
  return grid;
}

function crearPuzzle(solucion,dificultad){
  const puzzle = solucion.map(fila=>[...fila]);
  let celdasAQuitar = dificultad==="facil"? 35 : dificultad==="medio"? 50 : 60;
  while(celdasAQuitar>0){
    const r = Math.floor(Math.random()*9);
    const c = Math.floor(Math.random()*9);
    if(puzzle[r][c]!==0){
      puzzle[r][c]=0;
      celdasAQuitar--;
    }
  }
  return puzzle;
}

// ===============================
// Renderizado con selección
// ===============================
function renderTablero(puzzle){
  tablero.innerHTML="";
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      const idx = r*9+c;
      const celda=document.createElement("input");
      celda.type="text"; celda.maxLength=1;
      celda.classList.add("celda");
      if(c%3===0) celda.classList.add("border-left-strong");
      if(c===8) celda.classList.add("border-right-strong");
      if(r%3===0) celda.classList.add("border-top-strong");
      if(r===8) celda.classList.add("border-bottom-strong");

      if(puzzle[r][c]!==0){
        celda.value=puzzle[r][c];
        celda.readOnly=true;
      }else{
        celda.addEventListener("input",()=>{
          if(!/^[1-9]$/.test(celda.value)) celda.value="";
          validarTablero();
        });
      }

      const handleSelect = ()=>handleSelectCell(idx);
      celda.addEventListener("focus",handleSelect);
      celda.addEventListener("click",handleSelect);

      tablero.appendChild(celda);
    }
  }
}

// ===============================
// Validación en tiempo real
// ===============================
function validarTablero(){
  const celdas=Array.from(document.querySelectorAll(".celda"));
  celdas.forEach(c=>c.classList.remove("error"));
  let hayError = false;

  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      const idx=r*9+c;
      const val=celdas[idx].value;
      if(val!==""){
        if(!esMovimientoValido(Number(val),r,c,celdas)){
          celdas[idx].classList.add("error");
          hayError = true;
        }
      }
    }
  }

  if(hayError){
    mensajeError.textContent = "❌ Error: número repetido en fila, columna o bloque";
    mensajeError.style.display = "block";
  } else {
    mensajeError.style.display = "none";
  }
}

function esMovimientoValido(num,row,col,celdas){
  for(let i=0;i<9;i++){
    if(i!==col && celdas[row*9+i].value==num) return false;
    if(i!==row && celdas[i*9+col].value==num) return false;
  }
  const startRow=Math.floor(row/3)*3;
  const startCol=Math.floor(col/3)*3;
  for(let r=0;r<3;r++){
    for(let c=0;c<3;c++){
      const rr=startRow+r, cc=startCol+c;
      if(!(rr===row && cc===col) && celdas[rr*9+cc].value==num) return false;
    }
  }
  return true;
}

// ===============================
// Selección de casilla (coincidencias + hileras)
// ===============================
function handleSelectCell(index){
  clearMatches();
  const celdas = Array.from(document.querySelectorAll(".celda"));
  const sel = celdas[index];
  const val = sel.value;
  if(!val) return;

  const same = celdas.filter(c => c.value === val);
  same.forEach(c => c.classList.add("match"));

  if(hilerasVisible){
    same.forEach((c)=>{
      const i = celdas.indexOf(c);
      const row = Math.floor(i/9);
      const col = i%9;
      for(let cc=0;cc<9;cc++){
        const idx = row*9+cc;
        const cel = celdas[idx];
        if(!cel.classList.contains("match")) cel.classList.add("rowcol-highlight");
      }
      for(let rr=0;rr<9;rr++){
        const idx2 = rr*9+col;
        const cel2 = celdas[idx2];
        if(!cel2.classList.contains("match")) cel2.classList.add("rowcol-highlight");
      }
    });
  }
}

function clearMatches(){
  const celdas = Array.from(document.querySelectorAll(".celda"));
  celdas.forEach(c=>c.classList.remove("match","rowcol-highlight"));
}

// ===============================
// Controles
// ===============================
function nuevoJuego(){
  solucion=crearSudokuCompleto();
  const dificultad=dificultadSelect.value;
  juego=crearPuzzle(solucion,dificultad);
  renderTablero(juego);
  reiniciarTemporizador();
  mensajeError.style.display="none";
}

document.getElementById("nuevoJuego").addEventListener("click",nuevoJuego);
dificultadSelect.addEventListener("change",nuevoJuego);

document.getElementById("verificar").addEventListener("click",()=>{
  const celdas=Array.from(document.querySelectorAll(".celda"));
  let correcto=true;
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      const idx=r*9+c;
      if(celdas[idx].value=="" || Number(celdas[idx].value)!==solucion[r][c]){
        correcto=false;
        celdas[idx].classList.add("error");
      }
    }
  }
  if(correcto){
    mensajeError.style.display="none";
    alert("🎉 ¡Sudoku completado correctamente!");
  } else {
    mensajeError.textContent="❌ Hay errores o celdas vacías";
    mensajeError.style.display="block";
  }
});

toggleHilerasBtn.addEventListener("click",()=>{
  hilerasVisible=!hilerasVisible;
  toggleHilerasBtn.textContent=`Ver hileras: ${hilerasVisible?"ON":"OFF"}`;
  clearMatches();
});

document.addEventListener("click",(e)=>{
  if(!tablero.contains(e.target)) clearMatches();
});

// ===============================
// Temporizador
// ===============================
function reiniciarTemporizador(){
  clearInterval(intervalo);
  segundos=0;
  temporizadorElemento.textContent="00:00";
  intervalo=setInterval(()=>{
    segundos++;
    const min=String(Math.floor(segundos/60)).padStart(2,"0");
    const seg=String(segundos%60).padStart(2,"0");
    temporizadorElemento.textContent=`${min}:${seg}`;
  },1000);
}

window.addEventListener("load",nuevoJuego);
