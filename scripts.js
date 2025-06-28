// =====================
// Syslity - Scripts UI/UX Modernos (REESTRUCTURADO)
// =====================
const body = document.body;

// Inicialización principal
window.addEventListener('DOMContentLoaded', () => {
  hideLoader();
  createLoaderParticles();
  initializeAnimations();
  heroTypewriter();
  revealOnScroll();
  animateRatingsAndSkills();
});
window.addEventListener('load', hideLoader);

function initializeAnimations() {
  // Smooth scroll con offset para navbar sticky
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        if (window.innerWidth < 900) closeMobileMenu();
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Theme toggle
  const themeToggleCheckbox = document.querySelector('#theme-toggle-switch');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');
  const isLight = savedTheme === 'light' || (!savedTheme && !prefersDarkScheme.matches);
  body.classList.toggle('light-theme', isLight);
  if (themeToggleCheckbox) themeToggleCheckbox.checked = isLight;
  if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener('change', () => {
      const isLightMode = themeToggleCheckbox.checked;
      body.classList.toggle('light-theme', isLightMode);
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
  }

  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    body.style.overflow = '';
  }
  if (mobileMenuBtn && mobileMenu && mobileOverlay) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });

  // Scroll to top
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollTopBtn.style.transform = 'scale(0.8)';
    setTimeout(() => { scrollTopBtn.style.transform = 'scale(1)'; }, 200);
  });

  // Contact form feedback visual
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const formInputs = contactForm.querySelectorAll('.form-input');
    formInputs.forEach(input => {
      const label = input.parentElement.querySelector('.form-label');
      const icon = input.parentElement.querySelector('.input-icon');
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        label.classList.add('active');
        if (icon) icon.style.color = 'var(--secondary)';
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
          label.classList.remove('active');
          if (icon) icon.style.color = '';
        }
      });
      input.addEventListener('input', () => {
        if (input.value) {
          input.classList.add('valid');
          if (icon) icon.style.color = 'var(--secondary)';
        } else {
          input.classList.remove('valid');
          if (icon) icon.style.color = '';
        }
      });
    });
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
        submitBtn.classList.add('success');
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
        }, 2000);
      }, 1500);
    });
  }

  // Newsletter form feedback visual
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const button = newsletterForm.querySelector('button');
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      button.disabled = true;
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-paper-plane"></i>';
          button.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
}

// Loader animado Syslity funcional
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 900);
  }
}

// Loader interactivo con partículas y animación de glow
function createLoaderParticles() {
  const container = document.querySelector('.loader-logo-container');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'loader-particles';
  canvas.width = 180;
  canvas.height = 180;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = Array.from({length: 24}, (_,i) => ({
    angle: Math.random()*2*Math.PI,
    radius: 60+Math.random()*30,
    size: 3+Math.random()*3,
    speed: 0.008+Math.random()*0.012,
    color: i%2===0 ? '#00b4d8' : '#48cae4',
    phase: Math.random()*2*Math.PI
  }));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.angle += p.speed;
      const x = 90 + Math.cos(p.angle+p.phase)*p.radius;
      const y = 90 + Math.sin(p.angle+p.phase)*p.radius;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, 2*Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// Hero efecto de escritura mejorado
function heroTypewriter() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;
  const lines = Array.from(heroTitle.querySelectorAll('.title-line'));
  lines.forEach(line => line.style.opacity = 0);
  let i = 0;
  function typeLine() {
    if (i >= lines.length) return;
    const text = lines[i].textContent;
    lines[i].textContent = '';
    lines[i].style.opacity = 1;
    let j = 0;
    function typeChar() {
      if (j < text.length) {
        lines[i].textContent += text[j];
        j++;
        setTimeout(typeChar, 38);
      } else {
        i++;
        setTimeout(typeLine, 350);
      }
    }
    typeChar();
  }
  setTimeout(typeLine, 400);
}

// Animaciones de aparición al hacer scroll en cards y formularios
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.feature-card, .tecnico-card, .producto-card, .contact-form-wrapper');
  const reveal = () => {
    const trigger = window.innerHeight * 0.88;
    revealEls.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add('animate');
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();
}

// Microinteracciones visuales en ratings y skills
function animateRatingsAndSkills() {
  document.querySelectorAll('.tecnico-rating i').forEach((star, idx) => {
    star.style.animationDelay = (idx * 0.12) + 's';
  });
  document.querySelectorAll('.tecnico-skills li').forEach((skill, idx) => {
    skill.style.animationDelay = (idx * 0.18) + 's';
  });
}