(() => {
    // Iconos cristianos (emojis)
    const ICONS = ["✝️","🙏","🕊️","⛪","📖","🐟","🕯️","🌟"];

    const TIME_LIMITS = [60, 40, 25];
    const PEEKS_BY_LEVEL = [2, 1, 1];

    let first = null, busy = false, moves = 0, hits = 0;
    let level = 1, peeksLeft = PEEKS_BY_LEVEL[0];
    let timer = null, elapsed = 0, timeLimit = TIME_LIMITS[0];

    const $grid   = document.getElementById("grid");
    const $moves  = document.getElementById("moves");
    const $hits   = document.getElementById("hits");
    const $time   = document.getElementById("time");
    const $new    = document.getElementById("new");
    const $peek   = document.getElementById("peek");
    const $status = document.getElementById("status");
    const $level  = document.getElementById("level");
    const $peeksLeft = document.getElementById("peeksLeft");
    const $sound  = document.getElementById("sound");

    const $music = new Audio('peaceful-piano-soaking-instrumental-worship-track-loops-223094.mp3');
    $music.loop = true; 

    const formatTime = (s) => {
        const m = Math.floor(s/60).toString().padStart(2,"0");
        const r = (s%60).toString().padStart(2,"0");
        return `${m}:${r}`;
    };

    const updateHUD = () => {
        $moves.textContent = moves;
        $hits.textContent  = hits;
        $level.textContent = level;
        $peeksLeft.textContent = peeksLeft;
        $peek.disabled = peeksLeft <= 0;
    };

    // ---- Sonido (efectos de sonido) ----
    const playBeep = (freq=660, dur=0.08) => {
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.connect(gain);
        gain.connect(audio.destination);

        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, audio.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, audio.currentTime + 0.01);
        gain.gain.linearRampToValueAtTime(0, audio.currentTime + dur);

        osc.start(audio.currentTime);
        osc.stop(audio.currentTime + dur);
    };

    // ---- Juego ----
    function stopTimer(){ if(timer){ clearInterval(timer); timer=null; } }
    function startTimer(){
        stopTimer();
        elapsed = 0; renderTime();
        timer = setInterval(()=>{
            elapsed++; renderTime();
            if (elapsed >= timeLimit) {
                stopTimer();
                lockBoard();
                $status.textContent = `⏰ Tiempo agotado. Nivel ${level} fallado`;
                $status.style.display="inline-block";
                alert(`⏰ ¡Tiempo agotado! Has fallado el nivel ${level}.`);
            }
        },1000);
    }
    function renderTime() {
        const remaining = Math.max(0, timeLimit - elapsed);
        $time.textContent = formatTime(remaining);
    }
    function shuffle(arr){
        for(let i=arr.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            [arr[i],arr[j]]=[arr[j],arr[i]];
        }
        return arr;
    }
    function buildDeck(){
        return shuffle([...ICONS, ...ICONS]).map((icon, i) => ({ id: i+1, icon }));
    }
    function render(){
        $grid.innerHTML = "";
        const deck = buildDeck();
        deck.forEach(card=>{
            const el = document.createElement("div");
            el.className = "card";
            el.dataset.state = "hidden";
            el.dataset.id = card.id;
            el.dataset.icon = card.icon;
            el.innerHTML = `
                <button aria-label="Carta oculta" role="button">
                    <div class="face front"></div>
                    <div class="face back" aria-hidden="true">${card.icon}</div>
                </button>`;
            el.querySelector("button").addEventListener("click", ()=> flip(el));
            $grid.appendChild(el);
        });
    }
    function reset(hard=true){
        first=null; busy=false; moves=0; hits=0;
        peeksLeft = PEEKS_BY_LEVEL[level-1];
        timeLimit = TIME_LIMITS[level-1];
        $status.style.display="none";
        updateHUD(); render(); startTimer();
        if (hard) { $music.play(); }
    }
    function lockBoard(){ busy = true; $peek.disabled = true; }
    function nextLevelOrWin(){
        if (level < 3) {
            level++;
            $status.textContent = `✅ ¡Nivel ${level-1} superado! → Nivel ${level}`;
            $status.style.display="inline-block";
            reset(false);
        } else {
            $music.pause();
            $status.textContent = `🏆 ¡Ganaste el juego! Tiempo usado: ${formatTime(elapsed)} · Movs: ${moves}`;
            $status.style.display="inline-block";
            stopTimer(); lockBoard();
        }
    }
    function flip(cardEl){
        if (busy) return;
        if (cardEl.dataset.state === "flipped") return;
        cardEl.dataset.state = "flipped"; playBeep(700, 0.07);
        if(!first){ first = cardEl; return; }
        moves++; $moves.textContent = moves;
        const match = first.dataset.icon === cardEl.dataset.icon;
        if(match){
            first.dataset.match = "yes"; cardEl.dataset.match = "yes"; first = null;
            hits++; $hits.textContent = hits;
            if(hits===ICONS.length){
                stopTimer();
                $status.textContent = `🎉 ¡Nivel ${level} completo!`;
                $status.style.display="inline-block";
                setTimeout(nextLevelOrWin, 700);
            }
        }else{
            busy = true;
            first.dataset.match = "no"; cardEl.dataset.match = "no";
            setTimeout(()=>{
                first.removeAttribute("data-match");
                cardEl.removeAttribute("data-match");
                first.dataset.state = "hidden"; cardEl.dataset.state = "hidden";
                first=null; busy=false;
            }, 700);
        }
    }

    // Función peekAll modificada
    function peekAll() {
        if (busy || peeksLeft <= 0) return;

        const cards = [...document.querySelectorAll(".card")];
        const hiddenCards = cards.filter(c => c.dataset.state === "hidden");

        if (!hiddenCards.length) return;

        peeksLeft--;
        updateHUD();

        if (first) {
            const pair = cards.find(c => c.dataset.icon === first.dataset.icon && c.dataset.id !== first.dataset.id);
            if (pair) {
                flip(pair);
            }
        } else {
            if (hiddenCards.length >= 2) {
                const randomCard1 = hiddenCards[Math.floor(Math.random() * hiddenCards.length)];
                const pair = cards.find(c => c.dataset.icon === randomCard1.dataset.icon && c.dataset.id !== randomCard1.dataset.id);

                if (randomCard1.dataset.id !== pair.dataset.id) {
                    flip(randomCard1);
                    setTimeout(() => flip(pair), 700);
                }
            }
        }
    }

    // Eventos
    $new.addEventListener("click", () => { level = 1; reset(true); });
    $peek.addEventListener("click", peekAll);
    $grid.addEventListener("keydown", (e)=>{
        if(e.key==="Enter" || e.key===" "){
            const btn = e.target.closest("button");
            if(btn){ e.preventDefault(); btn.click(); }
        }
    });

    $sound.addEventListener("click", () => {
        if ($music.paused) {
            $music.play();
            $sound.textContent = " Sonido";
        } else {
            $music.pause();
            $sound.textContent = " Silencio";
        }
    });

    // Iniciar
    reset(true);
})();