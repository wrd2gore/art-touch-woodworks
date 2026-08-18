/**
 * ART TOUCH WOODWORKS & ARCHITECTURAL JOINERY
 * 5-Step Interactive Quote Wizard & Estimator Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteWizard();
});

function initQuoteWizard() {
  const wizardForm = document.querySelector('#quote-wizard-form');
  if (!wizardForm) return;

  let currentStep = 1;
  const totalSteps = 5;

  const stepTabs = document.querySelectorAll('.wizard-step-tab');
  const stepContents = document.querySelectorAll('.wizard-step-content');
  const prevBtn = document.querySelector('#wizard-prev-btn');
  const nextBtn = document.querySelector('#wizard-next-btn');
  const submitBtn = document.querySelector('#wizard-submit-btn');

  // Form State Data
  const formData = {
    fullName: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    location: '',
    projectType: 'Architectural Woodwork',
    dimensions: '',
    budget: '$25,000 - $50,000',
    timeline: 'Within 3 Months',
    description: '',
    files: []
  };

  // Pre-fill from URL params if present (e.g., from project-details.html)
  const urlParams = new URLSearchParams(window.location.search);
  const prefilledProject = urlParams.get('project');
  if (prefilledProject) {
    const descField = document.querySelector('#quote-description');
    if (descField) {
      descField.value = `Interested in custom woodwork similar to: ${decodeURIComponent(prefilledProject)}`;
      formData.description = descField.value;
    }
  }

  // Handle Project Type Selection Cards
  const typeCards = document.querySelectorAll('.selectable-card[data-type]');
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      formData.projectType = card.getAttribute('data-type');
    });
  });

  // Handle File Upload Simulation
  const fileDropZone = document.querySelector('#file-drop-zone');
  const fileInput = document.querySelector('#quote-file-input');
  const filesList = document.querySelector('#uploaded-files-list');

  if (fileDropZone && fileInput) {
    fileDropZone.addEventListener('click', () => fileInput.click());

    fileDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileDropZone.classList.add('dragover');
    });

    fileDropZone.addEventListener('dragleave', () => {
      fileDropZone.classList.remove('dragover');
    });

    fileDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      fileDropZone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.files.push({ name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
    }
    renderUploadedFiles();
  }

  function renderUploadedFiles() {
    if (!filesList) return;
    if (formData.files.length === 0) {
      filesList.innerHTML = '<p class="text-muted" style="font-size: var(--text-xs); margin-top: 8px;">No files selected yet.</p>';
      return;
    }

    filesList.innerHTML = formData.files.map((f, idx) => `
      <div class="uploaded-file-item">
        <span><i class="fa-solid fa-file-pdf text-brand" style="margin-right: 8px;"></i> ${f.name} <small class="text-muted">(${f.size})</small></span>
        <button type="button" class="btn-sm" style="color: var(--color-error); padding: 2px 6px;" data-remove="${idx}">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');

    filesList.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-remove'), 10);
        formData.files.splice(index, 1);
        renderUploadedFiles();
      });
    });
  }

  // Step Validation
  function validateCurrentStep() {
    if (currentStep === 1) {
      const name = document.querySelector('#quote-name');
      const email = document.querySelector('#quote-email');
      const phone = document.querySelector('#quote-phone');
      const location = document.querySelector('#quote-location');

      if (!name || !name.value.trim()) {
        if (window.showToast) window.showToast('Please enter your full name.', 'error');
        if (name) name.focus();
        return false;
      }
      if (!email || !email.value.trim() || !email.value.includes('@')) {
        if (window.showToast) window.showToast('Please enter a valid email address.', 'error');
        if (email) email.focus();
        return false;
      }
      if (!phone || !phone.value.trim()) {
        if (window.showToast) window.showToast('Please enter your phone number.', 'error');
        if (phone) phone.focus();
        return false;
      }

      formData.fullName = name.value.trim();
      formData.email = email.value.trim();
      formData.phone = phone.value.trim();
      formData.company = document.querySelector('#quote-company')?.value.trim() || '';
      formData.whatsapp = document.querySelector('#quote-whatsapp')?.value.trim() || formData.phone;
      formData.location = location?.value.trim() || 'Amman, Jordan';
      return true;
    }

    if (currentStep === 2) {
      // Step 2 is project type, selected by card
      return true;
    }

    if (currentStep === 3) {
      const desc = document.querySelector('#quote-description');
      const dim = document.querySelector('#quote-dimensions');
      const budget = document.querySelector('#quote-budget');
      const timeline = document.querySelector('#quote-timeline');

      formData.description = desc?.value.trim() || '';
      formData.dimensions = dim?.value.trim() || 'Standard / Per drawings';
      formData.budget = budget?.value || '$25,000 - $50,000';
      formData.timeline = timeline?.value || 'Within 3 Months';
      return true;
    }

    if (currentStep === 4) {
      // File upload is optional
      return true;
    }

    return true;
  }

  // Update Review Summary on Step 5
  function updateReviewSummary() {
    const summaryBox = document.querySelector('#quote-review-summary');
    if (!summaryBox) return;

    summaryBox.innerHTML = `
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Client Name</span>
        <span class="wizard-summary-val">${formData.fullName}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Email & Phone</span>
        <span class="wizard-summary-val">${formData.email} | ${formData.phone}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Project Location</span>
        <span class="wizard-summary-val">${formData.location}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Project Category</span>
        <span class="wizard-summary-val text-brand">${formData.projectType}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Approx. Dimensions / Scale</span>
        <span class="wizard-summary-val">${formData.dimensions || 'N/A'}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Estimated Budget</span>
        <span class="wizard-summary-val">${formData.budget}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Target Completion</span>
        <span class="wizard-summary-val">${formData.timeline}</span>
      </div>
      <div class="wizard-summary-row">
        <span class="wizard-summary-label">Attached Files</span>
        <span class="wizard-summary-val">${formData.files.length > 0 ? formData.files.map(f => f.name).join(', ') : 'None attached'}</span>
      </div>
      <div class="wizard-summary-row" style="flex-direction: column; gap: 4px;">
        <span class="wizard-summary-label">Scope Description:</span>
        <span class="wizard-summary-val" style="font-weight: 500; font-size: var(--text-xs); line-height: 1.5;">${formData.description || 'No additional notes provided.'}</span>
      </div>
    `;
  }

  // Step Switcher
  function goToStep(step) {
    currentStep = step;

    stepTabs.forEach((tab, idx) => {
      const tabStep = idx + 1;
      tab.classList.remove('active', 'completed');
      if (tabStep === currentStep) tab.classList.add('active');
      if (tabStep < currentStep) tab.classList.add('completed');
    });

    stepContents.forEach((content, idx) => {
      content.classList.toggle('active', idx + 1 === currentStep);
    });

    // Control Buttons
    if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    if (nextBtn) nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';

    if (currentStep === totalSteps) {
      updateReviewSummary();
    }

    // Smooth scroll to wizard top
    const wizardEl = document.querySelector('.quote-wizard-container');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        if (currentStep < totalSteps) goToStep(currentStep + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  }

  // Form Submission
  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const referenceId = `AT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Save to inquiries storage
      const quoteRecord = {
        id: referenceId,
        type: 'quote',
        name: formData.fullName || 'Anonymous Client',
        email: formData.email || '',
        phone: formData.phone || '',
        subject: `Quote Request: ${formData.projectType || 'Woodwork Commission'}`,
        message: formData.description || 'No additional notes.',
        metadata: {
          'Project Scope': formData.projectType,
          'Estimated Budget': formData.budget,
          'Timeline': formData.timeline,
          'Dimensions': formData.dimensions || 'Standard',
          'Attached Files': formData.files.length > 0 ? formData.files.map(f => f.name).join(', ') : 'None'
        },
        timestamp: new Date().toISOString(),
        status: 'new'
      };

      if (window.ArtTouchCloudSync) {
        window.ArtTouchCloudSync.sendInquiry(quoteRecord);
      } else {
        try {
          const stored = localStorage.getItem('arttouch_inquiries');
          const list = stored ? JSON.parse(stored) : [];
          list.unshift(quoteRecord);
          localStorage.setItem('arttouch_inquiries', JSON.stringify(list));
        } catch (err) {}
      }
      
      // Render Success View
      const wizardBody = document.querySelector('.wizard-body');
      if (wizardBody) {
        wizardBody.innerHTML = `
          <div style="text-align: center; padding: var(--space-3xl) var(--space-lg);">
            <div style="width: 72px; height: 72px; border-radius: var(--radius-full); background-color: var(--color-success-bg); color: var(--color-success); display: inline-flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: var(--space-lg);">
              <i class="fa-solid fa-check"></i>
            </div>
            <span class="badge badge-brand" style="margin-bottom: var(--space-sm);">Reference: ${referenceId}</span>
            <h2 style="font-size: var(--text-3xl); margin-bottom: var(--space-sm);">Quote Request Received!</h2>
            <p style="font-size: var(--text-base); color: var(--color-text-body); max-width: 560px; margin: 0 auto var(--space-xl) auto;">
              Thank you, <strong>${formData.fullName}</strong>. Our engineering estimation department has received your request for <strong>${formData.projectType}</strong>. A comprehensive initial proposal and schedule will be provided within 24–48 business hours.
            </p>

            <div style="background-color: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-lg); max-width: 480px; margin: 0 auto var(--space-2xl) auto; text-align: left;">
              <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 4px;">Confirmation Sent To:</div>
              <div style="font-weight: 700; font-size: var(--text-sm); margin-bottom: 8px;">${formData.email}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 4px;">Assigned Estimation Officer:</div>
              <div style="font-weight: 700; font-size: var(--text-sm);">Eng. Mohammad S. Maghari (Plant Operations)</div>
            </div>

            <div style="display: flex; justify-content: center; gap: var(--space-md); flex-wrap: wrap;">
              <a href="index.html" class="btn btn-primary"><i class="fa-solid fa-house"></i> Return Home</a>
              <a href="tel:+96262223707" class="btn btn-secondary">
                <i class="fa-solid fa-phone text-brand"></i> Call +962 (6) 222 3 707
              </a>
            </div>
          </div>
        `;
      }

      if (window.showToast) {
        window.showToast(`Quote Request ${referenceId} submitted successfully!`, 'success');
      }
    });
  }

  // Initialize Step 1
  goToStep(1);
}
