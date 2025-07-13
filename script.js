const minuteElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const sound = document.getElementById("sound");
const playSound = document.getElementById("playSound");

const statusLight = document.getElementById("statusLight");
const statusText = document.getElementById("statusText");


let minutes = 20;
let seconds = 0;
let isBreak = false;
let intervalId = null;

function updateDisplay() {
    minuteElement.textContent = String(minutes).padStart(2, "0");
    secondElement.textContent = String(seconds).padStart(2, "0");
}

function countdown() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        if (isBreak) {
            resetWorkTimer();
        } else {
            startBreakTimer();
        }
        return;
    }

    if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    updateDisplay();
}

function startTimer() {
    intervalId = setInterval(countdown, 1000);
}

function startBreakTimer() {
    isBreak = true;
    minutes = 0;
    seconds = 20;
    sound.play();

    // Update visual status for break
    statusLight.classList.remove("work");
    statusLight.classList.add("break");
    statusText.textContent = "Break";

    startTimer();
}

function resetWorkTimer() {
    isBreak = false;
    minutes = 20;
    seconds = 0;
    sound.play();

    // Update visual status for work
    statusLight.classList.remove("break");
    statusLight.classList.add("work");
    statusText.textContent = "Focus";

    startTimer();
}

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;

    // Show initial work status
    statusLight.classList.add("work");
    statusText.textContent = "Focus";

    // play sound
    playSound.play();

    updateDisplay();
    startTimer();
});

resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    isBreak = false;
    minutes = 20;
    seconds = 0;
    startBtn.disabled = false;

    // play sound
    playSound.play();

    // Reset status visual
    statusLight.classList.remove("work", "break");
    statusText.textContent = "Status";

    updateDisplay();
});

