/**
 * ART TOUCH WOODWORKS & ARCHITECTURAL JOINERY
 * Global Site Search Engine (Ctrl+K, Modal Overlay, Safe Filter Indexing)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearchEngine();
});

function initSearchEngine() {
  const searchTriggers = document.querySelectorAll('.js-search-trigger, .btn-search-trigger');
  
  // Create search modal HTML if not already in DOM
  let searchOverlay = document.querySelector('.search-modal-overlay');
  if (!searchOverlay) {
    searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-modal-overlay';
    searchOverlay.setAttribute('role', 'dialog');
    searchOverlay.setAttribute('aria-modal', 'true');
    searchOverlay.setAttribute('aria-label', 'Site Search');
    searchOverlay.innerHTML = `
      <div class="search-modal">
        <div class="search-header">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" class="search-input" placeholder="Search woodwork, projects, services, FAQs..." autocomplete="off" spellcheck="false">
          <button type="button" class="search-close-btn js-search-close" aria-label="Close Search">ESC</button>
        </div>
        <div class="search-results" id="search-results-box">
          <div class="search-empty-state">
            <i class="fa-regular fa-keyboard" style="font-size: 28px; margin-bottom: 8px; display: block; color: var(--color-text-light);"></i>
            <p>Type keywords to search across Art Touch projects, joinery services, and processes.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(searchOverlay);
  }

  const searchInput = searchOverlay.querySelector('.search-input');
  const searchResultsBox = searchOverlay.querySelector('#search-results-box');
  const closeBtn = searchOverlay.querySelector('.js-search-close');

  const openSearch = () => {
    searchOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 50);
  };

  const closeSearch = () => {
    searchOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    searchInput.value = '';
    resetSearchResults();
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openSearch();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  // Global Keyboard Shortcuts (Ctrl+K, Cmd+K, ESC)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchOverlay.classList.contains('is-open')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
      closeSearch();
    }
  });

  // Search Logic
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      resetSearchResults();
      return;
    }
    performSearch(query, searchResultsBox);
  });

  function resetSearchResults() {
    searchResultsBox.innerHTML = `
      <div class="search-empty-state">
        <i class="fa-regular fa-compass" style="font-size: 28px; margin-bottom: 8px; display: block; color: var(--color-text-light);"></i>
        <p>Type keywords to search across Art Touch projects, joinery services, and FAQs.</p>
      </div>
    `;
  }
}

function performSearch(query, container) {
  if (!window.ArtTouchData) return;

  const data = window.ArtTouchData;
  let html = '';

  // 1. Search Projects
  const projects = data.projects || [];
  const matchedProjects = projects.filter(p => 
    (p.title && p.title.toLowerCase().includes(query)) ||
    (p.category && p.category.toLowerCase().includes(query)) ||
    (p.location && p.location.toLowerCase().includes(query)) ||
    (p.description && p.description.toLowerCase().includes(query))
  );

  // 2. Search Services
  const services = data.services || [];
  const matchedServices = services.filter(s =>
    (s.title && s.title.toLowerCase().includes(query)) ||
    (s.shortDesc && s.shortDesc.toLowerCase().includes(query))
  );

  // 3. Search FAQs
  const faqs = data.faqs || [];
  const matchedFAQs = faqs.filter(f =>
    (f.q && f.q.toLowerCase().includes(query)) ||
    (f.a && f.a.toLowerCase().includes(query))
  );

  const totalMatches = matchedProjects.length + matchedServices.length + matchedFAQs.length;

  if (totalMatches === 0) {
    container.innerHTML = `
      <div class="search-empty-state">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 28px; margin-bottom: 8px; display: block; color: var(--color-brand);"></i>
        <p>No results found for "<strong>${escapeHtml(query)}</strong>".</p>
      </div>
    `;
    return;
  }

  // Render Projects
  if (matchedProjects.length > 0) {
    html += `<div class="search-result-group"><div class="search-group-title">Projects (${matchedProjects.length})</div>`;
    matchedProjects.forEach(p => {
      html += `
        <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="search-result-item">
          <div class="search-result-icon"><i class="fa-solid fa-cube"></i></div>
          <div class="search-result-info">
            <div class="dropdown-title">${highlightText(p.title, query)}</div>
            <div class="dropdown-desc">${escapeHtml(p.category || 'Woodwork')} ${p.location ? '• ' + escapeHtml(p.location) : ''}</div>
          </div>
        </a>
      `;
    });
    html += `</div>`;
  }

  // Render Services
  if (matchedServices.length > 0) {
    html += `<div class="search-result-group"><div class="search-group-title">Services (${matchedServices.length})</div>`;
    matchedServices.forEach(s => {
      html += `
        <a href="services.html#${encodeURIComponent(s.id)}" class="search-result-item">
          <div class="search-result-icon"><i class="${escapeAttr(s.icon || 'fa-solid fa-hammer')}"></i></div>
          <div class="search-result-info">
            <div class="dropdown-title">${highlightText(s.title, query)}</div>
            <div class="dropdown-desc">${highlightText(s.shortDesc, query)}</div>
          </div>
        </a>
      `;
    });
    html += `</div>`;
  }

  // Render FAQs
  if (matchedFAQs.length > 0) {
    html += `<div class="search-result-group"><div class="search-group-title">FAQs (${matchedFAQs.length})</div>`;
    matchedFAQs.forEach(f => {
      html += `
        <a href="faq.html" class="search-result-item">
          <div class="search-result-icon"><i class="fa-solid fa-circle-question"></i></div>
          <div class="search-result-info">
            <div class="dropdown-title">${highlightText(f.q, query)}</div>
            <div class="dropdown-desc">${highlightText(f.a.substring(0, 100) + '...', query)}</div>
          </div>
        </a>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

function highlightText(text, query) {
  if (!text) return '';
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark style="background-color: var(--color-brand-light); color: var(--color-brand); padding: 0 2px; border-radius: 2px;">$1</mark>');
}

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
