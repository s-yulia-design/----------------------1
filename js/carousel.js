/**
 * Карусель фото работ на главной
 */
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.works-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.works-carousel__track');
  const slides = carousel.querySelectorAll('.works-carousel__slide');
  const prevBtn = carousel.querySelector('.works-carousel__btn--prev');
  const nextBtn = carousel.querySelector('.works-carousel__btn--next');
  const dotsContainer = carousel.querySelector('.works-carousel__dots');

  if (!track || slides.length === 0) return;

  let index = 0;
  let autoplayTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'works-carousel__dot' + (i === 0 ? ' works-carousel__dot--active' : '');
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.works-carousel__dot');

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    dots.forEach((d, j) => d.classList.toggle('works-carousel__dot--active', j === index));
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  prevBtn?.addEventListener('click', () => {
    prev();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    next();
    resetAutoplay();
  });

  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) < 40) return;
    if (diff < 0) next();
    else prev();
    resetAutoplay();
  }, { passive: true });

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 6000);
  }

  resetAutoplay();
});
