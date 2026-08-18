/**
 * ART TOUCH WOODWORKS & ARCHITECTURAL JOINERY
 * Global UI Components & Widget Controllers (Sticky Header, Drawer, WhatsApp, Toasts, Lightbox)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initScrollTop();
  initAccordions();
  initActiveNav();
  initBusinessHoursStatus();
  initScrollReveal();
});

/* 1. Sticky Header */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 2. Mobile Drawer Navigation */
function initMobileDrawer() {
  const hamburger = document.querySelector('.btn-hamburger');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!hamburger || !drawerOverlay) return;

  const openDrawer = () => {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    drawerOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    drawerOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawerOverlay.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawerOverlay.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) {
      closeDrawer();
    }
  });

  // Mobile submenu toggle
  const sublistToggles = document.querySelectorAll('.mobile-nav-toggle');
  sublistToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const sublist = toggle.nextElementSibling;
      if (sublist && sublist.classList.contains('mobile-nav-sublist')) {
        sublist.classList.toggle('is-open');
        const icon = toggle.querySelector('i.fa-chevron-down');
        if (icon) {
          icon.style.transform = sublist.classList.contains('is-open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerOverlay.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* 3. Scroll to Top */
function initScrollTop() {
  const scrollBtn = document.querySelector('.btn-scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 4. Accessible Accordions */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Close other accordions in the same parent if desired
      const parent = item.closest('.accordion');
      if (parent && !parent.hasAttribute('data-allow-multiple')) {
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherBody = other.querySelector('.accordion-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-open');
        body.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* 6. Active Navigation Highlighter */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else if (href && href !== 'index.html' && currentPath.includes(href)) {
      link.classList.add('active');
    }
  });
}

/* 8. Centralized Jordan Local Time Business Hours & Live Status Component */
function initBusinessHoursStatus() {
  if (!window.ArtTouchConfig) return;

  const cfg = window.ArtTouchConfig;
  const status = cfg.getOpenStatus ? cfg.getOpenStatus() : { isOpen: true, statusText: "Open", cssClass: "status-open", details: "Sun–Thu: 9:00 AM – 6:00 PM" };
  const bHours = cfg.businessHours || { summary: "Sunday – Thursday: 9:00 AM – 6:00 PM", location: "Amman, Jordan" };

  // Update text representations across DOM
  document.querySelectorAll('.js-business-hours-text').forEach(el => {
    el.textContent = bHours.summary;
  });

  document.querySelectorAll('.js-business-location-text').forEach(el => {
    el.textContent = bHours.location || "Amman, Jordan";
  });

  document.querySelectorAll('.js-live-hours-status').forEach(el => {
    el.innerHTML = `
      <span class="live-status-pill ${status.cssClass}">
        <span class="status-dot"></span>
        <strong>${status.statusText}</strong>
        <span class="status-note">(${status.details})</span>
      </span>
    `;
  });
}

/* 9. Scroll Reveal Observer Engine */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (elements.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers
    elements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* 10. Interactive 3D Card Tilt & Specular Light Physics (Desktop) */
function initCardTiltEffect() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.authentic-project-card, .leader-card');
  
  cards.forEach(card => {
    let bounds;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      document.addEventListener('mousemove', onMouseMove);
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
      
      const maxTilt = 4; // subtle, high-end feel
      const tiltX = (center.y / (bounds.height / 2)) * -maxTilt;
      const tiltY = (center.x / (bounds.width / 2)) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
    };

    const onMouseLeave = () => {
      document.removeEventListener('mousemove', onMouseMove);
      card.style.transform = '';
      bounds = null;
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

// Make globally accessible
window.showToast = showToast;
window.initBusinessHoursStatus = initBusinessHoursStatus;
window.initScrollReveal = initScrollReveal;


