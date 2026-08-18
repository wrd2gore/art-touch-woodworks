/**
 * ============================================================================
 * ART TOUCH FOR WOOD WORKS — AMMAN, JORDAN
 * Universal Website Hydrator & Single Source of Truth Engine
 * Automatically hydrates Home, Services, Projects, Contact, and Footers from ArtTouchData
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  hydrateBusinessInfoAcrossWebsite();
  renderHomepageServices();
  renderHomepageProjects();
  renderHomepageFaqs();
  renderServicesPageList();
  exposeBuildSignature();
});

/* 1. Global Business & Contact Information Hydration */
function hydrateBusinessInfoAcrossWebsite() {
  if (!window.ArtTouchData || !window.ArtTouchData.businessHours) return;
  const biz = window.ArtTouchData.businessHours;

  // Phone numbers
  if (biz.phone) {
    document.querySelectorAll('a[href^="tel:"]').forEach(el => {
      el.setAttribute('href', `tel:${biz.phoneClean || biz.phone.replace(/[^0-9+]/g, '')}`);
      if (el.textContent.includes('+962') || el.textContent.includes('Call')) {
        el.innerHTML = el.querySelector('i') ? `<i class="fa-solid fa-phone"></i> ${escapeHtml(biz.phone)}` : escapeHtml(biz.phone);
      }
    });
  }

  // General Email
  if (biz.emails && biz.emails.general) {
    document.querySelectorAll('a[href^="mailto:info@arttouchjo.com"]').forEach(el => {
      el.setAttribute('href', `mailto:${biz.emails.general}`);
      el.textContent = biz.emails.general;
    });
  }

  // GM Email
  if (biz.emails && biz.emails.generalManager) {
    document.querySelectorAll('a[href^="mailto:m.shaheen@arttouchjo.com"]').forEach(el => {
      el.setAttribute('href', `mailto:${biz.emails.generalManager}`);
      el.textContent = biz.emails.generalManager;
    });
  }

  // CEO Email
  if (biz.emails && biz.emails.ceoPlantManager) {
    document.querySelectorAll('a[href^="mailto:m.maghari@arttouchjo.com"]').forEach(el => {
      el.setAttribute('href', `mailto:${biz.emails.ceoPlantManager}`);
      el.textContent = biz.emails.ceoPlantManager;
    });
  }

  // Location / Address
  if (biz.location) {
    document.querySelectorAll('.footer-contact-item span, .js-business-location').forEach(el => {
      if (el.textContent.includes('Nadhmi Abdul Hadi') || el.textContent.includes('Amman')) {
        el.textContent = biz.location;
      }
    });
  }
}

/* 2. Render Homepage Core Services */
function renderHomepageServices() {
  const container = document.querySelector('#home-services-grid');
  if (!container || !window.ArtTouchData) return;

  const services = window.ArtTouchData.services ? window.ArtTouchData.services.slice(0, 6) : [];
  container.innerHTML = services.map(s => `
    <article class="service-card">
      <div style="font-size: 28px; color: var(--color-brand); margin-bottom: 12px;">
        <i class="${escapeAttr(s.icon || 'fa-solid fa-tree')}"></i>
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

/* 3. Render Services Page Full Deep-Dive List (services.html) */
function renderServicesPageList() {
  const container = document.querySelector('#services-full-list');
  if (!container || !window.ArtTouchData || !window.ArtTouchData.services) return;

  const services = window.ArtTouchData.services;
  if (services.length === 0) return;

  container.innerHTML = services.map((s, idx) => `
    <article class="service-card" id="${escapeAttr(s.id)}" style="padding: var(--space-2xl);">
      <div style="font-size: 32px; color: var(--color-brand); margin-bottom: var(--space-md);">
        <i class="${escapeAttr(s.icon || 'fa-solid fa-hammer')}"></i>
      </div>
      <div class="service-card-body" style="padding: 0;">
        <span class="badge badge-brand" style="margin-bottom: 8px;">
          <i class="${escapeAttr(s.icon || 'fa-solid fa-hammer')}"></i> Division ${idx + 1}
        </span>
        <h2 class="service-title" style="font-size: var(--text-2xl); margin-bottom: 8px;">${escapeHtml(s.title)}</h2>
        <p class="service-desc" style="font-size: var(--text-sm); margin-bottom: var(--space-lg);">
          ${escapeHtml(s.shortDesc)}
        </p>
        <div class="service-features" style="margin-bottom: var(--space-xl);">
          ${(s.features || []).map(f => `
            <div class="service-feature-item">
              <i class="fa-solid fa-check text-brand"></i> ${escapeHtml(f)}
            </div>
          `).join('')}
        </div>
        <a href="quote.html?project=${encodeURIComponent(s.title)}" class="btn btn-primary btn-block" style="margin-top: auto;">
          <i class="fa-solid fa-calculator"></i> Request Quote for ${escapeHtml(s.title)}
        </a>
      </div>
    </article>
  `).join('');
}

/* 4. Render Homepage Projects Preview */
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
                 style="width: 100%; height: 100%; object-fit: cover;"
                 onerror="this.onerror=null; this.src='images/logo/art-touch-logo.png'; this.style.padding='30px'; this.style.objectFit='contain';">
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
            ${p.dateCompleted ? `<span><i class="fa-solid fa-calendar"></i> ${escapeHtml(p.dateCompleted)}</span>` : ''}
          </div>
          <h3 class="project-title"><a href="project-details.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a></h3>
          ${p.description ? `<p class="project-desc">${escapeHtml(p.description)}</p>` : ''}
          <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="project-link">
            View Project Details <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/* 5. Render Homepage FAQs */
function renderHomepageFaqs() {
  const container = document.querySelector('#home-faq-accordion');
  if (!container || !window.ArtTouchData) return;

  const faqs = window.ArtTouchData.faqs ? window.ArtTouchData.faqs.slice(0, 5) : [];
  container.innerHTML = faqs.map((f, idx) => `
    <div class="accordion-item ${idx === 0 ? 'is-open' : ''}">
      <button type="button" class="accordion-header" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${escapeHtml(f.q)}</span>
        <i class="fa-solid fa-chevron-down accordion-icon"></i>
      </button>
      <div class="accordion-body" ${idx === 0 ? 'style="max-height: 250px;"' : ''}>
        <div class="accordion-content">
          <p>${escapeHtml(f.a)}</p>
        </div>
      </div>
    </div>
  `).join('');

  if (window.initAccordions) window.initAccordions();
}

/* 6. Expose Deployed Build Signature */
function exposeBuildSignature() {
  if (!window.ArtTouchData) return;
  const buildId = window.ArtTouchData.buildId || 'master';
  const ver = window.ArtTouchData.version || '1.0';

  // Inject meta tag if not present
  let meta = document.querySelector('meta[name="arttouch-build-id"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'arttouch-build-id';
    document.head.appendChild(meta);
  }
  meta.content = buildId;

  // Add build tag to footer
  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !document.getElementById('site-build-signature')) {
    const sig = document.createElement('div');
    sig.id = 'site-build-signature';
    sig.style.cssText = 'font-size: 10px; color: rgba(255,255,255,0.35); font-family: monospace; margin-top: 4px;';
    sig.textContent = `Build: ${buildId} (v${ver})`;
    footerBottom.appendChild(sig);
  }
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
