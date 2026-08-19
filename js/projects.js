function getActiveProjectsList() {
  // Authoritative bundled Master Data Source (js/data.js)
  if (window.ArtTouchData && Array.isArray(window.ArtTouchData.projects) && window.ArtTouchData.projects.length > 0) {
    return window.ArtTouchData.projects;
  }
  return [];
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectsFilterPage();
  initProjectDetailsPage();
});

/* 1. Projects Portfolio Archive (projects.html) */
function initProjectsFilterPage() {
  const filterContainer = document.querySelector('#projects-grid-container');
  const filterNav = document.querySelector('#projects-filter-nav');
  const searchInput = document.querySelector('#projects-search-input');
  const pageTitleEl = document.querySelector('#projects-page-title');

  if (!filterContainer) return;

  const allProjects = getActiveProjectsList();
  if (allProjects.length === 0) {
    filterContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--color-text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 40px; color: var(--color-brand); margin-bottom: 12px;"></i>
        <h3 style="font-size: var(--text-xl); color: var(--color-text-main); margin-bottom: 4px;">No Projects Loaded</h3>
        <p style="font-size: var(--text-sm);">Default projects can be restored from the Admin Control Center.</p>
      </div>
    `;
    return;
  }

  const rawCategories = Array.from(new Set(allProjects.map(p => p && p.category).filter(Boolean)));
  const categories = rawCategories.length > 0 ? rawCategories : ['Commercial', 'Residential', 'Banks', 'Embassies', 'Government Projects'];

  // 1.1 Render Filter Pills
  if (filterNav) {
    filterNav.innerHTML = `
      <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true">
        All Projects <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${allProjects.length})</span>
      </button>
      ${categories.map(cat => {
        const count = allProjects.filter(p => p && (p.category || '').toLowerCase() === (cat || '').toLowerCase()).length;
        const normFilter = (cat || '').toLowerCase().replace(/\s+/g, '-');
        return `
          <button class="filter-btn" data-filter="${escapeAttr(normFilter)}" role="tab" aria-selected="false">
            ${escapeHtml(cat)} <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${count})</span>
          </button>
        `;
      }).join('')}
    `;
  }

  // 1.2 Render Cards
  const renderCards = (category = 'all', searchQuery = '') => {
    let filtered = allProjects;

    if (category && category !== 'all') {
      const targetCatNorm = category.toLowerCase().replace(/\s+/g, '-');
      filtered = filtered.filter(p => {
        const normCat = (p.category || '').toLowerCase().replace(/\s+/g, '-');
        return normCat === targetCatNorm;
      });
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (pageTitleEl) {
      if (!category || category === 'all') pageTitleEl.textContent = 'Projects';
      else if (category.toLowerCase() === 'banks') pageTitleEl.textContent = 'Banks';
      else if (category.toLowerCase() === 'commercial') pageTitleEl.textContent = 'Commercial Projects';
      else if (category.toLowerCase() === 'residential') pageTitleEl.textContent = 'Residential Projects';
      else if (category.toLowerCase() === 'embassies') pageTitleEl.textContent = 'EMBASSIES';
      else if (category.toLowerCase() === 'government-projects' || category.toLowerCase() === 'government projects') pageTitleEl.textContent = 'Government Projects';
      else pageTitleEl.textContent = category.toUpperCase();
    }

    if (filtered.length === 0) {
      filterContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--color-text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 40px; color: var(--color-brand); margin-bottom: 12px;"></i>
          <h3 style="font-size: var(--text-xl); color: var(--color-text-main); margin-bottom: 4px;">No Projects Found</h3>
          <p style="font-size: var(--text-sm);">Try selecting another category or clearing your search term.</p>
        </div>
      `;
      return;
    }

    filterContainer.innerHTML = filtered.map((p, idx) => {
      const coverSrc = p.coverImage || (p.gallery && p.gallery.length > 0 ? p.gallery[0] : null);

      return `
        <article class="authentic-project-card">
          <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="project-thumb-box" title="${escapeAttr(p.title)}">
            ${coverSrc ? `
              <img src="${escapeAttr(coverSrc)}" 
                   alt="${escapeAttr(p.title)}" 
                   loading="lazy" 
                   decoding="async"
                   onerror="this.onerror=null; this.src='images/logo/art-touch-logo.png'; this.style.padding='40px'; this.style.objectFit='contain';">
            ` : `
              <div style="text-align: center; color: var(--color-text-muted); padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                <i class="fa-solid fa-layer-group" style="font-size: 36px; color: var(--color-brand); margin-bottom: 10px;"></i>
                <div style="font-size: 14px; font-weight: 600; color: var(--color-text-main);">${escapeHtml(p.title)}</div>
                <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 4px;">${escapeHtml(p.category || 'Woodwork')}</div>
              </div>
            `}
          </a>
          <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="project-pill-btn">
            ${escapeHtml(p.title)}
          </a>
        </article>
      `;
    }).join('');

    if (window.initCardTiltEffect) window.initCardTiltEffect();
  };

  // 1.3 Event Delegation on Filter Container
  if (filterNav) {
    filterNav.onclick = function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterNav.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const cat = btn.getAttribute('data-filter') || 'all';
      const query = searchInput ? searchInput.value : '';
      renderCards(cat, query);
    };
  }

  // 1.4 Global Filter Function
  window.filterProjectsByCategory = function(cat) {
    if (!cat) cat = 'all';
    const norm = cat.toLowerCase().replace(/\s+/g, '-');
    if (filterNav) {
      const targetBtn = filterNav.querySelector(`[data-filter="${norm}"]`) || filterNav.querySelector(`[data-filter="all"]`);
      if (targetBtn) {
        filterNav.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
      }
    }
    const query = searchInput ? searchInput.value : '';
    renderCards(norm, query);
  };

  // 1.5 Live Search Input
  if (searchInput) {
    searchInput.oninput = function(e) {
      const activeBtn = filterNav ? filterNav.querySelector('.filter-btn.active') : null;
      const cat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      renderCards(cat, e.target.value);
    };
  }

  // 1.6 Read URL initial category
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('cat') || 'all';
  window.filterProjectsByCategory(initialCategory);
}

/* 2. Dynamic Project Details & Dedicated Gallery (project-details.html?id=...) */
function initProjectDetailsPage() {
  const detailContainer = document.querySelector('#project-detail-view');
  if (!detailContainer || !window.ArtTouchData) return;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id') || (window.ArtTouchData.projects[0] ? window.ArtTouchData.projects[0].id : 'bank-al-etihad');

  const project = (window.ArtTouchData.getProjectById && window.ArtTouchData.getProjectById(requestedId)) ||
                  window.ArtTouchData.projects.find(p => p.id.toLowerCase() === requestedId.toLowerCase()) ||
                  window.ArtTouchData.projects[0];

  if (!project) return;

  document.title = `${project.title} (${project.category}) | Art Touch for Wood Works`;

  const projectGallery = (project.gallery && Array.isArray(project.gallery)) ? project.gallery : [];
  const galleryCount = projectGallery.length;

  // Render Page Content
  detailContainer.innerHTML = `
    <!-- Page Title -->
    <section style="padding: var(--space-4xl) 0 var(--space-xl) 0; text-align: center;" data-reveal="fade-up">
      <div class="container">
        <h1 style="font-family: var(--font-heading); font-size: var(--text-4xl); font-weight: 600; color: var(--color-text-main); margin-bottom: var(--space-xs);">
          ${escapeHtml(project.title)}
        </h1>
      </div>
    </section>

    <!-- Project Gallery & Info (Matches Screenshot media_1787015567430.png) -->
    <section class="section" style="padding-top: 0; padding-bottom: var(--space-4xl);">
      <div class="container" style="max-width: 960px;">
        <div class="project-gallery-wrapper" style="max-width: 900px; margin: 0 auto;">
          
          ${galleryCount > 0 ? `
            <div class="project-slider-container" id="project-slider-main" style="position: relative; overflow: hidden; border-radius: 4px; background-color: #FFFFFF; border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); aspect-ratio: 16/10;">
              <div id="project-slider-track" style="display: flex; width: 100%; height: 100%; transition: transform 0.3s ease;">
                ${projectGallery.map((imgUrl, idx) => `
                  <div class="slider-slide" style="min-width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #FFFFFF; cursor: zoom-in;" data-gallery-index="${idx}" title="Click to open Fullscreen Lightbox">
                    <img src="${escapeAttr(imgUrl)}" alt="${escapeAttr(project.title)} - Photo ${idx + 1}" style="width: 100%; height: 100%; object-fit: contain;" loading="lazy" decoding="async">
                  </div>
                `).join('')}
              </div>

              ${galleryCount > 1 ? `
                <button type="button" class="slider-arrow prev" id="js-proj-prev" aria-label="Previous Image">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button type="button" class="slider-arrow next" id="js-proj-next" aria-label="Next Image">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              ` : ''}
            </div>

            <!-- Slider Pagination Dots -->
            ${galleryCount > 1 ? `
              <div class="slider-dots-container" id="js-proj-dots">
                ${projectGallery.map((_, idx) => `
                  <button type="button" class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
                `).join('')}
              </div>
            ` : ''}
          ` : `
            <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: 4px; padding: 60px 20px; text-align: center; box-shadow: var(--shadow-xs);">
              <i class="fa-solid fa-camera" style="font-size: 40px; color: var(--color-brand); margin-bottom: 12px;"></i>
              <h3 style="font-size: var(--text-lg); margin-bottom: 4px;">Gallery Ready</h3>
              <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin: 0;">Photos for this project will appear here.</p>
            </div>
          `}

          <!-- Project Information Under Gallery (Matches Screenshot media_1787015567430.png) -->
          <div class="project-meta-info" style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--color-border); font-size: var(--text-base); line-height: 2.2;">
            ${project.location ? `<div><strong style="color: var(--color-text-main);">Location:</strong> <span style="color: var(--color-text-body); margin-left: 6px;">${escapeHtml(project.location)}</span></div>` : ''}
            ${(project.dateCompleted || project.year) ? `<div><strong style="color: var(--color-text-main);">Date Completed:</strong> <span style="color: var(--color-text-body); margin-left: 6px;">${escapeHtml(project.dateCompleted || project.year)}</span></div>` : ''}
            ${project.area ? `<div><strong style="color: var(--color-text-main);">Area:</strong> <span style="color: var(--color-text-body); margin-left: 6px;">${escapeHtml(project.area)}</span></div>` : ''}
            ${project.description ? `<p style="margin-top: var(--space-md); font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6;">${escapeHtml(project.description)}</p>` : ''}
          </div>

          <div style="margin-top: var(--space-3xl); text-align: center;">
            <a href="projects.html?cat=${encodeURIComponent((project.category || 'Commercial').toLowerCase().replace(/\s+/g, '-'))}" class="btn btn-secondary btn-sm">
              <i class="fa-solid fa-arrow-left"></i> Back to ${escapeHtml(project.category || 'Projects')}
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- Fullscreen Lightbox Modal -->
    <div class="lightbox-modal" id="project-lightbox" role="dialog" aria-modal="true" aria-label="Fullscreen Gallery Lightbox">
      <div class="lightbox-header">
        <div class="lightbox-counter" id="lightbox-counter">01 / ${String(galleryCount).padStart(2, '0')}</div>
        <button type="button" class="lightbox-close" id="lightbox-close" aria-label="Close Lightbox">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="lightbox-body">
        <img id="lightbox-img" src="" alt="Fullscreen Project Image">
        ${galleryCount > 1 ? `
          <button type="button" class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous image">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button type="button" class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next image">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        ` : ''}
      </div>
    </div>
  `;

  // Slider & Lightbox Navigation Logic
  let currentSlide = 0;
  const sliderTrack = detailContainer.querySelector('#project-slider-track');
  const prevSlideBtn = detailContainer.querySelector('#js-proj-prev');
  const nextSlideBtn = detailContainer.querySelector('#js-proj-next');
  const dots = detailContainer.querySelectorAll('.slider-dot');
  const counterEl = detailContainer.querySelector('#js-slide-counter');

  const lightboxModal = detailContainer.querySelector('#project-lightbox');
  const lightboxImg = detailContainer.querySelector('#lightbox-img');
  const lightboxClose = detailContainer.querySelector('#lightbox-close');
  const lightboxPrev = detailContainer.querySelector('#lightbox-prev');
  const lightboxNext = detailContainer.querySelector('#lightbox-next');
  const lightboxCounter = detailContainer.querySelector('#lightbox-counter');

  const goToSlide = (slideIdx) => {
    if (!sliderTrack || projectGallery.length === 0) return;
    currentSlide = (slideIdx + projectGallery.length) % projectGallery.length;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    if (counterEl) {
      counterEl.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    dots.forEach((dot, dIdx) => {
      if (dIdx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (lightboxModal && lightboxModal.classList.contains('is-open')) {
      updateLightbox(currentSlide);
    }
  };

  const updateLightbox = (idx) => {
    if (!lightboxImg || projectGallery.length === 0) return;
    lightboxImg.src = projectGallery[idx];
    if (lightboxCounter) {
      lightboxCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(projectGallery.length).padStart(2, '0')}`;
    }
  };

  const openLightbox = (idx) => {
    if (!lightboxModal) return;
    updateLightbox(idx);
    lightboxModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(idx);
    });
  });

  // Slide click to open lightbox
  const slideElements = detailContainer.querySelectorAll('.slider-slide');
  slideElements.forEach(slide => {
    slide.addEventListener('click', () => {
      const idx = parseInt(slide.getAttribute('data-gallery-index'), 10);
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => goToSlide(currentSlide + 1));

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-body')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-open')) closeLightbox();
  });

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  const sliderBox = detailContainer.querySelector('#project-slider-main');

  if (sliderBox) {
    sliderBox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderBox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToSlide(currentSlide - 1);
      else goToSlide(currentSlide + 1);
    }
  };
}

// Utility escape helpers
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
