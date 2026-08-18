/**
 * ART TOUCH FOR WOOD WORKS — AMMAN, JORDAN
 * Lightweight Homepage Orchestrator
 * High-performance, zero heavy loops, zero fabricated content.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderHomepageServices();
  renderHomepageProjects();
  renderHomepageFaqs();
});

/* 1. Render Homepage Core Services */
function renderHomepageServices() {
  const container = document.querySelector('#home-services-grid');
  if (!container || !window.ArtTouchData) return;

  const services = window.ArtTouchData.services ? window.ArtTouchData.services.slice(0, 6) : [];
  container.innerHTML = services.map(s => `
    <article class="service-card">
      <div style="font-size: 28px; color: var(--color-brand); margin-bottom: 12px;">
        <i class="${escapeAttr(s.icon)}"></i>
      </div>
      <div class="service-card-body" style="padding: 0;">
        <h3 class="service-title" style="font-size: var(--text-lg); margin-bottom: 6px;">${escapeHtml(s.title)}</h3>
        <p class="service-desc" style="font-size: var(--text-sm); margin-bottom: 12px;">${escapeHtml(s.shortDesc)}</p>
        <div class="service-features" style="margin-bottom: 16px;">
          ${(s.features || []).slice(0, 2).map(f => `
            <div class="service-feature-item" style="font-size: var(--text-xs);">
              <i class="fa-solid fa-check text-brand"></i> <span>${escapeHtml(f)}</span>
            </div>
          `).join('')}
        </div>
        <a href="services.html#${encodeURIComponent(s.id)}" class="project-link" style="font-size: var(--text-xs);">
          Learn More <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </article>
  `).join('');
}

/* 2. Render Homepage Projects Preview */
function renderHomepageProjects() {
  const container = document.querySelector('#home-featured-projects');
  if (!container || !window.ArtTouchData) return;

  const projects = window.ArtTouchData.projects ? window.ArtTouchData.projects.slice(0, 3) : [];
  
  if (projects.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background-color: var(--color-bg-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
        <p style="color: var(--color-text-muted); font-size: var(--text-sm);">Projects portfolio is ready for new commissions.</p>
        <a href="projects.html" class="btn btn-secondary btn-sm" style="margin-top: 8px;">Explore Portfolio</a>
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(p => {
    const hasImages = p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0;
    const coverSrc = p.coverImage || (hasImages ? p.gallery[0] : '');
    const galleryCount = hasImages ? p.gallery.length : 0;

    return `
      <article class="project-card">
        <div class="project-thumb" style="aspect-ratio: 4/3; background-color: #1A1D20; display: flex; align-items: center; justify-content: center; position: relative;">
          ${coverSrc ? `
            <img src="${escapeAttr(coverSrc)}" 
                 alt="${escapeAttr(p.title)}" 
                 loading="lazy" 
                 decoding="async" 
                 width="600" 
                 height="450" 
                 style="width: 100%; height: 100%; object-fit: cover;">
          ` : `
            <div style="text-align: center; padding: 20px; color: var(--color-text-muted);">
              <i class="fa-solid fa-folder-open" style="font-size: 32px; color: var(--color-brand); margin-bottom: 8px;"></i>
              <div style="font-size: 12px; font-weight: 600;">${escapeHtml(p.title)}</div>
            </div>
          `}
          <span class="project-category-badge">${escapeHtml(p.category)}</span>
          ${galleryCount > 0 ? `
            <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(18,20,23,0.85); color: #fff; font-size: 11px; padding: 3px 8px; border-radius: var(--radius-sm);">
              <i class="fa-regular fa-image"></i> ${galleryCount} Photos
            </span>
          ` : ''}
        </div>
        <div class="project-body">
          <div class="project-meta">
            ${p.location ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(p.location)}</span>` : ''}
            ${p.year ? `<span><i class="fa-solid fa-calendar"></i> ${escapeHtml(p.year)}</span>` : ''}
          </div>
          <h3 class="project-title"><a href="project-details.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a></h3>
          ${p.description ? `<p class="project-desc">${escapeHtml(p.description)}</p>` : ''}
          <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="project-link">
            View Project Gallery <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/* 3. Render Homepage FAQs */
function renderHomepageFaqs() {
  const container = document.querySelector('#home-faq-accordion');
  if (!container || !window.ArtTouchData) return;

  const faqs = window.ArtTouchData.faqs ? window.ArtTouchData.faqs.slice(0, 4) : [];
  container.innerHTML = faqs.map((f, idx) => `
    <div class="accordion-item ${idx === 0 ? 'is-open' : ''}">
      <button type="button" class="accordion-header" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${escapeHtml(f.q)}</span>
        <i class="fa-solid fa-chevron-down accordion-icon"></i>
      </button>
      <div class="accordion-body" ${idx === 0 ? 'style="max-height: 200px;"' : ''}>
        <div class="accordion-content">
          <p>${escapeHtml(f.a)}</p>
        </div>
      </div>
    </div>
  `).join('');

  if (window.initAccordions) window.initAccordions();
}

// Helpers
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;');
}
