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

    document.querySelectorAll('.message-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMessage(header);
        });
    });

     // 8. Spotify Playlists
    const playPlaylistButtons = document.querySelectorAll('.play-playlist');
    
    playPlaylistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playlistId = button.getAttribute('data-spotify');
            window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
        });
    });


     // 9. Memory Input
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


    // 10. Games Tabs
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

     // 11. Online Games
    const playOnlineButtons = document.querySelectorAll('.play-online');
    
    playOnlineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });

// 12. Firebase Authentication
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

// Firebase Firestore
const db = firebase.firestore();

// Variável global para armazenar a mensagem atual
let currentMessageId = null;

// Função para abrir o modal de comentários
function openCommentModal(messageId) {
    currentMessageId = messageId;
    const modal = document.getElementById('commentModal');
    modal.classList.add('active');
    document.body.classList.add('no-scroll'); // Impede scroll da página quando modal está aberto
    loadComments(messageId);
}

// Função para fechar o modal de comentários
function closeCommentModal() {
    const modal = document.getElementById('commentModal');
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    currentMessageId = null;
}

// Função para formatar data
function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para carregar comentários
function loadComments(messageId) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '<p class="loading-msg">Carregando...</p>';

    db.collection('comments').doc(messageId).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
            commentsList.innerHTML = '';
            snapshot.forEach(doc => {
                const comment = doc.data();
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.dataset.commentId = doc.id; // <-- Isso é ESSENCIAL!
                commentElement.innerHTML = `
                    <div class="comment-header">
                        <strong>${comment.userName}</strong>
                        <button class="delete-comment-btn">🗑️</button>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                    <small class="comment-date">${formatDate(comment.timestamp?.toDate())}</small>
                `;
                commentsList.appendChild(commentElement);
            });
        });
}

// Função para enviar comentário
async function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const text = commentInput.value.trim();
    if (!text) return;

    const user = firebase.auth().currentUser;
    if (!user) return alert("Faça login para comentar!");

    // Define os nomes baseados no e-mail (personalize com seus dados)
    const userNames = {
        'thatslanna@gmail.com': 'HK',
        'erissanttioresm@gmail.com': 'Eris'
    };

    try {
        await db.collection('comments').doc(currentMessageId).collection('messages').add({
            text: text,
            userName: userNames[user.email] || user.email, // Usa o nome ou o e-mail
            userEmail: user.email, // Salva o e-mail para referência
            userId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        commentInput.value = '';
    } catch (error) {
        alert("Erro ao enviar. Tente novamente!");
    }
}

// Função para curtir/descurtir
async function toggleLike(messageId, button) {
    const user = firebase.auth().currentUser;
    if (!user) return alert("Faça login para curtir!");

    const likeRef = db.collection('likes').doc(`${messageId}_${user.uid}`);

    try {
        const doc = await likeRef.get();
        if (doc.exists) {
            await likeRef.delete();
            button.classList.remove('liked');
            updateLikeCount(messageId, -1);
        } else {
            await likeRef.set({
                messageId: messageId,
                userId: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            button.classList.add('liked');
            updateLikeCount(messageId, 1);
            
            // Efeito de confete (opcional)
            import('https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js')
                .then(() => confetti({ particleCount: 50, spread: 70 }));
        }
    } catch (error) {
        console.error("Erro ao curtir:", error);
    }


    // No final da função toggleLike():
if (!doc.exists) { // Quando curtir
    import('https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js')
        .then(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
}
}

// Função para atualizar contador de curtidas
function updateLikeCount(messageId, change) {
    const likeCountElement = document.querySelector(`.message-container[data-message-id="${messageId}"] .like-count`);
    if (likeCountElement) {
        const currentCount = parseInt(likeCountElement.textContent) || 0;
        likeCountElement.textContent = Math.max(0, currentCount + change);
    }
}

// Carregar contagem de curtidas inicial
async function loadInitialLikes() {
    try {
        const user = firebase.auth().currentUser;
        if (!user) return;

        const containers = document.querySelectorAll('.message-container');
        
        for (const container of containers) {
            const messageId = container.dataset.messageId;
            const likeButton = container.querySelector('.like-btn');
            const likeCountElement = container.querySelector('.like-count');
            
            try {
                // Verifica se o usuário curtiu
                const likeDoc = await db.collection('likes').doc(`${messageId}_${user.uid}`).get();
                if (likeDoc.exists) {
                    likeButton.classList.add('liked');
                }

                // Conta total de curtidas
                const likesSnapshot = await db.collection('likes')
                    .where('messageId', '==', messageId)
                    .get();
                    
                likeCountElement.textContent = likesSnapshot.size;
            } catch (error) {
                console.error(`Erro ao carregar curtidas para mensagem ${messageId}:`, error);
            }
        }
    } catch (error) {
        console.error("Erro geral ao carregar curtidas:", error);
    }
}

// Configura os event listeners para os botões de uma mensagem específica
function setupMessageListeners(messageContainer) {
    const messageId = messageContainer.dataset.messageId;
    
    // Listener para curtir
    const likeButton = messageContainer.querySelector('.like-btn');
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            toggleLike(messageId, this);
        });
    }
    
    // Listener para comentar
    const commentButton = messageContainer.querySelector('.comment-btn');
    if (commentButton) {
        commentButton.addEventListener('click', function() {
            openCommentModal(messageId);
        });
    }
}

// Configura todos os event listeners quando o modal de mensagens é aberto
function setupModalListeners() {
    // Fechar modal de comentários
    const closeButton = document.querySelector('.close-comment-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeCommentModal);
    }
    
    // Enviar comentário
    const submitButton = document.getElementById('submitComment');
    if (submitButton) {
        submitButton.addEventListener('click', submitComment);
    }
    
    // Enviar comentário com Enter
    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitComment();
        });
    }

// Adicione este evento no setupModalListeners():
    document.querySelectorAll('.delete-comment-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const commentId = this.closest('.comment').dataset.commentId;
            if (confirm("Tem certeza que quer deletar este comentário?")) {
                try {
                    await db.collection('comments').doc(currentMessageId)
                        .collection('messages').doc(commentId).delete();
                } catch (error) {
                    console.error("Erro ao deletar:", error);
                }
            }
    });
        

    // Substitua o listener antigo por este:
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-comment-btn')) {
        const commentElement = e.target.closest('.comment');
        const commentId = commentElement.dataset.commentId;
        
        if (confirm("Tem certeza que quer deletar?")) {
            try {
                await db.collection('comments').doc(currentMessageId)
                    .collection('messages').doc(commentId).delete();
            } catch (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao deletar. Atualize a página e tente novamente!");
            }
        }
    }
});
});
    
    // Configura listeners para cada mensagem
    document.querySelectorAll('.message-container').forEach(setupMessageListeners);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Configura listeners globais
    setupModalListeners();
    
    // Configura observador de autenticação
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            loadInitialLikes();
        } else {
            // Opcional: autenticação anônima automática
            firebase.auth().signInAnonymously().catch(error => {
                console.error("Erro na autenticação anônima:", error);
            });
        }
    });
});

// Função para deletar comentários
async function deleteComment(commentId) {
    if (!confirm("Tem certeza que quer deletar?")) return;
    
    try {
        await db.collection('comments').doc(currentMessageId)
            .collection('messages').doc(commentId).delete();
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao deletar. Recarregue a página e tente novamente!");
    }
}

// Listener para a lixeira (adicione isso no setupModalListeners())
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-comment-btn')) {
        const commentId = e.target.closest('.comment').dataset.commentId;
        deleteComment(commentId);
    }
});
