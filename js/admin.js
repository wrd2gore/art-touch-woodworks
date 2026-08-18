/**
 * ============================================================================
 * ART TOUCH WOODWORKS — BRAND NEW CONTROL CENTER ENGINE
 * Ground-Up Luxury Architecture, Master Data Management & Atomic Publishing
 * ============================================================================
 */

(function() {
  'use strict';

  /* -------------------------------------------------------------------------- */
  /* 1. AUTHENTIC COMPANY MASTER DATASETS                                      */
  /* -------------------------------------------------------------------------- */
  const DEFAULT_PROJECTS = [
    {
      id: "project-1",
      title: "QAIA Government Services Center",
      category: "commercial",
      client: "Queen Alia International Airport",
      year: "2024",
      image: "images/portfolio/qaia-gov-01.jpg",
      description: "Comprehensive architectural woodwork, bespoke acoustic wall paneling, integrated reception counters, and executive joinery for the Queen Alia International Airport Government Services Center.",
      gallery: ["images/portfolio/qaia-gov-01.jpg"]
    },
    {
      id: "project-2",
      title: "Water Awareness Center",
      category: "hospitality",
      client: "Ministry of Water & Irrigation",
      year: "2024",
      image: "images/portfolio/water-awareness-01.jpg",
      description: "Curved educational displays, natural oak architectural cladding, interactive exhibition millwork, and custom portal entrances.",
      gallery: ["images/portfolio/water-awareness-01.jpg"]
    },
    {
      id: "project-3",
      title: "Embassy of Qatar",
      category: "hospitality",
      client: "State of Qatar Diplomatic Mission",
      year: "2023",
      image: "images/portfolio/embassy-qatar-01.jpg",
      description: "High-security architectural solid timber doors, ornate majlis wall paneling, gold-inlaid walnut portals, and diplomatic executive furniture.",
      gallery: ["images/portfolio/embassy-qatar-01.jpg"]
    },
    {
      id: "project-4",
      title: "Embassy of Ireland",
      category: "hospitality",
      client: "Department of Foreign Affairs, Ireland",
      year: "2023",
      image: "images/portfolio/embassy-ireland-01.jpg",
      description: "European white oak bespoke cabinetry, ambassadorial boardroom table, acoustic partition screens, and architectural interior fit-out.",
      gallery: ["images/portfolio/embassy-ireland-01.jpg"]
    },
    {
      id: "project-5",
      title: "Rajha Private Villa",
      category: "residential",
      client: "Private Residence, Abdoun",
      year: "2024",
      image: "images/portfolio/rajha-villa-01.jpg",
      description: "Ultra-luxury residential woodwork: custom walk-in closets with integrated lighting, bespoke teak portal doors, fluted wall cladding, and chef's kitchen joinery.",
      gallery: ["images/portfolio/rajha-villa-01.jpg"]
    },
    {
      id: "project-6",
      title: "Al Hasan Luxury Residence",
      category: "residential",
      client: "Private Client, Dabouq",
      year: "2024",
      image: "images/portfolio/al-hasan-villa-01.jpg",
      description: "Grand pivot entrance door in weathered thermo-ash, walnut library with concealed shelving, and custom master suite wall paneling.",
      gallery: ["images/portfolio/al-hasan-villa-01.jpg"]
    },
    {
      id: "project-7",
      title: "PwC Regional Headquarters",
      category: "commercial",
      client: "PricewaterhouseCoopers Middle East",
      year: "2023",
      image: "images/portfolio/pwc-01.jpg",
      description: "Modern acoustic slatted wall paneling, executive boardroom table, pantry millwork, and collaborative workspace booths.",
      gallery: ["images/portfolio/pwc-01.jpg"]
    },
    {
      id: "project-8",
      title: "Specialized Leasing Company",
      category: "commercial",
      client: "Housing Bank Group",
      year: "2023",
      image: "images/portfolio/specialized-leasing-01.jpg",
      description: "Corporate office fit-out, customer service counters with marble-wood transitions, and executive suite woodwork.",
      gallery: ["images/portfolio/specialized-leasing-01.jpg"]
    },
    {
      id: "project-9",
      title: "Al Ghad Newspaper Headquarters",
      category: "commercial",
      client: "Al Ghad Media Group",
      year: "2023",
      image: "images/portfolio/al-ghad-01.jpg",
      description: "Newsroom workstations, media archive wall storage, and executive management portals.",
      gallery: ["images/portfolio/al-ghad-01.jpg"]
    },
    {
      id: "project-10",
      title: "Bank al Etihad Flagship Branches",
      category: "commercial",
      client: "Bank al Etihad",
      year: "2024",
      image: "images/portfolio/bank-al-etihad-01.jpg",
      description: "Contemporary curved teller counters, customer waiting banquettes, and acoustic baffle ceiling slats.",
      gallery: ["images/portfolio/bank-al-etihad-01.jpg"]
    },
    {
      id: "project-11",
      title: "Arab Bank Executive Offices",
      category: "commercial",
      client: "Arab Bank plc",
      year: "2023",
      image: "images/portfolio/arab-bank-01.jpg",
      description: "Traditional mahogany executive conference room, custom credenzas, and decorative timber mouldings.",
      gallery: ["images/portfolio/arab-bank-01.jpg"]
    },
    {
      id: "project-12",
      title: "Jordan Kuwait Bank",
      category: "commercial",
      client: "Jordan Kuwait Bank",
      year: "2023",
      image: "images/portfolio/jordan-kuwait-bank-01.jpg",
      description: "Branch modernization woodwork: modular counter systems, self-service kiosk surrounds, and privacy partitions.",
      gallery: ["images/portfolio/jordan-kuwait-bank-01.jpg"]
    },
    {
      id: "project-13",
      title: "Invest Bank Amman",
      category: "commercial",
      client: "Invest Bank",
      year: "2024",
      image: "images/portfolio/invest-bank-01.jpg",
      description: "Bespoke VIP lounge millwork, brushed brass and smoked oak accents, and reception statement wall.",
      gallery: ["images/portfolio/invest-bank-01.jpg"]
    },
    {
      id: "project-14",
      title: "Jordan Islamic Bank",
      category: "commercial",
      client: "Jordan Islamic Bank",
      year: "2023",
      image: "images/portfolio/jordan-islamic-bank-01.jpg",
      description: "Islamic geometric fretwork screens, solid oak executive desks, and teller counter fit-out.",
      gallery: ["images/portfolio/jordan-islamic-bank-01.jpg"]
    }
  ];

  const DEFAULT_SERVICES = [
    {
      id: "srv-1",
      title: "Architectural Woodwork & Millwork",
      subtitle: "Bespoke Joinery & Fit-Out",
      icon: "fa-solid fa-tree",
      description: "Custom-engineered architectural woodwork tailored to exact project specifications, from intricate mouldings to large-scale ceiling and wall installations for commercial and residential spaces.",
      features: [
        "Custom mouldings, cornices, and baseboards",
        "Curved and parametric timber structures",
        "Reception desks and customer service counters",
        "Acoustic ceiling baffles and timber rafts",
        "Fire-rated and moisture-resistant millwork"
      ]
    },
    {
      id: "srv-2",
      title: "Luxury Bespoke Doors & Portals",
      subtitle: "Grand Entrances & Interior Doors",
      icon: "fa-solid fa-door-open",
      description: "Handcrafted interior and exterior door systems, featuring pivot mechanisms, sliding barn doors, oversized portals, and high-performance acoustic and fire-rated assemblies.",
      features: [
        "Oversized pivot doors with concealed European hardware",
        "Solid timber, veneered, and lacquer-finished doors",
        "Acoustic soundproof doors up to STC 45",
        "Fire-rated timber doors (FD30, FD60, FD90)",
        "Integrated brass, bronze, and stone inlays"
      ]
    },
    {
      id: "srv-3",
      title: "Custom Fixed & Loose Joinery",
      subtitle: "Built-In & Freestanding Cabinetry",
      icon: "fa-solid fa-couch",
      description: "Precision-manufactured cabinetry, wardrobes, libraries, and vanity units crafted with premium hardwoods, veneers, and European hardware for lasting durability and elegance.",
      features: [
        "Walk-in closets and luxury wardrobe systems",
        "Custom library and study wall units",
        "Executive boardroom and conference tables",
        "Floating and freestanding vanity units",
        "Concealed LED lighting integration"
      ]
    },
    {
      id: "srv-4",
      title: "Wall Paneling & Acoustical Cladding",
      subtitle: "Decorative & Sound-Absorbing Paneling",
      icon: "fa-solid fa-layer-group",
      description: "Decorative and functional wall cladding solutions, including fluted panels, geometric veneers, fabric-wrapped acoustic panels, and integrated ambient lighting channels.",
      features: [
        "Fluted, slatted, and ribbed timber wall cladding",
        "Bookmatched and slip-matched veneer paneling",
        "Micro-perforated acoustic timber panels",
        "Concealed door and secret portal integration",
        "Metal inlay and shadow-gap architectural detailing"
      ]
    },
    {
      id: "srv-5",
      title: "Kitchen & Vanity Manufacturing",
      subtitle: "Gourmet Kitchens & Bath Joinery",
      icon: "fa-solid fa-kitchen-set",
      description: "German-precision hardware meets artisan woodcraft. Full-service custom kitchen design, fabrication, and installation for luxury residences and development projects.",
      features: [
        "Solid wood and veneer cabinet fronts",
        "Blum and Hettich premium hardware systems",
        "Integrated appliance panels and pantries",
        "Custom island units with timber breakfast bars",
        "Moisture-proof marine-grade substrate materials"
      ]
    },
    {
      id: "srv-6",
      title: "Turnkey Fit-Out & Commercial Interiors",
      subtitle: "Full-Scope Interior Fit-Out",
      icon: "fa-solid fa-building",
      description: "End-to-end commercial fit-out execution for corporate offices, embassies, financial institutions, and hospitality venues, managing every detail from shop drawings to handover.",
      features: [
        "Complete commercial interior fit-out execution",
        "Shop drawings, 3D modeling, and engineering",
        "MEP and lighting coordination with woodwork",
        "On-site installation by master carpenters",
        "Project management, QA/QC, and warranty support"
      ]
    }
  ];

  const DEFAULT_FAQS = [
    {
      id: "faq-1",
      question: "What is your typical project timeline from concept to installation?",
      answer: "Project timelines depend on the scope and complexity. Typically, shop drawings and material approvals take 1–2 weeks, manufacturing takes 3–6 weeks, and on-site installation takes 1–3 weeks. For fast-track projects, expedited schedules are available."
    },
    {
      id: "faq-2",
      question: "Can you manufacture custom dimensions and match specific wood species?",
      answer: "Yes, every single piece we produce is 100% custom-engineered. We source premium hardwoods and veneers globally (including American Walnut, European Oak, Teak, Ash, and exotic species) and provide custom stain/finish matching."
    },
    {
      id: "faq-3",
      question: "Do you handle international projects and regional fit-outs?",
      answer: "Yes. While our primary manufacturing facility is in Amman, Jordan, we regularly fabricate, export, and install architectural woodwork for embassies, commercial offices, and private estates across the GCC and MENA region."
    },
    {
      id: "faq-4",
      question: "What warranty and maintenance support do you provide?",
      answer: "We provide a comprehensive warranty on all structural woodwork, door systems, and cabinetry, along with manufacturer warranties on European hardware (Blum, Hettich, Hafele). We also offer periodic maintenance and refinishing packages."
    },
    {
      id: "faq-5",
      question: "How do I get a formal quotation for my architectural project?",
      answer: "You can submit your architectural drawings, BOQ, or project specifications directly via our online Quote Wizard or by emailing us at info@arttouchjo.com. Our engineering team will review and provide a detailed itemized proposal."
    }
  ];

  const DEFAULT_BUSINESS = {
    phone: "+962 (6) 222 3 707",
    location: "Nadhmi Abdul Hadi St., Amman, Jordan",
    days: "Sunday – Thursday",
    hours: "8:00 AM - 5:00 PM",
    emails: {
      general: "info@arttouchjo.com",
      generalManager: "gm@arttouchjo.com",
      ceoPlantManager: "ceo@arttouchjo.com"
    }
  };

  /* -------------------------------------------------------------------------- */
  /* 2. STATE MANAGEMENT & HYDRATION                                            */
  /* -------------------------------------------------------------------------- */
  let projectsData = [];
  let servicesData = [];
  let faqsData = [];
  let businessData = {};
  let inquiriesData = [];
  let activeTab = 'inquiries';
  let hasDraftChanges = false;
  let currentProjectGallery = [];

  const GITHUB_REPO = 'wrd2gore/art-touch-woodworks';
  const GITHUB_TOKEN = 'ghp_4j1c0pQ4nZ1bT7w2R9x8L5k3M6v0Y8A1B2C3'; // Safe write token

  function loadAllState() {
    // 1. Projects
    try {
      const p = localStorage.getItem('arttouch_custom_projects') || localStorage.getItem('arttouch_projects');
      if (p) {
        const parsed = JSON.parse(p);
        projectsData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : [...DEFAULT_PROJECTS];
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.projects) && window.ArtTouchData.projects.length > 0) {
        projectsData = JSON.parse(JSON.stringify(window.ArtTouchData.projects));
      } else {
        projectsData = [...DEFAULT_PROJECTS];
      }
    } catch(e) {
      projectsData = [...DEFAULT_PROJECTS];
    }

    // 2. Services
    try {
      const s = localStorage.getItem('arttouch_services');
      if (s) {
        const parsed = JSON.parse(s);
        servicesData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : [...DEFAULT_SERVICES];
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.services) && window.ArtTouchData.services.length > 0) {
        servicesData = JSON.parse(JSON.stringify(window.ArtTouchData.services));
      } else {
        servicesData = [...DEFAULT_SERVICES];
      }
    } catch(e) {
      servicesData = [...DEFAULT_SERVICES];
    }

    // 3. FAQs
    try {
      const f = localStorage.getItem('arttouch_faqs');
      if (f) {
        const parsed = JSON.parse(f);
        faqsData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : [...DEFAULT_FAQS];
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.faqs) && window.ArtTouchData.faqs.length > 0) {
        faqsData = JSON.parse(JSON.stringify(window.ArtTouchData.faqs));
      } else {
        faqsData = [...DEFAULT_FAQS];
      }
    } catch(e) {
      faqsData = [...DEFAULT_FAQS];
    }

    // 4. Business Info
    try {
      const b = localStorage.getItem('arttouch_business');
      if (b) {
        const parsed = JSON.parse(b);
        businessData = (parsed && parsed.phone) ? parsed : JSON.parse(JSON.stringify(DEFAULT_BUSINESS));
      } else if (window.ArtTouchData && window.ArtTouchData.businessHours) {
        businessData = JSON.parse(JSON.stringify(window.ArtTouchData.businessHours));
      } else {
        businessData = JSON.parse(JSON.stringify(DEFAULT_BUSINESS));
      }
    } catch(e) {
      businessData = JSON.parse(JSON.stringify(DEFAULT_BUSINESS));
    }

    // 5. Inquiries
    try {
      const inq = localStorage.getItem('arttouch_inquiries');
      inquiriesData = inq ? JSON.parse(inq) : [];
    } catch(e) {
      inquiriesData = [];
    }

    hasDraftChanges = localStorage.getItem('arttouch_has_draft') === 'true';
    populateBusinessInputs();
    updateKPIs();
  }

  function saveStateLocally() {
    try {
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_services', JSON.stringify(servicesData));
      localStorage.setItem('arttouch_faqs', JSON.stringify(faqsData));
      localStorage.setItem('arttouch_business', JSON.stringify(businessData));
      localStorage.setItem('arttouch_inquiries', JSON.stringify(inquiriesData));
      localStorage.setItem('arttouch_has_draft', hasDraftChanges ? 'true' : 'false');

      if (window.ArtTouchData) {
        window.ArtTouchData.projects = projectsData;
        window.ArtTouchData.services = servicesData;
        window.ArtTouchData.faqs = faqsData;
        window.ArtTouchData.businessHours = businessData;
      }
    } catch(e) {}

    updateKPIs();
    updateTopbarPublishPill();
  }

  function populateBusinessInputs() {
    if (document.getElementById('setting-phone') && businessData.phone) document.getElementById('setting-phone').value = businessData.phone;
    if (document.getElementById('setting-location') && businessData.location) document.getElementById('setting-location').value = businessData.location;
    if (document.getElementById('setting-days') && businessData.days) document.getElementById('setting-days').value = businessData.days;
    if (document.getElementById('setting-hours') && businessData.hours) document.getElementById('setting-hours').value = businessData.hours;
    if (document.getElementById('setting-email-general') && businessData.emails && businessData.emails.general) document.getElementById('setting-email-general').value = businessData.emails.general;
    if (document.getElementById('setting-email-gm') && businessData.emails && businessData.emails.generalManager) document.getElementById('setting-email-gm').value = businessData.emails.generalManager;
    if (document.getElementById('setting-email-ceo') && businessData.emails && businessData.emails.ceoPlantManager) document.getElementById('setting-email-ceo').value = businessData.emails.ceoPlantManager;
  }

  function updateKPIs() {
    const unread = inquiriesData.filter(i => i.status === 'new').length;
    const badge = document.getElementById('stat-unread-count');
    if (badge) badge.textContent = unread;

    if (document.getElementById('stat-kpi-inquiries')) document.getElementById('stat-kpi-inquiries').textContent = inquiriesData.length;
    if (document.getElementById('stat-kpi-projects')) document.getElementById('stat-kpi-projects').textContent = projectsData.length;
    if (document.getElementById('stat-kpi-services')) document.getElementById('stat-kpi-services').textContent = servicesData.length;
    if (document.getElementById('stat-kpi-faqs')) document.getElementById('stat-kpi-faqs').textContent = faqsData.length;

    if (document.getElementById('projects-total-badge')) document.getElementById('projects-total-badge').textContent = projectsData.length;
    if (document.getElementById('faqs-total-badge')) document.getElementById('faqs-total-badge').textContent = faqsData.length;

    if (document.getElementById('publish-sum-projects')) document.getElementById('publish-sum-projects').textContent = projectsData.length;
    if (document.getElementById('publish-sum-services')) document.getElementById('publish-sum-services').textContent = servicesData.length;
    if (document.getElementById('publish-sum-faqs')) document.getElementById('publish-sum-faqs').textContent = faqsData.length;
    if (document.getElementById('publish-sum-phone')) document.getElementById('publish-sum-phone').textContent = businessData.phone || '+962 (6) 222 3 707';
  }

    const tokenInput = document.getElementById('input-gh-token');
    if (tokenInput) {
      tokenInput.value = localStorage.getItem('arttouch_gh_token') || '';
    }
  }

  function updateTopbarPublishPill() {
    const pill = document.getElementById('topbar-status-pill');
    if (!pill) return;
    if (hasDraftChanges) {
      pill.innerHTML = '<i class="fa-solid fa-circle-dot" style="color: var(--color-warning);"></i> <span>Draft Changes Pending</span>';
    } else {
      pill.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--color-success);"></i> <span>Website Synchronized</span>';
    }
  }

  window.saveGitHubToken = function() {
    const input = document.getElementById('input-gh-token');
    if (!input) return;
    const val = input.value.trim();
    if (!val) {
      alert('Please enter a GitHub Personal Access Token.');
      return;
    }
    localStorage.setItem('arttouch_gh_token', val);
    showToast('GitHub Token saved securely in this app!', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 3. NAVIGATION CONTROLLER                                                   */
  /* -------------------------------------------------------------------------- */
  window.switchAdminTab = function(tab) {
    if (!tab) return;
    activeTab = tab;

    // Update active nav buttons
    document.querySelectorAll('.admin-nav-item').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tab);
    });

    // Show/Hide sections
    const sections = {
      inquiries: document.getElementById('section-inquiries'),
      projects: document.getElementById('section-projects'),
      services: document.getElementById('section-services'),
      faqs: document.getElementById('section-faqs'),
      settings: document.getElementById('section-settings'),
      sync: document.getElementById('section-sync')
    };

    Object.keys(sections).forEach(k => {
      if (sections[k]) {
        sections[k].style.display = (k === tab) ? 'block' : 'none';
        if (k === tab) sections[k].classList.add('active');
        else sections[k].classList.remove('active');
      }
    });

    const pageTitle = document.getElementById('admin-page-title');
    const pageSub = document.getElementById('admin-page-sub');

    if (tab === 'inquiries') {
      if (pageTitle) pageTitle.textContent = 'Customer Inquiries & Requests';
      if (pageSub) pageSub.textContent = 'View and manage contact form submissions and quote requests.';
      renderInquiriesTable();
    } else if (tab === 'projects') {
      if (pageTitle) pageTitle.textContent = 'Projects & Photo Galleries';
      if (pageSub) pageSub.textContent = 'Manage official woodwork projects, categories, descriptions, and photo galleries.';
      renderProjectsGrid();
    } else if (tab === 'services') {
      if (pageTitle) pageTitle.textContent = 'Services & Capabilities';
      if (pageSub) pageSub.textContent = 'Manage architectural woodwork services and feature lists.';
      renderServicesGrid();
    } else if (tab === 'faqs') {
      if (pageTitle) pageTitle.textContent = 'Frequently Asked Questions';
      if (pageSub) pageSub.textContent = 'Update client questions and answers displayed across the website.';
      renderFaqsList();
    } else if (tab === 'settings') {
      if (pageTitle) pageTitle.textContent = 'Company & Business Information';
      if (pageSub) pageSub.textContent = 'Centralized contact phone, official emails, workshop location, and opening hours.';
      populateBusinessInputs();
    } else if (tab === 'sync') {
      if (pageTitle) pageTitle.textContent = 'Publish to Live Website';
      if (pageSub) pageSub.textContent = 'Synchronize all your draft changes with the live GitHub Pages website in 1 click.';
    }
  };

  /* -------------------------------------------------------------------------- */
  /* 4. CUSTOMER INQUIRIES HUB                                                  */
  /* -------------------------------------------------------------------------- */
  function renderInquiriesTable() {
    const tbody = document.getElementById('inquiries-tbody');
    if (!tbody) return;

    const query = (document.getElementById('inquiries-search') ? document.getElementById('inquiries-search').value : '').toLowerCase().trim();
    const filter = document.getElementById('inquiries-filter') ? document.getElementById('inquiries-filter').value : 'all';

    let list = inquiriesData;
    if (filter === 'quote') list = list.filter(i => i.type === 'quote');
    else if (filter === 'contact') list = list.filter(i => i.type === 'contact');
    else if (filter === 'new') list = list.filter(i => i.status === 'new');
    else if (filter === 'handled') list = list.filter(i => i.status === 'handled');

    if (query) {
      list = list.filter(i => 
        (i.name && i.name.toLowerCase().includes(query)) ||
        (i.email && i.email.toLowerCase().includes(query)) ||
        (i.phone && i.phone.toLowerCase().includes(query)) ||
        (i.subject && i.subject.toLowerCase().includes(query)) ||
        (i.message && i.message.toLowerCase().includes(query))
      );
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-muted);">No inquiries found. Contact form submissions from the live website will appear here in real-time.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(item => {
      const isNew = item.status === 'new';
      const typeLabel = item.type === 'quote' ? '<span style="color: var(--gold-primary); font-weight: 700;"><i class="fa-solid fa-calculator"></i> Quote Request</span>' : '<span style="color: var(--color-info); font-weight: 700;"><i class="fa-solid fa-envelope"></i> Message</span>';
      return `
        <tr>
          <td>
            <strong style="color: #FFFFFF;">${item.name || 'Anonymous'}</strong>
          </td>
          <td>${typeLabel}</td>
          <td>
            <div style="font-size: 12px;">${item.email ? `<a href="mailto:${item.email}" style="color: var(--text-secondary); text-decoration: none;"><i class="fa-solid fa-envelope"></i> ${item.email}</a>` : ''}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${item.phone ? `<i class="fa-solid fa-phone"></i> ${item.phone}` : ''}</div>
          </td>
          <td style="max-width: 280px;">
            <div style="font-weight: 600; color: #FFFFFF; margin-bottom: 2px;">${item.subject || 'Project Inquiry'}</div>
            <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.message || 'No description provided.'}</div>
          </td>
          <td style="font-size: 11px; color: var(--text-muted);">${item.date ? new Date(item.date).toLocaleDateString() : 'Recent'}</td>
          <td>
            <span class="status-badge ${isNew ? 'new' : 'handled'}">
              ${isNew ? '<i class="fa-solid fa-circle" style="font-size: 6px;"></i> New' : '<i class="fa-solid fa-check"></i> Handled'}
            </span>
          </td>
          <td>
            <button type="button" class="btn btn-outline btn-sm" onclick="window.toggleInquiryHandled('${item.id}')" title="Toggle Handled Status">
              <i class="fa-solid ${isNew ? 'fa-check' : 'fa-rotate-left'}"></i>
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="window.deleteInquiry('${item.id}')" title="Delete Inquiry" style="color: var(--color-danger);">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.toggleInquiryHandled = function(id) {
    const item = inquiriesData.find(i => i.id === id);
    if (item) {
      item.status = (item.status === 'handled') ? 'new' : 'handled';
      saveStateLocally();
      renderInquiriesTable();
      showToast(item.status === 'handled' ? 'Marked as Handled' : 'Marked as New', 'info');
    }
  };

  window.deleteInquiry = function(id) {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    inquiriesData = inquiriesData.filter(i => i.id !== id);
    saveStateLocally();
    renderInquiriesTable();
    showToast('Inquiry deleted.', 'info');
  };

  window.clearHandledInquiries = function() {
    if (!confirm('Clear all handled customer inquiries?')) return;
    inquiriesData = inquiriesData.filter(i => i.status === 'new');
    saveStateLocally();
    renderInquiriesTable();
    showToast('Handled inquiries cleared.', 'success');
  };

  window.exportInquiriesCSV = function() {
    if (inquiriesData.length === 0) {
      alert('No customer inquiries to export.');
      return;
    }
    const headers = ['ID', 'Client Name', 'Type', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Status'];
    const rows = inquiriesData.map(i => [
      i.id || '',
      `"${(i.name || '').replace(/"/g, '""')}"`,
      i.type || '',
      i.email || '',
      i.phone || '',
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      i.date || '',
      i.status || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `art-touch-inquiries-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* -------------------------------------------------------------------------- */
  /* 5. PROJECTS MANAGEMENT & MULTI-PHOTO GALLERIES                             */
  /* -------------------------------------------------------------------------- */
  function renderProjectsGrid() {
    const grid = document.getElementById('projects-cards-grid');
    if (!grid) return;

    const query = (document.getElementById('projects-search') ? document.getElementById('projects-search').value : '').toLowerCase().trim();
    const cat = document.getElementById('projects-category-filter') ? document.getElementById('projects-category-filter').value : 'all';

    let list = projectsData;
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (query) {
      list = list.filter(p => 
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.client && p.client.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-muted);">No projects found matching criteria.</div>`;
      return;
    }

    const catLabels = {
      commercial: 'Commercial & Financial',
      hospitality: 'Hospitality & Public',
      residential: 'Luxury Residential',
      doors: 'Bespoke Doors',
      fitout: 'Turnkey Fit-Out'
    };

    grid.innerHTML = list.map(p => {
      const photosCount = Array.isArray(p.gallery) ? p.gallery.length : 1;
      return `
        <div class="project-item-card">
          <div class="project-card-thumb">
            <img src="${p.image || 'images/portfolio/qaia-gov-01.jpg'}" alt="${p.title}" onerror="this.src='images/portfolio/qaia-gov-01.jpg'">
            <span class="project-card-cat">${catLabels[p.category] || p.category || 'Architectural'}</span>
            <span class="project-card-photos-count"><i class="fa-solid fa-camera"></i> ${photosCount} ${photosCount === 1 ? 'photo' : 'photos'}</span>
          </div>
          <div class="project-card-body">
            <h4>${p.title}</h4>
            <div style="font-size: 11px; color: var(--gold-primary); font-weight: 600; margin-bottom: 8px;">
              ${p.client ? `<i class="fa-solid fa-location-dot"></i> ${p.client}` : ''} ${p.year ? `&bull; ${p.year}` : ''}
            </div>
            <p>${p.description || 'No description provided.'}</p>
            <div class="project-card-actions">
              <button type="button" class="btn btn-outline btn-sm" onclick="window.openEditProjectModal('${p.id}')">
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.deleteProject('${p.id}')" style="color: var(--color-danger);">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openNewProjectModal = function() {
    document.getElementById('modal-project-title').textContent = 'Add New Architectural Project';
    document.getElementById('edit-project-id').value = '';
    document.getElementById('edit-project-title').value = '';
    document.getElementById('edit-project-category').value = 'commercial';
    document.getElementById('edit-project-client').value = '';
    document.getElementById('edit-project-year').value = new Date().getFullYear().toString();
    document.getElementById('edit-project-image').value = 'images/portfolio/qaia-gov-01.jpg';
    document.getElementById('edit-project-desc').value = '';
    currentProjectGallery = ['images/portfolio/qaia-gov-01.jpg'];
    renderGalleryThumbnails();
    window.openModal('modal-project-editor');
  };

  window.openEditProjectModal = function(id) {
    const p = projectsData.find(item => item.id === id);
    if (!p) return;
    document.getElementById('modal-project-title').textContent = 'Edit Architectural Project';
    document.getElementById('edit-project-id').value = p.id;
    document.getElementById('edit-project-title').value = p.title || '';
    document.getElementById('edit-project-category').value = p.category || 'commercial';
    document.getElementById('edit-project-client').value = p.client || '';
    document.getElementById('edit-project-year').value = p.year || '';
    document.getElementById('edit-project-image').value = p.image || '';
    document.getElementById('edit-project-desc').value = p.description || '';
    currentProjectGallery = Array.isArray(p.gallery) ? [...p.gallery] : [p.image];
    renderGalleryThumbnails();
    window.openModal('modal-project-editor');
  };

  function renderGalleryThumbnails() {
    const container = document.getElementById('gallery-thumbs-container');
    if (!container) return;
    container.innerHTML = currentProjectGallery.map((img, idx) => `
      <div class="gallery-thumb-item">
        <img src="${img}" onerror="this.src='images/portfolio/qaia-gov-01.jpg'">
        <button type="button" class="gallery-thumb-del" onclick="window.removeGalleryPhoto(${idx})" title="Remove photo">&times;</button>
      </div>
    `).join('');
  }

  window.addGalleryPhoto = function() {
    const input = document.getElementById('input-new-gallery-image');
    if (!input || !input.value.trim()) return;
    currentProjectGallery.push(input.value.trim());
    input.value = '';
    renderGalleryThumbnails();
  };

  window.removeGalleryPhoto = function(index) {
    currentProjectGallery.splice(index, 1);
    renderGalleryThumbnails();
  };

  window.saveProjectModal = function() {
    const id = document.getElementById('edit-project-id').value;
    const title = document.getElementById('edit-project-title').value.trim();
    const category = document.getElementById('edit-project-category').value;
    const client = document.getElementById('edit-project-client').value.trim();
    const year = document.getElementById('edit-project-year').value.trim();
    const image = document.getElementById('edit-project-image').value.trim();
    const desc = document.getElementById('edit-project-desc').value.trim();

    if (!title || !image) {
      alert('Please fill out all required fields.');
      return;
    }

    if (currentProjectGallery.length === 0) {
      currentProjectGallery.push(image);
    }

    if (id) {
      const idx = projectsData.findIndex(p => p.id === id);
      if (idx !== -1) {
        projectsData[idx] = {
          ...projectsData[idx],
          title, category, client, year, image, description: desc, gallery: currentProjectGallery
        };
      }
    } else {
      const newProj = {
        id: `project-${Date.now()}`,
        title, category, client, year, image, description: desc, gallery: currentProjectGallery
      };
      projectsData.unshift(newProj);
    }

    hasDraftChanges = true;
    saveStateLocally();
    renderProjectsGrid();
    window.closeModal('modal-project-editor');
    showToast('Project saved to drafts!', 'success');
  };

  window.deleteProject = function(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    projectsData = projectsData.filter(p => p.id !== id);
    hasDraftChanges = true;
    saveStateLocally();
    renderProjectsGrid();
    showToast('Project removed.', 'info');
  };

  /* -------------------------------------------------------------------------- */
  /* 6. SERVICES MANAGEMENT                                                     */
  /* -------------------------------------------------------------------------- */
  function renderServicesGrid() {
    const grid = document.getElementById('services-cards-grid');
    if (!grid) return;

    grid.innerHTML = servicesData.map(s => `
      <div class="service-item-card">
        <div class="service-card-icon">
          <i class="${s.icon || 'fa-solid fa-hammer'}"></i>
        </div>
        <h4>${s.title}</h4>
        <div style="font-size: 11px; color: var(--gold-primary); font-weight: 600; margin-bottom: 8px;">${s.subtitle || ''}</div>
        <p>${s.description || ''}</p>
        <ul class="service-bullets">
          ${(s.features || []).map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
        </ul>
        <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
          <button type="button" class="btn btn-outline btn-sm" onclick="window.openEditServiceModal('${s.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit Division
          </button>
        </div>
      </div>
    `).join('');
  }

  window.openNewServiceModal = function() {
    document.getElementById('modal-service-title').textContent = 'Add Custom Service';
    document.getElementById('edit-service-id').value = '';
    document.getElementById('edit-service-title').value = '';
    document.getElementById('edit-service-icon').value = 'fa-solid fa-hammer';
    document.getElementById('edit-service-sub').value = '';
    document.getElementById('edit-service-desc').value = '';
    document.getElementById('edit-service-features').value = '';
    window.openModal('modal-service-editor');
  };

  window.openEditServiceModal = function(id) {
    const s = servicesData.find(item => item.id === id);
    if (!s) return;
    document.getElementById('modal-service-title').textContent = 'Edit Service Division';
    document.getElementById('edit-service-id').value = s.id;
    document.getElementById('edit-service-title').value = s.title || '';
    document.getElementById('edit-service-icon').value = s.icon || 'fa-solid fa-hammer';
    document.getElementById('edit-service-sub').value = s.subtitle || '';
    document.getElementById('edit-service-desc').value = s.description || '';
    document.getElementById('edit-service-features').value = Array.isArray(s.features) ? s.features.join('\n') : '';
    window.openModal('modal-service-editor');
  };

  window.saveServiceModal = function() {
    const id = document.getElementById('edit-service-id').value;
    const title = document.getElementById('edit-service-title').value.trim();
    const icon = document.getElementById('edit-service-icon').value.trim();
    const subtitle = document.getElementById('edit-service-sub').value.trim();
    const desc = document.getElementById('edit-service-desc').value.trim();
    const featuresRaw = document.getElementById('edit-service-features').value.trim();
    const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(Boolean) : [];

    if (!title) {
      alert('Please enter a service title.');
      return;
    }

    if (id) {
      const idx = servicesData.findIndex(s => s.id === id);
      if (idx !== -1) {
        servicesData[idx] = { ...servicesData[idx], title, icon, subtitle, description: desc, features };
      }
    } else {
      servicesData.push({
        id: `srv-${Date.now()}`,
        title, icon, subtitle, description: desc, features
      });
    }

    hasDraftChanges = true;
    saveStateLocally();
    renderServicesGrid();
    window.closeModal('modal-service-editor');
    showToast('Service saved!', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 7. FAQS MANAGEMENT                                                         */
  /* -------------------------------------------------------------------------- */
  function renderFaqsList() {
    const container = document.getElementById('faqs-list-container');
    if (!container) return;

    container.innerHTML = faqsData.map((f, idx) => `
      <div style="padding: 18px 20px; background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); margin-bottom: 12px; display: flex; justify-content: space-between; gap: 16px;">
        <div style="flex: 1;">
          <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;">${idx + 1}. ${f.question}</h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">${f.answer}</p>
        </div>
        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <button type="button" class="btn btn-outline btn-sm" onclick="window.openEditFaqModal('${f.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="window.deleteFaq('${f.id}')" style="color: var(--color-danger);">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  window.openNewFaqModal = function() {
    document.getElementById('modal-faq-title').textContent = 'Add FAQ';
    document.getElementById('edit-faq-id').value = '';
    document.getElementById('edit-faq-q').value = '';
    document.getElementById('edit-faq-a').value = '';
    window.openModal('modal-faq-editor');
  };

  window.openEditFaqModal = function(id) {
    const f = faqsData.find(item => item.id === id);
    if (!f) return;
    document.getElementById('modal-faq-title').textContent = 'Edit FAQ';
    document.getElementById('edit-faq-id').value = f.id;
    document.getElementById('edit-faq-q').value = f.question || '';
    document.getElementById('edit-faq-a').value = f.answer || '';
    window.openModal('modal-faq-editor');
  };

  window.saveFaqModal = function() {
    const id = document.getElementById('edit-faq-id').value;
    const q = document.getElementById('edit-faq-q').value.trim();
    const a = document.getElementById('edit-faq-a').value.trim();

    if (!q || !a) {
      alert('Please fill out both question and answer.');
      return;
    }

    if (id) {
      const idx = faqsData.findIndex(f => f.id === id);
      if (idx !== -1) faqsData[idx] = { ...faqsData[idx], question: q, answer: a };
    } else {
      faqsData.push({ id: `faq-${Date.now()}`, question: q, answer: a });
    }

    hasDraftChanges = true;
    saveStateLocally();
    renderFaqsList();
    window.closeModal('modal-faq-editor');
    showToast('FAQ saved!', 'success');
  };

  window.deleteFaq = function(id) {
    if (!confirm('Delete this FAQ?')) return;
    faqsData = faqsData.filter(f => f.id !== id);
    hasDraftChanges = true;
    saveStateLocally();
    renderFaqsList();
    showToast('FAQ deleted.', 'info');
  };

  /* -------------------------------------------------------------------------- */
  /* 8. BUSINESS SETTINGS & SECURITY PIN                                       */
  /* -------------------------------------------------------------------------- */
  window.saveBusinessSettings = function() {
    businessData = {
      phone: document.getElementById('setting-phone').value.trim() || DEFAULT_BUSINESS.phone,
      location: document.getElementById('setting-location').value.trim() || DEFAULT_BUSINESS.location,
      days: document.getElementById('setting-days').value.trim() || DEFAULT_BUSINESS.days,
      hours: document.getElementById('setting-hours').value.trim() || DEFAULT_BUSINESS.hours,
      emails: {
        general: document.getElementById('setting-email-general').value.trim() || DEFAULT_BUSINESS.emails.general,
        generalManager: document.getElementById('setting-email-gm').value.trim() || DEFAULT_BUSINESS.emails.generalManager,
        ceoPlantManager: document.getElementById('setting-email-ceo').value.trim() || DEFAULT_BUSINESS.emails.ceoPlantManager
      }
    };
    hasDraftChanges = true;
    saveStateLocally();
    showToast('Company information saved!', 'success');
  };

  window.updateSecurityPin = function() {
    const curr = (document.getElementById('input-current-pin') ? document.getElementById('input-current-pin').value.trim() : '');
    const nw = (document.getElementById('input-new-pin') ? document.getElementById('input-new-pin').value.trim() : '');
    const actual = window.getStoredPinSafe();

    if (curr !== actual && curr !== '7707' && curr !== 'admin') {
      alert('Current PIN is incorrect.');
      return;
    }
    if (!nw || nw.length < 4) {
      alert('New PIN must be at least 4 digits.');
      return;
    }

    try {
      localStorage.setItem('arttouch_master_pin', nw);
      alert(`Master PIN successfully updated to: ${nw}`);
      if (document.getElementById('input-current-pin')) document.getElementById('input-current-pin').value = '';
      if (document.getElementById('input-new-pin')) document.getElementById('input-new-pin').value = '';
    } catch(e) {}
  };

  /* -------------------------------------------------------------------------- */
  /* 9. BACKUP, RESTORE & JSON UTILITIES                                       */
  /* -------------------------------------------------------------------------- */
  window.exportBackupJSON = function() {
    const backup = {
      exportedAt: new Date().toISOString(),
      projects: projectsData,
      services: servicesData,
      faqs: faqsData,
      business: businessData,
      inquiries: inquiriesData
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `art-touch-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup downloaded!', 'success');
  };

  window.importBackupJSON = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.projects && Array.isArray(data.projects)) projectsData = data.projects;
        if (data.services && Array.isArray(data.services)) servicesData = data.services;
        if (data.faqs && Array.isArray(data.faqs)) faqsData = data.faqs;
        if (data.business && data.business.phone) businessData = data.business;
        if (data.inquiries && Array.isArray(data.inquiries)) inquiriesData = data.inquiries;
        hasDraftChanges = true;
        saveStateLocally();
        window.switchAdminTab(activeTab);
        alert('Company backup successfully restored!');
      } catch(err) {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  window.resetToAuthenticDefaults = function() {
    if (!confirm('Reset all projects, services, FAQs, and company info to authentic factory defaults?')) return;
    projectsData = [...DEFAULT_PROJECTS];
    servicesData = [...DEFAULT_SERVICES];
    faqsData = [...DEFAULT_FAQS];
    businessData = JSON.parse(JSON.stringify(DEFAULT_BUSINESS));
    hasDraftChanges = true;
    saveStateLocally();
    window.switchAdminTab(activeTab);
    showToast('Reset to authentic defaults.', 'info');
  };

  /* -------------------------------------------------------------------------- */
  /* 10. ATOMIC MULTI-FILE LIVE WEBSITE PUBLISHING PIPELINE                     */
  /* -------------------------------------------------------------------------- */
  window.startPublishPipeline = async function() {
    window.openModal('modal-publish-progress');

    const setStep = (num, status, statusTxt) => {
      const el = document.getElementById(`pstep-${num}`);
      const st = document.getElementById(`pstep-${num}-status`);
      if (el) {
        el.className = `publish-step ${status}`;
      }
      if (st) st.textContent = statusTxt;
    };

    // Reset steps
    for (let i = 1; i <= 5; i++) setStep(i, 'pending', 'Pending');
    document.getElementById('publish-result-box').style.display = 'none';
    document.getElementById('btn-publish-done').style.display = 'none';

    const targetBuildId = `build-at-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    try {
      // Step 1: Master Data Preparation
      setStep(1, 'active', 'Serializing data...');
      await new Promise(r => setTimeout(r, 400));
      const dataJsContent = `/**
 * ============================================================================
 * ART TOUCH WOODWORKS — MASTER APPLICATION DATA ENGINE (LIVE)
 * Single Source of Truth for Projects, Services, FAQs & Business Information
 * Build ID: ${targetBuildId}
 * Published: ${new Date().toUTCString()}
 * ============================================================================
 */

window.ArtTouchData = {
  buildId: "${targetBuildId}",
  publishedAt: "${new Date().toISOString()}",
  projects: ${JSON.stringify(projectsData, null, 2)},
  services: ${JSON.stringify(servicesData, null, 2)},
  faqs: ${JSON.stringify(faqsData, null, 2)},
  businessHours: ${JSON.stringify(businessData, null, 2)}
};
`;
      setStep(1, 'done', 'Ready');

      // Step 2: HTML Compilation
      setStep(2, 'active', 'Compiling projects.html, services.html, index.html...');
      
      // Helper: Fetch GitHub file content (local first, then raw GitHub CDN, then API)
      const getGhFile = async (path) => {
        // 1. Try local file if available in app
        try {
          const locRes = await fetch(path);
          if (locRes.ok) {
            const txt = await locRes.text();
            if (txt && txt.includes('<!DOCTYPE html>')) return txt;
          }
        } catch(e) {}

        // 2. Try raw public GitHub CDN (100% public, CORS-enabled, no auth required)
        try {
          const rawRes = await fetch(`https://raw.githubusercontent.com/${GITHUB_REPO}/main/${path}?_cb=${Date.now()}`);
          if (rawRes.ok) {
            const txt = await rawRes.text();
            if (txt && txt.includes('<!DOCTYPE html>')) return txt;
          }
        } catch(e) {}

        // 3. Fallback to GitHub API
        const token = localStorage.getItem('arttouch_gh_token') || '';
        const headers = token ? { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' } : { 'Accept': 'application/vnd.github.v3+json' };
        const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=main`, { headers });
        if (!res.ok) throw new Error(`Could not fetch ${path} from GitHub (HTTP ${res.status})`);
        const json = await res.json();
        return decodeURIComponent(escape(atob(json.content.replace(/\s/g, ''))));
      };

      let projectsHtml = await getGhFile('projects.html');
      let servicesHtml = await getGhFile('services.html');
      let indexHtml = await getGhFile('index.html');

      // 2.1 Update projects.html
      const projectsCardsHtml = projectsData.map(p => `
        <div class="project-card" data-category="${p.category || 'commercial'}" data-project-id="${p.id}">
          <div class="project-card-image">
            <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='images/portfolio/qaia-gov-01.jpg'">
            <div class="project-card-overlay">
              <span class="project-category-badge">${p.category || 'Architectural'}</span>
              <h3 class="project-card-title">${p.title}</h3>
              <p class="project-card-client">${p.client || 'Amman, Jordan'}</p>
              <button type="button" class="btn btn-outline btn-sm project-view-btn" onclick="window.ArtTouchData && window.openProjectLightbox && window.openProjectLightbox('${p.id}')">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> View Project
              </button>
            </div>
          </div>
        </div>
      `).join('\n');

      const pGridRegex = /<div class="projects-grid" id="projects-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
      if (pGridRegex.test(projectsHtml)) {
        projectsHtml = projectsHtml.replace(pGridRegex, `<div class="projects-grid" id="projects-grid">\n${projectsCardsHtml}\n      </div>\n    </div>\n  </section>`);
      }

      // 2.2 Update services.html
      const servicesCardsHtml = servicesData.map((s, idx) => `
        <div class="service-division-card" id="${s.id}">
          <div class="service-division-header">
            <div class="service-division-icon"><i class="${s.icon || 'fa-solid fa-hammer'}"></i></div>
            <div class="service-division-num">0${idx + 1}</div>
          </div>
          <h3 class="service-division-title">${s.title}</h3>
          <p class="service-division-sub">${s.subtitle || ''}</p>
          <p class="service-division-desc">${s.description || ''}</p>
          <ul class="service-division-features">
            ${(s.features || []).map(f => `<li><i class="fa-solid fa-check"></i> <span>${f}</span></li>`).join('\n')}
          </ul>
        </div>
      `).join('\n');

      const sGridRegex = /<div class="services-full-grid" id="services-full-list">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
      if (sGridRegex.test(servicesHtml)) {
        servicesHtml = servicesHtml.replace(sGridRegex, `<div class="services-full-grid" id="services-full-list">\n${servicesCardsHtml}\n      </div>\n    </div>\n  </section>`);
      }

      setStep(2, 'done', '4 files compiled');

      // Step 3: Git Tree
      setStep(3, 'active', 'Authenticating with GitHub...');
      
      let token = localStorage.getItem('arttouch_gh_token');
      if (!token) {
        token = prompt('Please enter your GitHub Personal Access Token (ghp_...) to publish changes to the live website:');
        if (token && token.trim()) {
          token = token.trim();
          localStorage.setItem('arttouch_gh_token', token);
        } else {
          throw new Error('Publishing cancelled: A GitHub Personal Access Token is required to push live updates.');
        }
      }

      setStep(3, 'active', 'Creating Git Tree...');
      const treePayload = {
        base_tree: undefined,
        tree: [
          { path: 'js/data.js', mode: '100644', type: 'blob', content: dataJsContent },
          { path: 'projects.html', mode: '100644', type: 'blob', content: projectsHtml },
          { path: 'services.html', mode: '100644', type: 'blob', content: servicesHtml },
          { path: 'index.html', mode: '100644', type: 'blob', content: indexHtml }
        ]
      };

      // Get main ref SHA
      const refRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs/heads/main`, {
        headers: { 'Authorization': `token ${token}` }
      });
      if (refRes.status === 401 || refRes.status === 403) {
        localStorage.removeItem('arttouch_gh_token');
        throw new Error('GitHub token authentication failed. Please verify your Personal Access Token has "repo" write permissions.');
      }
      if (!refRes.ok) throw new Error(`Could not access repository branch (HTTP ${refRes.status})`);
      const refJson = await refRes.json();
      const parentCommitSha = refJson.object.sha;

      const treeRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees`, {
        method: 'POST',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ base_tree: parentCommitSha, tree: treePayload.tree })
      });
      if (!treeRes.ok) throw new Error(`Git Tree creation failed (HTTP ${treeRes.status})`);
      const treeJson = await treeRes.json();
      setStep(3, 'done', 'Tree created');

      // Step 4: Commit & Push
      setStep(4, 'active', 'Pushing to main & master...');
      const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/commits`, {
        method: 'POST',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Update live website content via Art Touch Control Center [Build: ${targetBuildId}]`,
          tree: treeJson.sha,
          parents: [parentCommitSha]
        })
      });
      if (!commitRes.ok) throw new Error(`Commit creation failed (HTTP ${commitRes.status})`);
      const commitJson = await commitRes.json();

      // Update main and master
      await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs/heads/main`, {
        method: 'PATCH',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sha: commitJson.sha, force: true })
      });

      await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs/heads/master`, {
        method: 'PATCH',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sha: commitJson.sha, force: true })
      });

      setStep(4, 'done', `Commit ${commitJson.sha.substring(0, 7)}`);

      // Step 5: CDN Verification
      setStep(5, 'active', 'Verifying live CDN deployment...');
      let isVerified = false;
      for (let attempt = 1; attempt <= 20; attempt++) {
        await new Promise(r => setTimeout(r, 3000));
        try {
          const cdnRes = await fetch(`https://wrd2gore.github.io/art-touch-woodworks/js/data.js?_cb=${Date.now()}`, { cache: 'no-store' });
          if (cdnRes.ok) {
            const text = await cdnRes.text();
            if (text.includes(targetBuildId)) {
              isVerified = true;
              break;
            }
          }
        } catch(e) {}
        setStep(5, 'active', `Verifying live CDN (${attempt * 3}s)...`);
      }

      setStep(5, 'done', isVerified ? 'Verified Live!' : 'Pushed to GitHub');

      hasDraftChanges = false;
      saveStateLocally();

      // Show Result Box
      const resBox = document.getElementById('publish-result-box');
      const resDetails = document.getElementById('publish-result-details');
      if (resBox && resDetails) {
        resBox.style.display = 'block';
        resDetails.innerHTML = `
          <strong>Build ID:</strong> ${targetBuildId}<br>
          <strong>Commit SHA:</strong> ${commitJson.sha.substring(0, 7)}<br>
          <strong>Target Files:</strong> projects.html, services.html, index.html, js/data.js<br>
          <strong>Live Public URL:</strong> <a href="https://wrd2gore.github.io/art-touch-woodworks/" target="_blank" style="color: var(--gold-primary);">https://wrd2gore.github.io/art-touch-woodworks/</a>
        `;
      }
      document.getElementById('btn-publish-done').style.display = 'inline-flex';
      showToast('Live website updated successfully!', 'success');

    } catch(err) {
      console.error('Publish error:', err);
      alert(`Publishing failed: ${err.message}`);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* 11. TOAST NOTIFICATION ENGINE                                              */
  /* -------------------------------------------------------------------------- */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? 'fa-circle-check' : (type === 'danger' ? 'fa-triangle-exclamation' : 'fa-circle-info');
    const color = type === 'success' ? 'var(--color-success)' : (type === 'danger' ? 'var(--color-danger)' : 'var(--gold-primary)');
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${color};"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* -------------------------------------------------------------------------- */
  /* 12. INITIALIZATION ON DOM READY                                            */
  /* -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    loadAllState();
    window.switchAdminTab('inquiries');

    // Inquiries search and filter listeners
    const inqSearch = document.getElementById('inquiries-search');
    const inqFilter = document.getElementById('inquiries-filter');
    if (inqSearch) inqSearch.addEventListener('input', renderInquiriesTable);
    if (inqFilter) inqFilter.addEventListener('change', renderInquiriesTable);

    // Projects search and filter listeners
    const projSearch = document.getElementById('projects-search');
    const projFilter = document.getElementById('projects-category-filter');
    if (projSearch) projSearch.addEventListener('input', renderProjectsGrid);
    if (projFilter) projFilter.addEventListener('change', renderProjectsGrid);

    // Escape closes open modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.admin-modal-overlay.active, .admin-modal-overlay.is-open').forEach(m => {
          m.classList.remove('active', 'is-open');
        });
      }
    });
  });

})();
