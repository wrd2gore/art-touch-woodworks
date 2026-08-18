/**
 * ART TOUCH WOODWORKS & ARCHITECTURAL JOINERY
 * Interactive Contact Form Validator & Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.querySelector('#contact-inquiry-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#contact-name');
    const email = document.querySelector('#contact-email');
    const phone = document.querySelector('#contact-phone');
    const subject = document.querySelector('#contact-subject');
    const message = document.querySelector('#contact-message');

    if (!name || !name.value.trim()) {
      if (window.showToast) window.showToast('Please enter your full name.', 'error');
      if (name) name.focus();
      return;
    }

    if (!email || !email.value.trim() || !email.value.includes('@')) {
      if (window.showToast) window.showToast('Please provide a valid email address.', 'error');
      if (email) email.focus();
      return;
    }

    if (!message || !message.value.trim() || message.value.trim().length < 10) {
      if (window.showToast) window.showToast('Please enter a message with at least 10 characters.', 'error');
      if (message) message.focus();
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
    }

    // Create and save inquiry record
    const inquiryRecord = {
      id: 'inq-' + Date.now(),
      type: 'contact',
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone ? phone.value.trim() : '',
      subject: subject ? subject.value.trim() : 'Website Contact Form',
      message: message.value.trim(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    // Always persist to local inquiries storage
    try {
      const stored = localStorage.getItem('arttouch_inquiries');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(inquiryRecord);
      localStorage.setItem('arttouch_inquiries', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('arttouch:new-inquiry', { detail: inquiryRecord }));
    } catch (e) {}

    // Also dispatch to cloud sync if enabled
    if (window.ArtTouchCloudSync && typeof window.ArtTouchCloudSync.sendInquiry === 'function') {
      try {
        window.ArtTouchCloudSync.sendInquiry(inquiryRecord);
      } catch (e) {}
    }

    // Simulate reliable dispatch
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      contactForm.reset();

      if (window.showToast) {
        window.showToast('Thank you! Your message has been sent to Art Touch team.', 'success');
      }

      const formContainer = contactForm.parentElement;
      if (formContainer) {
        const successNotice = document.createElement('div');
        successNotice.className = 'animate-fade-up';
        successNotice.style.cssText = 'background-color: var(--color-success-bg); border: 1px solid var(--color-success); border-radius: var(--radius-md); padding: var(--space-lg); margin-top: var(--space-lg); color: var(--color-text-main);';
        successNotice.innerHTML = `
          <h4 style="color: var(--color-success); margin-bottom: 4px;"><i class="fa-solid fa-circle-check"></i> Inquiry Dispatched</h4>
          <p style="font-size: var(--text-sm); margin: 0;">Our client relations team led by <strong>Mohammad Y. Shaheen</strong> will respond within 24 hours.</p>
        `;
        formContainer.appendChild(successNotice);

        setTimeout(() => {
          successNotice.remove();
        }, 8000);
      }
    }, 900);
  });
}
