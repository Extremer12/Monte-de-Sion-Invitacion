document.addEventListener('DOMContentLoaded', () => {
    // Añadir clase loading al body
    document.body.classList.add('loading');

    // Inicializar AOS inmediatamente
    AOS.init({
        once: false,
        mirror: true,
        easing: 'ease-in-out',
        anchorPlacement: 'top-bottom',
        duration: 800,
    });

    const loader = document.getElementById('loader');

    // Reducir el tiempo del loader y asegurar que se oculte
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.6s ease';
            
            setTimeout(() => {
                loader.style.display = 'none';
                // Remover clase loading cuando termine
                document.body.classList.remove('loading');
            }, 600);
        }
    }, 3000); // Reducido a 3 segundos

    // BeforeAfter imágenes
    new BeforeAfter({
      id: '#example',
      width: 400,
      height: 300,
      move_slider_on_hover: true,
      click_to_move: true,
    });
  
    // Variables comunes
    const video = document.getElementById('video-background');
    const playPauseButton = document.getElementById('play-pause-button');
    const muteButton = document.getElementById('mute-button');
    const backToTopButton = document.getElementById('backToTop');
    const fadeElements = document.querySelectorAll('.scroll-fade');
    const animatedText = document.getElementById('animated-text');
    const words = ['INAUGURACIÓN', 'MONTE DE SIÓN', '2024'];
  
    // Video - play/pause & mute/unmute
    playPauseButton.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
      playPauseButton.textContent = video.paused ? '▶️' : '⏸️';
    });
  
    muteButton.addEventListener('click', () => {
      video.muted = !video.muted;
      muteButton.textContent = video.muted ? '🔇' : '🔊';
    });
  
    // Video - autoplay al estar centrado
    const isElementCentered = el => {
      const rect = el.getBoundingClientRect();
      const centerScreen = window.innerHeight / 2;
      return Math.abs((rect.top + rect.height / 2) - centerScreen) < 150;
    };
  
    const handleVideoPlayback = () => {
      isElementCentered(video) ? video.play() : video.pause();
    };
  
    // Loader animado - letras máquina de escribir
    const animateLoaderText = () => {
      let wordIndex = 0, letterIndex = 0;
      const typeLetter = () => {
        if (wordIndex >= words.length) wordIndex = 0;
        const currentWord = words[wordIndex];
        if (letterIndex < currentWord.length) {
          animatedText.textContent += currentWord.charAt(letterIndex++);
          setTimeout(typeLetter, 100);
        } else {
          setTimeout(() => {
            animatedText.textContent = '';
            letterIndex = 0;
            wordIndex++;
            typeLetter();
          }, 1500);
        }
      };
      typeLetter();
    };
  
    animateLoaderText();
  
    // Countdown
    const countdown = document.getElementById('countdown');
    const targetDate = new Date('2024-05-03T00:00:00').getTime();
  
    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;
  
      if (distance <= 0) {
        countdown.textContent = '¡El evento ha comenzado!';
        clearInterval(interval);
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
  
      countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
  
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  
    // Botón "Volver arriba"
    window.addEventListener('scroll', () => {
      backToTopButton.style.opacity = window.scrollY > 200 ? '1' : '0';
    });
  
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Fade In en scroll
    const handleFadeElements = () => {
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 100) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
        }
      });
    };
  
    window.addEventListener('scroll', () => {
      handleVideoPlayback();
      handleFadeElements();
    });
  
    handleVideoPlayback();
    handleFadeElements();
  
    // Mapa Leaflet optimizado
    const map = L.map('map', { zoomControl: false }).setView([-32.48389345031723, -58.237107799999995], 16);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
  
    L.marker([-32.48389345031723, -58.237107799999995])
      .addTo(map)
      .bindPopup('<b>Monte de Sión</b>')
      .openPopup();
  
    // Cards con efecto 3D y Ripple
    const cards = document.querySelectorAll('.pastores-container');
  
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
  
        const rotateX = (y - 0.5) * 20;
        const rotateY = (x - 0.5) * -20;
  
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'transform 0.1s ease';
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.transition = 'transform 0.5s ease';
      });
  
      card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${e.clientX - card.getBoundingClientRect().left}px`;
        ripple.style.top = `${e.clientY - card.getBoundingClientRect().top}px`;
        card.appendChild(ripple);
  
        setTimeout(() => ripple.remove(), 600);
      });
    });
  });
