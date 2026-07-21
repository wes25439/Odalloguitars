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

menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

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
   HERO PARALLAX – Fixed for iPhone Safari
   ====================================================== */
(function () {
  const heroImg = document.getElementById('hero-img');
  const heroSection = document.getElementById('home');
  if (!heroImg || !heroSection) return;

  // Only on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) return;

  let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
  const baseScale = 1.40;
  const maxOffset = 20;
  const ease = 0.1;

  function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    heroImg.style.transform = `scale(${baseScale}) translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  function handleOrientation(e) {
    if (e.gamma == null || e.beta == null) return;

    const x = Math.max(-20, Math.min(20, e.gamma)) / 20;
    const y = Math.max(-20, Math.min(20, e.beta - 45)) / 20;

    targetX = x * maxOffset * 1.4;
    targetY = y * maxOffset;
  }

  // Critical: request permission SYNCHRONOUSLY inside the touch event
  function requestPermission(e) {
    e.preventDefault(); // helps keep the gesture

    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {

      DeviceOrientationEvent.requestPermission()
        .then(function (response) {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            // Optional: give feedback
            heroSection.style.borderBottom = '2px solid #C9A86C';
            setTimeout(() => heroSection.style.borderBottom = '', 1500);
          } else {
            alert('Motion permission denied. Please allow it in Settings > Safari.');
          }
        })
        .catch(console.error);

    } else {
      // Android fallback
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    // Remove the listener after first try
    heroSection.removeEventListener('touchend', requestPermission);
  }

  // Use touchend (more reliable than touchstart on iOS)
  heroSection.addEventListener('touchend', requestPermission, { once: true });

})();