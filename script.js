// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
});

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMobileMenu);
closeBtn.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('scroll', () => {
  if (mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
}, { passive: true });

// Fade-up on scroll
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// Contact form handler
// Contact form → WhatsApp
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const interest = form.interest.value;
  const message = form.message.value.trim();

  const text = `Hello Odallo Guitars,%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Interest:* ${interest}%0A%0A*Message:*%0A${message}`;
  
  const whatsappURL = `https://wa.me/254707570866?text=${text}`;
  
  window.open(whatsappURL, '_blank');
  
  // Optional visual feedback
  const success = document.getElementById('form-success');
  success.classList.remove('hidden');
  form.reset();
  setTimeout(() => success.classList.add('hidden'), 4000);
}
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Always land on the home section after refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }
  window.scrollTo(0, 0);
});
/* ======================================================
   SERVICES CAROUSEL (Editorial / Workshop style)
   ====================================================== */
const IMAGE_LIST = [
    "images/estore2.jpg",
    "images/shutter.jpg",
    "images/fix1.jpg",
    "images/69mQr.jpg",
    
];

(function() {
    const track = document.getElementById('restore-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const counter = document.getElementById('carousel-counter');

    if (!track || !dotsContainer) return;

    let currentIndex = 0;
    let autoPlayInterval;

    IMAGE_LIST.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Restoration ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        track.appendChild(img);

        const dot = document.createElement('span');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const images = track.querySelectorAll('img');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const total = IMAGE_LIST.length;

    function updateCounter(index) {
        if (counter) {
            const current = String(index + 1).padStart(2, '0');
            const totalStr = String(total).padStart(2, '0');
            counter.textContent = `${current} / ${totalStr}`;
        }
    }

    function goToSlide(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;

        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
        updateCounter(index);
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4200);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    const container = track.closest('.group') || track.parentElement;
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetTimer(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetTimer(); }
    });

    function resetTimer() {
        stopAutoPlay();
        startAutoPlay();
    }

    updateCounter(0);
    startAutoPlay();
})();

document.querySelector('#services .fade-up')?.classList.add('visible');


/* ======================================================
   ACCESSORIES PREMIUM CAROUSEL
   ====================================================== */
const ACCESSORIES_IMAGES = [
    "images/ACCES.webp",
    "images/ACCES2.webp",
    "images/ACCES3.jpg"
    
];

(function() {
    const track = document.getElementById('accessories-carousel');
    const dotsContainer = document.getElementById('accessories-dots');
    const prevBtn = document.getElementById('accessories-prev');
    const nextBtn = document.getElementById('accessories-next');

    if (!track || !dotsContainer) return;

    let currentIndex = 0;
    let autoPlayInterval;

    ACCESSORIES_IMAGES.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Accessories ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        track.appendChild(img);

        const dot = document.createElement('span');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const images = track.querySelectorAll('img');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const total = ACCESSORIES_IMAGES.length;

    function goToSlide(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;

        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4500);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    const container = track.parentElement;
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetTimer(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetTimer(); }
    });

    function resetTimer() {
        stopAutoPlay();
        startAutoPlay();
    }

    startAutoPlay();
})();

/* ======================================================
   HERO PARALLAX – Android safe + better iPhone tilt
   ====================================================== */
(function () {
  const heroImg = document.getElementById('hero-img');
  const heroSection = document.getElementById('home');
  if (!heroImg || !heroSection) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   ('ontouchstart' in window);
  if (!isMobile) return;

  let isActive = false;
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let orientationActive = false;   // ← new flag

  const baseScale = 1.25;
  const maxOffset = 30;
  const ease = 0.12;

  function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    heroImg.style.transform = `scale(${baseScale}) translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  function activate() {
    if (!isActive) {
      isActive = true;
      heroImg.classList.add('parallax-active');
    }
  }

  // ---------- Device Orientation (real tilt) ----------
  function handleOrientation(e) {
    if (e.gamma == null || e.beta == null) return;
    
    orientationActive = true;   // ← mark that tilt is working
    activate();

    const x = Math.max(-1, Math.min(1, e.gamma / 35));
    const y = Math.max(-1, Math.min(1, (e.beta - 45) / 35));

    targetX = x * maxOffset * 1.6;
    targetY = y * maxOffset * 0.9;
  }

  function enableOrientation() {
    window.addEventListener('deviceorientation', handleOrientation, true);
  }

  // iOS 13+ permission flow
  function requestPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {

      DeviceOrientationEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            enableOrientation();
          } else {
            console.log('Motion permission denied');
          }
        })
        .catch(console.error);
    } else {
      // Android or older iOS → start immediately
      enableOrientation();
    }
  }

  // Ask for permission on first tap/click of the hero
  const askOnce = () => {
    requestPermission();
    heroSection.removeEventListener('click', askOnce);
    heroSection.removeEventListener('touchstart', askOnce);
  };
  heroSection.addEventListener('click', askOnce, { once: true });
  heroSection.addEventListener('touchstart', askOnce, { once: true });

  // ---------- Touch drag fallback (ONLY when tilt is not active) ----------
  let touching = false;

  heroSection.addEventListener('touchstart', () => {
    if (orientationActive) return;   // ← don’t override real tilt
    touching = true;
    activate();
  }, { passive: true });

  heroSection.addEventListener('touchmove', (e) => {
    if (!touching || orientationActive) return;  // ← key fix
    const t = e.touches[0];
    const rect = heroSection.getBoundingClientRect();

    const x = ((t.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((t.clientY - rect.top) / rect.height - 0.5) * 2;

    targetX = x * maxOffset * 1.4;
    targetY = y * maxOffset * 0.9;
  }, { passive: true });

  heroSection.addEventListener('touchend', () => {
    touching = false;
    if (!orientationActive) {
      targetX = 0;
      targetY = 0;
    }
  }, { passive: true });

})();
/* ======================================================
   ELEGANT LOADING SCREEN + HERO ANIMATIONS
   ====================================================== */
(function () {
  const loader = document.getElementById('loader');
  const logo  = document.getElementById('loader-logo');
  const line  = document.getElementById('loader-line');

  if (!loader) return;

  // 1. Start logo + line animation early
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      logo.classList.add('show');
      line.classList.add('animate');
    }, 100);
  });

  // 2. When page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Hide the loading screen
      loader.classList.add('hidden');

      // Wait a moment for the fade-out, then start premium animations
      setTimeout(() => {
        document.body.classList.add('page-loaded');

        // Gold line draws itself
        const deco = document.querySelector('#home .deco-line');
        if (deco) deco.classList.add('drawn');

        // Hero title words appear one by one
        const title = document.querySelector('.hero-title');
        if (title) title.classList.add('animate');

        // Fade-up elements already in view
        document.querySelectorAll('.fade-up').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 40) {
            el.classList.add('visible');
          }
        });

        // Typewriter starts after the title finishes
        setTimeout(startTypewriter, 2200);

      }, 700);
    }, 1800);
  });
})();


/* ======================================================
   TYPEWRITER – Hero subtitle
   ====================================================== */
function startTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const text = "masterful fretwork, and the soul of true craftsmanship.";
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 42); // typing speed
    }
  }

  type();
}


/* ======================================================
   STAGGERED SERVICE ITEMS
   ====================================================== */
(function () {
  const items = document.querySelectorAll('#services .service-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('show');
          }, index * 120); // 120ms delay between each row
        });
        observer.disconnect(); // only run once
      }
    });
  }, { threshold: 0.15 });

  // Observe the services list container
  const servicesList = document.querySelector('#services .space-y-0');
  if (servicesList) observer.observe(servicesList);
})();


/* ======================================================
   IMAGE REVEAL (Vincent + circular cards)
   ====================================================== */
(function () {
  const reveals = document.querySelectorAll('.img-reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // small stagger if multiple are visible at once
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el, i) => {
    // optional tiny stagger for the three circular cards
    if (el.closest('.grid.md\\:grid-cols-3')) {
      el.dataset.delay = i * 150;
    }
    observer.observe(el);
  });
})();

/* ======================================================
   RESTORATION + REFINISHING CARD CAROUSELS
   ====================================================== */
function createCardCarousel(trackId, dotsId, prevId, nextId, images) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!track || !dotsContainer) return;

  let current = 0;
  let timer;

  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Slide ${i + 1}`;
    img.className = i === 0 ? 'active' : '';
    track.appendChild(img);

    const dot = document.createElement('span');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const imgs = track.querySelectorAll('img');
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  const total = images.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    imgs[current].classList.remove('active');
    dots[current].classList.remove('active');
    imgs[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() {
    stop();
    timer = setInterval(next, 4000);
  }
  function stop() { clearInterval(timer); }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });

  const card = track.closest('.group');
  if (card) {
    card.addEventListener('mouseenter', stop);
    card.addEventListener('mouseleave', start);
  }

  start();
}

// Restoration card images
createCardCarousel(
  'restore-card-carousel',
  'restore-card-dots',
  'restore-card-prev',
  'restore-card-next',
  [
    'images/2.jpg',
    'images/hoHs8.jpg',
    'images/xt2Z6.jpg'
  ]
);

// Refinishing card images
createCardCarousel(
  'refinish-card-carousel',
  'refinish-card-dots',
  'refinish-card-prev',
  'refinish-card-next',
  [
    'images/restore3.jpg',
    'images/restore.jpg'
    
  ]
);

// Acoustic Guitar mini carousel
(function() {
  const slides = document.querySelectorAll('.acoustic-slide');
  const dots = document.querySelectorAll('.acoustic-dot');
  const prevBtn = document.getElementById('acoustic-prev');
  const nextBtn = document.getElementById('acoustic-next');
  
  if (!slides.length) return;

  let current = 0;
  let interval;

  function goTo(index) {
    slides[current].classList.remove('opacity-100');
    slides[current].classList.add('opacity-0');
    dots[current].classList.remove('w-8', 'bg-odallo-gold');
    dots[current].classList.add('w-3', 'bg-odallo-gold/40');

    current = (index + slides.length) % slides.length;

    slides[current].classList.remove('opacity-0');
    slides[current].classList.add('opacity-100');
    dots[current].classList.remove('w-3', 'bg-odallo-gold/40');
    dots[current].classList.add('w-8', 'bg-odallo-gold');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(interval);
    interval = setInterval(next, 4500);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      startAuto();
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Pause on hover
  const container = document.getElementById('acoustic-carousel')?.parentElement;
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', startAuto);
  }

  startAuto();
})();