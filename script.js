tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
        },
        secondary: {
          500: "#64748b",
          600: "#475569",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
    },
  },
};

const btn = document.querySelector(".mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Cerrar al hacer clic fuera del menú
document.addEventListener("click", (event) => {
  if (!btn.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add("hidden");
  }
});

// Cerrar al hacer clic en un enlace del menú
const menuLinks = document.querySelectorAll(".mobile-menu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
  });
});

// Animación al hacer scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("shadow-lg");
    nav.classList.add("bg-white");
    nav.classList.remove("bg-opacity-90");
  } else {
    nav.classList.remove("shadow-lg");
    nav.classList.add("bg-opacity-90");
  }
});

// Lightbox para la galería
document.addEventListener("DOMContentLoaded", function () {
  // Crear elementos del lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <button class="absolute top-4 right-4 text-white text-3xl hover:text-primary-400 transition-colors duration-200">&times;</button>
                    <img class="max-w-full max-h-screen" src="" alt="">
                    <div class="absolute bottom-8 left-0 right-0 text-center text-white text-lg"></div>
                </div>
            `;
  document.body.appendChild(lightbox);

  const images = document.querySelectorAll(".gallery-item img");
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  const lbCaption = lb.querySelector("div");
  const closeBtn = lb.querySelector("button");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      lbImg.src = image.src;
      lbCaption.textContent = image.alt;
      lb.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", () => {
    lb.classList.remove("active");
    document.body.style.overflow = "";
  });

  lb.addEventListener("click", (e) => {
    if (e.target === lb) {
      lb.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Animación de scroll para las secciones
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Validación del formulario
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let isValid = true;

    // Validar nombre
    if (nombre === "") {
      isValid = false;
      document.getElementById("nombre").classList.add("border-red-500");
    } else {
      document.getElementById("nombre").classList.remove("border-red-500");
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      document.getElementById("email").classList.add("border-red-500");
    } else {
      document.getElementById("email").classList.remove("border-red-500");
    }

    // Validar mensaje
    if (mensaje === "") {
      isValid = false;
      document.getElementById("mensaje").classList.add("border-red-500");
    } else {
      document.getElementById("mensaje").classList.remove("border-red-500");
    }

    if (isValid) {
      // Simular envío (en un caso real sería una petición AJAX)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Enviado!';

        // Mostrar mensaje de éxito
        const successMsg = document.createElement("div");
        successMsg.className =
          "mt-4 p-4 bg-green-100 text-green-700 rounded-lg";
        successMsg.innerHTML =
          "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.";
        contactForm.appendChild(successMsg);

        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          successMsg.remove();
        }, 3000);
      }, 1500);
    }
  });
}

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
