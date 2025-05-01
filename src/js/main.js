document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.getElementById('loader');
    document.body.classList.add('loading');

    // Hide loader after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 400); // Reducir de 600ms a 400ms
        }, 1000); // Reducir de 1500ms a 1000ms
    });

    // Efecto de parallax en welcome
    const welcome = document.querySelector('.welcome');
    const welcomeContent = document.querySelector('.welcome-content');
    
    // Prevenir errores de undefined
    if (welcome && welcomeContent) {
        // Hacer el efecto más suave
        welcome.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 15; // Reducir de 20 a 15
            const y = (clientY / window.innerHeight - 0.5) * 15;
            welcomeContent.style.transform = `translate(${x}px, ${y}px)`;
            welcomeContent.style.transition = 'transform 0.1s ease-out';
        });
    }

    // Scroll suave al hacer clic en el indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.video-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Efecto de partículas doradas interactivo
    const particles = document.querySelector('.particles-golden');
    welcome.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        particles.style.setProperty('--x', `${clientX}px`);
        particles.style.setProperty('--y', `${clientY}px`);
    });

    // 1. Inicializar AOS para animaciones al scroll
    AOS.init({
        once: false,
        mirror: true,
        duration: 800,
        offset: 100, // Aumentar offset para mejor timing
        delay: 100, // Añadir pequeño delay
        easing: 'ease-out-cubic' // Transición más suave
    });

    // 2. Control del video
    const video = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteButton = document.getElementById('muteButton');

    if (playPauseBtn && video) {
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    if (muteButton && video) {
        muteButton.addEventListener('click', () => {
            video.muted = !video.muted;
            muteButton.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });
    }

    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(() => {
                console.log('Autoplay prevented');
            });
        });
    }

    // Mapa
    const mapElement = document.getElementById('mapa');
    if (mapElement) {
        const lat = -31.5329083;
        const lng = -68.50687854937222;
        
        const map = L.map('mapa', {
            zoomControl: true,
            scrollWheelZoom: false,
            maxZoom: 18,
            minZoom: 12,
            dragging: !L.Browser.mobile // Deshabilitar arrastre en móviles
        }).setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup("<b>Monte de Sión</b><br>¡Te esperamos!").openPopup();
    }

    // 4. Botones antes/después
    const beforeAfterBtns = document.querySelectorAll('.toggle-btn');
    const beforeImg = document.querySelector('.transform-img.before');
    const afterImg = document.querySelector('.transform-img.after');

    beforeAfterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            beforeAfterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (view === 'before') {
                beforeImg.classList.add('active');
                afterImg.classList.remove('active');
            } else {
                afterImg.classList.add('active');
                beforeImg.classList.remove('active');
            }
        });
    });

    // 5. Botón volver arriba
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0';
            }
        }, 150));

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Efectos en las tarjetas de pastores
    const pastorItems = document.querySelectorAll('.pastor-item');
    pastorItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) rotateX(10deg) rotateY(10deg) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Control deslizante de transformación
    const beforeAfterContainer = document.querySelector('.before-after-container');
    const sliderHandle = document.querySelector('.slider-handle');
    const beforeImage = document.querySelector('.transform-img.before');
    const afterImage = document.querySelector('.transform-img.after');

    let isDragging = false;

    const handleResize = (e) => {
        if (!beforeAfterContainer) return;
        
        const rect = beforeAfterContainer.getBoundingClientRect();
        let x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        x = Math.max(rect.left, Math.min(x, rect.right));
        
        const percentage = ((x - rect.left) / rect.width) * 100;
        
        beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
        sliderHandle.style.left = `${percentage}%`;
    };

    if (beforeAfterContainer && sliderHandle) {
        beforeAfterContainer.addEventListener('mousedown', () => isDragging = true);
        beforeAfterContainer.addEventListener('touchstart', () => isDragging = true);
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            handleResize(e);
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            handleResize(e);
        });
        
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('touchend', () => isDragging = false);
    }
});

// Debouncing para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}