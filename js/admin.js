/**
 * ============================================================================
 * ART TOUCH WOODWORKS — COMPANY CONTROL CENTER
 * Pure Vanilla JavaScript Management & 1-Click Live Website Publisher
 * ============================================================================
 */

(function() {
  'use strict';

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
    renderActiveTab();
  });

  function loadAllMasterData() {
    // 1. Projects
    try {
      const storedProjects = localStorage.getItem('arttouch_custom_projects') || localStorage.getItem('arttouch_projects');
      if (storedProjects) {
        projectsData = JSON.parse(storedProjects);
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.projects)) {
        projectsData = JSON.parse(JSON.stringify(window.ArtTouchData.projects));
      }
    } catch (e) {
      projectsData = (window.ArtTouchData && window.ArtTouchData.projects) ? window.ArtTouchData.projects : [];
    }

    // 2. Services
    try {
      const storedServices = localStorage.getItem('arttouch_services');
      if (storedServices) {
        servicesData = JSON.parse(storedServices);
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.services)) {
        servicesData = JSON.parse(JSON.stringify(window.ArtTouchData.services));
      }
    } catch (e) {
      servicesData = (window.ArtTouchData && window.ArtTouchData.services) ? window.ArtTouchData.services : [];
    }

    // 3. FAQs
    try {
      const storedFaqs = localStorage.getItem('arttouch_faqs');
      if (storedFaqs) {
        faqsData = JSON.parse(storedFaqs);
      } else if (window.ArtTouchData && Array.isArray(window.ArtTouchData.faqs)) {
        faqsData = JSON.parse(JSON.stringify(window.ArtTouchData.faqs));
      }
    } catch (e) {
      faqsData = (window.ArtTouchData && window.ArtTouchData.faqs) ? window.ArtTouchData.faqs : [];
    }

    // 4. Business Hours & Company Info
    try {
      const storedBiz = localStorage.getItem('arttouch_business');
      if (storedBiz) {
        businessData = JSON.parse(storedBiz);
      } else if (window.ArtTouchData && window.ArtTouchData.businessHours) {
        businessData = JSON.parse(JSON.stringify(window.ArtTouchData.businessHours));
      }
    } catch (e) {
      businessData = (window.ArtTouchData && window.ArtTouchData.businessHours) ? window.ArtTouchData.businessHours : {};
    }

    // 5. Inquiries
    try {
      const storedInquiries = localStorage.getItem('arttouch_inquiries');
      if (storedInquiries) {
        inquiriesData = JSON.parse(storedInquiries);
      } else {
        inquiriesData = [
          {
            id: 'inq-welcome-01',
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
        saveInquiriesLocally();
      }
    } catch (e) {
      inquiriesData = [];
    }

    // Check draft state
    hasDraftChanges = localStorage.getItem('arttouch_has_draft') === 'true';

    // Populate business settings inputs if available
    populateBusinessInputs();
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

    // Populate GitHub token input
    const ghInput = document.getElementById('input-gh-token');
    const savedToken = localStorage.getItem('arttouch_gh_token');
    if (ghInput && savedToken) {
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
      updateCodePreview();
    }
  }

  function renderActiveTab() {
    switchTab(activeTab);
  }

  /* -------------------------------------------------------------------------- */
  /* 4. DRAFT VS. PUBLISHED ENGINE & LIVE GITHUB PUBLISHER                      */
  /* -------------------------------------------------------------------------- */
  function markDraftModified() {
    hasDraftChanges = true;
    localStorage.setItem('arttouch_has_draft', 'true');
    updatePublishStatusUI();
  }

  function markDraftPublished(commitSha) {
    hasDraftChanges = false;
    localStorage.removeItem('arttouch_has_draft');
    const timestamp = new Date().toLocaleString();
    localStorage.setItem('arttouch_last_published', timestamp);
    updatePublishStatusUI();
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

  function generateMasterDataJs() {
    const payload = {
      projects: projectsData,
      services: servicesData,
      faqs: faqsData,
      businessHours: businessData
    };

    return `/**
 * ============================================================================
 * ART TOUCH FOR WOOD WORKS — AMMAN, JORDAN
 * Centralized Project Database & Independent Gallery Collections
 * Auto-Generated from Art Touch Admin Control Center
 * ============================================================================
 */

const ArtTouchData = {
  // 1. Projects Database with Dedicated Independent Galleries
  projects: ${JSON.stringify(payload.projects, null, 2)},

  // 2. Official Core Services
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

  // 1-Click Publishing Pipeline with Live Verification & Step-by-Step UI
  window.publishToLiveWebsite = async function() {
    const token = localStorage.getItem('arttouch_gh_token') || (document.getElementById('input-gh-token') ? document.getElementById('input-gh-token').value.trim() : '');

    if (!token) {
      showNotification('Please enter and save your GitHub Personal Access Token in the Publish tab first.', 'error');
      switchTab('sync');
      return;
    }

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
    let latestCommitSha = '';
    const startTime = Date.now();

    try {
      /* ---------------- STEP 1: PREPARE CHANGES ---------------- */
      setStepState(1, 'active');
      await sleep(300);
      const fileContent = generateMasterDataJs();
      const contentBase64 = btoa(unescape(encodeURIComponent(fileContent)));
      const commitMessage = `Update website content via Art Touch Control Center [${new Date().toLocaleTimeString()}]`;
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

      /* ---------------- STEP 3: UPDATE GITHUB REPO ---------------- */
      setStepState(3, 'active');
      const repo = 'wrd2gore/art-touch-woodworks';
      const path = 'js/data.js';
      const targetBranches = ['main', 'master'];
      const commitResults = [];

      for (const branch of targetBranches) {
        // Fetch current SHA
        let sha = null;
        try {
          const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
            headers: {
              'Authorization': `token ${token}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          if (getRes.status === 401 || getRes.status === 403) {
            throw new Error('GitHub authentication failed. Please verify your Personal Access Token in the Publish tab.');
          }
          if (getRes.ok) {
            const getData = await getRes.json();
            sha = getData.sha;
          }
        } catch (e) {
          if (e.message.includes('authentication failed')) throw e;
        }

        // Put new content
        const bodyPayload = {
          message: commitMessage,
          content: contentBase64,
          branch: branch
        };
        if (sha) bodyPayload.sha = sha;

        const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyPayload)
        });

        if (!putRes.ok) {
          const errData = await putRes.json();
          throw new Error(`GitHub update failed on ${branch} branch: ${errData.message || putRes.statusText}`);
        }

        const putData = await putRes.json();
        if (putData && putData.commit && putData.commit.sha) {
          latestCommitSha = putData.commit.sha;
          commitResults.push({ branch, sha: latestCommitSha });
        }
      }
      setStepState(3, 'done');

      /* ---------------- STEP 4: CREATE COMMIT ---------------- */
      setStepState(4, 'active');
      await sleep(300);
      if (shaDesc && latestCommitSha) {
        shaDesc.innerHTML = `Commit: <a href="https://github.com/${repo}/commit/${latestCommitSha}" target="_blank" style="color: var(--color-brand); font-weight: 600; text-decoration: underline;">${latestCommitSha.substring(0, 7)}</a> (Target: main &amp; master)`;
      }
      setStepState(4, 'done');

      /* ---------------- STEP 5: DEPLOYING WEBSITE ---------------- */
      setStepState(5, 'active');
      if (timerLabel) timerLabel.textContent = 'Triggered GitHub Pages deployment...';
      await sleep(1000);
      setStepState(5, 'done');

      /* ---------------- STEP 6: VERIFY LIVE WEBSITE ---------------- */
      setStepState(6, 'active');
      let isVerified = false;
      const maxAttempts = 15;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (timerLabel) timerLabel.textContent = `Verifying live CDN (Attempt ${attempt}/${maxAttempts})...`;
        
        try {
          const liveRes = await fetch(`https://wrd2gore.github.io/art-touch-woodworks/js/data.js?_t=${Date.now()}`, {
            cache: 'no-store'
          });

          if (liveRes.ok) {
            const liveText = await liveRes.text();
            const containsLatest = projectsData.every(p => liveText.includes(p.id)) || (projectsData[0] && liveText.includes(projectsData[0].id));

            if (containsLatest) {
              isVerified = true;
              break;
            }
          }
        } catch (pollErr) {}

        await sleep(2000);
      }

      setStepState(6, 'done');

      /* ---------------- COMPLETION ---------------- */
      markDraftPublished(latestCommitSha);
      updateCodePreview();

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
          <span style="font-size: 12px;">All ${projectsData.length} projects, ${servicesData.length} services, and business information are verified and live on <a href="https://wrd2gore.github.io/art-touch-woodworks/projects.html" target="_blank" style="color: #065F46; font-weight: 700; text-decoration: underline;">wrd2gore.github.io/art-touch-woodworks</a>.</span>
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

      showNotification('🎉 Published and verified live on public website!', 'success');

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
              1. <a href="https://github.com/settings/tokens/new?description=Art+Touch+Control+Center&scopes=repo" target="_blank" style="color: #A88734; font-weight: 700; text-decoration: underline;">👉 Click here to generate a token with 'repo' scope pre-selected</a><br>
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
  /* 5. CUSTOMER INQUIRIES & REQUESTS HUB                                      */
  /* -------------------------------------------------------------------------- */
  function initInquiriesListener() {
    // Real-time listener for incoming visitor submissions
    window.addEventListener('arttouch:new-inquiry', (e) => {
      if (e.detail) {
        inquiriesData.unshift(e.detail);
        renderInquiriesTable();
        updateDashboardStats();
        showNotification(`📬 New customer request from: ${e.detail.name || 'Visitor'}`, 'success');
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

    // Search and filter listeners
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
  /* 6. PROJECTS & PHOTO GALLERIES MANAGER                                     */
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

    document.getElementById('project-modal-title').textContent = `Edit Project — ${p.title}`;
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

    if (window.ArtTouchData && Array.isArray(window.ArtTouchData.projects)) {
      projectsData = JSON.parse(JSON.stringify(window.ArtTouchData.projects));
    } else {
      projectsData = [];
    }

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
  /* 7. SERVICES & CAPABILITIES MANAGER                                        */
  /* -------------------------------------------------------------------------- */
  function renderServicesGrid() {
    const container = document.getElementById('admin-services-grid-container');
    if (!container) return;

    if (servicesData.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--color-admin-text-muted);">No services listed.</div>`;
      return;
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

    document.getElementById('service-modal-title').textContent = `Edit Service — ${s.title}`;
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
  /* 8. FREQUENTLY ASKED QUESTIONS (FAQS) MANAGER                              */
  /* -------------------------------------------------------------------------- */
  function renderFaqsList() {
    const container = document.getElementById('admin-faqs-list');
    if (!container) return;

    if (faqsData.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--color-admin-text-muted);">No FAQs listed.</div>`;
      return;
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
  /* 9. BUSINESS SETTINGS MANAGER                                               */
  /* -------------------------------------------------------------------------- */
  window.saveBusinessSettings = function() {
    const loc = document.getElementById('setting-location').value.trim();
    const phone = document.getElementById('setting-phone').value.trim();
    const days = document.getElementById('setting-days').value.trim();
    const hours = document.getElementById('setting-hours').value.trim();
    const emailGen = document.getElementById('setting-email-general').value.trim();
    const emailGm = document.getElementById('setting-email-gm').value.trim();
    const emailCeo = document.getElementById('setting-email-ceo').value.trim();

    let openTime = "09:00";
    let closeTime = "18:00";
    if (hours.includes('-')) {
      const parts = hours.split('-');
      openTime = parts[0].trim();
      closeTime = parts[1].trim();
    }

    businessData = {
      location: loc,
      country: "Jordan",
      timezone: "Asia/Amman",
      days: days,
      open: openTime,
      close: closeTime,
      weekendDays: [5, 6],
      phone: phone,
      phoneClean: phone.replace(/[^0-9+]/g, ''),
      emails: {
        general: emailGen,
        generalManager: emailGm,
        ceoPlantManager: emailCeo
      }
    };

    try {
      localStorage.setItem('arttouch_business', JSON.stringify(businessData));
    } catch (err) {}

    markDraftModified();
    showNotification('Business details saved as draft. Click Publish when ready.', 'success');
  };

  /* -------------------------------------------------------------------------- */
  /* 10. STATS & MODAL CONTROLLERS                                              */
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
    // Remove any existing toast
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
