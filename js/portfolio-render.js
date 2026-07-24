/**
 * Подстановка фото работ из portfolio-data.js (карусель и сетка)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PORTFOLIO_WORKS === 'undefined') return;

  fillCarousel();
  fillPortfolioGrid();
});

function fillCarousel() {
  const track = document.querySelector('.works-carousel__track[data-portfolio-carousel]');
  if (!track) return;

  track.innerHTML = PORTFOLIO_WORKS.slice(0, 6).map((item) => `
    <div class="works-carousel__slide">
      <img src="${item.src}" alt="${escapeAttr(item.alt)}" loading="lazy" decoding="async">
      <div class="works-carousel__caption">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.desc)}</p>
      </div>
    </div>
  `).join('');

  if (typeof initWorksCarousel === 'function') {
    initWorksCarousel();
  }
}

function fillPortfolioGrid() {
  const grid = document.querySelector('.portfolio-grid[data-portfolio-grid]');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_WORKS.map((item) => `
    <article class="portfolio-card reveal reveal--visible">
      <div class="portfolio-card__image">
        <img class="cover-img" src="${item.src}" alt="${escapeAttr(item.alt)}" loading="lazy" decoding="async">
      </div>
      <div class="portfolio-card__body">
        <div class="portfolio-card__tags">
          ${item.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <h3 class="portfolio-card__title">${escapeHtml(item.title)}</h3>
        <p class="portfolio-card__desc">${escapeHtml(item.desc)}</p>
      </div>
    </article>
  `).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return escapeHtml(str);
}
