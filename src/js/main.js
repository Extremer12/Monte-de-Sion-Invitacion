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

    // Control de sonido del video
    const video = document.getElementById('hero-video');
    const muteButton = document.getElementById('muteButton');
    
    // Iniciar con sonido
    video.muted = false;
    
    muteButton.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
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
  

  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  });
  
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

function initMap() {
    const ubicacion = { lat: -31.533021, lng: -68.506867}; // Actualiza con tus coordenadas correctas
    
    const mapa = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 18,
        center: ubicacion,
        styles: [
            {
                // Opcional: Puedes agregar estilos personalizados para el mapa
            }
        ]
    });
    
    const marcador = new google.maps.Marker({
        position: ubicacion,
        map: mapa,
        title: "Monte de Sion",
        animation: google.maps.Animation.DROP // Agrega una animación al marcador
    });
}
