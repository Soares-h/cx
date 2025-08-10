// Forçar logout ao carregar (apenas para teste)
firebase.auth().signOut().then(() => {
    console.log("Usuário deslogado para teste");
}).catch((error) => {
    console.error("Erro ao deslogar:", error);
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuração do tema
    const themeToggle = document.querySelector('.theme-toggle');
    const moonIcon = document.querySelector('.theme-toggle .fa-moon');
    const sunIcon = document.querySelector('.theme-toggle .fa-sun');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        moonIcon.classList.toggle('hidden');
        sunIcon.classList.toggle('hidden');
    });
    
    // 2. Corações flutuantes
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-background');
        const heartCount = 15;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
            heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heartsContainer.appendChild(heart);
        }
    }
    createHearts();
    
    // 3. Configuração dos modais
    const modalTriggers = document.querySelectorAll('.memory-card');
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.id.replace('Card', 'Modal');
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    overlay.addEventListener('click', closeModal);
    
    function openModal(modal) {
        document.body.style.overflow = 'hidden';
        overlay.classList.add('active');
        modal.classList.add('active');
    }
    
    function closeModal() {
        overlay.classList.remove('active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 4. Music Player
    const playButtons = document.querySelectorAll('.play-btn');
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const youtubeUrl = button.getAttribute('data-youtube');
            const iframe = youtubePlayer.querySelector('iframe');
            
            iframe.src = youtubeUrl;
            youtubePlayer.classList.remove('hidden');
        });
    });

    // 5. Calendar
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthYear = document.querySelector('.month-year');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        monthYear.textContent = new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric'
        }).replace(/^\w/, c => c.toUpperCase());
        
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;
            
            if (day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                dayCell.classList.add('today');
            }
            
            if (Math.random() > 0.7) {
                dayCell.classList.add('has-memory');
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    renderCalendar();

    // 6. HQ Carousel
    document.querySelectorAll('.hq-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const chapter = this.closest('.hq-chapter');
            const pages = chapter.querySelector('.hq-pages');
            const controls = chapter.querySelector('.hq-controls');
            const icon = this.querySelector('.hq-icon');
            
            if (pages.style.display === 'block') {
                pages.style.display = 'none';
                controls.style.display = 'none';
                icon.textContent = '▼';
            } else {
                pages.style.display = 'block';
                controls.style.display = 'flex';
                icon.textContent = '▲';
            }
        });
    });

    function setupCarousel(chapter) {
        const images = chapter.querySelectorAll('.hq-pages img');
        const prev = chapter.querySelector('.hq-prev');
        const next = chapter.querySelector('.hq-next');
        const counter = chapter.querySelector('.hq-counter');
        
        let current = 0;
        
        function update() {
            images.forEach((img, i) => {
                img.style.display = i === current ? 'block' : 'none';
            });
            counter.textContent = `${current + 1}/${images.length}`;
        }
        
        prev.addEventListener('click', function(e) {
            e.stopPropagation();
            current = (current - 1 + images.length) % images.length;
            update();
        });
        
        next.addEventListener('click', function(e) {
            e.stopPropagation();
            current = (current + 1) % images.length;
            update();
        });
        
        update();
    }

    document.querySelectorAll('.hq-chapter').forEach(setupCarousel);

    // 7. Music Control
    const music = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');
    const musicStatus = document.getElementById('musicStatus');
    
    function tryAutoplay() {
        const promise = music.play();
        if (promise !== undefined) {
            promise.catch(error => {
                toggleBtn.style.display = 'flex';
            });
        }
    }

    toggleBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicStatus.textContent = 'Pausar';
            toggleBtn.innerHTML = '<i class="fas fa-pause"></i><span id="musicStatus">Pausar</span>';
        } else {
            music.pause();
            musicStatus.textContent = 'Tocar';
            toggleBtn.innerHTML = '<i class="fas fa-music"></i><span id="musicStatus">Tocar</span>';
        }
    });

    musicStatus.textContent = music.paused ? 'Tocar' : 'Pausar';
    document.body.addEventListener('click', tryAutoplay, { once: true });

    // 8. Messages Toggle
    function toggleMessage(element) {
        const container = element.closest('.message-container');
        const content = container.querySelector('.message-content');
        const arrow = element.querySelector('.arrow');
        
        content.classList.toggle('open');
        arrow.textContent = content.classList.contains('open') ? '▼' : '▶';
    }

// 9. Firebase Authentication
const auth = firebase.auth();
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const mainScreen = document.getElementById('mainScreen');
const memoryBox = document.getElementById('memoryBox');

// Create error message element
const errorMessage = document.createElement('div');
errorMessage.classList.add('error-message');
loginForm.appendChild(errorMessage);

// Check auth state
auth.onAuthStateChanged(user => {
    console.log("Estado de autenticação alterado:", user ? "Usuário logado" : "Usuário não logado");
    if (user) {
        showMemoryBox();
    } else {
        showLoginForm();
    }
});

// Login form submit
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    
    try {
        console.log("Tentando login com:", email);
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error("Erro no login:", error);
        showLoginError(error);
    }
});

// Show memory box
function showMemoryBox() {
    console.log("Mostrando memory box");
    mainScreen.style.display = 'none';
    memoryBox.style.display = 'block';
    
    // Anima os cards individualmente
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        }, 50);
    });
}

// Show login form
function showLoginForm() {
    console.log("Mostrando formulário de login");
    mainScreen.style.display = 'block';
    memoryBox.style.display = 'none';
}

// Show login error
function showLoginError(error) {
    console.log("Mostrando erro de login:", error);
    errorMessage.textContent = getErrorMessage(error.code);
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Get error message
function getErrorMessage(errorCode) {
    switch(errorCode) {
        case 'auth/invalid-email': return 'Email inválido. Por favor, verifique.';
        case 'auth/user-disabled': return 'Esta conta foi desativada.';
        case 'auth/user-not-found': return 'Nenhuma conta encontrada com este email.';
        case 'auth/wrong-password': return 'Senha incorreta. Tente novamente.';
        default: return 'Ocorreu um erro ao fazer login. Tente novamente mais tarde.';
    }
}
});