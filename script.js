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
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('form-success');
  form.classList.add('opacity-50', 'pointer-events-none');
  setTimeout(() => {
    form.reset();
    form.classList.remove('opacity-50', 'pointer-events-none');
    success.classList.remove('hidden');
    setTimeout(() => success.classList.add('hidden'), 5000);
  }, 800);
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


/* ======================================================
   SERVICES CAROUSEL (Editorial / Workshop style)
   ====================================================== */
const IMAGE_LIST = [
    "images/estore2.jpg",
    "images/fix1.jpg",
    "images/2.jpg",
    "images/restore3.jpg",
    "images/vincent-odallo.jpg",
    "images/showroom.jpg"
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
    "images/accessories.jpg",
    "images/estore2.jpg",
    "images/2.jpg",
    "images/restore3.jpg"
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
   HERO PARALLAX – Mobile Tilt + Touch Fallback
   ====================================================== */
(function () {
  const heroImg = document.getElementById('hero-img');
  const heroSection = document.getElementById('home');
  if (!heroImg || !heroSection) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   ('ontouchstart' in window);

  if (!isMobile) return; // desktop keeps the CSS Ken-Burns only

  let isActive = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const baseScale = 1.25;
  const maxOffset = 28;
  const ease = 0.1;

  // Always run the smooth animation loop
  function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    heroImg.style.transform = `scale(${baseScale}) translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  function activate() {
    if (!isActive) {
      isActive = true;
      heroImg.classList.add('parallax-active'); // kills the CSS Ken-Burns
    }
  }

  // ---------- 1. Device Orientation (real tilt) ----------
  function handleOrientation(e) {
    if (e.gamma === null || e.beta === null) return;
    activate();

    let x = Math.max(-30, Math.min(30, e.gamma)) / 30;
    let y = Math.max(-30, Math.min(30, e.beta - 45)) / 30;

    targetX = x * maxOffset * 1.5;
    targetY = y * maxOffset * 0.9;
  }

  function requestOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS – needs a user gesture
      const ask = () => {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, true);
            }
          })
          .catch(console.error);
        heroSection.removeEventListener('click', ask);
        heroSection.removeEventListener('touchstart', ask);
      };
      heroSection.addEventListener('click', ask, { once: true });
      heroSection.addEventListener('touchstart', ask, { once: true });
    } else if (window.DeviceOrientationEvent) {
      // Android & others
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  }

  requestOrientationPermission();

  // ---------- 2. Touch / Finger drag fallback ----------
  // This makes the effect work even when orientation is blocked
  let isTouching = false;

  heroSection.addEventListener('touchstart', (e) => {
    isTouching = true;
    activate();
  }, { passive: true });

  heroSection.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    const touch = e.touches[0];
    const rect = heroSection.getBoundingClientRect();

    // Map finger position to -1 → 1
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;

    targetX = x * maxOffset * 1.3;
    targetY = y * maxOffset * 0.8;
  }, { passive: true });

  heroSection.addEventListener('touchend', () => {
    isTouching = false;
    // gently return to center
    targetX = 0;
    targetY = 0;
  }, { passive: true });

})();

/* ======================================================
   ELEGANT LOADING SCREEN
   ====================================================== */
(function () {
  const loader = document.getElementById('loader');
  const logo = document.getElementById('loader-logo');
  const line = document.getElementById('loader-line');

  if (!loader) return;

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      logo.classList.add('show');
      line.classList.add('animate');
    }, 100);
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  });
})();