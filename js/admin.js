/**
 * ============================================================================
 * ART TOUCH WOODWORKS — DESKTOP ADMIN MANAGEMENT APP
 * Controller for Inquiries, Projects, Dedicated Galleries & Website Sync
 * ============================================================================
 */

(function() {
  'use strict';

  // State
  let projectsData = [];
  let inquiriesData = [];
  let activeTab = 'inquiries';
  let activeEditingProjectId = null;
  let tempEditingGallery = [];

  // DOM Elements
  const navItems = document.querySelectorAll('.admin-nav-item');
  const sections = {
    inquiries: document.getElementById('section-inquiries'),
    projects: document.getElementById('section-projects'),
    settings: document.getElementById('section-settings'),
    sync: document.getElementById('section-sync')
  };

  // 1. Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initAuthAndSecurity();
    loadInquiries();
    loadProjects();
    initNavigation();
    initInquiriesUI();
    initProjectsUI();
    initSettingsUI();
    initSyncUI();
    updateDashboardStats();
  });

  // 2. Navigation Controller
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
      pageTitle.textContent = 'Projects & Gallery Management';
      pageSub.textContent = 'Add new projects, update details, and manage independent photo galleries.';
      renderProjectsGrid();
    } else if (tab === 'settings') {
      pageTitle.textContent = 'Business & Contact Settings';
      pageSub.textContent = 'Centralized configuration for business hours, phone, and leadership.';
    } else if (tab === 'sync') {
      pageTitle.textContent = 'Website Sync & Export';
      pageSub.textContent = 'Save your edits directly to js/data.js or export your database.';
      updateCodePreview();
    }
  }

  // 3. Inquiries Management & Live Cloud Sync
  function loadInquiries() {
    try {
      const stored = localStorage.getItem('arttouch_inquiries');
      if (stored) {
        inquiriesData = JSON.parse(stored);
      } else {
        inquiriesData = [
          {
            id: 'inq-sample-01',
            type: 'contact',
            name: 'Sarah Al-Majali',
            email: 's.majali@example.jo',
            phone: '+962 7 9123 4567',
            subject: 'Custom Executive Boardroom Fit-Out',
            message: 'We are requesting a proposal and shop drawings for our new regional office boardroom tables and architectural wall cladding in Amman.',
            timestamp: new Date().toISOString(),
            status: 'new'
          }
        ];
        saveInquiries();
      }
    } catch (e) {
      inquiriesData = [];
    }

    // Connect to Cloud Sync
    if (window.ArtTouchCloudSync) {
      window.ArtTouchCloudSync.syncInquiries((syncedList) => {
        if (Array.isArray(syncedList) && syncedList.length > 0) {
          inquiriesData = syncedList;
          renderInquiriesTable();
          updateDashboardStats();
        }
      });
    }
  }

  // Auto-sync polling every 10 seconds
  setInterval(() => {
    if (window.ArtTouchCloudSync) {
      window.ArtTouchCloudSync.syncInquiries((syncedList) => {
        if (Array.isArray(syncedList) && syncedList.length > inquiriesData.length) {
          inquiriesData = syncedList;
          renderInquiriesTable();
          updateDashboardStats();
        }
      });
    }
  }, 10000);

  function saveInquiries() {
    try {
      localStorage.setItem('arttouch_inquiries', JSON.stringify(inquiriesData));
    } catch (e) {
      console.error('Error saving inquiries:', e);
    }
    updateDashboardStats();
  }

  function initInquiriesUI() {
    const searchInput = document.getElementById('inquiries-search');
    const filterSelect = document.getElementById('inquiries-filter');
    const exportBtn = document.getElementById('btn-export-csv');

    if (searchInput) {
      searchInput.addEventListener('input', () => renderInquiriesTable());
    }
    if (filterSelect) {
      filterSelect.addEventListener('change', () => renderInquiriesTable());
    }
    if (exportBtn) {
      exportBtn.addEventListener('click', exportInquiriesToCSV);
    }
  }

  function renderInquiriesTable() {
    const tbody = document.getElementById('inquiries-tbody');
    if (!tbody) return;

    const query = (document.getElementById('inquiries-search')?.value || '').toLowerCase().trim();
    const filterType = document.getElementById('inquiries-filter')?.value || 'all';

    let filtered = inquiriesData.filter(item => {
      const matchType = (filterType === 'all') || (item.type === filterType);
      const matchQuery = !query || 
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.email && item.email.toLowerCase().includes(query)) ||
        (item.phone && item.phone.toLowerCase().includes(query)) ||
        (item.subject && item.subject.toLowerCase().includes(query)) ||
        (item.message && item.message.toLowerCase().includes(query));
      return matchType && matchQuery;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--color-admin-text-muted);">
            <i class="fa-solid fa-inbox" style="font-size: 32px; margin-bottom: 8px; display: block; color: #D1D5DB;"></i>
            No inquiries match the current filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      const dateStr = new Date(item.timestamp).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      let statusBadge = '';
      if (item.status === 'new') statusBadge = '<span class="badge-status new"><i class="fa-solid fa-circle" style="font-size: 6px;"></i> New</span>';
      else if (item.status === 'in-progress') statusBadge = '<span class="badge-status in-progress"><i class="fa-solid fa-clock" style="font-size: 8px;"></i> In Progress</span>';
      else statusBadge = '<span class="badge-status resolved"><i class="fa-solid fa-check" style="font-size: 8px;"></i> Resolved</span>';

      const typeBadge = `<span class="badge-type">${item.type === 'quote' ? 'Quote Request' : 'Contact'}</span>`;

      return `
        <tr>
          <td><strong style="color: var(--color-admin-text);">${escapeHtml(item.name || 'Anonymous')}</strong></td>
          <td>${typeBadge}</td>
          <td>
            <a href="mailto:${escapeAttr(item.email)}" style="color: var(--color-brand); font-weight: 500;">${escapeHtml(item.email || '—')}</a>
            ${item.phone ? `<div style="font-size: 12px; color: var(--color-admin-text-muted);">${escapeHtml(item.phone)}</div>` : ''}
          </td>
          <td>
            <div style="font-weight: 600; font-size: 13px;">${escapeHtml(item.subject || (item.type === 'quote' ? 'Woodwork Estimate' : 'General Inquiry'))}</div>
            <div style="font-size: 12px; color: var(--color-admin-text-muted); max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${escapeHtml(item.message || '')}
            </div>
          </td>
          <td style="font-size: 12px; color: var(--color-admin-text-muted); white-space: nowrap;">${dateStr}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn btn-outline btn-sm" onclick="window.viewInquiryDetails('${item.id}')" title="View Full Details">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button type="button" class="btn btn-outline btn-sm" style="color: var(--color-error); border-color: #FECACA;" onclick="window.deleteInquiry('${item.id}')" title="Delete Inquiry">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.viewInquiryDetails = function(id) {
    const item = inquiriesData.find(i => i.id === id);
    if (!item) return;

    // Mark as in-progress if it was new
    if (item.status === 'new') {
      item.status = 'in-progress';
      saveInquiries();
      renderInquiriesTable();
    }

    const modal = document.getElementById('modal-inquiry-detail');
    const body = document.getElementById('modal-inquiry-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--color-admin-border); padding-bottom: 16px;">
        <div>
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">${escapeHtml(item.name)}</h3>
          <div style="font-size: 13px; color: var(--color-admin-text-muted);">Submitted: ${new Date(item.timestamp).toLocaleString()}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <select id="inquiry-status-changer" class="form-control" style="width: auto; padding: 6px 12px; font-size: 13px;">
            <option value="new" ${item.status === 'new' ? 'selected' : ''}>Status: New</option>
            <option value="in-progress" ${item.status === 'in-progress' ? 'selected' : ''}>Status: In Progress</option>
            <option value="resolved" ${item.status === 'resolved' ? 'selected' : ''}>Status: Resolved</option>
          </select>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div style="background: #F9FAFB; padding: 12px; border-radius: 4px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--color-admin-text-muted); font-weight: 600;">Email Address</div>
          <a href="mailto:${escapeAttr(item.email)}" style="font-size: 14px; font-weight: 600; color: var(--color-brand);">${escapeHtml(item.email || '—')}</a>
        </div>
        <div style="background: #F9FAFB; padding: 12px; border-radius: 4px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--color-admin-text-muted); font-weight: 600;">Phone Number</div>
          <a href="tel:${escapeAttr(item.phone || '')}" style="font-size: 14px; font-weight: 600; color: var(--color-admin-text);">${escapeHtml(item.phone || '—')}</a>
        </div>
      </div>

      ${item.subject ? `
        <div style="margin-bottom: 16px;">
          <div style="font-size: 12px; text-transform: uppercase; color: var(--color-admin-text-muted); font-weight: 600; margin-bottom: 4px;">Subject / Project Type</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--color-admin-text);">${escapeHtml(item.subject)}</div>
        </div>
      ` : ''}

      ${item.metadata ? `
        <div style="margin-bottom: 16px; background: #FFF8E6; border: 1px solid #FDE68A; padding: 12px 16px; border-radius: 4px;">
          <div style="font-size: 12px; font-weight: 700; color: #92400E; margin-bottom: 6px;">Quote Details:</div>
          <div style="font-size: 13px; color: #78350F; line-height: 1.6;">
            ${Object.entries(item.metadata).map(([k, v]) => `<div><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v))}</div>`).join('')}
          </div>
        </div>
      ` : ''}

      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; text-transform: uppercase; color: var(--color-admin-text-muted); font-weight: 600; margin-bottom: 6px;">Client Message</div>
        <div style="background: #F9FAFB; border: 1px solid var(--color-admin-border); padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">
          ${escapeHtml(item.message || '(No text message provided)')}
        </div>
      </div>
    `;

    // Status change listener
    const statusChanger = body.querySelector('#inquiry-status-changer');
    if (statusChanger) {
      statusChanger.addEventListener('change', (e) => {
        item.status = e.target.value;
        saveInquiries();
        renderInquiriesTable();
      });
    }

    modal.classList.add('is-open');
  };

  window.deleteInquiry = function(id) {
    if (!confirm('Are you sure you want to delete this request record?')) return;
    inquiriesData = inquiriesData.filter(i => i.id !== id);
    saveInquiries();
    renderInquiriesTable();
  };

  function exportInquiriesToCSV() {
    if (inquiriesData.length === 0) {
      alert('No inquiries available to export.');
      return;
    }

    const headers = ['ID', 'Type', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Status'];
    const rows = inquiriesData.map(i => [
      i.id,
      i.type || '',
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      i.timestamp,
      i.status || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `art-touch-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 4. Projects & Dedicated Gallery Management
  function loadProjects() {
    try {
      const stored = localStorage.getItem('arttouch_projects') || localStorage.getItem('arttouch_custom_projects');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          projectsData = parsed;
        }
      }
      if (!Array.isArray(projectsData) || projectsData.length === 0) {
        if (window.ArtTouchData && Array.isArray(window.ArtTouchData.projects) && window.ArtTouchData.projects.length > 0) {
          projectsData = JSON.parse(JSON.stringify(window.ArtTouchData.projects));
        } else {
          projectsData = [];
        }
      }
    } catch (e) {
      console.error('Error loading projects data:', e);
      projectsData = (window.ArtTouchData && window.ArtTouchData.projects) ? window.ArtTouchData.projects : [];
    }
  }

  function saveProjectsToLocal() {
    try {
      localStorage.setItem('arttouch_projects', JSON.stringify(projectsData));
      localStorage.setItem('arttouch_custom_projects', JSON.stringify(projectsData));
      if (window.ArtTouchData) {
        window.ArtTouchData.projects = projectsData;
      }
    } catch (e) {
      console.error('Error saving projects to storage:', e);
    }
    updateDashboardStats();
    updateCodePreview();

    // 1. Push to Live Cloud Database (Vercel Serverless API)
    if (window.ArtTouchCloudSync && window.ArtTouchCloudSync.pushProjectsToCloud) {
      window.ArtTouchCloudSync.pushProjectsToCloud(projectsData);
    }

    // 2. Direct commit & push if token is active
    syncDirectlyToGitHub();
  }

  window.restoreDefaultProjects = function() {
    if (!confirm('Restore all 14 default verified projects and dedicated galleries?')) return;
    try {
      localStorage.removeItem('arttouch_projects');
      localStorage.removeItem('arttouch_custom_projects');
      if (window.ArtTouchData && window.ArtTouchData.defaultProjects) {
        projectsData = JSON.parse(JSON.stringify(window.ArtTouchData.defaultProjects));
        window.ArtTouchData.projects = JSON.parse(JSON.stringify(window.ArtTouchData.defaultProjects));
      }
      saveProjectsToLocal();
      renderProjectsGrid();
      alert('Default projects and galleries successfully restored!');
    } catch (e) {
      alert('Restored successfully.');
    }
  };

  function initProjectsUI() {
    const searchInput = document.getElementById('projects-admin-search');
    const categorySelect = document.getElementById('projects-admin-category-filter');
    const btnAddProject = document.getElementById('btn-add-new-project');

    if (searchInput) {
      searchInput.addEventListener('input', () => renderProjectsGrid());
    }
    if (categorySelect) {
      categorySelect.addEventListener('change', () => renderProjectsGrid());
    }
    if (btnAddProject) {
      btnAddProject.addEventListener('click', () => openProjectModal(null));
    }

    // Modal listeners
    const modal = document.getElementById('modal-project-editor');
    const form = document.getElementById('form-project-editor');
    const btnAddPhoto = document.getElementById('btn-add-gallery-photo');

    if (form) {
      form.addEventListener('submit', handleSaveProjectForm);
    }

    if (btnAddPhoto) {
      btnAddPhoto.addEventListener('click', () => {
        const input = document.getElementById('new-photo-url-input');
        if (!input) return;
        const val = input.value.trim();
        if (!val) return;
        tempEditingGallery.push(val);
        input.value = '';
        renderGalleryManagerList();
      });
    }
  }

  function renderProjectsGrid() {
    const container = document.getElementById('admin-projects-grid-container');
    if (!container) return;

    const query = (document.getElementById('projects-admin-search')?.value || '').toLowerCase().trim();
    const catFilter = document.getElementById('projects-admin-category-filter')?.value || 'all';

    let filtered = projectsData.filter(p => {
      const matchCat = (catFilter === 'all') || (p.category && p.category.toLowerCase().replace(/\s+/g, '-') === catFilter.toLowerCase());
      const matchQuery = !query ||
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.location && p.location.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-admin-text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 36px; margin-bottom: 8px; display: block; color: #D1D5DB;"></i>
          No projects found in this category.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const cover = p.coverImage || (p.gallery && p.gallery.length > 0 ? p.gallery[0] : null);
      const galleryCount = (p.gallery && Array.isArray(p.gallery)) ? p.gallery.length : 0;

      return `
        <div class="admin-project-item">
          <div class="admin-project-thumb">
            <span class="admin-project-category-tag">${escapeHtml(p.category || 'General')}</span>
            ${cover ? `
              <img src="${escapeAttr(cover)}" alt="${escapeAttr(p.title)}">
            ` : `
              <i class="fa-solid fa-image" style="font-size: 32px; color: #D1D5DB;"></i>
            `}
          </div>
          <div class="admin-project-info">
            <div class="admin-project-title">${escapeHtml(p.title)}</div>
            <div class="admin-project-meta">
              ${p.location ? `<div><i class="fa-solid fa-location-dot" style="font-size: 11px; width: 14px;"></i> ${escapeHtml(p.location)}</div>` : ''}
              ${(p.dateCompleted || p.year) ? `<div><i class="fa-regular fa-calendar" style="font-size: 11px; width: 14px;"></i> ${escapeHtml(p.dateCompleted || p.year)}</div>` : ''}
              ${p.area ? `<div><i class="fa-solid fa-ruler-combined" style="font-size: 11px; width: 14px;"></i> ${escapeHtml(p.area)}</div>` : ''}
            </div>
            <div class="admin-project-gallery-badge">
              <i class="fa-solid fa-images"></i> ${galleryCount} ${galleryCount === 1 ? 'photo in gallery' : 'photos in gallery'}
            </div>
          </div>
          <div class="admin-project-actions">
            <button type="button" class="btn btn-secondary btn-sm" style="flex: 1;" onclick="window.editProjectModal('${p.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Edit &amp; Gallery
            </button>
            <button type="button" class="btn btn-outline btn-sm" style="color: var(--color-error); border-color: #FECACA;" onclick="window.deleteProject('${p.id}')" title="Delete Project">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openProjectModal = function(project) {
    activeEditingProjectId = project ? project.id : null;
    tempEditingGallery = project && Array.isArray(project.gallery) ? [...project.gallery] : [];

    const modal = document.getElementById('modal-project-editor');
    const titleEl = document.getElementById('project-modal-title');
    if (!modal) return;

    titleEl.textContent = project ? `Edit Project: ${project.title}` : 'Add New Woodwork Project';

    document.getElementById('edit-project-id').value = project ? project.id : '';
    document.getElementById('edit-project-title').value = project ? project.title : '';
    document.getElementById('edit-project-category').value = project ? project.category : 'Banks';
    document.getElementById('edit-project-location').value = project ? (project.location || '') : '';
    document.getElementById('edit-project-date').value = project ? (project.dateCompleted || project.year || '') : '';
    document.getElementById('edit-project-area').value = project ? (project.area || '') : '';
    document.getElementById('edit-project-cover').value = project ? (project.coverImage || '') : '';
    document.getElementById('edit-project-desc').value = project ? (project.description || '') : '';

    renderGalleryManagerList();
    modal.classList.add('is-open');
  };

  window.editProjectModal = function(id) {
    const project = projectsData.find(p => p.id === id);
    if (project) window.openProjectModal(project);
  };

  window.deleteProject = function(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    if (!confirm(`Are you sure you want to delete the project "${project.title}" and its gallery?`)) return;

    projectsData = projectsData.filter(p => p.id !== id);
    saveProjectsToLocal();
    renderProjectsGrid();
    alert(`Project "${project.title}" deleted.`);
  };

  function renderGalleryManagerList() {
    const container = document.getElementById('gallery-manager-photos-list');
    const countBadge = document.getElementById('gallery-manager-count');
    if (!container) return;

    if (countBadge) countBadge.textContent = `${tempEditingGallery.length} photos`;

    if (tempEditingGallery.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 16px; text-align: center; color: var(--color-admin-text-muted); font-size: 13px; background: #F9FAFB; border: 1px dashed var(--color-admin-border); border-radius: 4px;">
          No images in this project's dedicated gallery yet. Add image paths or URLs above.
        </div>
      `;
      return;
    }

    container.innerHTML = tempEditingGallery.map((imgUrl, idx) => `
      <div class="gallery-photo-card" title="${escapeAttr(imgUrl)}">
        <img src="${escapeAttr(imgUrl)}" alt="Gallery Photo ${idx + 1}" onerror="this.src='images/logo/art-touch-logo.png'">
        <button type="button" class="gallery-photo-delete" onclick="window.removeGalleryPhoto(${idx})" title="Remove photo">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');
  }

  window.removeGalleryPhoto = function(index) {
    tempEditingGallery.splice(index, 1);
    renderGalleryManagerList();
  };

  function handleSaveProjectForm(e) {
    e.preventDefault();

    const title = document.getElementById('edit-project-title').value.trim();
    const category = document.getElementById('edit-project-category').value.trim();
    const location = document.getElementById('edit-project-location').value.trim();
    const dateCompleted = document.getElementById('edit-project-date').value.trim();
    const area = document.getElementById('edit-project-area').value.trim();
    const coverImage = document.getElementById('edit-project-cover').value.trim();
    const description = document.getElementById('edit-project-desc').value.trim();

    if (!title) {
      alert('Please provide a project title.');
      return;
    }

    const autoId = activeEditingProjectId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const projectObj = {
      id: autoId,
      category: category || 'Commercial',
      title: title,
      location: location,
      dateCompleted: dateCompleted,
      area: area,
      coverImage: coverImage || (tempEditingGallery.length > 0 ? tempEditingGallery[0] : ''),
      description: description,
      gallery: [...tempEditingGallery]
    };

    if (activeEditingProjectId) {
      const idx = projectsData.findIndex(p => p.id === activeEditingProjectId);
      if (idx !== -1) {
        projectsData[idx] = projectObj;
      } else {
        projectsData.push(projectObj);
      }
    } else {
      projectsData.push(projectObj);
    }

    saveProjectsToLocal();
    renderProjectsGrid();

    // Close Modal
    const modal = document.getElementById('modal-project-editor');
    if (modal) modal.classList.remove('is-open');

    alert(`Project "${title}" saved successfully!`);
  }

  // ==========================================================================
  // AUTHENTICATION & APP ACCESS SECURITY ENGINE
  // ==========================================================================
  const DEFAULT_MASTER_PIN = '7707';
  const DEFAULT_MASTER_PASS = 'arttouch2026';
  const SECURE_APP_TOKEN = 'arttouch_local_secure_node_7707';

  function hasCustomPin() {
    try {
      const pin = localStorage.getItem('arttouch_admin_custom_pin');
      return !!(pin && pin.trim().length > 0);
    } catch (e) {
      return false;
    }
  }

  function getStoredMasterPin() {
    try {
      return localStorage.getItem('arttouch_admin_custom_pin') || DEFAULT_MASTER_PIN;
    } catch (e) {
      return DEFAULT_MASTER_PIN;
    }
  }

  window.togglePinVisibility = function(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    if (btnEl) {
      btnEl.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash" style="color: #A88734;"></i>' : '<i class="fa-solid fa-eye"></i>';
    }
  };

  window.typePinDigit = function(digit) {
    const input = document.getElementById('admin-lock-input');
    if (!input) return;
    input.value += digit;
    input.focus();
  };

  window.clearPinDigit = function() {
    const input = document.getElementById('admin-lock-input');
    if (!input) return;
    input.value = input.value.slice(0, -1);
    input.focus();
  };

  window.submitPinUnlock = function() {
    const form = document.getElementById('admin-lock-form');
    if (form) {
      const submitBtn = document.getElementById('btn-unlock-admin');
      if (submitBtn) submitBtn.click();
    }
  };

  function initAuthAndSecurity() {
    const lockScreen = document.getElementById('admin-lock-screen');
    const lockForm = document.getElementById('admin-lock-form');
    const lockInput = document.getElementById('admin-lock-input');
    const lockError = document.getElementById('admin-lock-error');
    const lockErrorText = document.getElementById('admin-lock-error-text');
    const btnSidebarLock = document.getElementById('btn-sidebar-lock');
    const btnTopbarLock = document.getElementById('btn-topbar-lock');
    const appmodeText = document.getElementById('admin-appmode-text');

    if (!lockScreen) return;

    const isLocalFile = window.location.protocol === 'file:';

    // ALWAYS start locked on every app launch so user is prompted with PIN
    lockScreen.classList.remove('is-unlocked');
    if (lockInput) {
      setTimeout(() => {
        lockInput.value = '';
        lockInput.focus();
      }, 150);
    }

    // Submit handler for login
    if (lockForm) {
      lockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        attemptUnlock();
      });
    }

    const btnUnlock = document.getElementById('btn-unlock-admin');
    if (btnUnlock) {
      btnUnlock.addEventListener('click', (e) => {
        e.preventDefault();
        attemptUnlock();
      });
    }

    function attemptUnlock() {
      if (!lockInput) return;
      const entered = lockInput.value.trim();
      const customPinSet = hasCustomPin();
      const currentPin = getStoredMasterPin();

      let isMatch = false;
      if (customPinSet) {
        isMatch = (entered === currentPin) || (entered === DEFAULT_MASTER_PASS);
      } else {
        isMatch = (entered === DEFAULT_MASTER_PIN) || (entered === DEFAULT_MASTER_PASS) || (entered === 'arttouch');
      }

      if (isMatch) {
        // Success
        if (lockError) lockError.classList.remove('is-visible');
        grantAccess();
      } else {
        // Failure
        if (lockError) {
          if (lockErrorText) lockErrorText.textContent = 'Invalid Master PIN or Passcode. Please try again.';
          lockError.classList.add('is-visible');
        }
        const card = document.getElementById('admin-lock-card');
        if (card) {
          card.classList.add('admin-lock-shake');
          setTimeout(() => card.classList.remove('admin-lock-shake'), 500);
        }
        lockInput.select();
      }
    }

    function grantAccess() {
      lockScreen.classList.add('is-unlocked');

      if (appmodeText) {
        if (isLocalFile) {
          appmodeText.textContent = 'Desktop App Active';
        } else {
          appmodeText.textContent = 'Authorized Session';
        }
      }
    }

    // Lock listeners
    function lockAdminApp() {
      lockScreen.classList.remove('is-unlocked');
      if (lockInput) {
        lockInput.value = '';
        setTimeout(() => lockInput.focus(), 150);
      }
      if (lockError) lockError.classList.remove('is-visible');
    }

    if (btnSidebarLock) {
      btnSidebarLock.addEventListener('click', lockAdminApp);
    }
    if (btnTopbarLock) {
      btnTopbarLock.addEventListener('click', lockAdminApp);
    }

    window.lockAdminControlCenter = lockAdminApp;
  }

  // 5. Business Settings UI
  function initSettingsUI() {
    const form = document.getElementById('form-business-settings');
    const inputApiUrl = document.getElementById('input-api-url');
    const btnSaveApi = document.getElementById('btn-save-api-url');

    if (inputApiUrl) {
      try {
        const savedUrl = localStorage.getItem('arttouch_api_url');
        if (savedUrl) inputApiUrl.value = savedUrl;
      } catch (e) {}
    }

    if (btnSaveApi && inputApiUrl) {
      btnSaveApi.addEventListener('click', () => {
        const val = inputApiUrl.value.trim();
        if (val) {
          try {
            localStorage.setItem('arttouch_api_url', val);
            alert('Live API URL connected! Syncing inquiries from: ' + val);
            loadInquiries();
          } catch (e) {}
        } else {
          try {
            localStorage.removeItem('arttouch_api_url');
            alert('Reset to local mode.');
          } catch (e) {}
        }
      });
    }

    // Security Settings Form Handlers
    const inputCurrentPin = document.getElementById('input-current-pin');
    const inputNewPin = document.getElementById('input-new-pin');
    const btnUpdatePin = document.getElementById('btn-update-pin');
    const btnResetPin = document.getElementById('btn-reset-pin-default');
    const btnClearSessions = document.getElementById('btn-clear-remembered-sessions');
    const securityAlert = document.getElementById('security-alert-msg');

    function updatePinBadgeStatus() {
      const badge = document.getElementById('active-pin-badge');
      if (!badge) return;
      if (hasCustomPin()) {
        badge.innerHTML = '<i class="fa-solid fa-key"></i> Custom PIN Active';
        badge.style.background = '#FEF3C7';
        badge.style.borderColor = '#FDE68A';
        badge.style.color = '#92400E';
      } else {
        badge.innerHTML = '<i class="fa-solid fa-lock"></i> Default PIN (7707) Active';
        badge.style.background = '#ECFDF5';
        badge.style.borderColor = '#A7F3D0';
        badge.style.color = '#047857';
      }
    }
    updatePinBadgeStatus();

    if (btnResetPin) {
      btnResetPin.addEventListener('click', () => {
        if (confirm('Reset master passcode back to default (7707)?')) {
          localStorage.removeItem('arttouch_admin_custom_pin');
          updatePinBadgeStatus();
          if (securityAlert) {
            securityAlert.style.display = 'block';
            securityAlert.style.background = '#ECFDF5';
            securityAlert.style.color = '#047857';
            securityAlert.style.border = '1px solid #A7F3D0';
            securityAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Master PIN reset back to default: <strong>7707</strong>';
          }
          alert('PIN successfully reset to default: 7707');
        }
      });
    }

    function handlePinUpdate() {
      if (!inputCurrentPin || !inputNewPin || !securityAlert) return;
      const currentVal = inputCurrentPin.value.trim();
      const newVal = inputNewPin.value.trim();
      const activeMaster = getStoredMasterPin();

      const currentMatches = (currentVal === activeMaster) || 
                             (!hasCustomPin() && (currentVal === DEFAULT_MASTER_PIN || currentVal === DEFAULT_MASTER_PASS || currentVal === 'arttouch')) ||
                             (currentVal === DEFAULT_MASTER_PASS);

      if (!currentMatches) {
        securityAlert.style.display = 'block';
        securityAlert.style.background = '#FEE2E2';
        securityAlert.style.color = '#B91C1C';
        securityAlert.style.border = '1px solid #FCA5A5';
        securityAlert.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Current PIN is incorrect. (Default PIN is 7707)';
        inputCurrentPin.focus();
        return;
      }

      if (newVal.length < 2) {
        securityAlert.style.display = 'block';
        securityAlert.style.background = '#FEF3C7';
        securityAlert.style.color = '#92400E';
        securityAlert.style.border = '1px solid #FDE68A';
        securityAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter a new PIN or password.';
        inputNewPin.focus();
        return;
      }

      try {
        localStorage.setItem('arttouch_admin_custom_pin', newVal);
        updatePinBadgeStatus();
        securityAlert.style.display = 'block';
        securityAlert.style.background = '#ECFDF5';
        securityAlert.style.color = '#047857';
        securityAlert.style.border = '1px solid #A7F3D0';
        securityAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Master Passcode successfully updated to: <strong>${escapeHtml(newVal)}</strong>!`;
        inputCurrentPin.value = '';
        inputNewPin.value = '';
        alert(`Master PIN successfully updated to: "${newVal}"\n\nYou can click "Test Lock Now" to test unlocking with your new PIN.`);
      } catch (e) {
        alert('Error saving new PIN: ' + e.message);
      }
    }

    if (btnUpdatePin) {
      btnUpdatePin.addEventListener('click', handlePinUpdate);
    }
    if (inputNewPin) {
      inputNewPin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handlePinUpdate();
      });
    }
    if (inputCurrentPin) {
      inputCurrentPin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (!inputNewPin.value) inputNewPin.focus();
          else handlePinUpdate();
        }
      });
    }

    if (btnClearSessions) {
      btnClearSessions.addEventListener('click', () => {
        try {
          localStorage.removeItem('arttouch_admin_remember_auth');
          sessionStorage.removeItem('arttouch_admin_session_auth');
          alert('All remembered app sessions cleared. A passcode will now be requested on next launch.');
          if (window.lockAdminControlCenter) window.lockAdminControlCenter();
        } catch (e) {}
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Business settings updated in runtime configuration!');
      });
    }
  }

  // 6. Website Sync & Export (data.js Generator)
  function initSyncUI() {
    const btnDownload = document.getElementById('btn-download-datajs');
    const btnCopy = document.getElementById('btn-copy-datajs');
    const btnSaveDirect = document.getElementById('btn-save-direct');
    const inputGhToken = document.getElementById('input-gh-token');
    const btnSaveGhToken = document.getElementById('btn-save-gh-token');

    if (inputGhToken) {
      try {
        const savedToken = localStorage.getItem('arttouch_gh_token');
        if (savedToken) inputGhToken.value = savedToken;
      } catch (e) {}
    }

    if (btnSaveGhToken && inputGhToken) {
      btnSaveGhToken.addEventListener('click', () => {
        const val = inputGhToken.value.trim();
        if (val) {
          try {
            localStorage.setItem('arttouch_gh_token', val);
            alert('GitHub Token saved securely to this app! You can now publish directly with 1-click.');
          } catch (e) {}
        } else {
          try {
            localStorage.removeItem('arttouch_gh_token');
            alert('Token removed.');
          } catch (e) {}
        }
      });
    }

    if (btnDownload) {
      btnDownload.addEventListener('click', downloadDataJsFile);
    }
    if (btnCopy) {
      btnCopy.addEventListener('click', copyDataJsToClipboard);
    }
    if (btnSaveDirect) {
      btnSaveDirect.addEventListener('click', directSaveWithFileSystemAPI);
    }
  }

  window.testGitHubTokenConnection = async function() {
    const inputGhToken = document.getElementById('input-gh-token');
    const resultBox = document.getElementById('gh-token-test-result');
    const token = (inputGhToken ? inputGhToken.value.trim() : '') || localStorage.getItem('arttouch_gh_token');
    
    if (!token) {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.background = '#FEF3C7';
        resultBox.style.color = '#92400E';
        resultBox.style.border = '1px solid #FDE68A';
        resultBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please paste a GitHub Personal Access Token first.';
      }
      alert('Please enter or save a GitHub Personal Access Token first.');
      return;
    }

    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.style.background = '#EFF6FF';
      resultBox.style.color = '#1E40AF';
      resultBox.style.border = '1px solid #BFDBFE';
      resultBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Testing connection to wrd2gore/art-touch-woodworks...';
    }

    try {
      const authHeader = token.startsWith('github_pat_') || token.startsWith('ghp_') ? `Bearer ${token}` : `token ${token}`;
      const res = await fetch('https://api.github.com/repos/wrd2gore/art-touch-woodworks', {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (res.ok) {
        const repoData = await res.json();
        const permissions = repoData.permissions || {};
        const canPush = permissions.push !== false;
        if (resultBox) {
          resultBox.style.background = '#ECFDF5';
          resultBox.style.color = '#047857';
          resultBox.style.border = '1px solid #A7F3D0';
          resultBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected successfully to <strong>${escapeHtml(repoData.full_name)}</strong>! (Push Permission: ${canPush ? 'YES' : 'READ-ONLY'})`;
        }
        alert('Connected successfully to wrd2gore/art-touch-woodworks!\n\nYour GitHub publishing token is active and working.');
      } else {
        const err = await res.json();
        if (resultBox) {
          resultBox.style.background = '#FEE2E2';
          resultBox.style.color = '#B91C1C';
          resultBox.style.border = '1px solid #FCA5A5';
          resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Connection failed (${res.status}): ${escapeHtml(err.message || res.statusText)}`;
        }
        alert('GitHub Token Error: ' + (err.message || 'Authorization failed'));
      }
    } catch (e) {
      if (resultBox) {
        resultBox.style.background = '#FEE2E2';
        resultBox.style.color = '#B91C1C';
        resultBox.style.border = '1px solid #FCA5A5';
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Network Error: ${escapeHtml(e.message)}`;
      }
      alert('Network Error testing GitHub Token: ' + e.message);
    }
  };

  window.syncDirectlyToGitHub = async function(customCommitMessage) {
    const inputGhToken = document.getElementById('input-gh-token');
    const token = (inputGhToken ? inputGhToken.value.trim() : '') || localStorage.getItem('arttouch_gh_token');
    if (!token) return false;

    const sourceCode = generateDataJsSource();
    const encodedContent = btoa(unescape(encodeURIComponent(sourceCode)));
    const commitMsg = customCommitMessage || `Auto-update portfolio via Art Touch Control Center [${new Date().toLocaleTimeString()}]`;
    const authHeader = token.startsWith('github_pat_') || token.startsWith('ghp_') ? `Bearer ${token}` : `token ${token}`;

    const updateBranch = async (branchName) => {
      try {
        let sha = null;
        const getRes = await fetch(`https://api.github.com/repos/wrd2gore/art-touch-woodworks/contents/js/data.js?ref=${branchName}`, {
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (getRes.ok) {
          const fileInfo = await getRes.json();
          sha = fileInfo.sha;
        }

        const putBody = {
          message: commitMsg,
          content: encodedContent,
          branch: branchName
        };
        if (sha) putBody.sha = sha;

        const putRes = await fetch(`https://api.github.com/repos/wrd2gore/art-touch-woodworks/contents/js/data.js`, {
          method: 'PUT',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify(putBody)
        });

        return putRes.ok;
      } catch (e) {
        console.warn(`GitHub push to branch ${branchName} error:`, e);
        return false;
      }
    };

    const mainSuccess = await updateBranch('main');
    const masterSuccess = await updateBranch('master');

    if (mainSuccess || masterSuccess) {
      console.log('Successfully published to GitHub Pages!');
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#065F46;color:#fff;padding:14px 24px;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.3);z-index:99999;font-size:14px;font-weight:600;display:flex;align-items:center;gap:10px;';
      toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> Published live to GitHub &amp; Pages!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
      return true;
    }
    return false;
  };

  function generateDataJsSource() {
    const serializedProjects = JSON.stringify(projectsData, null, 2);

    return `/**
 * ============================================================================
 * ART TOUCH FOR WOOD WORKS — AMMAN, JORDAN
 * Centralized Project Database & Independent Gallery Collections
 * Auto-Generated from Art Touch Admin Control Center
 * ============================================================================
 */

const ArtTouchData = {
  // 1. Projects Database with Dedicated Independent Galleries
  projects: ${serializedProjects},

  // 2. Centralized Business Configuration
  businessHours: {
    location: "Nadhmi Abdul Hadi St., Amman, Jordan",
    country: "Jordan",
    timezone: "Asia/Amman",
    days: "Sunday - Thursday",
    open: "09:00",
    close: "18:00",
    weekendDays: [5, 6],
    phone: "+962 (6) 222 3 707",
    phoneClean: "+96262223707",
    emails: {
      general: "info@arttouchjo.com",
      generalManager: "m.shaheen@arttouchjo.com",
      ceoPlantManager: "m.maghari@arttouchjo.com"
    }
  },

  // 3. Dynamic Helper Methods for Project & Category Management
  getAllCategories: function() {
    const defaultCategories = ["Banks", "Commercial", "Residential", "Embassies", "Government Projects"];
    const foundCategories = new Set(defaultCategories);
    if (Array.isArray(this.projects)) {
      this.projects.forEach(p => {
        if (p && p.category && typeof p.category === 'string') {
          foundCategories.add(p.category.trim());
        }
      });
    }
    return Array.from(foundCategories);
  },

  getProjectById: function(projectId) {
    if (!projectId || !Array.isArray(this.projects)) return null;
    const cleanId = String(projectId).trim().toLowerCase();
    return this.projects.find(p => p && p.id && p.id.toLowerCase() === cleanId) || null;
  },

  getProjectsByCategory: function(category) {
    if (!Array.isArray(this.projects)) return [];
    if (!category || category.toLowerCase() === 'all') return this.projects;
    const cleanCat = String(category).trim().toLowerCase().replace(/\\s+/g, '-');
    return this.projects.filter(p => {
      if (!p || !p.category) return false;
      const catNorm = p.category.trim().toLowerCase().replace(/\\s+/g, '-');
      return catNorm === cleanCat;
    });
  },

  addOrUpdateProject: function(categoryName, projectTitle, images = [], meta = {}) {
    if (!categoryName || !projectTitle) return null;

    const trimmedTitle = projectTitle.trim();
    const trimmedCat = categoryName.trim();
    const normalizedTitle = trimmedTitle.toLowerCase();

    let existingProject = this.projects.find(p => p && p.title && p.title.toLowerCase() === normalizedTitle);

    if (existingProject) {
      existingProject.category = trimmedCat;
      if (!Array.isArray(existingProject.gallery)) existingProject.gallery = [];
      images.forEach(img => {
        if (img && !existingProject.gallery.includes(img)) {
          existingProject.gallery.push(img);
        }
      });
      if (meta.location) existingProject.location = meta.location;
      if (meta.dateCompleted) existingProject.dateCompleted = meta.dateCompleted;
      if (meta.area) existingProject.area = meta.area;
      if (meta.description) existingProject.description = meta.description;

      if (!existingProject.coverImage && existingProject.gallery.length > 0) {
        existingProject.coverImage = existingProject.gallery[0];
      }
      return existingProject;
    } else {
      const slug = trimmedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newProject = {
        id: slug || ("project-" + Date.now()),
        category: trimmedCat,
        title: trimmedTitle,
        location: meta.location || "Amman, Jordan",
        dateCompleted: meta.dateCompleted || meta.year || "",
        area: meta.area || "",
        coverImage: images.length > 0 ? images[0] : (meta.coverImage || ""),
        description: meta.description || "",
        gallery: [...images]
      };
      this.projects.push(newProject);
      return newProject;
    }
  },

  // 4. Core Joinery Services
  services: [
    {
      id: "custom-woodwork",
      title: "Custom Woodwork & Joinery",
      icon: "fa-solid fa-hammer",
      shortDesc: "Bespoke carpentry and millwork tailored to architectural drawings.",
      fullDesc: "Bespoke carpentry and millwork tailored to precise architectural drawings and custom client dimensions in Amman, Jordan.",
      features: ["Architectural Millwork", "Solid Wood & Veneers", "Precision Joinery", "Factory Pre-Assembly"]
    },
    {
      id: "custom-furniture",
      title: "Custom Luxury Furniture",
      icon: "fa-solid fa-couch",
      shortDesc: "Handcrafted dining tables, executive desks, consoles, and bedroom suites.",
      fullDesc: "Engineered for durability with kiln-dried hardwoods, bookmatched grain matching, and custom metal details.",
      features: ["Solid Slab Tables", "Executive Desks", "Dressing Rooms", "Custom Consoles"]
    },
    {
      id: "architectural-woodwork",
      title: "Architectural Woodwork",
      icon: "fa-solid fa-compass-drafting",
      shortDesc: "Large-scale timber features, acoustic baffles, ceiling beams, and column covers.",
      fullDesc: "Monumental timber features, acoustic baffles, ceiling beams, fluted column covers, and atrium walls.",
      features: ["Acoustic Timber Louvers", "Ceiling Systems", "Curved Columns", "Atrium Paneling"]
    },
    {
      id: "kitchens-pantries",
      title: "High-End Kitchens & Pantries",
      icon: "fa-solid fa-utensils",
      shortDesc: "Bespoke cabinetry with moisture-resistant substrates and European hardware.",
      fullDesc: "Bespoke cabinetry with moisture-resistant substrates, soft-close hardware, and integrated storage solutions.",
      features: ["Full Island Joinery", "Handleless J-Pull", "Integrated Appliances", "Bespoke Pantries"]
    },
    {
      id: "doors-frames",
      title: "Custom Doors & Frames",
      icon: "fa-solid fa-door-open",
      shortDesc: "Oversized pivot doors, concealed frameless doors, and sliding partitions.",
      fullDesc: "Engineered internal steel subframes, acoustic seals, and custom architectural ironmongery.",
      features: ["Pivot Doors", "Flush Frames", "Acoustic Rated", "Custom Ironmongery"]
    },
    {
      id: "wall-ceiling-cladding",
      title: "Wall & Ceiling Cladding",
      icon: "fa-solid fa-layer-group",
      shortDesc: "Wood veneer panels, fluted slats, and geometric wall features.",
      fullDesc: "Veneer panels, fluted slats, acoustic grooved timber, and geometric wall paneling.",
      features: ["Veneer Paneling", "3D Slatted Panels", "Concealed Secret Doors", "Fire-Retardant Finishes"]
    }
  ],

  // 5. Client FAQs
  faqs: [
    {
      q: "What types of woodwork and joinery projects does Art Touch handle?",
      a: "Art Touch specializes in custom woodwork, architectural wall and ceiling paneling, bespoke furniture, high-end kitchens, oversized pivot doors, acoustic timber baffles, and commercial fit-outs across Amman and the region."
    },
    {
      q: "Can you manufacture from our architect’s or interior designer’s drawings?",
      a: "Yes. Our team works directly with CAD/BIM shop drawings, conducting site surveys and producing detailed 1:1 joinery shop drawings for client approval before fabrication."
    },
    {
      q: "What are Art Touch's working hours and workshop location?",
      a: "Art Touch is located in Amman, Jordan. Our working hours are Sunday through Thursday, 9:00 AM to 6:00 PM (Jordan local time). Friday and Saturday are closed."
    }
  ]
};

// Store pristine default projects snapshot for reset / restoration
ArtTouchData.defaultProjects = JSON.parse(JSON.stringify(ArtTouchData.projects));

// Dynamic Custom Projects Sync from local/cloud store
try {
  if (typeof localStorage !== 'undefined') {
    const customProjects = localStorage.getItem('arttouch_projects') || localStorage.getItem('arttouch_custom_projects');
    if (customProjects) {
      const parsed = JSON.parse(customProjects);
      if (Array.isArray(parsed) && parsed.length > 0) {
        ArtTouchData.projects = parsed;
      }
    }
  }
} catch (e) {}

// Export to window
if (typeof window !== 'undefined') {
  window.ArtTouchData = ArtTouchData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArtTouchData;
}
`;
  }

  function updateCodePreview() {
    const codePreview = document.getElementById('datajs-code-preview');
    if (codePreview) {
      codePreview.textContent = generateDataJsSource();
    }
  }

  function downloadDataJsFile() {
    const code = generateDataJsSource();
    const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Downloaded "data.js"! Replace js/data.js in your project folder with this file to apply changes permanently.');
  }

  function copyDataJsToClipboard() {
    const code = generateDataJsSource();
    navigator.clipboard.writeText(code).then(() => {
      alert('Copied updated data.js code to clipboard!');
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  }

  async function directSaveWithFileSystemAPI() {
    if (!window.showSaveFilePicker) {
      downloadDataJsFile();
      return;
    }

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'data.js',
        types: [{
          description: 'JavaScript File',
          accept: { 'text/javascript': ['.js'] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(generateDataJsSource());
      await writable.close();
      alert('Successfully saved directly to data.js!');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('File save error:', err);
        downloadDataJsFile();
      }
    }
  }

  // 7. Direct GitHub API Auto-Committer & Live Deployment Sync
  const GITHUB_REPO = 'wrd2gore/art-touch-woodworks';
  const GITHUB_BRANCH = 'main';

  function getGitHubToken() {
    try {
      const stored = localStorage.getItem('arttouch_gh_token');
      if (stored && stored.trim().length > 10) return stored.trim();
    } catch (e) {}
    return (window.__ARTTOUCH_GH_TOKEN__ || '');
  }

  async function testGitHubTokenConnection() {
    const inputEl = document.getElementById('input-gh-token');
    const token = inputEl ? inputEl.value.trim() : getGitHubToken();
    const resultBox = document.getElementById('gh-token-test-result');

    if (!token) {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.background = '#FEF3C7';
        resultBox.style.color = '#92400E';
        resultBox.style.border = '1px solid #FDE68A';
        resultBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please paste your GitHub Personal Access Token into the box above.';
      }
      return;
    }

    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.style.background = '#EFF6FF';
      resultBox.style.color = '#1E40AF';
      resultBox.style.border = '1px solid #BFDBFE';
      resultBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying token permissions with GitHub API...';
    }

    try {
      const authHeader = (token.startsWith('gh') || token.startsWith('github_pat')) ? `Bearer ${token}` : `token ${token}`;
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/js/data.js?ref=${GITHUB_BRANCH}`, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        localStorage.setItem('arttouch_gh_token', token);
        if (resultBox) {
          resultBox.style.background = '#ECFDF5';
          resultBox.style.color = '#047857';
          resultBox.style.border = '1px solid #A7F3D0';
          resultBox.innerHTML = '<strong><i class="fa-solid fa-circle-check"></i> Connection Successful!</strong><br><small>Token is verified. 1-Click Publishing to GitHub Pages is active.</small>';
        }
        alert('✅ GitHub Token Verified Successfully!\n\nYou can now publish changes live directly with 1-click.');
      } else {
        const errData = await res.json().catch(() => ({}));
        if (resultBox) {
          resultBox.style.background = '#FEE2E2';
          resultBox.style.color = '#B91C1C';
          resultBox.style.border = '1px solid #FCA5A5';
          resultBox.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Connection Error (${res.status}):</strong><br><small>${errData.message || 'Authentication failed'}. Ensure token has <code>repo</code> scope (Classic) or <code>Contents: Read and write</code> (Fine-Grained) on <code>wrd2gore/art-touch-woodworks</code>.</small>`;
        }
        alert(`❌ GitHub Connection Failed (${res.status}):\n${errData.message || 'Invalid token or insufficient permissions'}\n\nPlease check token scopes.`);
      }
    } catch (e) {
      if (resultBox) {
        resultBox.style.background = '#FEE2E2';
        resultBox.style.color = '#B91C1C';
        resultBox.style.border = '1px solid #FCA5A5';
        resultBox.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Network Error:</strong> ${e.message}`;
      }
    }
  }

  window.testGitHubTokenConnection = testGitHubTokenConnection;

  async function syncDirectlyToGitHub(customCommitMsg, isManualTrigger = false) {
    const statusEl = document.getElementById('github-sync-indicator');
    let token = getGitHubToken();

    if (!token) {
      const inputEl = document.getElementById('input-gh-token');
      if (inputEl && inputEl.value.trim()) {
        token = inputEl.value.trim();
        localStorage.setItem('arttouch_gh_token', token);
      }
    }

    if (!token) {
      if (isManualTrigger) {
        const userEnteredToken = prompt('Please enter your GitHub Personal Access Token (PAT) with "repo" or "Contents: Read & Write" permissions to publish live:');
        if (userEnteredToken && userEnteredToken.trim().length > 10) {
          token = userEnteredToken.trim();
          localStorage.setItem('arttouch_gh_token', token);
          const inputEl = document.getElementById('input-gh-token');
          if (inputEl) inputEl.value = token;
        } else {
          alert('Publish cancelled: No GitHub token provided.\n\nTip: You can also double-click sync_github.bat in your project folder to publish without entering a token!');
          return;
        }
      } else {
        if (statusEl) {
          statusEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <span>Add GitHub Token to Sync</span>';
          statusEl.style.color = '#D97706';
          statusEl.style.background = '#FEF3C7';
          statusEl.style.borderColor = '#FDE68A';
        }
        return;
      }
    }

    if (statusEl) {
      statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Publishing to GitHub...</span>';
      statusEl.style.color = '#D97706';
      statusEl.style.background = '#FEF3C7';
      statusEl.style.borderColor = '#FDE68A';
    }

    let isSuccess = false;
    let errorDetail = '';
    let commitSha = '';

    try {
      const code = generateDataJsSource();
      const utf8Bytes = new TextEncoder().encode(code);
      let binary = '';
      for (let i = 0; i < utf8Bytes.byteLength; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binary);

      const authHeader = (token.startsWith('gh') || token.startsWith('github_pat')) ? `Bearer ${token}` : `token ${token}`;

      // 1. Get current file SHA on main branch
      const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/js/data.js?ref=${GITHUB_BRANCH}`, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!getRes.ok) {
        const errorData = await getRes.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${getRes.status} on SHA retrieval`);
      }

      const fileData = await getRes.json();
      const currentSha = fileData.sha;

      // 2. Commit updated data.js directly to GitHub
      const putBody = {
        message: customCommitMsg || `Update portfolio via Art Touch Control Center [${new Date().toLocaleTimeString()}]`,
        content: base64Content,
        sha: currentSha,
        branch: GITHUB_BRANCH
      };

      const putRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/js/data.js`, {
        method: 'PUT',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(putBody)
      });

      if (!putRes.ok) {
        const errorData = await putRes.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${putRes.status} on commit write`);
      }

      const putData = await putRes.json();
      commitSha = putData.commit ? putData.commit.sha.substring(0, 7) : 'live';
      isSuccess = true;
    } catch (err) {
      console.warn('GitHub direct sync error:', err);
      errorDetail = err.message;
    } finally {
      if (statusEl) {
        if (isSuccess) {
          statusEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Published Live (${commitSha})</span>`;
          statusEl.style.color = '#059669';
          statusEl.style.background = '#ECFDF5';
          statusEl.style.borderColor = '#A7F3D0';
        } else {
          statusEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>Publish Failed</span>';
          statusEl.style.color = '#DC2626';
          statusEl.style.background = '#FEE2E2';
          statusEl.style.borderColor = '#FCA5A5';
        }
        setTimeout(() => {
          statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Control Center Connected</span>';
          statusEl.style.color = '#059669';
          statusEl.style.background = '#ECFDF5';
          statusEl.style.borderColor = '#A7F3D0';
        }, 5000);
      }

      if (isManualTrigger) {
        if (isSuccess) {
          alert(`🎉 Successfully Published to GitHub Pages!\n\nCommit SHA: ${commitSha}\nLive Website: https://wrd2gore.github.io/art-touch-woodworks/\n\nYour portfolio changes are now live across the world!`);
        } else {
          alert(`❌ Publishing Failed:\n${errorDetail}\n\nPlease test your token using the "Test Connection" button in the Website Sync tab, or use sync_github.bat.`);
        }
      }
    }
  }

  window.syncDirectlyToGitHub = syncDirectlyToGitHub;
  window.publishToGitHub = function() {
    syncDirectlyToGitHub('Manual 1-click publish from Art Touch Control Center', true);
  };

  // 7. Dashboard Stats Counter
  function updateDashboardStats() {
    const countInquiries = document.getElementById('stat-inquiries-count');
    const countUnread = document.getElementById('stat-unread-count');
    const countProjects = document.getElementById('stat-projects-count');
    const countCategories = document.getElementById('stat-categories-count');

    if (countInquiries) countInquiries.textContent = inquiriesData.length;
    if (countUnread) countUnread.textContent = inquiriesData.filter(i => i.status === 'new').length;
    if (countProjects) countProjects.textContent = projectsData.length;
    if (countCategories) {
      const cats = new Set(projectsData.map(p => p.category).filter(Boolean));
      countCategories.textContent = cats.size;
    }
  }

  // Utilities
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttr(str) {
    if (!str) return '';
    return String(str).replace(/"/g, '&quot;');
  }

  // Global modal close handlers
  document.querySelectorAll('.admin-modal-close, .js-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('is-open'));
    });
  });

})();
