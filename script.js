/* Student Study Hub - JavaScript Engine */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  highlightActiveNavLink();
  initQuiz();
  initContactForm();
  initPomodoroTimer();
  initMaterialDownloads();
  initCodeCopyButtons();
});

/* 1. Navbar Mobile Toggle */
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close mobile menu when clicking outside or clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* 2. Highlight Active Nav Link */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* 3. Interactive Quiz Engine (Quiz.html) */
const quizQuestions = [
  {
    id: 1,
    question: "Which Python keyword is used to define a function?",
    options: ["func", "def", "function", "define"],
    correct: 1,
    explanation: "'def' is the standard keyword used in Python to define a function."
  },
  {
    id: 2,
    question: "What does 'AI' stand for in computer science?",
    options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Inference"],
    correct: 1,
    explanation: "AI stands for Artificial Intelligence."
  },
  {
    id: 3,
    question: "Which algorithm is commonly used for classification in Machine Learning?",
    options: ["K-Nearest Neighbors (KNN)", "Bubble Sort", "Dijkstra's Algorithm", "Binary Search"],
    correct: 0,
    explanation: "KNN (K-Nearest Neighbors) is a fundamental supervised learning classification algorithm."
  },
  {
    id: 4,
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correct: 2,
    explanation: "A balanced BST provides logarithmic time complexity O(log n) for lookup operations."
  },
  {
    id: 5,
    question: "In computer networking, which protocol works at the Transport Layer to ensure reliable data transfer?",
    options: ["UDP", "IP", "TCP", "HTTP"],
    correct: 2,
    explanation: "TCP (Transmission Control Protocol) provides reliable, connection-oriented data transfer."
  }
];

function initQuiz() {
  const quizForm = document.getElementById('quiz-form');
  const quizResults = document.getElementById('quiz-results');
  const questionsContainer = document.getElementById('questions-container');
  const resetButton = document.getElementById('reset-quiz-btn');

  if (!quizForm || !questionsContainer) return;

  // Render Questions
  renderQuizQuestions();

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;
    const total = quizQuestions.length;

    quizQuestions.forEach((q, index) => {
      const selectedOption = quizForm.querySelector(`input[name="q${q.id}"]:checked`);
      const questionBlock = document.getElementById(`q-block-${q.id}`);
      
      // Remove existing feedback if any
      const existingFeedback = questionBlock.querySelector('.quiz-feedback');
      if (existingFeedback) existingFeedback.remove();

      const feedbackDiv = document.createElement('div');
      feedbackDiv.className = 'quiz-feedback';
      feedbackDiv.style.marginTop = '0.75rem';
      feedbackDiv.style.padding = '0.75rem 1rem';
      feedbackDiv.style.borderRadius = '8px';
      feedbackDiv.style.fontSize = '0.9rem';

      if (selectedOption) {
        const val = parseInt(selectedOption.value, 10);
        if (val === q.correct) {
          score++;
          feedbackDiv.style.background = '#dcfce7';
          feedbackDiv.style.color = '#15803d';
          feedbackDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Correct!</strong> ${q.explanation}`;
        } else {
          feedbackDiv.style.background = '#fee2e2';
          feedbackDiv.style.color = '#b91c1c';
          feedbackDiv.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Incorrect.</strong> Correct answer: <em>${q.options[q.correct]}</em>. ${q.explanation}`;
        }
      } else {
        feedbackDiv.style.background = '#fef3c7';
        feedbackDiv.style.color = '#b45309';
        feedbackDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <strong>Not Answered.</strong> Correct answer: <em>${q.options[q.correct]}</em>.`;
      }

      questionBlock.appendChild(feedbackDiv);
    });

    // Display Results
    document.getElementById('score-display').textContent = score;
    document.getElementById('total-questions-display').textContent = total;
    
    const percentage = (score / total) * 100;
    let remark = "";
    if (percentage === 100) remark = "🌟 Outstanding Perfect Score! Excellent job!";
    else if (percentage >= 80) remark = "🎉 Great performance! You know your concepts well.";
    else if (percentage >= 60) remark = "👍 Good effort! Review the topics to score higher.";
    else remark = "📚 Keep practicing! Re-read the study materials and try again.";

    document.getElementById('quiz-remark').textContent = remark;
    
    quizResults.style.display = 'block';
    quizResults.scrollIntoView({ behavior: 'smooth' });

    // Update Progress Bar
    const progressBar = document.getElementById('quiz-progress-bar');
    if (progressBar) progressBar.style.width = '100%';
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      quizForm.reset();
      document.querySelectorAll('.quiz-feedback').forEach(el => el.remove());
      quizResults.style.display = 'none';
      const progressBar = document.getElementById('quiz-progress-bar');
      if (progressBar) progressBar.style.width = '0%';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function renderQuizQuestions() {
  const container = document.getElementById('questions-container');
  if (!container) return;

  container.innerHTML = quizQuestions.map((q, idx) => `
    <div class="question-block" id="q-block-${q.id}">
      <div class="question-title">
        <span class="question-num">Q${idx + 1}.</span>
        <span>${q.question}</span>
      </div>
      <div class="options-group">
        ${q.options.map((opt, optIdx) => `
          <label class="option-label">
            <input type="radio" name="q${q.id}" value="${optIdx}">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* 4. Form Validation (Contact.html) */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Name check
    if (!name.value.trim()) {
      setError(name, 'Full name is required');
      isValid = false;
    } else {
      clearError(name);
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      setError(email, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(email);
    }

    // Subject check
    if (!subject.value.trim()) {
      setError(subject, 'Subject is required');
      isValid = false;
    } else {
      clearError(subject);
    }

    // Message check
    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, 'Message must be at least 10 characters long');
      isValid = false;
    } else {
      clearError(message);
    }

    if (isValid) {
      showToast('Message sent successfully! We will reply to your email soon.', 'success');
      form.reset();
    }
  });
}

function setError(input, msg) {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.add('invalid');
  let err = group.querySelector('.error-message');
  if (err) err.textContent = msg;
}

function clearError(input) {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.remove('invalid');
}

/* 5. Material Downloads Toast Trigger */
function initMaterialDownloads() {
  const downloadBtns = document.querySelectorAll('.download-btn');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const materialName = btn.getAttribute('data-material') || 'Study Material PDF';
      showToast(`Downloading "${materialName}" ...`, 'info');
    });
  });
}

/* 6. Code Copy Buttons */
function initCodeCopyButtons() {
  const copyBtns = document.querySelectorAll('.code-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-container').querySelector('code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  });
}

/* 7. Pomodoro Timer Widget (Study Tips Page) */
let pomodoroTimerInt = null;
let pomodoroSeconds = 25 * 60;
let isTimerRunning = false;

function initPomodoroTimer() {
  const display = document.getElementById('pomodoro-display');
  const startBtn = document.getElementById('pomo-start');
  const pauseBtn = document.getElementById('pomo-pause');
  const resetBtn = document.getElementById('pomo-reset');

  if (!display || !startBtn) return;

  function updateDisplay() {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  startBtn.addEventListener('click', () => {
    if (isTimerRunning) return;
    isTimerRunning = true;
    startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;

    pomodoroTimerInt = setInterval(() => {
      if (pomodoroSeconds > 0) {
        pomodoroSeconds--;
        updateDisplay();
      } else {
        clearInterval(pomodoroTimerInt);
        isTimerRunning = false;
        showToast('🎉 Pomodoro session finished! Take a 5-minute break.', 'success');
        startBtn.disabled = false;
      }
    }, 1000);
  });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      clearInterval(pomodoroTimerInt);
      isTimerRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(pomodoroTimerInt);
      isTimerRunning = false;
      pomodoroSeconds = 25 * 60;
      updateDisplay();
      startBtn.disabled = false;
      if (pauseBtn) pauseBtn.disabled = true;
    });
  }
}

/* Toast System Helper */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--accent);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
