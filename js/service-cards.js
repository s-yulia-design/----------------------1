/**
 * Переворот карточек услуг (разметка в services.html)
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-flip-card]').forEach((card) => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('flip-card--flipped');
      card.setAttribute('aria-expanded', flipped ? 'true' : 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.flip-card--flipped').forEach((card) => {
        card.classList.remove('flip-card--flipped');
        card.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
