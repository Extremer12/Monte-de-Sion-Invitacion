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

    // Manejo mejorado del video
    const video = document.getElementById('hero-video');
    const muteButton = document.getElementById('muteButton');
    const videoSection = document.querySelector('.video-section');
    let isVideoPlaying = false;

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

    // Control de sonido manual
    muteButton.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

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
    }, 15000); // Aumentado a 15 segundos

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

// Inicialización del mapa
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
