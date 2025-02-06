document.addEventListener('DOMContentLoaded', function () {
    // Reference to DOM elements
    const askButton = document.getElementById('askButton');
    const questionInput = document.getElementById('question');
    const loadingElement = document.getElementById('loading');
    const startQuizButton = document.getElementById('start-quiz');
    const quizQuestions = document.getElementById('quiz-questions');
    const startChatButton = document.getElementById("start-Personalizationchat");
    const topicSelect = document.getElementById("topic-select");
    const levelSelect = document.getElementById("level-select");
    const personalizationAnswerContainer = document.getElementById("answerContainerPersonalizationchat");
    const loadingMessage = document.getElementById("loading-message");
    const answerContainer = document.getElementById("answerContainer"); // AI chat answer container

    // Hide loading element initially
    if (loadingElement) loadingElement.style.display = 'none';

    // Event listener for asking a question (General AI Chat)
    askButton.addEventListener('click', async function () {
        const question = questionInput.value;
        if (!question) return;

        // Show loading spinner
        if (loadingElement) loadingElement.style.display = 'block';

        try {
            const response = await fetch('http://127.0.0.1:8000/generate_answer/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: question }),
            });

            const data = await response.json();
            answerContainer.innerHTML = `<p>Answer: ${data.answer}</p>`; // Display AI chat answer here
        } catch (error) {
            console.error('Error fetching the answer:', error);
        } finally {
            if (loadingElement) loadingElement.style.display = 'none';
        }
    });

    // Quiz questions setup (unchanged)
    const questions = [
        { question: "What is the largest planet in the Solar System?", options: ["Jupiter", "Saturn", "Earth"], correct: "Jupiter" },
        { question: "Which mission was the first to land humans on the Moon?", options: ["Apollo 11", "Apollo 13", "Gemini 4"], correct: "Apollo 11" },
        // Add more questions...
    ];

    let usedQuestions = []; // Track used questions
    let currentQuestionIndex = -1; // Track current question index

    // Event listener for starting quiz
    startQuizButton.addEventListener('click', function () {
        usedQuestions = []; // Reset used questions
        nextQuestion(); // Load the first question
    });

    function nextQuestion() {
        if (usedQuestions.length === questions.length) {
            quizQuestions.innerHTML = `<p>🎉 Quiz Completed! Well done!</p>`;
            return;
        }

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * questions.length);
        } while (usedQuestions.includes(newIndex));

        usedQuestions.push(newIndex);
        currentQuestionIndex = newIndex;

        const currentQuestion = questions[newIndex];
        quizQuestions.innerHTML = `
            <p>${currentQuestion.question}</p>
            ${currentQuestion.options.map(option => `
                <button class="quiz-option" data-correct="${option === currentQuestion.correct}">${option}</button>
            `).join("")}
            <br><button id="next-question" disabled>Next Question</button>
        `;

        document.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', function () {
                const isCorrect = this.getAttribute('data-correct') === "true";
                if (isCorrect) {
                    showFireworks();
                    alert('🎉 Correct!');
                } else {
                    this.style.backgroundColor = "red";
                }
                document.getElementById('next-question').disabled = false;
            });
        });

        document.getElementById('next-question').addEventListener('click', nextQuestion);
    }

    // Event listener for starting personalized chat (Personalization section)
    startChatButton.addEventListener("click", async function () {
        const selectedTopic = topicSelect.value;
        const selectedLevel = levelSelect.value;
        const prompt = `Generate a ${selectedLevel} level question about ${selectedTopic}.`;

        // Show loading message in the Personalization section
        loadingMessage.style.display = "block";

        try {
            const response = await fetch("http://127.0.0.1:8000/generate_answer/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: prompt }),
            });

            const data = await response.json();

            // Display the generated question in the Personalization section
            personalizationAnswerContainer.innerHTML = `<p><strong>Generated Question:</strong> ${data.answer}</p>`;
        } catch (error) {
            console.error("Error fetching the question:", error);
            personalizationAnswerContainer.innerHTML = "<p>Error generating question. Please try again.</p>";
        } finally {
            loadingMessage.style.display = "none"; // Hide loading message after response
        }
    });

    // Fireworks effect (unchanged)
    function showFireworks() {
        let canvas = document.getElementById('fireworksCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'fireworksCanvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '9999';
            document.body.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        let startTime = Date.now();

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = Math.random() * 4 + 7;
                this.speedX = (Math.random() - 0.5) * 3;
                this.speedY = (Math.random() - 3) * 2;
                this.alpha = 1;
            }

            draw() {
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.alpha -= 0.02;
            }
        }

        function createFirework(x, y) {
            const colors = ['#f21313', '#fccc0d', '#0cf00c', '#0a85ff', '#fa0afa'];
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                }
            });

            if (Date.now() - startTime < 5000) {
                if (Math.random() < 0.09) {
                    createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.9);
                }
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => document.body.removeChild(canvas), 1000);
            }
        }

        animate();
    }
});















const videoSources = [
    "assets/video1.mp4",
    "assets/video2.mp4",
    "assets/video3.mp4"
];
let videoIndex = 0;

const imageSources = [
    "assets/pic1.jpg",
    "assets/pic2.jpg",
    "assets/pic3.jpg"
];
let imageIndex = 0;

function changeVideo(direction) {
    videoIndex += direction;
    if (videoIndex < 0) videoIndex = videoSources.length - 1;
    if (videoIndex >= videoSources.length) videoIndex = 0;

    let videoPlayer = document.getElementById('video-player');
    let videoSource = document.getElementById('video-source');

    videoSource.src = videoSources[videoIndex];
    videoPlayer.load();  // Reloads video
}

function changeImage(direction) {
    imageIndex += direction;
    if (imageIndex < 0) imageIndex = imageSources.length - 1;
    if (imageIndex >= imageSources.length) imageIndex = 0;

    document.getElementById('image-display').src = imageSources[imageIndex];
}
