let score = 0, pos = 'lu', eggs = [];
const sides = ['lu', 'ld', 'ru', 'rd'];
let audioCtx = null;

function beep() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = 'square'; osc.frequency.setValueAtTime(1450, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}

function press(side) {
    beep(); pos = side;
    document.querySelectorAll('.wolf-render').forEach(el => el.classList.remove('active'));
    document.getElementById('w-' + side).classList.add('active');
}

function spawn() {
    let s = sides[Math.floor(Math.random() * sides.length)];
    eggs.push({ side: s, step: 0 });
}

function gameTick() {
    document.querySelectorAll('.egg').forEach(el => el.classList.remove('active'));
    for (let i = eggs.length - 1; i >= 0; i--) {
        let e = eggs[i];
        let el = document.getElementById(`egg-${e.side}-${e.step}`);
        if (el) el.classList.add('active');
        e.step++;
        if (e.step > 2) {
            if (pos === e.side) {
                score++;
                document.getElementById('live-scr').innerText = String(score).padStart(4, '0');
            }
            eggs.splice(i, 1);
        }
    }
    if (Math.random() > 0.55 && eggs.length < 3) spawn();
}
setInterval(gameTick, 850);
