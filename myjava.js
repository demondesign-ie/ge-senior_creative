  // Animate skill bars on scroll into view
document.addEventListener('DOMContentLoaded', () => {
  const expertisePanel = document.querySelector('.expertise-panel');
  if (!expertisePanel) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const targetWidth = fill.getAttribute('data-width');
          if (targetWidth) fill.style.width = targetWidth;
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(expertisePanel);
});



// Grid cell tap to reveal caption on mobile
document.addEventListener('DOMContentLoaded', () => {
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  if (isTouchDevice()) {
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(cell => {
      cell.addEventListener('click', () => {
        // close any other open cells first
        gridCells.forEach(other => {
          if (other !== cell) other.classList.remove('tapped');
        });
        // toggle this cell
        cell.classList.toggle('tapped');
      });
    });
  }
});



// UX Slideshow functionality

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('#uxJsSlideshow');
  if (!slider) return;

  const slides = slider.querySelectorAll('.ux-slide');
  const dots = slider.querySelectorAll('.ux-dot');
  const prevBtn = slider.querySelector('.ux-prev');
  const nextBtn = slider.querySelector('.ux-next');

  let current = 0;
  let timer;
  const interval = 4000;

  function showSlide(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(nextSlide, interval);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  nextBtn.addEventListener('click', () => { nextSlide(); startAuto(); });
  prevBtn.addEventListener('click', () => { prevSlide(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAuto();
    });
  });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  startAuto();
});





