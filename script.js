// THE ARPIT TEST - Interactive Quiz

class ArpitTest {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.yesClickCount = 0;
        this.noAttempts = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCounter();
    }

    setupEventListeners() {
        // Delegate event listeners for dynamic content
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-yes')) {
                this.handleYesClick();
            } else if (e.target.classList.contains('btn-no')) {
                this.handleNoClick(e);
            } else if (e.target.classList.contains('btn-restart')) {
                this.restart();
            }
        });

        // Touch events for mobile NO button
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('btn-no')) {
                this.handleNoClick(e);
            }
        });
    }

    handleYesClick() {
        this.yesClickCount++;
        this.nextQuestion();
    }

    handleNoClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.noAttempts++;
        const noButton = e.target;
        const buttonGroup = noButton.closest('.button-group');

        if (!buttonGroup) return;

        // Move the NO button to a random position
        this.moveNoButton(noButton, buttonGroup);

        // Show random toast messages
        this.showRandomToast();
    }

    moveNoButton(button, container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        // Calculate safe margins within container
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;

        // Ensure minimum margins
        const minX = 20;
        const minY = 20;

        const randomX = Math.random() * (maxX - minX) + minX;
        const randomY = Math.random() * (maxY - minY) + minY;
        const randomRotation = (Math.random() - 0.5) * 10; // -5 to 5 degrees

        button.style.position = 'absolute';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
        button.style.transform = `rotate(${randomRotation}deg)`;
        button.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    showRandomToast() {
        const messages = [
            'ARPIT SAID NO TO YOUR NO. 💀',
            'THE YES BUTTON IS RUNNING 😭',
            'CAN\'T ESCAPE THE VIBE 🎧',
            'NICE TRY BUDDY 😏',
            'ARPIT APPROVES ✨',
            'YOU ALMOST HAD IT 👀'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showToast(randomMessage);
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        // Remove show class after animation
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }

    nextQuestion() {
        const currentSlide = document.querySelector(`.question-slide[data-question="${this.currentQuestion}"]`);
        if (currentSlide) {
            currentSlide.classList.add('exit-left');
            currentSlide.classList.remove('active');
        }

        this.currentQuestion++;

        if (this.currentQuestion > this.totalQuestions) {
            this.showResults();
        } else {
            setTimeout(() => {
                const nextSlide = document.querySelector(`.question-slide[data-question="${this.currentQuestion}"]`);
                if (nextSlide) {
                    nextSlide.classList.remove('exit-left');
                    nextSlide.classList.add('active');
                }
                this.updateCounter();
            }, 50);
        }
    }

    showResults() {
        setTimeout(() => {
            const resultsSlide = document.querySelector('.results-screen');
            if (resultsSlide) {
                resultsSlide.classList.add('active');
                document.getElementById('yes-count').textContent = this.yesClickCount;
            }
            this.updateCounter();
        }, 50);
    }

    updateCounter() {
        const counter = document.getElementById('counter');
        if (this.currentQuestion <= this.totalQuestions) {
            counter.textContent = `Question ${this.currentQuestion} / ${this.totalQuestions}`;
        } else {
            counter.textContent = 'Results';
        }
    }

    restart() {
        // Reset state
        this.currentQuestion = 1;
        this.yesClickCount = 0;
        this.noAttempts = 0;

        // Reset all slides
        document.querySelectorAll('.question-slide').forEach((slide, index) => {
            slide.classList.remove('active', 'exit-left');
            if (index === 0) {
                slide.classList.add('active');
            }
        });

        // Reset NO button positions
        document.querySelectorAll('.btn-no').forEach((btn) => {
            btn.style.position = 'static';
            btn.style.left = 'auto';
            btn.style.top = 'auto';
            btn.style.transform = 'none';
        });

        this.updateCounter();
    }
}

// Initialize the quiz when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ArpitTest();
});