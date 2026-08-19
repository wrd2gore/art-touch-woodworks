/**
 * ART TOUCH CONTROL CENTER — DESKTOP RENDERER ENGINE
 * Robust UI Controller, Supabase Inquiries Hub, Full Data Editors & Live Publishing Pipeline
 */

(function() {
  'use strict';

  /* ==========================================================================
     1. APPLICATION STATE
     ========================================================================== */
  let activeTab = 'inquiries';
  let projectsData = [];
  let servicesData = [];
  let faqsData = [];
  let companyData = {};
  let inquiriesData = [];
  let isPublishing = false;

  /* ==========================================================================
     2. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initMasterData();
    initInquiriesHub();
    initPublishTab();
    initModals();

    // Auto-sync inquiries from cloud on launch
    setTimeout(() => {
      syncInquiriesFromBackend(true);
    }, 1000);
  });

  /* ==========================================================================
     3. THEME TOGGLE CONTROLLER
     ========================================================================== */
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        if (window.ArtTouchTheme && window.ArtTouchTheme.toggleTheme) {
          window.ArtTouchTheme.toggleTheme();
        } else {
          const current = document.documentElement.getAttribute('data-theme');
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('arttouch_theme', next);
          updateThemeIcon(btn, next);
        }
      });
    }

    // Set initial icon
    const theme = localStorage.getItem('arttouch_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    if (btn) updateThemeIcon(btn, theme);
  }

  function updateThemeIcon(btn, theme) {
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  /* ==========================================================================
     4. NAVIGATION CONTROLLER
     ========================================================================== */
  function initNavigation() {
    const navButtons = document.querySelectorAll('.admin-nav-item');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchTab(tab);
      });
    });
  }

  window.switchTab = function(tab) {
    activeTab = tab;

    // Update active nav button
    document.querySelectorAll('.admin-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    // Toggle content sections
    const sections = {
      inquiries: document.getElementById('section-inquiries'),
      projects: document.getElementById('section-projects'),
      services: document.getElementById('section-services'),
      faqs: document.getElementById('section-faqs'),
      settings: document.getElementById('section-settings'),
      sync: document.getElementById('section-sync')
    };

    Object.keys(sections).forEach(key => {
      if (sections[key]) {
        sections[key].style.display = (key === tab) ? 'block' : 'none';
      }
    });

    // Update topbar heading
    const titleEl = document.getElementById('admin-page-title');
    const subEl = document.getElementById('admin-page-sub');

    if (tab === 'inquiries') {
      if (titleEl) titleEl.textContent = 'Customer Inquiries & Requests';
      if (subEl) subEl.textContent = 'View and manage contact form submissions and quote requests.';
      renderInquiriesTable();
      syncInquiriesFromBackend(true);
    } else if (tab === 'projects') {
      if (titleEl) titleEl.textContent = 'Projects & Photo Galleries';
      if (subEl) subEl.textContent = 'Manage official woodwork projects, categories, descriptions, and photo galleries.';
      renderProjectsGrid();
    } else if (tab === 'services') {
      if (titleEl) titleEl.textContent = 'Woodwork Services & Capabilities';
      if (subEl) subEl.textContent = 'Manage architectural woodwork services and feature lists.';
      renderServicesGrid();
    } else if (tab === 'faqs') {
      if (titleEl) titleEl.textContent = 'Frequently Asked Questions';
      if (subEl) subEl.textContent = 'Update client questions and answers displayed across the website.';
      renderFaqsList();
    } else if (tab === 'settings') {
      if (titleEl) titleEl.textContent = 'Company & Business Information';
      if (subEl) subEl.textContent = 'Centralized contact phone, official emails, workshop location, and opening hours.';
    } else if (tab === 'sync') {
      if (titleEl) titleEl.textContent = 'Publish to Live Website';
      if (subEl) subEl.textContent = 'Synchronize all your draft changes with the live GitHub Pages website in 1 click.';
    }
  };

  /* ==========================================================================
     5. MASTER DATA ENGINE (Bundled & Local Workspace)
     ========================================================================== */
  async function initMasterData() {
    let rawData = null;

    if (window.artTouchElectron && window.artTouchElectron.readLocalMaster) {
      try {
        const res = await window.artTouchElectron.readLocalMaster();
        if (res.success && res.content) {
          const fn = new Function(res.content + '; return window.ArtTouchData;');
          rawData = fn();
        }
      } catch (e) {}
    }

    if (!rawData && window.ArtTouchData) {
      rawData = window.ArtTouchData;
    }

    if (rawData) {
      projectsData = JSON.parse(JSON.stringify(rawData.projects || []));
      servicesData = JSON.parse(JSON.stringify(rawData.services || []));
      faqsData = JSON.parse(JSON.stringify(rawData.faqs || []));
      companyData = JSON.parse(JSON.stringify(rawData.company || {}));
    }

    populateCompanySettingsForm();
    renderProjectsGrid();
    renderServicesGrid();
    renderFaqsList();
  }

  function populateCompanySettingsForm() {
    const c = companyData || {};
    const nameEl = document.getElementById('setting-company-name');
    const nameArEl = document.getElementById('setting-company-name-ar');
    const phoneEl = document.getElementById('setting-phone');
    const emailEl = document.getElementById('setting-email');
    const locEl = document.getElementById('setting-location');
    const hoursEl = document.getElementById('setting-hours');

    if (nameEl && c.name) nameEl.value = c.name;
    if (nameArEl && c.nameAr) nameArEl.value = c.nameAr;
    if (phoneEl && c.phone) phoneEl.value = c.phone;
    if (emailEl && c.email) emailEl.value = c.email;
    if (locEl && c.address) locEl.value = c.address;
    if (hoursEl && c.hours) hoursEl.value = c.hours;
  }

  window.saveCompanySettings = function() {
    const c = companyData || {};
    c.name = (document.getElementById('setting-company-name') || {}).value || c.name;
    c.nameAr = (document.getElementById('setting-company-name-ar') || {}).value || c.nameAr;
    c.phone = (document.getElementById('setting-phone') || {}).value || c.phone;
    c.email = (document.getElementById('setting-email') || {}).value || c.email;
    c.address = (document.getElementById('setting-location') || {}).value || c.address;
    c.hours = (document.getElementById('setting-hours') || {}).value || c.hours;

    companyData = c;
    saveDraftMasterData();
    showToast('Company information updated. Click "Publish Changes" to deploy.', 'success');
  };

  /* ==========================================================================
     6. CUSTOMER INQUIRIES & SUPABASE HUB
     ========================================================================== */
  function initInquiriesHub() {
    try {
      const stored = localStorage.getItem('arttouch_inquiries');
      if (stored) inquiriesData = JSON.parse(stored);
    } catch (e) {}

    const searchInput = document.getElementById('input-search-inquiries');
    const filterSelect = document.getElementById('select-filter-status');

    if (searchInput) searchInput.addEventListener('input', renderInquiriesTable);
    if (filterSelect) filterSelect.addEventListener('change', renderInquiriesTable);

    renderInquiriesTable();
    updateInquiryStats();
  }

  function saveInquiriesLocally() {
    try {
      localStorage.setItem('arttouch_inquiries', JSON.stringify(inquiriesData));
    } catch (e) {}
    updateInquiryStats();
  }

  function updateInquiryStats() {
    const total = inquiriesData.length;
    const unread = inquiriesData.filter(i => i.status === 'new').length;
    const handled = inquiriesData.filter(i => i.status === 'handled').length;

    const totalEl = document.getElementById('stat-total-inquiries');
    const newEl = document.getElementById('stat-new-inquiries');
    const handledEl = document.getElementById('stat-handled-inquiries');
    const badgeEl = document.getElementById('stat-unread-count');

    if (totalEl) totalEl.textContent = total;
    if (newEl) newEl.textContent = unread;
    if (handledEl) handledEl.textContent = handled;
    if (badgeEl) badgeEl.textContent = unread;
  }

  function renderInquiriesTable() {
    const tbody = document.getElementById('inquiries-table-body');
    if (!tbody) return;

    const searchVal = ((document.getElementById('input-search-inquiries') || {}).value || '').toLowerCase().trim();
    const filterVal = ((document.getElementById('select-filter-status') || {}).value || 'all');

    let filtered = inquiriesData.slice();

    if (filterVal === 'new') {
      filtered = filtered.filter(i => i.status === 'new');
    } else if (filterVal === 'handled') {
      filtered = filtered.filter(i => i.status === 'handled');
    }

    if (searchVal) {
      filtered = filtered.filter(i => {
        const text = `${i.name || ''} ${i.email || ''} ${i.phone || ''} ${i.subject || ''} ${i.message || ''}`.toLowerCase();
        return text.includes(searchVal);
      });
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="admin-table-empty">
            <i class="fa-solid fa-inbox"></i>
            <div>No customer inquiries found matching your filters.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(inq => {
      const isNew = inq.status === 'new';
      const statusBadge = isNew
        ? `<span class="badge badge-new"><i class="fa-solid fa-bell"></i> New Request</span>`
        : `<span class="badge badge-handled"><i class="fa-solid fa-check"></i> Handled</span>`;

      const typeBadge = inq.type === 'quote'
        ? `<span class="badge badge-brand"><i class="fa-solid fa-calculator"></i> Quote</span>`
        : `<span class="badge" style="background: var(--color-bg-card-subtle); color: var(--color-text-main); border: 1px solid var(--color-border);"><i class="fa-solid fa-envelope"></i> Contact</span>`;

      const dateStr = inq.created_at || inq.timestamp 
        ? new Date(inq.created_at || inq.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'Recent';

      const safeName = escapeHtml(inq.name || 'Anonymous Client');
      const safeEmail = escapeHtml(inq.email || '—');
      const safePhone = escapeHtml(inq.phone || '—');
      const safeSubject = escapeHtml(inq.subject || inq.projectType || 'General Woodwork Inquiry');

      return `
        <tr class="${isNew ? 'is-new' : ''}">
          <td>${statusBadge}</td>
          <td>${typeBadge}</td>
          <td>
            <div style="font-weight: 700; color: var(--color-text-main);">${safeName}</div>
          </td>
          <td>
            <div style="font-size: 13px; color: var(--color-text-main);">${safeEmail}</div>
            <div style="font-size: 12px; color: var(--color-text-muted);">${safePhone}</div>
          </td>
          <td>
            <div style="font-weight: 600; color: var(--color-text-main); max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${safeSubject}</div>
          </td>
          <td>
            <div style="font-size: 12px; color: var(--color-text-muted);">${dateStr}</div>
          </td>
          <td style="text-align: right;">
            <div style="display: inline-flex; gap: 6px;">
              <button type="button" class="btn btn-outline btn-xs" onclick="window.viewInquiryDetail('${inq.id}')" title="View Full Submission">
                <i class="fa-solid fa-eye"></i> View
              </button>
              ${isNew ? `
                <button type="button" class="btn btn-primary btn-xs" onclick="window.toggleInquiryStatus('${inq.id}', 'handled')" title="Mark as Handled">
                  <i class="fa-solid fa-check"></i>
                </button>
              ` : `
                <button type="button" class="btn btn-outline btn-xs" onclick="window.toggleInquiryStatus('${inq.id}', 'new')" title="Mark as New">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
              `}
              <button type="button" class="btn btn-outline btn-xs" onclick="window.deleteInquiry('${inq.id}')" title="Delete Inquiry" style="color: #EF4444; border-color: rgba(239,68,68,0.3);">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.syncInquiriesFromBackend = async function(silent = false) {
    if (!silent) showToast('Connecting to Supabase inquiries backend...', 'info');

    if (window.artTouchElectron && window.artTouchElectron.inquiries && window.artTouchElectron.inquiries.fetchRemote) {
      try {
        const res = await window.artTouchElectron.inquiries.fetchRemote();
        if (res.success && Array.isArray(res.data)) {
          const map = new Map();
          res.data.forEach(i => map.set(i.id, i));
          inquiriesData.forEach(i => { if (!map.has(i.id)) map.set(i.id, i); });
          inquiriesData = Array.from(map.values()).sort((a, b) => new Date(b.created_at || b.timestamp || 0) - new Date(a.created_at || a.timestamp || 0));
          saveInquiriesLocally();
          renderInquiriesTable();
          if (!silent) showToast(`Synchronized ${res.data.length} inquiries from cloud.`, 'success');
          return;
        }
      } catch (err) {
        if (!silent) showToast(`Cloud sync note: ${err.message}`, 'warning');
      }
    }

    renderInquiriesTable();
    updateInquiryStats();
  };

  window.viewInquiryDetail = function(id) {
    const inq = inquiriesData.find(i => i.id === id);
    if (!inq) return;

    const bodyEl = document.getElementById('modal-inquiry-body');
    const footerEl = document.getElementById('modal-inquiry-footer');
    if (!bodyEl) return;

    const dateStr = inq.created_at || inq.timestamp ? new Date(inq.created_at || inq.timestamp).toLocaleString() : 'Recent';

    bodyEl.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div style="background: var(--color-bg-card-subtle); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--color-text-muted); font-weight: 700; margin-bottom: 4px;">Client Name</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--color-text-main);">${escapeHtml(inq.name || 'Anonymous')}</div>
        </div>

        <div style="background: var(--color-bg-card-subtle); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--color-text-muted); font-weight: 700; margin-bottom: 4px;">Request Date</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--color-text-main);">${dateStr}</div>
        </div>

        <div style="background: var(--color-bg-card-subtle); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--color-text-muted); font-weight: 700; margin-bottom: 4px;">Email Address</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--color-text-main);">${escapeHtml(inq.email || '—')}</div>
        </div>

        <div style="background: var(--color-bg-card-subtle); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--color-text-muted); font-weight: 700; margin-bottom: 4px;">Telephone / Mobile</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--color-text-main);">${escapeHtml(inq.phone || '—')}</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <label class="form-label">Subject / Scope</label>
        <div style="padding: 10px 14px; background: var(--color-bg-card-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-weight: 600; color: var(--color-text-main);">
          ${escapeHtml(inq.subject || inq.projectType || 'Standard Woodwork Inquiry')}
        </div>
      </div>

      <div>
        <label class="form-label">Customer Message &amp; Requirements</label>
        <div style="padding: 14px; background: var(--color-bg-card-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-body); line-height: 1.6; white-space: pre-wrap; max-height: 200px; overflow-y: auto;">${escapeHtml(inq.message || 'No additional message details provided.')}</div>
      </div>
    `;

    if (footerEl) {
      footerEl.innerHTML = `
        <button type="button" class="btn btn-outline btn-sm" onclick="window.closeModal('modal-inquiry-detail')">Close</button>
        ${inq.email ? `
          <a href="mailto:${encodeURIComponent(inq.email)}?subject=Re: ${encodeURIComponent(inq.subject || 'Art Touch Woodworks Quote Inquiry')}" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-envelope"></i> Reply via Email
          </a>
        ` : ''}
        ${inq.phone ? `
          <a href="tel:${encodeURIComponent(inq.phone)}" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-phone text-brand"></i> Call Client
          </a>
        ` : ''}
        ${inq.status === 'new' ? `
          <button type="button" class="btn btn-primary btn-sm" onclick="window.toggleInquiryStatus('${inq.id}', 'handled'); window.closeModal('modal-inquiry-detail');">
            <i class="fa-solid fa-check"></i> Mark as Handled
          </button>
        ` : ''}
      `;
    }

    openModal('modal-inquiry-detail');
  };

  window.toggleInquiryStatus = async function(id, newStatus) {
    const inq = inquiriesData.find(i => i.id === id);
    if (!inq) return;

    inq.status = newStatus;
    saveInquiriesLocally();
    renderInquiriesTable();

    if (window.artTouchElectron && window.artTouchElectron.inquiries && window.artTouchElectron.inquiries.updateStatus) {
      try {
        await window.artTouchElectron.inquiries.updateStatus(id, newStatus);
      } catch (e) {}
    }

    showToast(`Inquiry marked as ${newStatus}.`, 'success');
  };

  window.deleteInquiry = async function(id) {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    inquiriesData = inquiriesData.filter(i => i.id !== id);
    saveInquiriesLocally();
    renderInquiriesTable();

    if (window.artTouchElectron && window.artTouchElectron.inquiries && window.artTouchElectron.inquiries.delete) {
      try {
        await window.artTouchElectron.inquiries.delete(id);
      } catch (e) {}
    }

    showToast('Inquiry deleted successfully.', 'success');
  };

  window.clearHandledInquiries = function() {
    const handledCount = inquiriesData.filter(i => i.status === 'handled').length;
    if (handledCount === 0) {
      showToast('No handled inquiries to clear.', 'info');
      return;
    }
    if (!confirm(`Clear all ${handledCount} handled inquiries from local view?`)) return;
    inquiriesData = inquiriesData.filter(i => i.status === 'new');
    saveInquiriesLocally();
    renderInquiriesTable();
    showToast('Handled inquiries cleared.', 'success');
  };

  window.exportInquiriesCsv = function() {
    if (inquiriesData.length === 0) {
      showToast('No customer inquiries to export.', 'info');
      return;
    }

    const headers = ['ID', 'Date', 'Type', 'Status', 'Name', 'Email', 'Phone', 'Subject', 'Message'];
    const rows = inquiriesData.map(i => [
      i.id || '',
      i.created_at || i.timestamp || '',
      i.type || 'contact',
      i.status || 'new',
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `art-touch-inquiries-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries exported to CSV.', 'success');
  };

  window.openSupabaseBackendModal = async function() {
    if (window.artTouchElectron && window.artTouchElectron.inquiries && window.artTouchElectron.inquiries.getBackendConfig) {
      try {
        const cfg = await window.artTouchElectron.inquiries.getBackendConfig();
        const urlEl = document.getElementById('cfg-supabase-url');
        const anonEl = document.getElementById('cfg-supabase-anon-key');
        if (urlEl && cfg.url) urlEl.value = cfg.url;
        if (anonEl && cfg.anonKey) anonEl.value = cfg.anonKey;
      } catch (e) {}
    }
    openModal('modal-supabase-config');
  };

  window.saveSupabaseConfigFromModal = async function() {
    const url = (document.getElementById('cfg-supabase-url') || {}).value || '';
    const anonKey = (document.getElementById('cfg-supabase-anon-key') || {}).value || '';
    const serviceKey = (document.getElementById('cfg-supabase-service-key') || {}).value || '';

    if (!url || !url.startsWith('https://')) {
      showToast('Please enter a valid Supabase project URL (https://...).', 'error');
      return;
    }

    if (window.artTouchElectron && window.artTouchElectron.inquiries && window.artTouchElectron.inquiries.saveBackendConfig) {
      try {
        await window.artTouchElectron.inquiries.saveBackendConfig({ url, anonKey, serviceKey });
        closeModal('modal-supabase-config');
        showToast('Supabase credentials saved securely in Windows DPAPI.', 'success');
        syncInquiriesFromBackend(false);
      } catch (err) {
        showToast(`Failed to save config: ${err.message}`, 'error');
      }
    }
  };

  window.copySupabaseSqlSnippet = function() {
    const sql = `CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'contact',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  metadata JSONB,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert only"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (true);`;

    navigator.clipboard.writeText(sql).then(() => {
      showToast('SQL Schema copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Please copy the SQL text manually.', 'info');
    });
  };

  /* ==========================================================================
     7. PROJECTS PORTFOLIO EDITOR
     ========================================================================== */
  function renderProjectsGrid() {
    const container = document.getElementById('projects-grid-container');
    if (!container) return;

    if (projectsData.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); color: var(--color-text-muted);">
          <i class="fa-solid fa-layer-group" style="font-size: 36px; color: var(--color-brand); margin-bottom: 12px; display: block;"></i>
          No woodwork projects available. Click "+ Add New Project" to create one.
        </div>
      `;
      return;
    }

    container.innerHTML = projectsData.map(proj => {
      const safeTitle = escapeHtml(proj.title || 'Untitled Project');
      const safeClient = escapeHtml(proj.client || 'Private Client');
      const safeCategory = escapeHtml(proj.category || 'residential');
      const safeYear = escapeHtml(proj.year || '2026');
      const safeImg = escapeHtml(proj.image || 'images/portfolio/residential/art-touch-residential-woodwork-1.jpg');

      return `
        <div class="admin-project-card">
          <div class="admin-project-thumb">
            <img src="${safeImg}" alt="${safeTitle}" onerror="this.src='images/logo/art-touch-logo.png'">
            <span class="badge badge-brand" style="position: absolute; top: 12px; right: 12px; text-transform: uppercase;">${safeCategory}</span>
          </div>
          <div class="admin-project-info">
            <h3 class="admin-project-title">${safeTitle}</h3>
            <div class="admin-project-meta">
              <span><i class="fa-solid fa-user text-brand"></i> ${safeClient}</span>
              <span><i class="fa-solid fa-calendar text-brand"></i> ${safeYear}</span>
            </div>
          </div>
          <div class="admin-project-actions">
            <button type="button" class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.openProjectModal('${proj.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="window.deleteProject('${proj.id}')" style="color: #EF4444; border-color: rgba(239,68,68,0.3);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openProjectModal = function(id) {
    const form = document.getElementById('form-project-editor');
    if (form) form.reset();

    const titleEl = document.getElementById('modal-project-title');

    if (id) {
      const proj = projectsData.find(p => p.id === id);
      if (!proj) return;

      if (titleEl) titleEl.textContent = 'Edit Project';
      document.getElementById('edit-project-id').value = proj.id;
      document.getElementById('edit-project-title').value = proj.title || '';
      document.getElementById('edit-project-title-ar').value = proj.titleAr || '';
      document.getElementById('edit-project-category').value = proj.category || 'residential';
      document.getElementById('edit-project-client').value = proj.client || '';
      document.getElementById('edit-project-year').value = proj.year || '2026';
      document.getElementById('edit-project-image').value = proj.image || '';
      document.getElementById('edit-project-desc').value = proj.desc || '';
      document.getElementById('edit-project-desc-ar').value = proj.descAr || '';
    } else {
      if (titleEl) titleEl.textContent = 'Add New Project';
      document.getElementById('edit-project-id').value = '';
    }

    openModal('modal-project-editor');
  };

  window.saveProjectForm = function() {
    const id = document.getElementById('edit-project-id').value;
    const title = document.getElementById('edit-project-title').value.trim();
    const titleAr = document.getElementById('edit-project-title-ar').value.trim();
    const category = document.getElementById('edit-project-category').value;
    const client = document.getElementById('edit-project-client').value.trim();
    const year = document.getElementById('edit-project-year').value.trim();
    const image = document.getElementById('edit-project-image').value.trim();
    const desc = document.getElementById('edit-project-desc').value.trim();
    const descAr = document.getElementById('edit-project-desc-ar').value.trim();

    if (!title || !titleAr) {
      showToast('Please enter project titles in English and Arabic.', 'error');
      return;
    }

    if (id) {
      const proj = projectsData.find(p => p.id === id);
      if (proj) {
        Object.assign(proj, { title, titleAr, category, client, year, image, desc, descAr });
      }
    } else {
      const newId = `proj-${Date.now()}`;
      projectsData.unshift({
        id: newId,
        title,
        titleAr,
        category,
        client,
        year,
        image,
        desc,
        descAr,
        gallery: [image]
      });
    }

    saveDraftMasterData();
    renderProjectsGrid();
    closeModal('modal-project-editor');
    showToast('Project saved. Click "Publish Changes" to deploy.', 'success');
  };

  window.deleteProject = function(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    projectsData = projectsData.filter(p => p.id !== id);
    saveDraftMasterData();
    renderProjectsGrid();
    showToast('Project deleted.', 'success');
  };

  /* ==========================================================================
     8. SERVICES & FAQS EDITORS
     ========================================================================== */
  function renderServicesGrid() {
    const container = document.getElementById('services-grid-container');
    if (!container) return;

    container.innerHTML = servicesData.map(srv => {
      const safeTitle = escapeHtml(srv.title || 'Untitled Service');
      const safeDesc = escapeHtml(srv.desc || '');

      return `
        <div class="admin-project-card">
          <div class="admin-project-info">
            <h3 class="admin-project-title">${safeTitle}</h3>
            <p style="font-size: 13px; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 16px;">${safeDesc}</p>
          </div>
          <div class="admin-project-actions">
            <button type="button" class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.openServiceModal('${srv.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="window.deleteService('${srv.id}')" style="color: #EF4444; border-color: rgba(239,68,68,0.3);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openServiceModal = function(id) {
    const form = document.getElementById('form-service-editor');
    if (form) form.reset();

    const titleEl = document.getElementById('modal-service-title');

    if (id) {
      const srv = servicesData.find(s => s.id === id);
      if (!srv) return;
      if (titleEl) titleEl.textContent = 'Edit Service';
      document.getElementById('edit-service-id').value = srv.id;
      document.getElementById('edit-service-title').value = srv.title || '';
      document.getElementById('edit-service-title-ar').value = srv.titleAr || '';
      document.getElementById('edit-service-desc').value = srv.desc || '';
    } else {
      if (titleEl) titleEl.textContent = 'Add New Service';
      document.getElementById('edit-service-id').value = '';
    }

    openModal('modal-service-editor');
  };

  window.saveServiceForm = function() {
    const id = document.getElementById('edit-service-id').value;
    const title = document.getElementById('edit-service-title').value.trim();
    const titleAr = document.getElementById('edit-service-title-ar').value.trim();
    const desc = document.getElementById('edit-service-desc').value.trim();

    if (!title) {
      showToast('Please enter a service title.', 'error');
      return;
    }

    if (id) {
      const srv = servicesData.find(s => s.id === id);
      if (srv) Object.assign(srv, { title, titleAr, desc });
    } else {
      servicesData.push({ id: `srv-${Date.now()}`, title, titleAr, desc });
    }

    saveDraftMasterData();
    renderServicesGrid();
    closeModal('modal-service-editor');
    showToast('Service saved. Click "Publish Changes" to deploy.', 'success');
  };

  window.deleteService = function(id) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    servicesData = servicesData.filter(s => s.id !== id);
    saveDraftMasterData();
    renderServicesGrid();
    showToast('Service deleted.', 'success');
  };

  function renderFaqsList() {
    const container = document.getElementById('faqs-list-container');
    if (!container) return;

    container.innerHTML = faqsData.map(faq => {
      const safeQ = escapeHtml(faq.q || '');
      const safeA = escapeHtml(faq.a || '');

      return `
        <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
          <div>
            <h4 style="font-size: 15px; font-weight: 700; color: var(--color-text-main); margin-bottom: 6px;">${safeQ}</h4>
            <p style="font-size: 13px; color: var(--color-text-body); line-height: 1.5; margin: 0;">${safeA}</p>
          </div>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn btn-outline btn-xs" onclick="window.openFaqModal('${faq.id}')">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn btn-outline btn-xs" onclick="window.deleteFaq('${faq.id}')" style="color: #EF4444; border-color: rgba(239,68,68,0.3);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openFaqModal = function(id) {
    const form = document.getElementById('form-faq-editor');
    if (form) form.reset();

    const titleEl = document.getElementById('modal-faq-title');

    if (id) {
      const faq = faqsData.find(f => f.id === id);
      if (!faq) return;
      if (titleEl) titleEl.textContent = 'Edit FAQ';
      document.getElementById('edit-faq-id').value = faq.id;
      document.getElementById('edit-faq-q').value = faq.q || '';
      document.getElementById('edit-faq-a').value = faq.a || '';
    } else {
      if (titleEl) titleEl.textContent = 'Add New FAQ';
      document.getElementById('edit-faq-id').value = '';
    }

    openModal('modal-faq-editor');
  };

  window.saveFaqForm = function() {
    const id = document.getElementById('edit-faq-id').value;
    const q = document.getElementById('edit-faq-q').value.trim();
    const a = document.getElementById('edit-faq-a').value.trim();

    if (!q || !a) {
      showToast('Please enter both question and answer.', 'error');
      return;
    }

    if (id) {
      const faq = faqsData.find(f => f.id === id);
      if (faq) Object.assign(faq, { q, a });
    } else {
      faqsData.push({ id: `faq-${Date.now()}`, q, a });
    }

    saveDraftMasterData();
    renderFaqsList();
    closeModal('modal-faq-editor');
    showToast('FAQ saved. Click "Publish Changes" to deploy.', 'success');
  };

  window.deleteFaq = function(id) {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    faqsData = faqsData.filter(f => f.id !== id);
    saveDraftMasterData();
    renderFaqsList();
    showToast('FAQ deleted.', 'success');
  };

  /* ==========================================================================
     9. PERSISTENCE & DATA GENERATION
     ========================================================================== */
  function generateDataJsContent() {
    const payload = {
      projects: projectsData,
      services: servicesData,
      faqs: faqsData,
      company: companyData
    };
    return `/**\n * Art Touch for Wood Works — Master Data Source\n * Generated via Art Touch Control Center\n */\nwindow.ArtTouchData = ${JSON.stringify(payload, null, 2)};\n`;
  }

  function saveDraftMasterData() {
    const content = generateDataJsContent();
    if (window.artTouchElectron && window.artTouchElectron.saveLocalMaster) {
      window.artTouchElectron.saveLocalMaster(content).catch(() => {});
    }
  }

  window.refreshMasterDataFromLocal = async function() {
    await initMasterData();
    showToast('Discarded unsaved draft changes.', 'info');
  };

  /* ==========================================================================
     10. PUBLISHING ENGINE TO GITHUB PAGES
     ========================================================================== */
  function initPublishTab() {
    if (window.artTouchElectron && window.artTouchElectron.hasToken) {
      window.artTouchElectron.hasToken().then(hasToken => {
        const msgEl = document.getElementById('token-status-message');
        if (msgEl) {
          if (hasToken) {
            msgEl.innerHTML = `<span style="color: #10B981;"><i class="fa-solid fa-circle-check"></i> GitHub Access Token is configured and securely encrypted.</span>`;
          } else {
            msgEl.innerHTML = `<span style="color: #F59E0B;"><i class="fa-solid fa-circle-exclamation"></i> No GitHub token configured. Please enter your Personal Access Token.</span>`;
          }
        }
      });
    }

    if (window.artTouchElectron && window.artTouchElectron.onPublishProgress) {
      window.artTouchElectron.onPublishProgress(data => {
        updatePublishProgressStep(data);
      });
    }
  }

  window.saveAndTestGithubToken = async function() {
    const input = document.getElementById('input-github-token');
    const token = (input ? input.value : '').trim();

    if (!token) {
      showToast('Please enter a GitHub Personal Access Token.', 'error');
      return;
    }

    showToast('Validating token permissions with GitHub API...', 'info');

    if (window.artTouchElectron && window.artTouchElectron.testToken) {
      try {
        const res = await window.artTouchElectron.testToken(token);
        if (res.success) {
          showToast('GitHub token verified and saved securely!', 'success');
          if (input) input.value = '';
          const msgEl = document.getElementById('token-status-message');
          if (msgEl) {
            msgEl.innerHTML = `<span style="color: #10B981;"><i class="fa-solid fa-circle-check"></i> Connected to <strong>${res.repo}</strong> (Default branch: ${res.defaultBranch}).</span>`;
          }
        } else {
          showToast(`Token verification failed: ${res.error}`, 'error');
        }
      } catch (err) {
        showToast(`Verification error: ${err.message}`, 'error');
      }
    }
  };

  window.startLivePublish = async function() {
    if (isPublishing) return;
    isPublishing = true;

    const commitNote = ((document.getElementById('input-commit-note') || {}).value || '').trim();
    const buildId = `build-at-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const commitMsg = commitNote 
      ? `Update website content: ${commitNote} [Build: ${buildId}]`
      : `Update website content via Art Touch Control Center [Build: ${buildId}]`;

    // Reset UI steps in modal
    for (let i = 1; i <= 6; i++) {
      const stepEl = document.getElementById(`pub-step-${i}`);
      if (stepEl) {
        const icon = stepEl.querySelector('.step-icon');
        const status = stepEl.querySelector('.step-status');
        if (icon) {
          icon.style.background = 'var(--color-border)';
          icon.style.color = 'var(--color-text-main)';
          icon.innerHTML = `${i}`;
        }
        if (status) status.innerHTML = `<i class="fa-solid fa-circle text-muted" style="font-size: 8px;"></i>`;
      }
    }

    const banner = document.getElementById('publish-complete-banner');
    if (banner) banner.style.display = 'none';

    const closeBtn = document.getElementById('btn-close-publish-modal');
    if (closeBtn) closeBtn.style.display = 'none';

    openModal('modal-publish-progress');

    const dataJsContent = generateDataJsContent();

    try {
      if (window.artTouchElectron && window.artTouchElectron.publish) {
        const result = await window.artTouchElectron.publish({
          targetBuildId: buildId,
          commitMessage: commitMsg,
          dataJsContent: dataJsContent,
          summary: `${projectsData.length} projects, ${servicesData.length} services`
        });

        if (result.success) {
          if (banner) banner.style.display = 'block';
          if (closeBtn) closeBtn.style.display = 'inline-flex';
          showToast('Live website updated successfully!', 'success');
        }
      }
    } catch (err) {
      showToast(`Publishing error: ${err.message}`, 'error');
      if (closeBtn) closeBtn.style.display = 'inline-flex';
    } finally {
      isPublishing = false;
    }
  };

  function updatePublishProgressStep(data) {
    const { step, state, message } = data;
    const stepEl = document.getElementById(`pub-step-${step}`);
    if (!stepEl) return;

    const icon = stepEl.querySelector('.step-icon');
    const status = stepEl.querySelector('.step-status');

    if (state === 'active') {
      if (icon) {
        icon.style.background = 'var(--color-brand)';
        icon.style.color = '#0A0D12';
      }
      if (status) status.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color: var(--color-brand);"></i>`;
    } else if (state === 'done') {
      if (icon) {
        icon.style.background = '#10B981';
        icon.style.color = '#FFFFFF';
        icon.innerHTML = `<i class="fa-solid fa-check"></i>`;
      }
      if (status) status.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i>`;
    }
  }

  /* ==========================================================================
     11. UTILITIES & MODAL CONTROLLERS
     ========================================================================== */
  function initModals() {
    document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active', 'is-open');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.admin-modal-overlay.is-open, .admin-modal-overlay.active').forEach(m => {
          m.classList.remove('active', 'is-open');
        });
      }
    });
  }

  function showToast(msg, type = 'info') {
    let container = document.querySelector('.admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}`;

    let iconClass = 'fa-solid fa-info-circle';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
    if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `<i class="${iconClass}"></i> <span>${escapeHtml(msg)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
  window.showToast = showToast;

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
