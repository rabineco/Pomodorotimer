class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.interval = null;
        this.workTime = 25;
        this.breakTime = 5;
        this.currentMode = 'work';
        this.remainingTime = this.workTime * 60;

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.interval);
        }
    }

    reset() {
        this.stop();
        this.currentMode = 'work';
        this.remainingTime = this.workTime * 60;
        this.updateDisplay();
    }

    updateWorkTime() {
        this.workTime = parseInt(this.workTimeInput.value) || 25;
        if (!this.isRunning) {
            this.remainingTime = this.workTime * 60;
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        this.breakTime = parseInt(this.breakTimeInput.value) || 5;
    }

    tick() {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            this.updateDisplay();
        } else {
            this.stop();
            if (this.currentMode === 'work') {
                this.currentMode = 'break';
                this.remainingTime = this.breakTime * 60;
                this.updateDisplay();
            } else {
                this.currentMode = 'work';
                this.remainingTime = this.workTime * 60;
                this.updateDisplay();
            }
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// タイマーの初期化
const timer = new PomodoroTimer();
