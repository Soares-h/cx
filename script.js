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
    
    // 3. Controle das telas
    const openBoxBtn = document.getElementById('openBoxBtn');
    const mainScreen = document.getElementById('mainScreen');
    const memoryBox = document.getElementById('memoryBox');
    
    openBoxBtn.addEventListener('click', () => {
        mainScreen.style.opacity = '0';
        mainScreen.style.transform = 'translateY(-20px)';
        mainScreen.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            mainScreen.classList.add('hidden');
            memoryBox.classList.add('show');
            
            const cards = document.querySelectorAll('.memory-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
                }, 50);
            });
        }, 500);
    });
    
    // 4. Configuração dos modais
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
        
        if (modal.id === 'gamesModal') {
            initHangman();
        }
    }
    
    function closeModal() {
        overlay.classList.remove('active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 5. Music Player
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

    // Adicione isso ao seu código JavaScript existente

// Função para lidar com as reações
document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const reaction = this.getAttribute('data-reaction');
        let count = parseInt(this.getAttribute('data-count') || '0');
        count++;
        this.setAttribute('data-count', count);
        
        // Atualiza o contador (se estiver usando)
        if (this.querySelector('.reaction-count')) {
            this.querySelector('.reaction-count').textContent = count;
        }
        
        // Efeito visual
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Aqui você pode adicionar código para salvar a reação no backend se necessário
        console.log(`Reação: ${reaction} - Count: ${count}`);
    });
});

// Função para tocar a playlist do Spotify
document.querySelectorAll('.play-playlist').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const playlistId = this.getAttribute('data-spotify');
        // Abre a playlist no Spotify
        window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
    });
});

console.log("%c💖 Como deseja aproveitar o momento, meu amor?", "font-size: 16px; color: #ff6b6b;");
    // 6. Calendar
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
        
        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;
            
            // Highlight today
            if (day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                dayCell.classList.add('today');
            }
            
            // Randomly add memory indicators (for demo)
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
    
// 7. HQ Carousel
// Configuração básica
let currentIndex = 0;
const container = document.querySelector('.hq-container');
const slides = document.querySelectorAll('.hq-slide');

// Função para mover slides
function moveSlide(direction) {
  currentIndex = (currentIndex + direction + slides.length) % slides.length;
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Eventos dos botões
document.querySelector('.prev-btn').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next-btn').addEventListener('click', () => moveSlide(1));

// Inicialização
container.style.transform = 'translateX(0)';
    
    // 8. Games Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 10. Online Games
    const playOnlineButtons = document.querySelectorAll('.play-online');
    
    playOnlineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });
    
    // 11. Reactions
    const reactionButtons = document.querySelectorAll('.reaction-btn');
    
    reactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reaction = button.getAttribute('data-reaction');
            button.parentElement.insertAdjacentHTML('beforeend', `<span class="reaction">${reaction}</span>`);
            
            setTimeout(() => {
                const reactions = button.parentElement.querySelectorAll('.reaction');
                if (reactions.length > 3) {
                    reactions[0].remove();
                }
            }, 3000);
        });
    });
    
    // 12. Memory Input
    const saveMemoryBtn = document.querySelector('.save-memory');
    
    saveMemoryBtn.addEventListener('click', () => {
        const date = document.getElementById('memoryDate').value;
        const text = document.querySelector('.memory-input textarea').value;
        const image = document.getElementById('memoryImage').files[0];
        
        if (!date || !text) {
            alert('Por favor, preencha a data e a descrição do momento.');
            return;
        }
        
        const memoryItem = document.createElement('div');
        memoryItem.classList.add('memory-item');
        
        if (image) {
            const reader = new FileReader();
            reader.onload = function(e) {
                memoryItem.innerHTML = `
                    <img src="${e.target.result}" alt="Memória">
                    <div class="memory-caption">
                        <h4>${new Date(date).toLocaleDateString('pt-BR')}</h4>
                        <p>${text}</p>
                    </div>
                `;
                document.querySelector('.memories-gallery').prepend(memoryItem);
            };
            reader.readAsDataURL(image);
        } else {
            memoryItem.innerHTML = `
                <img src="https://via.placeholder.com/300x200?text=Nossa+Memória" alt="Memória">
                <div class="memory-caption">
                    <h4>${new Date(date).toLocaleDateString('pt-BR')}</h4>
                    <p>${text}</p>
                </div>
            `;
            document.querySelector('.memories-gallery').prepend(memoryItem);
        }
        
        // Clear form
        document.getElementById('memoryDate').value = '';
        document.querySelector('.memory-input textarea').value = '';
        document.getElementById('memoryImage').value = '';
    });
    
    // 13. Spotify Playlists
    const playPlaylistButtons = document.querySelectorAll('.play-playlist');
    
    playPlaylistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playlistId = button.getAttribute('data-spotify');
            window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
        });
    });
});