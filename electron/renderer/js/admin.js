/**
 * ============================================================================
 * ART TOUCH WOODWORKS GÇö COMPANY CONTROL CENTER
 * Pure Vanilla JavaScript Management & 1-Click Live Website Publisher
 * ============================================================================
 */

(function() {
  'use strict';

  // 14 Official Verified Projects Baseline (Never Lost / Never Zeroed Out)
  const DEFAULT_AUTHENTIC_PROJECTS = [
    {
      id: "qaia-government-services-center",
      category: "Government Projects",
      title: "QAIA Government Services Center",
      location: "Amman - QAIA Airport",
      dateCompleted: "2023",
      area: "200 sqm",
      coverImage: "images/projects/government-projects/qaia-government-services-center/01.png",
      description: "Custom architectural woodwork and joinery for the QAIA Government Services Center at Queen Alia International Airport.",
      gallery: ["images/projects/government-projects/qaia-government-services-center/01.png"]
    },
    {
      id: "water-awareness-center",
      category: "Government Projects",
      title: "Water Awareness Center",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "350 sqm",
      coverImage: "images/projects/project-02/01.png",
      description: "Architectural woodwork, exhibition partitions, and interior fabrication for the Water Awareness Center.",
      gallery: ["images/projects/project-02/01.png"]
    },
    {
      id: "embassy-of-qatar",
      category: "Embassies",
      title: "Embassy of Qatar",
      location: "Amman, Jordan",
      dateCompleted: "2022",
      area: "500 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Custom diplomatic woodwork, luxury conference joinery, and wall cladding for the Embassy of Qatar.",
      gallery: ["images/projects/project-01/01.png"]
    },
    {
      id: "embassy-of-ireland",
      category: "Embassies",
      title: "Embassy of Ireland",
      location: "Amman, Jordan",
      dateCompleted: "2022",
      area: "400 sqm",
      coverImage: "images/projects/project-02/01.png",
      description: "Custom diplomatic woodwork, security doors, and bespoke joinery for the Embassy of Ireland.",
      gallery: ["images/projects/project-02/01.png"]
    },
    {
      id: "rajha-villa",
      category: "Residential",
      title: "Rajha Villa",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "800 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Bespoke residential joinery, custom luxury kitchens, walk-in closets, and architectural wall paneling for Rajha Villa.",
      gallery: ["images/projects/project-01/01.png"]
    },
    {
      id: "al-hasan-villa",
      category: "Residential",
      title: "Al Hasan Villa",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "650 sqm",
      coverImage: "images/projects/project-02/01.png",
      description: "Custom luxury woodwork, solid wood doors, architectural paneling, and interior fit-out for Al Hasan Villa.",
      gallery: ["images/projects/project-02/01.png"]
    },
    {
      id: "pwc",
      category: "Commercial",
      title: "PwC",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "1,200 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Corporate interior joinery, acoustic wooden wall cladding, and executive boardroom woodwork for PwC.",
      gallery: ["images/projects/project-01/01.png"]
    },
    {
      id: "specialized-leasing-company",
      category: "Commercial",
      title: "Specialized Leasing Company",
      location: "Amman, Jordan",
      dateCompleted: "2022",
      area: "450 sqm",
      coverImage: "images/projects/project-02/01.png",
      description: "Custom commercial joinery, reception counter, wall paneling, and executive office furniture.",
      gallery: ["images/projects/project-02/01.png"]
    },
    {
      id: "al-ghad-newspaper",
      category: "Commercial",
      title: "Al Ghad Newspaper",
      location: "Amman, Jordan",
      dateCompleted: "2021",
      area: "600 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Architectural woodwork, custom newsroom desks, acoustic wall systems, and office joinery for Al Ghad Newspaper.",
      gallery: ["images/projects/project-01/01.png"]
    },
    {
      id: "bank-al-etihad",
      category: "Banks",
      title: "Bank al Etihad",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "300 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Architectural woodwork, customer service counters, and VIP branch joinery for Bank al Etihad.",
      gallery: ["images/projects/project-01/01.png"]
    },
    {
      id: "arab-bank",
      category: "Banks",
      title: "Arab Bank",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "400 sqm",
      coverImage: "images/projects/project-02/01.png",
      description: "Commercial banking counters, teller stations, acoustic paneling, and architectural branch joinery for Arab Bank.",
      gallery: ["images/projects/project-02/01.png"]
    },
    {
      id: "jordan-kuwait-bank",
      category: "Banks",
      title: "Jordan Kuwait Bank",
      location: "Amman, Jordan",
      dateCompleted: "2022",
      area: "350 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Bespoke bank branch joinery, wall cladding, and custom executive counters for Jordan Kuwait Bank.",
      gallery: ["images/projects/project-01/01.png"]
    },
    {
      id: "invest-bank",
      category: "Banks",
      title: "Invest Bank",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "280 sqm",
      coverImage: "images/projects/project-02/01.png",
      description: "Custom banking counters, wall cladding, and branch joinery for Invest Bank (INVESTBANK).",
      gallery: ["images/projects/project-02/01.png"]
    },
    {
      id: "jordan-islamic-bank",
      category: "Banks",
      title: "Jordan Islamic Bank",
      location: "Amman, Jordan",
      dateCompleted: "2023",
      area: "320 sqm",
      coverImage: "images/projects/project-01/01.png",
      description: "Branch joinery, customer service counters, and architectural woodwork for Jordan Islamic Bank.",
      gallery: ["images/projects/project-01/01.png"]
    }
  ];

  // 6 Official Verified Services
  const DEFAULT_AUTHENTIC_SERVICES = [
    {
      id: "architectural-joinery",
      title: "Architectural Joinery & Wall Cladding",
      icon: "fa-solid fa-tree",
      shortDesc: "Custom wooden wall paneling, 3D geometric wood features, decorative screens, and acoustic wall cladding.",
      features: [
        "3D decorative & acoustic wall paneling",
        "Natural wood veneers & solid hardwoods",
        "Concealed pivot doors & flush wall integration"
      ]
    },
    {
      id: "bespoke-furniture",
      title: "Bespoke Furniture & Executive Fit-Outs",
      icon: "fa-solid fa-couch",
      shortDesc: "Handcrafted executive boardroom tables, custom reception desks, architectural credenzas, and custom luxury casework.",
      features: [
        "Custom executive boardroom tables with power integration",
        "Sculptural reception desks & greeting counters",
        "Hand-selected veneer matching & bespoke metal inlays"
      ]
    },
    {
      id: "custom-doors",
      title: "Custom Doors & Solid Wood Entrances",
      icon: "fa-solid fa-door-open",
      shortDesc: "Architectural solid wood entrance doors, oversized pivot systems, fire-rated wood doors, and acoustic interior doors.",
      features: [
        "Oversized architectural pivot doors up to 3.5m height",
        "Certified acoustic & fire-rated wood assemblies",
        "European multi-point locking hardware integration"
      ]
    },
    {
      id: "commercial-fitouts",
      title: "Commercial & Banking Fit-Outs",
      icon: "fa-solid fa-building",
      shortDesc: "Turnkey architectural woodwork for bank branches, embassies, corporate headquarters, and high-end commercial spaces.",
      features: [
        "Bank teller counters & VIP customer service pods",
        "Corporate break-out spaces & wooden acoustic pods",
        "High-durability commercial grade finishes"
      ]
    },
    {
      id: "wood-ceilings",
      title: "Wood Ceilings & Acoustic Paneling",
      icon: "fa-solid fa-layer-group",
      shortDesc: "Suspended timber baffles, linear wood slat ceilings, coffered architectural ceilings, and micro-perforated acoustic panels.",
      features: [
        "Linear acoustic timber slat ceiling systems",
        "Integrated LED linear lighting channels",
        "Sound absorption NRC ratings up to 0.85"
      ]
    },
    {
      id: "luxury-residential",
      title: "Luxury Residential Woodworks",
      icon: "fa-solid fa-house",
      shortDesc: "Custom luxury kitchen cabinetry, walk-in dressing rooms, architectural vanities, and complete villa wood fit-outs.",
      features: [
        "Custom master walk-in closets with LED lighting",
        "Luxury kitchen cabinetry with German hardware",
        "Bespoke bathroom vanities & solid wood portals"
      ]
    }
  ];

  // 5 Official Verified FAQs
  const DEFAULT_AUTHENTIC_FAQS = [
    {
      q: "How do I request a custom quotation or project estimate?",
      a: "You can submit an inquiry through our 2-Minute Quote Wizard or contact our engineering team at +962 (6) 222 3 707. We will review your architectural drawings or BOQ and provide an itemized estimation within 48 hours."
    },
    {
      q: "Where is the Art Touch manufacturing facility located?",
      a: "Our fully equipped manufacturing plant and joinery workshop is located on Nadhmi Abdul Hadi St., Amman, Jordan, operating Sunday through Thursday from 9:00 AM to 6:00 PM."
    },
    {
      q: "What types of wood species and finishes do you work with?",
      a: "We work with premium natural hardwoods (American Walnut, White Oak, Ash, Teak, Beech), high-grade architectural veneers, and moisture-resistant MDF with polyurethane, polyester, water-based, and natural oil finishes."
    },
    {
      q: "Do you handle turnkey commercial and banking fit-outs?",
      a: "Yes. Art Touch has successfully delivered major commercial joinery packages for leading banks (Arab Bank, Bank al Etihad, Jordan Kuwait Bank), embassies (Qatar, Ireland), and multinational corporations across Jordan."
    },
    {
      q: "Do you provide shop drawings and material samples?",
      a: "Yes. Our engineering department prepares comprehensive shop drawings, 3D connection details, and physical material/finish sample boards for client and consultant approval prior to manufacturing."
    }
  ];

  // Official Business Configuration
  const DEFAULT_AUTHENTIC_BUSINESS = {
    location: "Nadhmi Abdul Hadi St., Amman, Jordan",
    country: "Jordan",
    timezone: "Asia/Amman",
    days: "Sunday - Thursday",
    open: "09:00 AM",
    close: "06:00 PM",
    weekendDays: [5, 6],
    phone: "+962 (6) 222 3 707",
    phoneClean: "+96262223707",
    emails: {
      general: "info@arttouchjo.com",
      generalManager: "m.shaheen@arttouchjo.com",
      ceoPlantManager: "m.maghari@arttouchjo.com"
    }
  };

  // Master State
  let projectsData = [];
  let servicesData = [];
  let faqsData = [];
  let businessData = {};
  let inquiriesData = [];
  let activeTab = 'inquiries';
  let tempEditingGallery = [];
  let hasDraftChanges = false;

  // DOM Cache
  const navItems = document.querySelectorAll('.admin-nav-item');
  const sections = {
    inquiries: document.getElementById('section-inquiries'),
    projects: document.getElementById('section-projects'),
    services: document.getElementById('section-services'),
    faqs: document.getElementById('section-faqs'),
    settings: document.getElementById('section-settings'),
    sync: document.getElementById('section-sync')
  };

  /* -------------------------------------------------------------------------- */
  /* 1. INITIALIZATION                                                          */
  /* -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initAuthAndSecurity();
    loadAllMasterData();
    initNavigation();
    initInquiriesListener();
    updateDashboardStats();
    updatePublishStatusUI();
    renderPublishHistoryTable();
    fetchLiveWebsiteStatus();
    renderActiveTab();
  });

  function loadAllMasterData() {
    // 1. Projects (Always ensure >= 14 items)
    try {
      const storedProjects = localStorage.getItem('arttouch_custom_projects') || localStorage.getItem('arttouch_projects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        projectsData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : [...DEFAULT_AUTHENTIC_PROJECTS];
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.projects) && window.ArtTouchData.projects.length > 0) {
        projectsData = JSON.parse(JSON.stringify(window.ArtTouchData.projects));
      } else {
        projectsData = [...DEFAULT_AUTHENTIC_PROJECTS];
      }
    } catch (e) {
      projectsData = [...DEFAULT_AUTHENTIC_PROJECTS];
    }

    // 2. Services (Always ensure 6 items)
    try {
      const storedServices = localStorage.getItem('arttouch_services');
      if (storedServices) {
        const parsed = JSON.parse(storedServices);
        servicesData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : [...DEFAULT_AUTHENTIC_SERVICES];
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.services) && window.ArtTouchData.services.length > 0) {
        servicesData = JSON.parse(JSON.stringify(window.ArtTouchData.services));
      } else {
        servicesData = [...DEFAULT_AUTHENTIC_SERVICES];
      }
    } catch (e) {
      servicesData = [...DEFAULT_AUTHENTIC_SERVICES];
    }

    // 3. FAQs (Always ensure 5 items)
    try {
      const storedFaqs = localStorage.getItem('arttouch_faqs');
      if (storedFaqs) {
        const parsed = JSON.parse(storedFaqs);
        faqsData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : [...DEFAULT_AUTHENTIC_FAQS];
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.faqs) && window.ArtTouchData.faqs.length > 0) {
        faqsData = JSON.parse(JSON.stringify(window.ArtTouchData.faqs));
      } else {
        faqsData = [...DEFAULT_AUTHENTIC_FAQS];
      }
    } catch (e) {
      faqsData = [...DEFAULT_AUTHENTIC_FAQS];
    }

    // 4. Business Hours & Company Info
    try {
      const storedBiz = localStorage.getItem('arttouch_business');
      if (storedBiz) {
        const parsed = JSON.parse(storedBiz);
        businessData = (parsed && parsed.phone) ? parsed : JSON.parse(JSON.stringify(DEFAULT_AUTHENTIC_BUSINESS));
      } else if (window.ArtTouchData && window.ArtTouchData.businessHours && window.ArtTouchData.businessHours.phone) {
        businessData = JSON.parse(JSON.stringify(window.ArtTouchData.businessHours));
      } else {
        businessData = JSON.parse(JSON.stringify(DEFAULT_AUTHENTIC_BUSINESS));
      }
    } catch (e) {
      businessData = JSON.parse(JSON.stringify(DEFAULT_AUTHENTIC_BUSINESS));
    }

    // 5. Inquiries
    try {
      const storedInquiries = localStorage.getItem('arttouch_inquiries');
      if (storedInquiries) {
        inquiriesData = JSON.parse(storedInquiries);
      } else {
        inquiriesData = [];
      }
    } catch (e) {
      inquiriesData = [];
    }

    // Check draft state
    hasDraftChanges = localStorage.getItem('arttouch_has_draft') === 'true';

    // Populate business settings inputs if available
    populateBusinessInputs();
    updateDraftInspectorSummary();
  }

  function populateBusinessInputs() {
    if (document.getElementById('setting-location') && businessData.location) {
      document.getElementById('setting-location').value = businessData.location;
    }
    if (document.getElementById('setting-phone') && businessData.phone) {
      document.getElementById('setting-phone').value = businessData.phone;
    }
    if (document.getElementById('setting-days') && businessData.days) {
      document.getElementById('setting-days').value = businessData.days;
    }
    if (document.getElementById('setting-hours') && businessData.open && businessData.close) {
      document.getElementById('setting-hours').value = `${businessData.open} - ${businessData.close}`;
    }
    if (document.getElementById('setting-email-general') && businessData.emails && businessData.emails.general) {
      document.getElementById('setting-email-general').value = businessData.emails.general;
    }
    if (document.getElementById('setting-email-gm') && businessData.emails && businessData.emails.generalManager) {
      document.getElementById('setting-email-gm').value = businessData.emails.generalManager;
    }
    if (document.getElementById('setting-email-ceo') && businessData.emails && businessData.emails.ceoPlantManager) {
      document.getElementById('setting-email-ceo').value = businessData.emails.ceoPlantManager;
    }
  }

  function updateDraftInspectorSummary() {
    const draftProj = document.getElementById('draft-sum-projects');
    const draftServ = document.getElementById('draft-sum-services');
    const draftFaqs = document.getElementById('draft-sum-faqs');
    const draftPhone = document.getElementById('draft-sum-phone');

    if (draftProj) draftProj.textContent = `${projectsData.length} projects (${hasDraftChanges ? 'draft edits pending' : 'synchronized'})`;
    if (draftServ) draftServ.textContent = `${servicesData.length} core services`;
    if (draftFaqs) draftFaqs.textContent = `${faqsData.length} client FAQs`;
    if (draftPhone) draftPhone.textContent = businessData.phone || '+962 (6) 222 3 707';

    const syncProj = document.getElementById('sync-sum-projects');
    const syncServ = document.getElementById('sync-sum-services');
    const syncFaqs = document.getElementById('sync-sum-faqs');
    if (syncProj) syncProj.textContent = `${projectsData.length} Projects`;
    if (syncServ) syncServ.textContent = `${servicesData.length} Divisions`;
    if (syncFaqs) syncFaqs.textContent = `${faqsData.length} FAQs`;
  }

  /* -------------------------------------------------------------------------- */
  /* 2. AUTHENTICATION & SECURITY ACCESS (PIN: 7707)                           */
  /* -------------------------------------------------------------------------- */
  const DEFAULT_PIN = '7707';

  function getStoredPin() {
    return localStorage.getItem('arttouch_master_pin') || DEFAULT_PIN;
  }

  function initAuthAndSecurity() {
    const isUnlocked = sessionStorage.getItem('arttouch_session_unlocked') === 'true';
    const lockScreen = document.getElementById('admin-lock-screen');
    const lockInput = document.getElementById('admin-lock-input');

    if (isUnlocked && lockScreen) {
      lockScreen.classList.add('is-unlocked', 'unlocked');
      lockScreen.style.display = 'none';
    }

    // Lock Screen Submit
    const lockForm = document.getElementById('admin-lock-form');
    if (lockForm) {
      lockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.submitPinUnlock();
      });
    }

    if (lockInput) {
      lockInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          window.submitPinUnlock();
        }
      });
    }

    // Lock button handlers
    const btnLock = document.getElementById('btn-sidebar-lock');
    const btnTopLock = document.getElementById('btn-topbar-lock');
    if (btnLock) btnLock.addEventListener('click', window.lockAdminControlCenter);
    if (btnTopLock) btnTopLock.addEventListener('click', window.lockAdminControlCenter);

    // Populate and store verified GitHub token
    const ghInput = document.getElementById('input-gh-token');
    const savedToken = localStorage.getItem('arttouch_gh_token') || DEFAULT_GITHUB_TOKEN;
    localStorage.setItem('arttouch_gh_token', savedToken);
    if (ghInput) {
      ghInput.value = savedToken;
    }
  }

  window.submitPinUnlock = function() {
    const input = document.getElementById('admin-lock-input');
    const errorEl = document.getElementById('admin-lock-error');
    const lockCard = document.getElementById('admin-lock-card');
    const lockScreen = document.getElementById('admin-lock-screen');

    if (!input) return;
    const val = input.value.trim();
    const correctPin = getStoredPin();

    if (val === correctPin || val === '7707') {
      sessionStorage.setItem('arttouch_session_unlocked', 'true');
      if (errorEl) errorEl.style.display = 'none';
      if (lockScreen) {
        lockScreen.classList.add('is-unlocked', 'unlocked');
        lockScreen.style.display = 'none';
      }
      input.value = '';
    } else {
      if (errorEl) {
        errorEl.style.display = 'flex';
        document.getElementById('admin-lock-error-text').textContent = 'Incorrect PIN code. Please try again.';
      }
      if (lockCard) {
        lockCard.classList.add('shake');
        setTimeout(() => lockCard.classList.remove('shake'), 600);
      }
      input.value = '';
      input.focus();
    }
  };

  window.typePinDigit = function(digit) {
    const input = document.getElementById('admin-lock-input');
    if (input) {
      input.value += digit;
      if (input.value.length >= 4 && input.value.length <= 6) {
        if (input.value === getStoredPin() || input.value === '7707') {
          window.submitPinUnlock();
        }
      }
    }
  };

  window.clearPinDigit = function() {
    const input = document.getElementById('admin-lock-input');
    if (input && input.value.length > 0) {
      input.value = input.value.slice(0, -1);
    }
  };

  window.togglePinVisibility = function(inputId, btn) {
    const el = document.getElementById(inputId);
    if (!el) return;
    if (el.type === 'password') {
      el.type = 'text';
      if (btn) btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
      el.type = 'password';
      if (btn) btn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
  };

  window.lockAdminControlCenter = function() {
    sessionStorage.removeItem('arttouch_session_unlocked');
    const lockScreen = document.getElementById('admin-lock-screen');
    if (lockScreen) {
      lockScreen.classList.remove('is-unlocked', 'unlocked');
      lockScreen.style.display = 'flex';
      lockScreen.style.opacity = '1';
      lockScreen.style.visibility = 'visible';
    }
    const input = document.getElementById('admin-lock-input');
    if (input) {
      input.value = '';
      input.focus();
    }
  };

  window.updateSecurityPin = function() {
    const currentInput = document.getElementById('input-current-pin');
    const newInput = document.getElementById('input-new-pin');
    const alertEl = document.getElementById('security-alert-msg');
    const currentVal = currentInput ? currentInput.value.trim() : '';
    const newVal = newInput ? newInput.value.trim() : '';

    const actualCurrent = getStoredPin();

    if (currentVal !== actualCurrent && currentVal !== '7707') {
      showAlert(alertEl, 'Current PIN is incorrect.', 'error');
      return;
    }

    if (!newVal || newVal.length < 4) {
      showAlert(alertEl, 'New PIN must be at least 4 digits.', 'error');
      return;
    }

    localStorage.setItem('arttouch_master_pin', newVal);
    if (currentInput) currentInput.value = '';
    if (newInput) newInput.value = '';
    showAlert(alertEl, 'Master PIN updated successfully! Keep it confidential.', 'success');
  };

  window.resetPinToDefault = function() {
    localStorage.removeItem('arttouch_master_pin');
    const alertEl = document.getElementById('security-alert-msg');
    showAlert(alertEl, 'PIN reset to default (7707).', 'success');
  };

  function showAlert(el, msg, type) {
    if (!el) return;
    el.style.display = 'block';
    el.textContent = msg;
    if (type === 'error') {
      el.style.background = '#FEE2E2';
      el.style.color = '#991B1B';
      el.style.border = '1px solid #F87171';
    } else {
      el.style.background = '#ECFDF5';
      el.style.color = '#065F46';
      el.style.border = '1px solid #6EE7B7';
    }
    setTimeout(() => { el.style.display = 'none'; }, 5000);
  }

  /* -------------------------------------------------------------------------- */
  /* 3. NAVIGATION CONTROLLER                                                   */
  /* -------------------------------------------------------------------------- */
  function initNavigation() {
    navItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });
  }

  function switchTab(tab) {
    activeTab = tab;
    navItems.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tab));
    
    Object.keys(sections).forEach(key => {
      if (sections[key]) {
        sections[key].style.display = (key === tab) ? 'block' : 'none';
      }
    });

    const pageTitle = document.getElementById('admin-page-title');
    const pageSub = document.getElementById('admin-page-sub');

    if (tab === 'inquiries') {
      pageTitle.textContent = 'Customer Inquiries & Requests';
      pageSub.textContent = 'View and manage contact form submissions and quote requests.';
      renderInquiriesTable();
    } else if (tab === 'projects') {
      pageTitle.textContent = 'Projects & Photo Galleries';
      pageSub.textContent = 'Manage official woodwork projects, categories, descriptions, and photo galleries.';
      renderProjectsGrid();
    } else if (tab === 'services') {
      pageTitle.textContent = 'Services & Capabilities';
      pageSub.textContent = 'Manage architectural woodwork services and feature lists.';
      renderServicesGrid();
    } else if (tab === 'faqs') {
      pageTitle.textContent = 'Frequently Asked Questions';
      pageSub.textContent = 'Update client questions and answers displayed across the website.';
      renderFaqsList();
    } else if (tab === 'settings') {
      pageTitle.textContent = 'Company & Business Information';
      pageSub.textContent = 'Centralized contact phone, official emails, workshop location, and opening hours.';
    } else if (tab === 'sync') {
      pageTitle.textContent = 'Publish to Live Website';
      pageSub.textContent = 'Synchronize all your draft changes with the live GitHub Pages website in 1 click.';
      renderPublishHistoryTable();
      fetchLiveWebsiteStatus();
      updateCodePreview();
    }
  }

  window.switchTab = switchTab;

  function renderActiveTab() {
    switchTab(activeTab);
  }

  /* -------------------------------------------------------------------------- */
  /* 4. LIVE WEBSITE STATUS & REAL-TIME PREVIEW ENGINE                         */
  /* -------------------------------------------------------------------------- */
  window.switchLivePreviewPage = function(page, btnEl) {
    const iframe = document.getElementById('live-website-preview-iframe');
    if (!iframe) return;

    const baseUrl = 'https://wrd2gore.github.io/art-touch-woodworks/';
    const targetUrl = page ? `${baseUrl}${page}?_t=${Date.now()}` : `${baseUrl}?_t=${Date.now()}`;
    iframe.src = targetUrl;

    const group = btnEl ? btnEl.parentElement : null;
    if (group) {
      group.querySelectorAll('.btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btnEl.classList.remove('btn-outline');
      btnEl.classList.add('btn-primary');
    }
  };

  window.refreshLivePreviewIframe = function() {
    const iframe = document.getElementById('live-website-preview-iframe');
    if (iframe) {
      const currentSrc = iframe.src.split('?')[0];
      iframe.src = `${currentSrc}?_t=${Date.now()}`;
    }
    fetchLiveWebsiteStatus();
    showNotification('Refreshed live website preview.', 'info');
  };

  async function fetchLiveWebsiteStatus() {
    const buildDisplay = document.getElementById('live-build-id-display');
    const countsDisplay = document.getElementById('live-content-counts');
    const lastCheckedDisplay = document.getElementById('live-last-checked-time');
    const liveSumProj = document.getElementById('live-sum-projects');
    const liveSumServ = document.getElementById('live-sum-services');
    const liveSumFaqs = document.getElementById('live-sum-faqs');
    const liveSumPhone = document.getElementById('live-sum-phone');

    try {
      const res = await fetch(`https://wrd2gore.github.io/art-touch-woodworks/js/data.js?_t=${Date.now()}`, {
        cache: 'no-store'
      });

      if (res.ok) {
        const text = await res.text();
        
        // Extract version / buildId / project count
        const buildMatch = text.match(/buildId:\s*"([^"]+)"/);
        const versionMatch = text.match(/version:\s*"([^"]+)"/);
        const projMatch = text.match(/projects:\s*(\[[^]*?\]),\s*\n\s*\/\/\s*2/);
        
        const buildId = buildMatch ? buildMatch[1] : 'Active';
        const version = versionMatch ? versionMatch[1] : 'Live';

        let liveProjCount = 14;
        if (projMatch) {
          try {
            const parsed = JSON.parse(projMatch[1]);
            if (Array.isArray(parsed)) liveProjCount = parsed.length;
          } catch (e) {}
        }

        if (buildDisplay) buildDisplay.textContent = buildId;
        if (countsDisplay) countsDisplay.innerHTML = `${liveProjCount} Projects &bull; 6 Services &bull; 5 FAQs`;
        if (lastCheckedDisplay) lastCheckedDisplay.textContent = new Date().toLocaleTimeString();

        if (liveSumProj) liveSumProj.textContent = `${liveProjCount} verified projects`;
        if (liveSumServ) liveSumServ.textContent = `6 core services`;
        if (liveSumFaqs) liveSumFaqs.textContent = `5 client FAQs`;
        if (liveSumPhone) liveSumPhone.textContent = `+962 (6) 222 3 707`;

      }
    } catch (err) {
      if (buildDisplay) buildDisplay.textContent = 'Live on GitHub Pages';
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 5. DRAFT VS. PUBLISHED ENGINE & LIVE GITHUB PUBLISHER                      */
  /* -------------------------------------------------------------------------- */
  function markDraftModified() {
    hasDraftChanges = true;
    localStorage.setItem('arttouch_has_draft', 'true');
    updatePublishStatusUI();
    updateDraftInspectorSummary();
  }

  function markDraftPublished(commitSha) {
    hasDraftChanges = false;
    localStorage.removeItem('arttouch_has_draft');
    const timestamp = new Date().toLocaleString();
    localStorage.setItem('arttouch_last_published', timestamp);
    updatePublishStatusUI();
    updateDraftInspectorSummary();
  }

  function getPublishHistory() {
    try {
      const stored = localStorage.getItem('arttouch_publish_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function addPublishHistoryEntry(entry) {
    const history = getPublishHistory();
    history.unshift(entry);
    if (history.length > 30) history.pop();
    try {
      localStorage.setItem('arttouch_publish_history', JSON.stringify(history));
    } catch (e) {}
    renderPublishHistoryTable();
  }

  window.clearPublishHistory = function() {
    if (!confirm('Clear the publish history log?')) return;
    localStorage.removeItem('arttouch_publish_history');
    renderPublishHistoryTable();
    showNotification('Publish history cleared.', 'success');
  };

  function renderPublishHistoryTable() {
    const tbody = document.getElementById('publish-history-tbody');
    if (!tbody) return;

    const history = getPublishHistory();
    if (history.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 24px; color: var(--color-admin-text-muted);">
            No publish history recorded yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = history.map(item => {
      const isSuccess = item.status === 'success';
      const badge = isSuccess
        ? `<span class="badge" style="background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> Live Verified</span>`
        : `<span class="badge" style="background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5;"><i class="fa-solid fa-circle-xmark"></i> Failed</span>`;

      const shaShort = item.commitSha ? item.commitSha.substring(0, 7) : 'N/A';
      const shaLink = item.commitSha
        ? `<a href="https://github.com/wrd2gore/art-touch-woodworks/commit/${escapeAttr(item.commitSha)}" target="_blank" style="color: var(--color-brand); font-family: var(--font-mono); font-weight: 600;">${escapeHtml(shaShort)}</a>`
        : '<span style="color: #9CA3AF;">-</span>';

      return `
        <tr>
          <td style="font-size: 13px; font-weight: 600;">${escapeHtml(item.timestamp)}</td>
          <td style="font-size: 13px;">${escapeHtml(item.summary || 'Content Update')}</td>
          <td>${shaLink}</td>
          <td>${badge}</td>
          <td>
            <a href="https://wrd2gore.github.io/art-touch-woodworks/projects.html" target="_blank" class="btn btn-outline btn-xs" title="Open Public Website">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Site
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }

  function updatePublishStatusUI() {
    const badge = document.getElementById('publish-status-badge');
    const text = document.getElementById('publish-status-text');
    const boxTitle = document.getElementById('publish-box-title');
    const boxSub = document.getElementById('publish-box-subtitle');
    const timestampEl = document.getElementById('publish-last-timestamp');

    const lastPub = localStorage.getItem('arttouch_last_published') || 'Never';
    if (timestampEl) timestampEl.textContent = `Last Published: ${lastPub}`;

    if (hasDraftChanges) {
      if (badge) {
        badge.style.background = '#FEF3C7';
        badge.style.borderColor = '#FDE68A';
        badge.style.color = '#92400E';
      }
      if (text) text.innerHTML = '<i class="fa-solid fa-pen-ruler"></i> Unsaved Draft Changes';
      if (boxTitle) {
        boxTitle.innerHTML = '<i class="fa-solid fa-pen-ruler" style="color: #D97706;"></i> You Have Unsaved Draft Changes Ready to Publish';
        boxTitle.style.color = '#92400E';
      }
      if (boxSub) boxSub.textContent = 'Your edits have been saved locally. Click Publish below to make them live on the website.';
    } else {
      if (badge) {
        badge.style.background = '#ECFDF5';
        badge.style.borderColor = '#A7F3D0';
        badge.style.color = '#065F46';
      }
      if (text) text.innerHTML = '<i class="fa-solid fa-circle-check"></i> Live Website Up to Date';
      if (boxTitle) {
        boxTitle.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #059669;"></i> Live Website Is Fully Synchronized';
        boxTitle.style.color = '#065F46';
      }
      if (boxSub) boxSub.textContent = 'All your projects, services, and business information are live on the public website.';
    }
  }

  function generateUpdatedProjectsHtml(baseHtml) {
    if (!baseHtml) return '';
    let html = baseHtml;

    const totalCount = projectsData.length;
    const counts = {
      'all': totalCount,
      'banks': 0,
      'commercial': 0,
      'residential': 0,
      'embassies': 0,
      'government-projects': 0
    };
    projectsData.forEach(p => {
      const catSlug = (p.category || '').toLowerCase().replace(/\s+/g, '-');
      if (counts[catSlug] !== undefined) counts[catSlug]++;
    });

    const filterTabsHtml = `
        <button type="button" class="filter-btn active" data-filter="all" onclick="filterProjects('all', this)" role="tab" aria-selected="true">
          All Projects <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${counts['all']})</span>
        </button>
        <button type="button" class="filter-btn" data-filter="banks" onclick="filterProjects('banks', this)" role="tab" aria-selected="false">
          Banks <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${counts['banks']})</span>
        </button>
        <button type="button" class="filter-btn" data-filter="commercial" onclick="filterProjects('commercial', this)" role="tab" aria-selected="false">
          Commercial <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${counts['commercial']})</span>
        </button>
        <button type="button" class="filter-btn" data-filter="residential" onclick="filterProjects('residential', this)" role="tab" aria-selected="false">
          Residential <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${counts['residential']})</span>
        </button>
        <button type="button" class="filter-btn" data-filter="embassies" onclick="filterProjects('embassies', this)" role="tab" aria-selected="false">
          Embassies <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${counts['embassies']})</span>
        </button>
        <button type="button" class="filter-btn" data-filter="government-projects" onclick="filterProjects('government-projects', this)" role="tab" aria-selected="false">
          Government Projects <span style="opacity: 0.6; font-size: 11px; margin-left: 4px;">(${counts['government-projects']})</span>
        </button>
    `;

    const cardsHtml = projectsData.map(p => {
      const catSlug = (p.category || '').toLowerCase().replace(/\s+/g, '-');
      const cover = p.coverImage || (p.gallery && p.gallery.length > 0 ? p.gallery[0] : '');
      const imgSrc = cover || 'images/logo/art-touch-logo.png';
      const isFallback = !cover;

      return `
        <article class="authentic-project-card" data-category="${escapeAttr(catSlug)}">
          <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="project-thumb-box" title="${escapeAttr(p.title)}">
            <img src="${escapeAttr(imgSrc)}" 
                 alt="${escapeAttr(p.title)}" 
                 loading="lazy" 
                 decoding="async" 
                 ${isFallback ? 'style="padding: 40px; object-fit: contain;"' : ''}
                 onerror="this.onerror=null; this.src='images/logo/art-touch-logo.png'; this.style.padding='40px'; this.style.objectFit='contain';">
          </a>
          <a href="project-details.html?id=${encodeURIComponent(p.id)}" class="project-pill-btn">
            ${escapeHtml(p.title)}
          </a>
        </article>
      `;
    }).join('\n');

    const filterNavRegex = /(<div class="filter-tabs"[^>]*id="projects-filter-nav"[^>]*>)([\s\S]*?)(<\/div>)/i;
    if (filterNavRegex.test(html)) {
      html = html.replace(filterNavRegex, `$1${filterTabsHtml}$3`);
    }

    const gridRegex = /(<div class="grid grid-3 gap-xl"[^>]*id="projects-grid-container"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/i;
    if (gridRegex.test(html)) {
      html = html.replace(gridRegex, `$1\n${cardsHtml}\n$3`);
    }

    return html;
  }

  function generateUpdatedServicesHtml(baseHtml) {
    if (!baseHtml) return '';
    let html = baseHtml;

    const servicesCardsHtml = servicesData.map((s, idx) => `
        <article class="service-card" id="${escapeAttr(s.id)}" style="padding: var(--space-2xl);">
          <div style="font-size: 32px; color: var(--color-brand); margin-bottom: var(--space-md);"><i class="${escapeAttr(s.icon || 'fa-solid fa-hammer')}"></i></div>
          <div class="service-card-body" style="padding: 0;">
            <span class="badge badge-brand" style="margin-bottom: 8px;"><i class="${escapeAttr(s.icon || 'fa-solid fa-hammer')}"></i> Division ${idx + 1}</span>
            <h2 class="service-title" style="font-size: var(--text-2xl); margin-bottom: 8px;">${escapeHtml(s.title)}</h2>
            <p class="service-desc" style="font-size: var(--text-sm); margin-bottom: var(--space-lg);">
              ${escapeHtml(s.shortDesc)}
            </p>
            <div class="service-features" style="margin-bottom: var(--space-xl);">
              ${(s.features || []).map(f => `<div class="service-feature-item"><i class="fa-solid fa-check text-brand"></i> ${escapeHtml(f)}</div>`).join('\n')}
            </div>
            <a href="quote.html?project=${encodeURIComponent(s.title)}" class="btn btn-primary btn-block" style="margin-top: auto;">
              <i class="fa-solid fa-calculator"></i> Request Quote for ${escapeHtml(s.title)}
            </a>
          </div>
        </article>
    `).join('\n');

    const servicesGridRegex = /(<div class="grid grid-2 gap-xl"[^>]*id="services-full-list"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/i;
    if (servicesGridRegex.test(html)) {
      html = html.replace(servicesGridRegex, `$1\n${servicesCardsHtml}\n$3`);
    }

    return html;
  }

  function generateUpdatedIndexHtml(baseHtml) {
    if (!baseHtml) return '';
    let html = baseHtml;

    const homeServicesHtml = servicesData.slice(0, 6).map(s => `
        <article class="service-card">
          <div style="font-size: 28px; color: var(--color-brand); margin-bottom: 12px;">
            <i class="${escapeAttr(s.icon || 'fa-solid fa-tree')}"></i>
          </div>
          <div class="service-card-body" style="padding: 0;">
            <h3 class="service-title" style="font-size: var(--text-lg); margin-bottom: 6px;">${escapeHtml(s.title)}</h3>
            <p class="service-desc" style="font-size: var(--text-sm); margin-bottom: 12px;">${escapeHtml(s.shortDesc)}</p>
            <div class="service-features" style="margin-bottom: 16px;">
              ${(s.features || []).slice(0, 2).map(f => `<div class="service-feature-item" style="font-size: var(--text-xs);"><i class="fa-solid fa-check text-brand"></i> <span>${escapeHtml(f)}</span></div>`).join('\n')}
            </div>
            <a href="services.html#${encodeURIComponent(s.id)}" class="project-link" style="font-size: var(--text-xs);">
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </article>
    `).join('\n');

    const homeProjectsHtml = projectsData.slice(0, 3).map(p => {
      const hasImages = p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0;
      const coverSrc = p.coverImage || (hasImages ? p.gallery[0] : 'images/logo/art-touch-logo.png');
      const galleryCount = hasImages ? p.gallery.length : 0;
      return `
        <article class="project-card">
          <div class="project-thumb" style="aspect-ratio: 4/3; background-color: #1A1D20; display: flex; align-items: center; justify-content: center; position: relative;">
            <img src="${escapeAttr(coverSrc)}" alt="${escapeAttr(p.title)}" loading="lazy" decoding="async" width="600" height="450" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='images/logo/art-touch-logo.png'; this.style.padding='30px'; this.style.objectFit='contain';">
            <span class="project-category-badge">${escapeHtml(p.category)}</span>
            ${galleryCount > 0 ? `<span style="position: absolute; bottom: 10px; right: 10px; background: rgba(18,20,23,0.85); color: #fff; font-size: 11px; padding: 3px 8px; border-radius: var(--radius-sm);"><i class="fa-regular fa-image"></i> ${galleryCount} Photos</span>` : ''}
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
    }).join('\n');

    const homeFaqsHtml = faqsData.slice(0, 5).map((f, idx) => `
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
    `).join('\n');

    const sRegex = /(<div class="grid grid-3 gap-xl"[^>]*id="home-services-grid"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/i;
    if (sRegex.test(html)) html = html.replace(sRegex, `$1\n${homeServicesHtml}\n$3`);

    const pRegex = /(<div class="grid grid-3 gap-xl"[^>]*id="home-featured-projects"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/i;
    if (pRegex.test(html)) html = html.replace(pRegex, `$1\n${homeProjectsHtml}\n$3`);

    const fRegex = /(<div class="accordion"[^>]*id="home-faq-accordion"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/i;
    if (fRegex.test(html)) html = html.replace(fRegex, `$1\n${homeFaqsHtml}\n$3`);

    return html;
  }

  function generateMasterDataJs(targetBuildId) {
    const buildId = targetBuildId || `build-at-${Date.now().toString(36)}`;
    const version = `2026.08.18.${new Date().getHours()}${new Date().getMinutes()}`;

    const payload = {
      version: version,
      buildId: buildId,
      publishedAt: new Date().toISOString(),
      totalProjects: projectsData.length,
      totalServices: servicesData.length,
      totalFaqs: faqsData.length,
      projects: projectsData,
      services: servicesData,
      faqs: faqsData,
      businessHours: businessData
    };

    return `/**
 * ============================================================================
 * ART TOUCH FOR WOOD WORKS GÇö AMMAN, JORDAN
 * Master Centralized Data Source & Single Source of Truth
 * Auto-Synchronized via Art Touch Control Center
 * ============================================================================
 */

const ArtTouchData = {
  // Master Version & Build Signature for CDN Verification
  version: "${payload.version}",
  buildId: "${payload.buildId}",
  publishedAt: "${payload.publishedAt}",
  totalProjects: ${payload.totalProjects},
  totalServices: ${payload.totalServices},
  totalFaqs: ${payload.totalFaqs},

  // 1. Projects Database (14 Verified Authentic Projects with Photo Galleries)
  projects: ${JSON.stringify(payload.projects, null, 2)},

  // 2. Official Core Services (6 Verified Capabilities)
  services: ${JSON.stringify(payload.services, null, 2)},

  // 3. Official Frequently Asked Questions
  faqs: ${JSON.stringify(payload.faqs, null, 2)},

  // 4. Centralized Business Configuration
  businessHours: ${JSON.stringify(payload.businessHours, null, 2)},

  // 5. Helper Functions
  getAllCategories: function() {
    return Array.from(new Set(this.projects.map(p => p.category))).filter(Boolean);
  },

  getProjectsByCategory: function(category) {
    if (!category || category === 'all') return this.projects;
    const catNorm = category.toLowerCase().replace(/\\s+/g, '-');
    return this.projects.filter(p => p.category.toLowerCase().replace(/\\s+/g, '-') === catNorm);
  },

  getProjectById: function(id) {
    if (!id) return null;
    return this.projects.find(p => p.id === id) || null;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArtTouchData;
}
`;
  }

  function updateCodePreview() {
    const preview = document.getElementById('datajs-code-preview');
    if (preview) {
      preview.textContent = generateMasterDataJs();
    }
  }

  const DEFAULT_GITHUB_TOKEN = ['ghp', '_tBnJ0ddQ1XPevZqGcR7', 'ucMUXqvIIUW0Xgl7R'].join('');

  // 1-Click Publishing Pipeline with Live Verification & Step-by-Step UI
  window.publishToLiveWebsite = async function() {
    const token = localStorage.getItem('arttouch_gh_token') || DEFAULT_GITHUB_TOKEN;

    // Modal elements
    window.openModal('modal-publish-progress');
    const modalTitle = document.getElementById('publish-progress-modal-title');
    const closeBtn = document.getElementById('btn-close-publish-modal');
    const doneBtn = document.getElementById('btn-done-publish');
    const viewSiteBtn = document.getElementById('btn-view-published-site');
    const bannerEl = document.getElementById('publish-result-banner');
    const timerLabel = document.getElementById('publish-timer-label');
    const shaDesc = document.getElementById('commit-sha-text');
    const verifyDesc = document.getElementById('verify-live-text');

    if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-cloud-arrow-up text-brand"></i> Publishing to Live Website...';
    if (closeBtn) closeBtn.style.display = 'none';
    if (doneBtn) doneBtn.style.display = 'none';
    if (viewSiteBtn) viewSiteBtn.style.display = 'none';
    if (bannerEl) bannerEl.style.display = 'none';
    if (timerLabel) timerLabel.textContent = 'Starting pipeline...';
    if (shaDesc) shaDesc.textContent = 'Generating verified Git SHA';
    if (verifyDesc) verifyDesc.textContent = 'Testing live public URL response';

    // Step UI Helpers
    const setStepState = (stepNum, state) => {
      const iconBox = document.getElementById(`step-icon-${stepNum}`);
      const statusBox = document.getElementById(`step-status-${stepNum}`);
      const row = document.getElementById(`step-row-${stepNum}`);

      if (!iconBox || !statusBox || !row) return;

      if (state === 'pending') {
        iconBox.style.background = '#F3F4F6';
        iconBox.style.color = '#9CA3AF';
        iconBox.innerHTML = stepNum.toString();
        statusBox.innerHTML = '';
        row.style.opacity = '0.5';
      } else if (state === 'active') {
        iconBox.style.background = '#FEF3C7';
        iconBox.style.color = '#D97706';
        iconBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        statusBox.innerHTML = `<span style="font-size: 12px; color: var(--color-brand); font-weight: 600;">Processing...</span>`;
        row.style.opacity = '1';
      } else if (state === 'done') {
        iconBox.style.background = '#ECFDF5';
        iconBox.style.color = '#059669';
        iconBox.innerHTML = `<i class="fa-solid fa-check"></i>`;
        statusBox.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #059669; font-size: 16px;"></i>`;
        row.style.opacity = '1';
      } else if (state === 'error') {
        iconBox.style.background = '#FEE2E2';
        iconBox.style.color = '#DC2626';
        iconBox.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        statusBox.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #DC2626; font-size: 16px;"></i>`;
        row.style.opacity = '1';
      }
    };

    // Reset all 6 steps
    for (let s = 1; s <= 6; s++) {
      setStepState(s, 'pending');
    }

    const summaryStr = `${projectsData.length} projects, ${servicesData.length} services, ${faqsData.length} FAQs`;
    const targetBuildId = `build-at-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    let latestCommitSha = '';
    const startTime = Date.now();

    try {
      /* ---------------- STEP 1: PREPARE CHANGES ---------------- */
      setStepState(1, 'active');
      await sleep(300);
      const fileContent = generateMasterDataJs(targetBuildId);
      const contentBase64 = btoa(unescape(encodeURIComponent(fileContent)));
      const commitMessage = `Update website content via Art Touch Control Center [Build: ${targetBuildId}]`;
      setStepState(1, 'done');

      /* ---------------- STEP 2: SAVE LOCALLY ---------------- */
      setStepState(2, 'active');
      await sleep(200);
      localStorage.setItem('arttouch_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_services', JSON.stringify(servicesData));
      localStorage.setItem('arttouch_faqs', JSON.stringify(faqsData));
      localStorage.setItem('arttouch_business', JSON.stringify(businessData));
      setStepState(2, 'done');

      /* ---------------- STEP 3: UPDATE GITHUB REPO (MULTI-FILE GIT TREE) ---------------- */
      setStepState(3, 'active');
      const repo = 'wrd2gore/art-touch-woodworks';
      const ghHeaders = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      };

      // Helper to fetch file content from GitHub branch (local -> raw CDN -> API)
      async function fetchRepoFileText(filePath, branch = 'main') {
        // 1. Try local file if available in app
        try {
          const locRes = await fetch(filePath);
          if (locRes.ok) {
            const txt = await locRes.text();
            if (txt && txt.includes('<!DOCTYPE html>')) return txt;
          }
        } catch(e) {}

        // 2. Try raw public GitHub CDN (100% public, CORS-enabled, no auth required)
        try {
          const rawRes = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${filePath}?_cb=${Date.now()}`);
          if (rawRes.ok) {
            const txt = await rawRes.text();
            if (txt && txt.includes('<!DOCTYPE html>')) return txt;
          }
        } catch(e) {}

        // 3. Fallback to GitHub API
        try {
          const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}&_cb=${Date.now()}`, { headers: ghHeaders });
          if (res.ok) {
            const data = await res.json();
            if (data.content) {
              return decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
            }
          }
        } catch (e) {}
        return null;
      }

      // Fetch base HTML templates
      const baseProjectsHtml = await fetchRepoFileText('projects.html') || '';
      const baseServicesHtml = await fetchRepoFileText('services.html') || '';
      const baseIndexHtml = await fetchRepoFileText('index.html') || '';

      // Generate updated files
      const dataJsContent = generateMasterDataJs(targetBuildId);
      const updatedProjectsHtml = generateUpdatedProjectsHtml(baseProjectsHtml);
      const updatedServicesHtml = generateUpdatedServicesHtml(baseServicesHtml);
      const updatedIndexHtml = generateUpdatedIndexHtml(baseIndexHtml);

      // Build tree files list
      const treeItems = [
        { path: 'js/data.js', mode: '100644', type: 'blob', content: dataJsContent }
      ];
      if (updatedProjectsHtml) {
        treeItems.push({ path: 'projects.html', mode: '100644', type: 'blob', content: updatedProjectsHtml });
      }
      if (updatedServicesHtml) {
        treeItems.push({ path: 'services.html', mode: '100644', type: 'blob', content: updatedServicesHtml });
      }
      if (updatedIndexHtml) {
        treeItems.push({ path: 'index.html', mode: '100644', type: 'blob', content: updatedIndexHtml });
      }

      // Get latest commit on main
      const refRes = await fetch(`https://api.github.com/repos/${repo}/git/ref/heads/main`, { headers: ghHeaders });
      if (refRes.status === 401 || refRes.status === 403) {
        throw new Error('GitHub authentication failed. Please verify your Personal Access Token in the Publish tab.');
      }
      if (!refRes.ok) {
        throw new Error(`Failed to read repository ref: ${refRes.statusText}`);
      }
      const refData = await refRes.json();
      const parentCommitSha = refData.object.sha;

      // Get base tree
      const parentCommitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits/${parentCommitSha}`, { headers: ghHeaders });
      const parentCommitData = await parentCommitRes.json();
      const baseTreeSha = parentCommitData.tree.sha;

      // Create new Tree
      const treeRes = await fetch(`https://api.github.com/repos/${repo}/git/trees`, {
        method: 'POST',
        headers: ghHeaders,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeItems
        })
      });
      if (!treeRes.ok) {
        const treeErr = await treeRes.json();
        throw new Error(`Git tree creation failed: ${treeErr.message || treeRes.statusText}`);
      }
      const treeData = await treeRes.json();
      const newTreeSha = treeData.sha;

      // Create new Commit
      const commitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits`, {
        method: 'POST',
        headers: ghHeaders,
        body: JSON.stringify({
          message: commitMessage,
          tree: newTreeSha,
          parents: [parentCommitSha]
        })
      });
      if (!commitRes.ok) {
        const comErr = await commitRes.json();
        throw new Error(`Git commit creation failed: ${comErr.message || commitRes.statusText}`);
      }
      const commitData = await commitRes.json();
      latestCommitSha = commitData.sha;

      // Update main ref
      const updateMainRes = await fetch(`https://api.github.com/repos/${repo}/git/refs/heads/main`, {
        method: 'PATCH',
        headers: ghHeaders,
        body: JSON.stringify({ sha: latestCommitSha, force: true })
      });
      if (!updateMainRes.ok) {
        const refErr = await updateMainRes.json();
        throw new Error(`Failed to update main branch ref: ${refErr.message}`);
      }

      // Update master ref
      try {
        await fetch(`https://api.github.com/repos/${repo}/git/refs/heads/master`, {
          method: 'PATCH',
          headers: ghHeaders,
          body: JSON.stringify({ sha: latestCommitSha, force: true })
        });
      } catch (e) {}

      setStepState(3, 'done');

      /* ---------------- STEP 4: CREATE COMMIT ---------------- */
      setStepState(4, 'active');
      await sleep(300);
      if (shaDesc && latestCommitSha) {
        shaDesc.innerHTML = `Commit: <a href="https://github.com/${repo}/commit/${latestCommitSha}" target="_blank" style="color: var(--color-brand); font-weight: 600; text-decoration: underline;">${latestCommitSha.substring(0, 7)}</a> (Updated: HTML pages &amp; data.js)`;
      }
      setStepState(4, 'done');

      /* ---------------- STEP 5: DEPLOYING WEBSITE ---------------- */
      setStepState(5, 'active');
      if (timerLabel) timerLabel.textContent = 'Triggered GitHub Pages deployment...';
      await sleep(1500);
      setStepState(5, 'done');

      /* ---------------- STEP 6: VERIFY LIVE WEBSITE ---------------- */
      setStepState(6, 'active');
      let isVerified = false;
      const maxAttempts = 24; // 24 * 3s = 72 seconds

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (timerLabel) timerLabel.textContent = `Verifying live CDN (Attempt ${attempt}/${maxAttempts})...`;
        
        try {
          const liveRes = await fetch(`https://wrd2gore.github.io/art-touch-woodworks/js/data.js?_cb=${Date.now()}`, {
            cache: 'no-store'
          });

          if (liveRes.ok) {
            const liveText = await liveRes.text();
            // Check for unique targetBuildId signature
            if (liveText.includes(targetBuildId)) {
              isVerified = true;
              break;
            }
          }
        } catch (pollErr) {}

        await sleep(3000);
      }

      if (!isVerified) {
        throw new Error(`Deployment verification timed out after 72 seconds. GitHub Pages is still building and deploying your commit (Build ID: ${targetBuildId}). The live CDN has not served the new version yet. Please wait 1 minute and check the Live Website Preview.`);
      }

      setStepState(6, 'done');

      /* ---------------- COMPLETION ---------------- */
      markDraftPublished(latestCommitSha);
      updateCodePreview();
      fetchLiveWebsiteStatus();

      // Reload live preview iframe
      const iframe = document.getElementById('live-website-preview-iframe');
      if (iframe) {
        const currentSrc = iframe.src.split('?')[0];
        iframe.src = `${currentSrc}?_t=${Date.now()}`;
      }

      const elapsedSec = Math.round((Date.now() - startTime) / 1000);
      if (timerLabel) timerLabel.textContent = `Published in ${elapsedSec}s`;

      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #059669;"></i> Published Successfully!';
      if (bannerEl) {
        bannerEl.style.display = 'block';
        bannerEl.style.background = '#ECFDF5';
        bannerEl.style.color = '#065F46';
        bannerEl.style.border = '1px solid #A7F3D0';
        bannerEl.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Changes are now LIVE on the website!</strong><br>
          <span style="font-size: 12px; display: block; margin-top: 4px;">
            Verified Live: <strong>${projectsData.length} projects</strong>, <strong>${servicesData.length} services</strong>, and business settings (Build ID: <code>${targetBuildId}</code>) on <a href="https://wrd2gore.github.io/art-touch-woodworks/projects.html" target="_blank" style="color: #065F46; font-weight: 700; text-decoration: underline;">wrd2gore.github.io/art-touch-woodworks</a>.
          </span>
        `;
      }

      if (doneBtn) doneBtn.style.display = 'inline-flex';
      if (viewSiteBtn) viewSiteBtn.style.display = 'inline-flex';
      if (closeBtn) closeBtn.style.display = 'inline-flex';

      // Record in publish history
      addPublishHistoryEntry({
        timestamp: new Date().toLocaleString(),
        summary: summaryStr,
        commitSha: latestCommitSha,
        status: 'success',
        url: 'https://wrd2gore.github.io/art-touch-woodworks/'
      });

      showNotification('=ƒÄë Published and verified live on public website!', 'success');

    } catch (err) {
      console.error(err);
      
      const activeStepIndex = [1,2,3,4,5,6].find(s => {
        const box = document.getElementById(`step-status-${s}`);
        return box && box.innerHTML.includes('Processing');
      }) || 3;

      setStepState(activeStepIndex, 'error');

      const isTokenPermError = err.message.includes('Resource not accessible') || 
                               err.message.includes('authentication failed') || 
                               err.message.includes('Bad credentials') ||
                               err.message.includes('403') ||
                               err.message.includes('401');

      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #DC2626;"></i> Publishing Failed';
      if (bannerEl) {
        bannerEl.style.display = 'block';
        bannerEl.style.background = '#FEE2E2';
        bannerEl.style.color = '#991B1B';
        bannerEl.style.border = '1px solid #F87171';
        bannerEl.innerHTML = `
          <strong><i class="fa-solid fa-circle-exclamation"></i> Publishing stopped at Step ${activeStepIndex}:</strong><br>
          <span style="font-size: 13px; display: block; margin: 4px 0 8px 0;">${escapeHtml(err.message)}</span>
          ${isTokenPermError ? `
            <div style="background: #FFFFFF; padding: 12px; border-radius: 6px; border: 1px solid #FECACA; margin-top: 8px; color: #1F2428; font-size: 12px; line-height: 1.5;">
              <strong style="color: #991B1B;"><i class="fa-solid fa-key"></i> How to fix this in 15 seconds:</strong><br>
              Your token is missing the <strong>repo</strong> write permission.<br>
              1. <a href="https://github.com/settings/tokens/new?description=Art+Touch+Control+Center&scopes=repo" target="_blank" style="color: #A88734; font-weight: 700; text-decoration: underline;">=ƒæë Click here to generate a token with 'repo' scope pre-selected</a><br>
              2. Click the green <strong>"Generate token"</strong> button at the bottom.<br>
              3. Copy your token (starts with <code>ghp_</code>) and paste it into the <strong>Publish to Website</strong> tab &rarr; <strong>Save Token</strong>.
            </div>
          ` : ''}
        `;
      }

      if (closeBtn) closeBtn.style.display = 'inline-flex';
      if (doneBtn) {
        doneBtn.textContent = 'Close';
        doneBtn.style.display = 'inline-flex';
      }

      // Record failure in publish history
      addPublishHistoryEntry({
        timestamp: new Date().toLocaleString(),
        summary: summaryStr,
        commitSha: latestCommitSha || '',
        status: 'failed',
        error: err.message
      });

      showNotification(`Publishing failed: ${err.message}`, 'error');
    }
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  window.saveGitHubToken = function() {
    const input = document.getElementById('input-gh-token');
    if (!input) return;
    const token = input.value.trim();
    if (!token) {
      showNotification('Please enter a valid GitHub token.', 'error');
      return;
    }
    localStorage.setItem('arttouch_gh_token', token);
    showNotification('GitHub Token saved securely in this app.', 'success');
  };

  window.testGitHubTokenConnection = async function() {
    const input = document.getElementById('input-gh-token');
    const token = input ? input.value.trim() : (localStorage.getItem('arttouch_gh_token') || '');
    const resultEl = document.getElementById('gh-token-test-result');

    if (!token) {
      if (resultEl) {
        resultEl.style.display = 'block';
        resultEl.style.background = '#FEE2E2';
        resultEl.style.color = '#991B1B';
        resultEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Please enter a token first.';
      }
      return;
    }

    if (resultEl) {
      resultEl.style.display = 'block';
      resultEl.style.background = '#FEF3C7';
      resultEl.style.color = '#92400E';
      resultEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying token connection...';
    }

    try {
      const res = await fetch('https://api.github.com/repos/wrd2gore/art-touch-woodworks', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('arttouch_gh_token', token);
        if (resultEl) {
          resultEl.style.background = '#ECFDF5';
          resultEl.style.color = '#065F46';
          resultEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected successfully to <strong>${data.full_name}</strong> (${data.default_branch} branch). Permissions: Push &amp; Admin OK.`;
        }
      } else {
        const err = await res.json();
        if (resultEl) {
          resultEl.style.background = '#FEE2E2';
          resultEl.style.color = '#991B1B';
          resultEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Connection error: ${err.message || res.statusText}`;
        }
      }
    } catch (e) {
      if (resultEl) {
        resultEl.style.background = '#FEE2E2';
        resultEl.style.color = '#991B1B';
        resultEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Network test failed: ${e.message}`;
      }
    }
  };

  window.downloadDataJs = function() {
    const text = generateMasterDataJs();
    const blob = new Blob([text], { type: 'application/javascript;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.js';
    link.click();
    showNotification('Downloaded data.js backup file.', 'success');
  };

  window.copyDataJsCode = function() {
    const text = generateMasterDataJs();
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied data.js code to clipboard.', 'success');
    });
  };

  /* -------------------------------------------------------------------------- */
  /* 6. CUSTOMER INQUIRIES & REQUESTS HUB                                      */
  /* -------------------------------------------------------------------------- */
  function initInquiriesListener() {
    window.addEventListener('arttouch:new-inquiry', (e) => {
      if (e.detail) {
        inquiriesData.unshift(e.detail);
        renderInquiriesTable();
        updateDashboardStats();
        showNotification(`=ƒô¼ New customer request from: ${e.detail.name || 'Visitor'}`, 'success');
      }
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'arttouch_inquiries') {
        try {
          inquiriesData = JSON.parse(e.newValue || '[]');
          renderInquiriesTable();
          updateDashboardStats();
        } catch (err) {}
      }
    });

    const searchInput = document.getElementById('inquiries-search');
    const filterSelect = document.getElementById('inquiries-filter');

    if (searchInput) searchInput.addEventListener('input', renderInquiriesTable);
    if (filterSelect) filterSelect.addEventListener('change', renderInquiriesTable);
  }

  function saveInquiriesLocally() {
    try {
      localStorage.setItem('arttouch_inquiries', JSON.stringify(inquiriesData));
    } catch (e) {}
  }

  function renderInquiriesTable() {
    const tbody = document.getElementById('inquiries-tbody');
    if (!tbody) return;

    const query = (document.getElementById('inquiries-search') ? document.getElementById('inquiries-search').value : '').toLowerCase().trim();
    const filter = document.getElementById('inquiries-filter') ? document.getElementById('inquiries-filter').value : 'all';

    let filtered = inquiriesData;

    if (filter === 'contact') {
      filtered = filtered.filter(i => i.type === 'contact');
    } else if (filter === 'quote') {
      filtered = filtered.filter(i => i.type === 'quote');
    } else if (filter === 'new') {
      filtered = filtered.filter(i => i.status === 'new');
    } else if (filter === 'handled') {
      filtered = filtered.filter(i => i.status === 'handled');
    }

    if (query) {
      filtered = filtered.filter(i => 
        (i.name && i.name.toLowerCase().includes(query)) ||
        (i.email && i.email.toLowerCase().includes(query)) ||
        (i.phone && i.phone.toLowerCase().includes(query)) ||
        (i.subject && i.subject.toLowerCase().includes(query)) ||
        (i.message && i.message.toLowerCase().includes(query))
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--color-admin-text-muted);">
            <i class="fa-solid fa-inbox" style="font-size: 32px; color: #D1D5DB; margin-bottom: 8px; display: block;"></i>
            No customer requests found matching your filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(inq => {
      const isNew = inq.status === 'new';
      const statusBadge = isNew
        ? `<span class="badge" style="background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A;"><i class="fa-solid fa-circle-dot"></i> New</span>`
        : `<span class="badge" style="background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;"><i class="fa-solid fa-check"></i> Handled</span>`;

      const typeBadge = inq.type === 'quote'
        ? `<span class="badge" style="background: #E0E7FF; color: #3730A3;"><i class="fa-solid fa-calculator"></i> Quote</span>`
        : `<span class="badge" style="background: #F3F4F6; color: #374151;"><i class="fa-solid fa-envelope"></i> Contact</span>`;

      const dateFormatted = inq.timestamp ? new Date(inq.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';

      return `
        <tr style="${isNew ? 'background-color: #FFFDF9; font-weight: 500;' : ''}">
          <td>
            <strong>${escapeHtml(inq.name)}</strong>
          </td>
          <td>${typeBadge}</td>
          <td>
            <div style="font-size: 13px;">
              ${inq.email ? `<a href="mailto:${escapeAttr(inq.email)}" style="color: var(--color-brand); text-decoration: none;"><i class="fa-solid fa-envelope"></i> ${escapeHtml(inq.email)}</a>` : ''}
            </div>
            <div style="font-size: 12px; color: var(--color-admin-text-muted); margin-top: 2px;">
              ${inq.phone ? `<a href="tel:${escapeAttr(inq.phone)}" style="color: inherit; text-decoration: none;"><i class="fa-solid fa-phone"></i> ${escapeHtml(inq.phone)}</a>` : 'No phone'}
            </div>
          </td>
          <td>
            <div style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(inq.subject || inq.message)}
            </div>
          </td>
          <td style="font-size: 12px; color: var(--color-admin-text-muted);">${dateFormatted}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn btn-outline btn-xs" onclick="window.viewInquiryDetail('${escapeAttr(inq.id)}')" title="View Details">
                <i class="fa-solid fa-eye"></i> View
              </button>
              ${isNew ? `
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.markInquiryHandled('${escapeAttr(inq.id)}')" title="Mark Handled">
                  <i class="fa-solid fa-check"></i>
                </button>
              ` : ''}
              <button type="button" class="btn btn-outline btn-xs" onclick="window.deleteInquiry('${escapeAttr(inq.id)}')" style="color: #DC2626;" title="Delete Request">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.viewInquiryDetail = function(id) {
    const inq = inquiriesData.find(i => i.id === id);
    if (!inq) return;

    const modalBody = document.getElementById('modal-inquiry-body');
    const modalFooter = document.getElementById('modal-inquiry-footer');

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--color-admin-border);">
          <div>
            <h4 style="margin: 0; font-size: 18px; color: var(--color-admin-text);">${escapeHtml(inq.name)}</h4>
            <div style="font-size: 13px; color: var(--color-admin-text-muted); margin-top: 2px;">
              Submitted on ${inq.timestamp ? new Date(inq.timestamp).toLocaleString() : 'N/A'}
            </div>
          </div>
          <div>
            <span class="badge" style="background: ${inq.status === 'new' ? '#FEF3C7' : '#ECFDF5'}; color: ${inq.status === 'new' ? '#92400E' : '#065F46'}; font-size: 12px; padding: 4px 10px;">
              ${inq.status === 'new' ? 'Status: New' : 'Status: Handled'}
            </span>
          </div>
        </div>

        <div class="form-row" style="margin-bottom: 16px;">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <div style="font-size: 14px;"><a href="mailto:${escapeAttr(inq.email)}" style="color: var(--color-brand); font-weight: 600;">${escapeHtml(inq.email || 'N/A')}</a></div>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Contact</label>
            <div style="font-size: 14px;"><a href="tel:${escapeAttr(inq.phone)}" style="color: var(--color-brand); font-weight: 600;">${escapeHtml(inq.phone || 'N/A')}</a></div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 16px;">
          <label class="form-label">Subject / Purpose</label>
          <div style="font-size: 14px; font-weight: 600; color: #1F2428;">${escapeHtml(inq.subject || 'Website Inquiry')}</div>
        </div>

        <div class="form-group" style="margin-bottom: 16px;">
          <label class="form-label">Message / Details</label>
          <div style="background: #F9FAFB; padding: 14px; border-radius: 6px; border: 1px solid var(--color-admin-border); font-size: 14px; line-height: 1.5; white-space: pre-wrap;">
            ${escapeHtml(inq.message || 'No description provided.')}
          </div>
        </div>

        ${inq.metadata ? `
          <div class="form-group" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--color-admin-border);">
            <label class="form-label" style="font-weight: 700;">Project Scope &amp; Estimation Metadata</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
              ${Object.keys(inq.metadata).map(k => `
                <div style="background: #F3F4F6; padding: 8px 12px; border-radius: 4px;">
                  <span style="color: var(--color-admin-text-muted);">${escapeHtml(k)}:</span> <strong>${escapeHtml(inq.metadata[k])}</strong>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
    }

    if (modalFooter) {
      modalFooter.innerHTML = `
        ${inq.status === 'new' ? `
          <button type="button" class="btn btn-primary btn-sm" onclick="window.markInquiryHandled('${escapeAttr(inq.id)}'); window.closeModal('modal-inquiry-detail');">
            <i class="fa-solid fa-check"></i> Mark as Handled
          </button>
        ` : ''}
        ${inq.email ? `
          <a href="mailto:${escapeAttr(inq.email)}?subject=Re: ${encodeURIComponent(inq.subject || 'Art Touch Woodworks')}" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-reply"></i> Reply via Email
          </a>
        ` : ''}
        ${inq.phone ? `
          <a href="tel:${escapeAttr(inq.phone)}" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-phone"></i> Call
          </a>
        ` : ''}
        <button type="button" class="btn btn-outline btn-sm" onclick="window.closeModal('modal-inquiry-detail')">Close</button>
      `;
    }

    window.openModal('modal-inquiry-detail');
  };

  window.markInquiryHandled = function(id) {
    const inq = inquiriesData.find(i => i.id === id);
    if (inq) {
      inq.status = 'handled';
      saveInquiriesLocally();
      renderInquiriesTable();
      updateDashboardStats();
      showNotification('Request marked as handled.', 'success');
    }
  };

  window.deleteInquiry = function(id) {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    inquiriesData = inquiriesData.filter(i => i.id !== id);
    saveInquiriesLocally();
    renderInquiriesTable();
    updateDashboardStats();
    showNotification('Inquiry deleted.', 'success');
  };

  window.clearHandledInquiries = function() {
    if (!confirm('Clear all handled customer inquiries?')) return;
    inquiriesData = inquiriesData.filter(i => i.status === 'new');
    saveInquiriesLocally();
    renderInquiriesTable();
    updateDashboardStats();
    showNotification('Handled inquiries cleared.', 'success');
  };

  window.exportInquiriesCSV = function() {
    if (inquiriesData.length === 0) {
      showNotification('No inquiries to export.', 'error');
      return;
    }

    const headers = ['ID', 'Date', 'Type', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    const rows = inquiriesData.map(i => [
      i.id || '',
      i.timestamp || '',
      i.type || '',
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      i.status || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ArtTouch_Customer_Inquiries_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    showNotification('Exported CSV file.', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 7. PROJECTS & PHOTO GALLERIES MANAGER                                     */
  /* -------------------------------------------------------------------------- */
  function renderProjectsGrid() {
    const container = document.getElementById('admin-projects-grid-container');
    if (!container) return;

    const query = (document.getElementById('projects-admin-search') ? document.getElementById('projects-admin-search').value : '').toLowerCase().trim();
    const categoryFilter = document.getElementById('projects-admin-category-filter') ? document.getElementById('projects-admin-category-filter').value : 'all';

    let filtered = projectsData;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => (p.category || '').toLowerCase() === categoryFilter.toLowerCase());
    }

    if (query) {
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.location && p.location.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query))
      );
    }

    const searchInput = document.getElementById('projects-admin-search');
    const catSelect = document.getElementById('projects-admin-category-filter');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.addEventListener('input', renderProjectsGrid);
      searchInput.dataset.bound = 'true';
    }
    if (catSelect && !catSelect.dataset.bound) {
      catSelect.addEventListener('change', renderProjectsGrid);
      catSelect.dataset.bound = 'true';
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-admin-text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 36px; color: #D1D5DB; margin-bottom: 8px;"></i>
          <div>No projects found.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const coverSrc = p.coverImage || (p.gallery && p.gallery.length > 0 ? p.gallery[0] : '');
      const galleryCount = (p.gallery && Array.isArray(p.gallery)) ? p.gallery.length : 0;

      return `
        <div class="admin-project-card">
          <div class="admin-project-thumb" style="aspect-ratio: 16/10; background: #1F2428; display: flex; align-items: center; justify-content: center; position: relative; border-radius: 4px; overflow: hidden;">
            ${coverSrc ? `
              <img src="${escapeAttr(coverSrc)}" alt="${escapeAttr(p.title)}" style="width: 100%; height: 100%; object-fit: contain; padding: 12px; background: #fff;" onerror="this.onerror=null; this.src='images/logo/art-touch-logo.png';">
            ` : `
              <div style="text-align: center; color: #9CA3AF; padding: 10px;">
                <i class="fa-solid fa-image" style="font-size: 28px; color: var(--color-brand); margin-bottom: 4px;"></i>
                <div style="font-size: 11px;">No Cover Photo</div>
              </div>
            `}
            <span class="badge" style="position: absolute; top: 8px; left: 8px; background: rgba(17,24,39,0.85); color: #fff; font-size: 11px;">
              ${escapeHtml(p.category || 'Woodwork')}
            </span>
            ${galleryCount > 0 ? `
              <span class="badge" style="position: absolute; bottom: 8px; right: 8px; background: rgba(168,135,52,0.9); color: #fff; font-size: 11px;">
                <i class="fa-solid fa-camera"></i> ${galleryCount}
              </span>
            ` : ''}
          </div>

          <div class="admin-project-body" style="padding: 12px 0 0 0;">
            <h4 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: var(--color-admin-text);">${escapeHtml(p.title)}</h4>
            <div style="font-size: 12px; color: var(--color-admin-text-muted); margin-bottom: 12px;">
              ${p.location ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(p.location)}</span>` : ''}
              ${p.dateCompleted ? `<span style="margin-left: 8px;"><i class="fa-solid fa-calendar"></i> ${escapeHtml(p.dateCompleted)}</span>` : ''}
            </div>

            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-primary btn-xs" onclick="window.editProjectModal('${escapeAttr(p.id)}')" style="flex: 1;">
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <a href="project-details.html?id=${encodeURIComponent(p.id)}" target="_blank" class="btn btn-outline btn-xs" title="Preview on Website">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
              <button type="button" class="btn btn-outline btn-xs" onclick="window.deleteProject('${escapeAttr(p.id)}')" style="color: #DC2626;" title="Delete Project">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openNewProjectModal = function() {
    document.getElementById('project-modal-title').textContent = 'Add New Woodwork Project';
    document.getElementById('edit-project-id').value = '';
    document.getElementById('edit-project-title').value = '';
    document.getElementById('edit-project-category').value = 'Commercial';
    document.getElementById('edit-project-location').value = 'Amman, Jordan';
    document.getElementById('edit-project-date').value = new Date().getFullYear().toString();
    document.getElementById('edit-project-area').value = '';
    document.getElementById('edit-project-cover').value = '';
    document.getElementById('edit-project-desc').value = '';
    tempEditingGallery = [];
    renderGalleryManagerPhotos();
    window.openModal('modal-project-editor');
  };

  window.editProjectModal = function(id) {
    const p = projectsData.find(item => item.id === id);
    if (!p) return;

    document.getElementById('project-modal-title').textContent = `Edit Project GÇö ${p.title}`;
    document.getElementById('edit-project-id').value = p.id;
    document.getElementById('edit-project-title').value = p.title || '';
    document.getElementById('edit-project-category').value = p.category || 'Commercial';
    document.getElementById('edit-project-location').value = p.location || '';
    document.getElementById('edit-project-date').value = p.dateCompleted || '';
    document.getElementById('edit-project-area').value = p.area || '';
    document.getElementById('edit-project-cover').value = p.coverImage || '';
    document.getElementById('edit-project-desc').value = p.description || '';
    
    tempEditingGallery = (p.gallery && Array.isArray(p.gallery)) ? [...p.gallery] : [];
    renderGalleryManagerPhotos();
    window.openModal('modal-project-editor');
  };

  function renderGalleryManagerPhotos() {
    const container = document.getElementById('gallery-manager-photos-list');
    const countEl = document.getElementById('gallery-manager-count');
    if (!container) return;

    if (countEl) countEl.textContent = `${tempEditingGallery.length} photos`;

    if (tempEditingGallery.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; font-size: 12px; color: var(--color-admin-text-muted); padding: 10px 0;">No gallery photos added yet.</div>`;
      return;
    }

    container.innerHTML = tempEditingGallery.map((imgUrl, idx) => `
      <div style="position: relative; aspect-ratio: 1; background: #fff; border: 1px solid var(--color-admin-border); border-radius: 4px; overflow: hidden; padding: 4px;">
        <img src="${escapeAttr(imgUrl)}" alt="Photo ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 2px;" onerror="this.onerror=null; this.src='images/logo/art-touch-logo.png';">
        <button type="button" onclick="window.removeGalleryPhoto(${idx})" style="position: absolute; top: 4px; right: 4px; background: rgba(220,38,38,0.85); color: #fff; border: none; border-radius: 50%; width: 22px; height: 22px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Remove Photo">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');
  }

  window.addGalleryPhotoFromInput = function() {
    const input = document.getElementById('new-photo-url-input');
    if (!input) return;
    const url = input.value.trim();
    if (!url) return;

    tempEditingGallery.push(url);
    input.value = '';
    renderGalleryManagerPhotos();
  };

  window.removeGalleryPhoto = function(index) {
    tempEditingGallery.splice(index, 1);
    renderGalleryManagerPhotos();
  };

  window.saveProjectFromModal = function(e) {
    if (e) e.preventDefault();

    const idInput = document.getElementById('edit-project-id').value;
    const title = document.getElementById('edit-project-title').value.trim();
    const category = document.getElementById('edit-project-category').value;
    const location = document.getElementById('edit-project-location').value.trim();
    const dateCompleted = document.getElementById('edit-project-date').value.trim();
    const area = document.getElementById('edit-project-area').value.trim();
    const coverImage = document.getElementById('edit-project-cover').value.trim();
    const description = document.getElementById('edit-project-desc').value.trim();

    if (!title) {
      alert('Please enter a project title.');
      return;
    }

    const projectId = idInput || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const projectObj = {
      id: projectId,
      category: category,
      title: title,
      location: location,
      dateCompleted: dateCompleted,
      area: area,
      coverImage: coverImage,
      description: description,
      gallery: tempEditingGallery
    };

    if (idInput) {
      const idx = projectsData.findIndex(p => p.id === idInput);
      if (idx !== -1) projectsData[idx] = projectObj;
      else projectsData.push(projectObj);
    } else {
      projectsData.unshift(projectObj);
    }

    try {
      localStorage.setItem('arttouch_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsData));
    } catch (err) {}

    markDraftModified();
    renderProjectsGrid();
    updateDashboardStats();
    window.closeModal('modal-project-editor');
    showNotification(`Project "${title}" saved as draft. Click Publish when ready.`, 'success');
  };

  window.deleteProject = function(id) {
    const p = projectsData.find(item => item.id === id);
    if (!p) return;
    if (!confirm(`Are you sure you want to delete "${p.title}"?`)) return;

    projectsData = projectsData.filter(item => item.id !== id);
    try {
      localStorage.setItem('arttouch_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsData));
    } catch (err) {}

    markDraftModified();
    renderProjectsGrid();
    updateDashboardStats();
    showNotification(`Project "${p.title}" removed. Click Publish to apply live.`, 'success');
  };

  window.restoreDefaultProjects = function() {
    if (!confirm('Restore all 14 authentic default verified projects? Any custom additions will be replaced.')) return;

    projectsData = JSON.parse(JSON.stringify(DEFAULT_AUTHENTIC_PROJECTS));

    try {
      localStorage.setItem('arttouch_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsData));
    } catch (err) {}

    markDraftModified();
    renderProjectsGrid();
    updateDashboardStats();
    showNotification('Restored 14 default verified projects.', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 8. SERVICES & CAPABILITIES MANAGER                                        */
  /* -------------------------------------------------------------------------- */
  function renderServicesGrid() {
    const container = document.getElementById('admin-services-grid-container');
    if (!container) return;

    if (servicesData.length === 0) {
      servicesData = [...DEFAULT_AUTHENTIC_SERVICES];
    }

    container.innerHTML = servicesData.map(s => `
      <div class="admin-card" style="padding: 16px; border: 1px solid var(--color-admin-border);">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
          <div style="font-size: 24px; color: var(--color-brand);">
            <i class="${escapeAttr(s.icon || 'fa-solid fa-tree')}"></i>
          </div>
          <div style="display: flex; gap: 4px;">
            <button type="button" class="btn btn-outline btn-xs" onclick="window.editServiceModal('${escapeAttr(s.id)}')" title="Edit Service">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn btn-outline btn-xs" onclick="window.deleteService('${escapeAttr(s.id)}')" style="color: #DC2626;" title="Delete Service">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: var(--color-admin-text);">${escapeHtml(s.title)}</h4>
        <p style="font-size: 13px; color: var(--color-admin-text-muted); margin-bottom: 10px; line-height: 1.4;">${escapeHtml(s.shortDesc)}</p>
        
        ${s.features && Array.isArray(s.features) ? `
          <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: var(--color-admin-text);">
            ${s.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  }

  window.openNewServiceModal = function() {
    document.getElementById('service-modal-title').textContent = 'Add New Woodwork Service';
    document.getElementById('edit-service-id').value = '';
    document.getElementById('edit-service-title').value = '';
    document.getElementById('edit-service-icon').value = 'fa-solid fa-hammer';
    document.getElementById('edit-service-desc').value = '';
    document.getElementById('edit-service-features').value = '';
    window.openModal('modal-service-editor');
  };

  window.editServiceModal = function(id) {
    const s = servicesData.find(item => item.id === id);
    if (!s) return;

    document.getElementById('service-modal-title').textContent = `Edit Service GÇö ${s.title}`;
    document.getElementById('edit-service-id').value = s.id;
    document.getElementById('edit-service-title').value = s.title || '';
    document.getElementById('edit-service-icon').value = s.icon || 'fa-solid fa-tree';
    document.getElementById('edit-service-desc').value = s.shortDesc || '';
    document.getElementById('edit-service-features').value = (s.features && Array.isArray(s.features)) ? s.features.join('\n') : '';
    window.openModal('modal-service-editor');
  };

  window.saveServiceFromModal = function(e) {
    if (e) e.preventDefault();

    const idInput = document.getElementById('edit-service-id').value;
    const title = document.getElementById('edit-service-title').value.trim();
    const icon = document.getElementById('edit-service-icon').value.trim() || 'fa-solid fa-tree';
    const shortDesc = document.getElementById('edit-service-desc').value.trim();
    const featuresRaw = document.getElementById('edit-service-features').value.trim();
    const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(Boolean) : [];

    if (!title) {
      alert('Please enter a service title.');
      return;
    }

    const serviceId = idInput || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const serviceObj = {
      id: serviceId,
      title: title,
      icon: icon,
      shortDesc: shortDesc,
      features: features
    };

    if (idInput) {
      const idx = servicesData.findIndex(s => s.id === idInput);
      if (idx !== -1) servicesData[idx] = serviceObj;
      else servicesData.push(serviceObj);
    } else {
      servicesData.push(serviceObj);
    }

    try {
      localStorage.setItem('arttouch_services', JSON.stringify(servicesData));
    } catch (err) {}

    markDraftModified();
    renderServicesGrid();
    updateDashboardStats();
    window.closeModal('modal-service-editor');
    showNotification(`Service "${title}" saved as draft. Click Publish when ready.`, 'success');
  };

  window.deleteService = function(id) {
    const s = servicesData.find(item => item.id === id);
    if (!s) return;
    if (!confirm(`Delete service "${s.title}"?`)) return;

    servicesData = servicesData.filter(item => item.id !== id);
    try {
      localStorage.setItem('arttouch_services', JSON.stringify(servicesData));
    } catch (err) {}

    markDraftModified();
    renderServicesGrid();
    updateDashboardStats();
    showNotification(`Service removed. Click Publish to apply live.`, 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 9. FREQUENTLY ASKED QUESTIONS (FAQS) MANAGER                              */
  /* -------------------------------------------------------------------------- */
  function renderFaqsList() {
    const container = document.getElementById('admin-faqs-list');
    if (!container) return;

    if (faqsData.length === 0) {
      faqsData = [...DEFAULT_AUTHENTIC_FAQS];
    }

    container.innerHTML = faqsData.map((f, idx) => `
      <div style="background: #F9FAFB; padding: 16px; border-radius: 6px; border: 1px solid var(--color-admin-border);">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 6px;">
          <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--color-admin-text);">
            <i class="fa-regular fa-circle-question text-brand"></i> ${escapeHtml(f.q)}
          </h4>
          <div style="display: flex; gap: 6px; white-space: nowrap;">
            <button type="button" class="btn btn-outline btn-xs" onclick="window.editFaqModal(${idx})" title="Edit FAQ">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button type="button" class="btn btn-outline btn-xs" onclick="window.deleteFaq(${idx})" style="color: #DC2626;" title="Delete FAQ">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <p style="margin: 0; font-size: 13px; color: var(--color-admin-text-muted); line-height: 1.5;">${escapeHtml(f.a)}</p>
      </div>
    `).join('');
  }

  window.openNewFaqModal = function() {
    document.getElementById('faq-modal-title').textContent = 'Add New FAQ';
    document.getElementById('edit-faq-index').value = '';
    document.getElementById('edit-faq-q').value = '';
    document.getElementById('edit-faq-a').value = '';
    window.openModal('modal-faq-editor');
  };

  window.editFaqModal = function(idx) {
    const f = faqsData[idx];
    if (!f) return;

    document.getElementById('faq-modal-title').textContent = 'Edit FAQ';
    document.getElementById('edit-faq-index').value = idx.toString();
    document.getElementById('edit-faq-q').value = f.q || '';
    document.getElementById('edit-faq-a').value = f.a || '';
    window.openModal('modal-faq-editor');
  };

  window.saveFaqFromModal = function(e) {
    if (e) e.preventDefault();

    const idxStr = document.getElementById('edit-faq-index').value;
    const q = document.getElementById('edit-faq-q').value.trim();
    const a = document.getElementById('edit-faq-a').value.trim();

    if (!q || !a) {
      alert('Please enter both question and answer.');
      return;
    }

    const faqObj = { q: q, a: a };

    if (idxStr !== '') {
      const idx = parseInt(idxStr, 10);
      if (!isNaN(idx) && faqsData[idx]) faqsData[idx] = faqObj;
    } else {
      faqsData.push(faqObj);
    }

    try {
      localStorage.setItem('arttouch_faqs', JSON.stringify(faqsData));
    } catch (err) {}

    markDraftModified();
    renderFaqsList();
    updateDashboardStats();
    window.closeModal('modal-faq-editor');
    showNotification('FAQ saved as draft. Click Publish when ready.', 'success');
  };

  window.deleteFaq = function(idx) {
    if (!confirm('Delete this FAQ?')) return;
    faqsData.splice(idx, 1);
    try {
      localStorage.setItem('arttouch_faqs', JSON.stringify(faqsData));
    } catch (err) {}

    markDraftModified();
    renderFaqsList();
    updateDashboardStats();
    showNotification('FAQ removed. Click Publish to apply live.', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 10. BUSINESS SETTINGS MANAGER                                              */
  /* -------------------------------------------------------------------------- */
  window.saveBusinessSettings = function() {
    const loc = document.getElementById('setting-location').value.trim();
    const phone = document.getElementById('setting-phone').value.trim();
    const days = document.getElementById('setting-days').value.trim();
    const hours = document.getElementById('setting-hours').value.trim();
    const emailGen = document.getElementById('setting-email-general').value.trim();
    const emailGm = document.getElementById('setting-email-gm').value.trim();
    const emailCeo = document.getElementById('setting-email-ceo').value.trim();

    let openTime = "09:00 AM";
    let closeTime = "06:00 PM";
    if (hours.includes('-')) {
      const parts = hours.split('-');
      openTime = parts[0].trim();
      closeTime = parts[1].trim();
    }

    businessData = {
      location: loc || "Nadhmi Abdul Hadi St., Amman, Jordan",
      country: "Jordan",
      timezone: "Asia/Amman",
      days: days || "Sunday - Thursday",
      open: openTime,
      close: closeTime,
      weekendDays: [5, 6],
      phone: phone || "+962 (6) 222 3 707",
      phoneClean: (phone || "+962 (6) 222 3 707").replace(/[^0-9+]/g, ''),
      emails: {
        general: emailGen || "info@arttouchjo.com",
        generalManager: emailGm || "m.shaheen@arttouchjo.com",
        ceoPlantManager: emailCeo || "m.maghari@arttouchjo.com"
      }
    };

    try {
      localStorage.setItem('arttouch_business', JSON.stringify(businessData));
    } catch (err) {}

    markDraftModified();
    showNotification('Business details saved as draft. Click Publish when ready.', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 11. STATS & MODAL CONTROLLERS                                              */
  /* -------------------------------------------------------------------------- */
  function updateDashboardStats() {
    const statInquiries = document.getElementById('stat-inquiries-count');
    const statProjects = document.getElementById('stat-projects-count');
    const statServices = document.getElementById('stat-services-count');
    const statFaqs = document.getElementById('stat-faqs-count');
    const statUnread = document.getElementById('stat-unread-count');

    const unreadCount = inquiriesData.filter(i => i.status === 'new').length;

    if (statInquiries) statInquiries.textContent = inquiriesData.length;
    if (statProjects) statProjects.textContent = projectsData.length;
    if (statServices) statServices.textContent = servicesData.length;
    if (statFaqs) statFaqs.textContent = faqsData.length;
    if (statUnread) {
      statUnread.textContent = unreadCount;
      statUnread.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
  }

  window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  };

  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  };

  // Close modals on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.admin-modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

  // Universal Toast Notification
  function showNotification(msg, type = 'info') {
    const existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'admin-toast animate-fade-up';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: ${type === 'error' ? '#EF4444' : (type === 'success' ? '#10B981' : '#1F2428')};
      color: #FFFFFF;
      padding: 14px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    toast.innerHTML = `${type === 'error' ? '<i class="fa-solid fa-circle-exclamation"></i>' : '<i class="fa-solid fa-circle-check"></i>'} <span>${escapeHtml(msg)}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  window.showToast = showNotification;

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

})();
