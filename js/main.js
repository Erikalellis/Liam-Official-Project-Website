// ============================================================
// LIAM - Deep Darkness Studios
// Interactive Features & Animations
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupFormValidation();
    setupScrollAnimations();
    setupParallaxEffect();
});

// ============================================================
// Smooth Scroll Navigation
// ============================================================

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================================
// Form Validation & Submission
// ============================================================

function setupFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Validação básica
            if (!nameInput.value.trim()) {
                alert('Por favor, insira seu nome');
                e.preventDefault();
                return false;
            }
            
            if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert('Por favor, insira um email válido');
                e.preventDefault();
                return false;
            }
            
            if (!messageInput.value.trim()) {
                alert('Por favor, insira uma mensagem');
                e.preventDefault();
                return false;
            }
            
            // Se validou, o formulário será enviado via Formspree
            console.log('✅ Formulário válido - enviando para Formspree...');
        });
    }
}

// ============================================================
// Scroll Animations
// ============================================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar animação aos cards
    const cards = document.querySelectorAll('.feature-card, .tech-item, .screenshot-card');
    cards.forEach(card => observer.observe(card));
}

// ============================================================
// Parallax Effect no Hero
// ============================================================

function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    const starsBackground = document.querySelector('.stars');
    
    if (hero && starsBackground) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrollY < heroHeight) {
                starsBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    }
}

// ============================================================
// Glow Effect nas Interações
// ============================================================

document.addEventListener('mousemove', (e) => {
    const buttons = document.querySelectorAll('.btn, .feature-card');
    
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Efeito de glow suave (opcional, pode deixar pesado)
        // button.style.setProperty('--glow-x', x + 'px');
        // button.style.setProperty('--glow-y', y + 'px');
    });
});

// ============================================================
// Animação de Carregamento
// ============================================================

function animateCounters() {
    const stats = document.querySelectorAll('.stat-card h3');
    
    stats.forEach(stat => {
        if (stat.textContent === '∞' || stat.textContent === '1️⃣') {
            return; // Pular stats com símbolos
        }
        
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Executar animação quando stats aparecem na tela
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}

// ============================================================
// Confirmação de Formulário
// ============================================================

function setupFormFeedback() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // Mostrar mensagem de sucesso via Formspree automaticamente
    // (Formspree redireciona ou mostra sua própria página de sucesso)
}

// ============================================================
// Log de Interação (Analytics Simples)
// ============================================================

function logInteraction(action, details) {
    console.log(`[LIAM Analytics] ${action}`, details);
    // Aqui você poderia enviar para um servidor de analytics
}

// Rastrear cliques em botões principais
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        logInteraction('Button Click', {
            text: btn.textContent,
            href: btn.href,
            time: new Date().toISOString()
        });
    });
});

// Rastrear seções visualizadas
document.querySelectorAll('section').forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logInteraction('Section Viewed', {
                    section: entry.target.id || 'unknown',
                    time: new Date().toISOString()
                });
            }
        });
    });
    observer.observe(section);
});

// ============================================================
// Dark Mode Toggle (Opcional para versão futura)
// ============================================================

function setupThemeToggle() {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';
    
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
    }
    
    // Aqui você poderia adicionar um botão de toggle
}

// ============================================================
// Adicionar Animação de Fadeup ao CSS
// ============================================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('%c🌙 LIAM - Deep Darkness Studios', 'color: #a855f7; font-size: 16px; font-weight: bold;');
console.log('%cWebsite carregado com sucesso!', 'color: #06b6d4; font-size: 12px;');
