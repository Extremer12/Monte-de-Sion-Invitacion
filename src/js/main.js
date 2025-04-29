document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
      duration: 1000,
      once: true
    });
  
    // Toggle Antes/Después
    const toggleBtns = document.querySelectorAll(".toggle-btn");
    const beforeImg = document.querySelector(".transform-img.before");
    const afterImg = document.querySelector(".transform-img.after");
  
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
  
        if (btn.dataset.view === "before") {
          beforeImg.classList.add("active");
          afterImg.classList.remove("active");
        } else {
          afterImg.classList.add("active");
          beforeImg.classList.remove("active");
        }
      });
    });

    // Manejo del video
    const video = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteButton = document.getElementById('muteButton');
    let isVideoPlaying = false;

    // Función para actualizar el ícono de play/pause
    function updatePlayPauseIcon() {
        playPauseBtn.innerHTML = isVideoPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    }

    // Control de reproducción
    playPauseBtn.addEventListener('click', function() {
        if (isVideoPlaying) {
            video.pause();
            isVideoPlaying = false;
        } else {
            video.play().then(() => {
                isVideoPlaying = true;
            }).catch(error => {
                console.log("Error reproduciendo el video:", error);
            });
        }
        updatePlayPauseIcon();
    });

    // Control de sonido
    muteButton.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Actualizar estado cuando el video termine
    video.addEventListener('ended', function() {
        isVideoPlaying = false;
        updatePlayPauseIcon();
    });

    // Manejo mejorado del video
    const videoSection = document.querySelector('.video-section');

    // Función para verificar si el elemento está en el centro del viewport
    function isElementCentered(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + (rect.height / 2);
        const viewportCenter = windowHeight / 2;
        const tolerance = 100;
        return Math.abs(elementCenter - viewportCenter) < tolerance;
    }

    // Función para manejar el video
    function handleVideo() {
        if (isElementCentered(videoSection)) {
            if (!isVideoPlaying) {
                // Asegurarse de que el video sea visible
                video.style.display = 'block';
                // Intentar reproducir el video
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isVideoPlaying = true;
                        video.muted = false;
                        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                    }).catch(error => {
                        console.log("Error reproduciendo el video:", error);
                    });
                }
            }
        } else {
            if (isVideoPlaying) {
                video.pause();
                isVideoPlaying = false;
            }
        }
    }

    // Escuchar el scroll con throttle para mejor rendimiento
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleVideo();
                scrollTimeout = null;
            }, 50);
        }
    });

    // Verificar la posición inicial después de que el video esté listo
    video.addEventListener('loadeddata', function() {
        handleVideo();
    });

    // Aumentar el tiempo del loader
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1000);
    }, 12000); // Aumentado a 15 segundos

    // Configuración del loader
    const loader = document.getElementById('loader');
    
    // Asegurarse de que el loader esté visible al inicio
    loader.style.opacity = '1';
    loader.style.display = 'flex';

    // Timer para ocultar el loader después de 15 segundos
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1000);
    }, 15000);

    // Animación de letras del loader
    const letters = document.querySelectorAll('.loader-title .letter');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });
  
    // Configuración mejorada de AOS
    AOS.init({
        duration: 1000,
        once: false, // Cambiado a false para que las animaciones se repitan
        mirror: true, // Habilita las animaciones en ambas direcciones
        offset: 120, // Ajusta cuándo comienza la animación
        anchorPlacement: 'top-bottom', // Ancla la animación al entrar en viewport
        easing: 'ease-out-back', // Agrega un efecto más suave
    });

    // Reiniciar AOS en cambios de scroll significativos
    window.addEventListener('scroll', function() {
        if (window.scrollY % 200 === 0) { // Cada 200px de scroll
            AOS.refresh();
        }
    });
  });
  
  const eventDate = new Date("May 3, 2024 18:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}, 1000);


// Mostrar/Ocultar botón al hacer scroll
window.addEventListener("scroll", () => {
    const btn = document.getElementById("scrollTopBtn");
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
  
  // Volver arriba con animación
  document.getElementById("scrollTopBtn").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  

/*
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
});
*/
  
  const scrollElements = document.querySelectorAll(".scroll-fade");

const scrollInView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= window.innerHeight - 100;
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (scrollInView(el)) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// Inicialización del mapa de manera segura
document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('mapa').setView([-31.5329083, -68.50687854937222], 16);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([-31.5329083, -68.50687854937222])
        .addTo(map)
        .bindPopup('Monte de Sión<br>Miguel Ridao F. Norte 40')
        .openPopup();
});

// Efecto 3D para las tarjetas de pastores
document.querySelectorAll('.pastor-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

document.querySelectorAll('.pastor-item').forEach(card => {
    card.addEventListener('click', function(e) {
        let ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        let rect = this.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 1000);
    });
});

// Ajustar el tiempo del loader
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    
    // Asegurarse de que el loader esté visible inicialmente
    loader.style.opacity = '1';
    loader.style.display = 'flex';

    // Ocultar el loader después de la animación
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1000);
    }, 4000); // Aumentado a 4 segundos para ver la animación completa
});

document.addEventListener('DOMContentLoaded', function() {
    const loaderLogo = document.querySelector('.loader-logo');
    
    loaderLogo.addEventListener('error', function() {
        console.error('Error al cargar el logo');
        // Mostrar un icono de respaldo si la imagen no carga
        this.style.display = 'none';
        this.parentElement.innerHTML += '<i class="fas fa-church" style="font-size: 5rem; color: var(--color-gold); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>';
    });

    loaderLogo.addEventListener('load', function() {
        console.log('Logo cargado correctamente');
    });
});
