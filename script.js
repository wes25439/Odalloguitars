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
// Mobile menu
// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevents page from scrolling behind the menu
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = ''; // Restores scrolling
}

menuBtn.addEventListener('click', openMobileMenu);
closeBtn.addEventListener('click', closeMobileMenu);

// Close when clicking any navigation link
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close when user scrolls
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
   PREMIUM CAROUSEL for Odallo Guitars
   Type your image paths directly in the array below.
   ====================================================== */

// 👇 TYPE YOUR IMAGE FILE NAMES HERE (one per line) 👇
const IMAGE_LIST = [
    "images/estore2.jpg",
    "images/fix1.jpg",
    "images/2.jpg",
    "images/restore3.jpg",
    "images/vincent-odallo.jpg",
    "images/showroom.jpg"
];
// 👆 add or remove lines to match your images

(function() {
    const track = document.getElementById('restore-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!track || !dotsContainer) return; // safety check

    let currentIndex = 0;
    let autoPlayInterval;

    // Build images and dots
    IMAGE_LIST.forEach((src, index) => {
        // Create image
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Restoration ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        track.appendChild(img);

        // Create dot
        const dot = document.createElement('span');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const images = track.querySelectorAll('img');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const total = IMAGE_LIST.length;

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
        stopAutoPlay(); // avoid double intervals
        autoPlayInterval = setInterval(nextSlide, 4000);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Button events
    if (nextBtn) nextBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });

    // Hover pause
    const container = track.parentElement;
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation (accessibility)
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetTimer(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetTimer(); }
    });

    function resetTimer() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Start the show
    startAutoPlay();
})();

document.querySelector('#services .fade-up').classList.add('visible');

/* ======================================================
   HERO PARALLAX – Mobile Tilt Only
   ====================================================== */
(function () {
  const heroImg = document.getElementById('hero-img');
  const heroSection = document.getElementById('home');
  if (!heroImg || !heroSection) return;

  // Only run the effect on mobile / touch devices
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   ('ontouchstart' in window);

  if (!isMobile) {
    // On desktop → just keep a very subtle Ken-Burns (or remove completely)
    return; // ← this removes all movement on desktop
  }

  let isActive = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const baseScale = 1.40;     // larger scale so edges never show
  const maxOffset = 22;
  const ease = 0.09;

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
      heroImg.classList.add('parallax-active');
    }
  }

  // Device tilt only
  function handleOrientation(e) {
    if (e.gamma === null || e.beta === null) return;
    activate();

    let x = Math.max(-25, Math.min(25, e.gamma)) / 25;
    let y = Math.max(-25, Math.min(25, e.beta - 45)) / 25;

    targetX = x * maxOffset * 1.5;
    targetY = y * maxOffset * 1.1;
  }

  // iOS permission
  function requestOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
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
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  }

  requestOrientationPermission();
})();

/* ======================================================
   ELEGANT LOADING SCREEN
   ====================================================== */
(function () {
  const loader = document.getElementById('loader');
  const logo = document.getElementById('loader-logo');
  const line = document.getElementById('loader-line');

  if (!loader) return;

  // Start animation shortly after page begins loading
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      logo.classList.add('show');
      line.classList.add('animate');
    }, 100);
  });

  // Hide loader when everything is ready
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800); // waits for the line animation to finish
  });
})();




