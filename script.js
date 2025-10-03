class CounterGame {
    constructor() {
        this.counter = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.lastClickTime = 0;
        this.counterElement = document.getElementById('counter');
        this.buttonElement = document.getElementById('gameButton');

        this.buttonElement.addEventListener('click', () => this.toggleGame());
        this.updateDisplay();
    }

    toggleGame() {
        const now = Date.now();
        // Prevent accidental double-clicks within 200ms
        if (now - this.lastClickTime < 200) {
            return;
        }
        this.lastClickTime = now;
        
        if (this.isRunning) {
            this.stopGame();
        } else {
            this.startGame();
        }
    }

    startGame() {
        this.counter = 0;
        this.isRunning = true;
        this.buttonElement.textContent = 'Stop';
        this.buttonElement.classList.add('stop');
        this.counterElement.classList.remove('winner');
        
        this.intervalId = setInterval(() => {
            this.counter++;
            this.updateDisplay();
            
            // Auto-stop at 1500 to prevent infinite counting
            if (this.counter >= 1500) {
                this.stopGame();
            }
        }, 10); // 10ms intervals for 100 increments per second
    }

    stopGame() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.buttonElement.textContent = 'Start';
        this.buttonElement.classList.remove('stop');
        this.checkWin();
    }

    checkWin() {
        if (this.counter === 1000) {
            this.counterElement.classList.add('winner');
        }
    }



    updateDisplay() {
        this.counterElement.textContent = this.counter;
        
        // Calculate font size based on counter value
        // Mobile: 24px to 120px, Desktop: 32px to 160px (base * 5)
        // Scale up to 1000, then cap at max size
        const isMobile = window.innerWidth <= 768;
        const baseSize = isMobile ? 24 : 32;
        const maxSize = baseSize * 5;
        const scaleFactor = Math.min(this.counter / 1000, 1);
        const fontSize = baseSize + scaleFactor * (maxSize - baseSize);
        
        this.counterElement.style.fontSize = `${fontSize}px`;
    }
}

// Initialize game when page loads
let gameInstance;
document.addEventListener('DOMContentLoaded', () => {
    gameInstance = new CounterGame();
    window.counterGame = gameInstance;
});

// Handle window resize for responsive font scaling
window.addEventListener('resize', () => {
    if (gameInstance) {
        gameInstance.updateDisplay();
    }
});
