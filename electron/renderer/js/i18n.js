/**
 * ============================================================================
 * ART TOUCH WOODWORKS — FULL-DOM BILINGUAL (ARABIC / ENGLISH) ENGINE
 * Instant two-way translation, complete text node replacement & RTL styling
 * ============================================================================
 */

const ArtTouchI18n = (function() {
  'use strict';

  const STORAGE_KEY = 'arttouch_language';

  // Master phrase map for English -> Arabic
  const phraseMap = [
    // Brand & Hero
    { en: 'Art Touch', ar: 'آرت تاتش' },
    { en: 'WOODWORKS & INTERIORS', ar: 'للأعمال الخشبية والديكور' },
    { en: 'Master Architectural Woodworking — Amman, Jordan', ar: 'ريادة الأعمال الخشبية المعمارية — عمّان، الأردن' },
    { en: 'Architectural Joinery & Custom Woodwork Excellence', ar: 'صناعة النجارة المعمارية والديكورات الخشبية المتقنة' },
    { en: 'Specialized woodcraft fabrication, executive commercial fit-outs, bank branches, luxury residential millwork, and diplomatic interiors across Jordan.', ar: 'متخصصون في تصنيع وتركيب الديكورات الخشبية المعمارية، فروع البنوك، المقرات التجارية، الفلل والقصور، والسفارات في المملكة الأردنية الهاشمية.' },
    { en: 'Explore Projects', ar: 'استعرض المشاريع' },
    { en: 'Get Instant Quote', ar: 'طلب تسعير فوري' },

    // Navigation
    { en: 'Home', ar: 'الرئيسية' },
    { en: 'Projects', ar: 'المشاريع' },
    { en: 'All Projects', ar: 'كافة المشاريع' },
    { en: 'All Projects Archive', ar: 'أرشيف كافة المشاريع' },
    { en: 'BANKS', ar: 'البنوك والمصارف' },
    { en: 'Commercial', ar: 'المشاريع التجارية' },
    { en: 'Commercial Fit-Outs', ar: 'المقرات والمشاريع التجارية' },
    { en: 'Residential', ar: 'المشاريع السكنية' },
    { en: 'Residential Joinery', ar: 'النجارة السكنية الفاخرة' },
    { en: 'EMBASSIES', ar: 'السفارات' },
    { en: 'EMBASSIES & Diplomatic', ar: 'السفارات والهيئات الدبلوماسية' },
    { en: 'Government Projects', ar: 'المشاريع الحكومية' },
    { en: 'Our Team', ar: 'فريق العمل' },
    { en: 'About Us', ar: 'من نحن' },
    { en: 'Services', ar: 'خدماتنا' },
    { en: 'Our Process', ar: 'مراحل التنفيذ' },
    { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    { en: 'Contact Us', ar: 'اتصل بنا' },
    { en: 'Request Quote', ar: 'طلب تسعير' },
    { en: 'Control Center', ar: 'لوحة التحكم' },

    // Contact & Leadership
    { en: 'Get In Touch', ar: 'تواصل معنا' },
    { en: 'Direct communication with our plant engineering and commercial management in Amman.', ar: 'تواصل مباشر مع الإدارة التجارية وإدارة المصنع في عمّان.' },
    { en: 'General Manager', ar: 'المدير العام' },
    { en: 'Mohammad Y. Shaheen', ar: 'محمد ي. شاهين' },
    { en: 'CEO — Plant Manager', ar: 'الرئيس التنفيذي — مدير المصنع' },
    { en: 'Mohammad S. Maghari', ar: 'محمد س. مغاري' },
    { en: 'Direct Telephone', ar: 'الهاتف المباشر' },
    { en: 'Business Hours (Jordan Time)', ar: 'أوقات العمل (بتوقيت الأردن)' },
    { en: 'Sunday – Thursday: 9:00 AM – 6:00 PM', ar: 'الأحد – الخميس: 9:00 صباحاً – 6:00 مساءً' },
    { en: 'Sunday - Thursday', ar: 'الأحد - الخميس' },
    { en: 'Friday & Saturday: Closed', ar: 'الجمعة والسبت: عطلة أسبوعية' },
    { en: 'Nadhmi Abdul Hadi St., Amman, Jordan', ar: 'شارع نظمي عبد الهادي، عمّان، الأردن' },
    { en: 'Amman, Jordan', ar: 'عمّان، الأردن' },
    { en: 'Amman - QAIA Airport', ar: 'عمّان - مطار الملكة علياء الدولي' },
    { en: 'View on Google Maps', ar: 'عرض الموقع على خرائط جوجل' },
    { en: 'Send Us a Message', ar: 'أرسل لنا استفسارك' },
    { en: 'Full Name', ar: 'الاسم الكامل' },
    { en: 'Email Address', ar: 'البريد الإلكتروني' },
    { en: 'Phone Number', ar: 'رقم الهاتف' },
    { en: 'Subject / Project Type', ar: 'الموضوع / نوع المشروع' },
    { en: 'Your Message / Scope Requirements', ar: 'تفاصيل الرسالة والمتطلبات' },
    { en: 'Send Message', ar: 'إرسال الرسالة' },

    // Project Details Metadata
    { en: 'Location:', ar: 'الموقع:' },
    { en: 'Location', ar: 'الموقع' },
    { en: 'Date Completed:', ar: 'تاريخ الإنجاز:' },
    { en: 'Date Completed', ar: 'تاريخ الإنجاز' },
    { en: 'Area:', ar: 'المساحة:' },
    { en: 'Area', ar: 'المساحة' },
    { en: 'View Project Details', ar: 'عرض تفاصيل المشروع' },
    { en: 'photos in gallery', ar: 'صور في المعرض' },
    { en: 'photo in gallery', ar: 'صورة في المعرض' },
    { en: 'All Categories', ar: 'كافة التصنيفات' },
    { en: 'Search projects...', ar: 'ابحث في المشاريع...' },

    // Admin Control Center
    { en: 'Customer Inquiries & Requests', ar: 'الطلبات والاستفسارات الواردة' },
    { en: 'View and manage contact form submissions and quote requests.', ar: 'متابعة وإدارة رسائل التواصل وطلبات التسعير الواردة.' },
    { en: 'Requests & Inquiries', ar: 'الطلبات والاستفسارات' },
    { en: 'Projects & Galleries', ar: 'المشاريع ومعارض الصور' },
    { en: 'Business Settings', ar: 'إعدادات الشركة' },
    { en: 'Website Sync & Export', ar: 'مزامنة وحفظ الموقع' },
    { en: 'Total Requests', ar: 'إجمالي الطلبات' },
    { en: 'Active Projects', ar: 'المشاريع النشطة' },
    { en: 'Categories', ar: 'الأقسام' },
    { en: 'Offline-First Engine', ar: 'نظام فوري بدون إنترنت' },
    { en: 'Submitted Client Requests', ar: 'طلبات العملاء المستلمة' },
    { en: 'Client Name', ar: 'اسم العميل' },
    { en: 'Type', ar: 'النوع' },
    { en: 'Contact Info', ar: 'معلومات التواصل' },
    { en: 'Subject / Scope', ar: 'الموضوع / النطاق' },
    { en: 'Submitted At', ar: 'تاريخ الإرسال' },
    { en: 'Status', ar: 'الحالة' },
    { en: 'Actions', ar: 'الإجراءات' },
    { en: 'Add New Project', ar: 'إضافة مشروع جديد' },
    { en: 'Export CSV', ar: 'تصدير CSV' },
    { en: 'Refresh', ar: 'تحديث' },
    { en: 'Open Live Website', ar: 'فتح الموقع المباشر' },
    { en: 'View Portfolio', ar: 'عرض المعرض' },
    { en: 'Direct Save (File Picker)', ar: 'حفظ مباشر (اختيار ملف)' },
    { en: 'Download data.js', ar: 'تحميل data.js' },
    { en: 'Copy Code', ar: 'نسخ الكود' },
    { en: 'Save Project & Gallery', ar: 'حفظ المشروع والمعرض' },
    { en: 'Edit & Gallery', ar: 'تعديل ومعرض الصور' },
    { en: 'Cancel', ar: 'إلغاء' },
    { en: 'Close', ar: 'إغلاق' },
    { en: 'Status: New', ar: 'الحالة: جديد' },
    { en: 'Status: In Progress', ar: 'الحالة: قيد المتابعة' },
    { en: 'Status: Resolved', ar: 'الحالة: مكتمل' },
    { en: 'All Rights Reserved.', ar: 'جميع الحقوق محفوظة.' },
    { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    { en: 'Terms & Conditions', ar: 'الشروط والأحكام' }
  ];

  function getCurrentLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  }

  function setLanguage(lang) {
    if (lang !== 'ar' && lang !== 'en') lang = 'en';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    if (lang === 'ar') {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }

    // Apply Full DOM Translation
    translateDOM(lang);
    updateSwitcherButtons(lang);
  }

  function toggleLanguage() {
    const current = getCurrentLanguage();
    const next = (current === 'en') ? 'ar' : 'en';
    setLanguage(next);
  }

  /**
   * Translates every visible text node and input placeholder in the DOM
   */
  function translateDOM(lang) {
    // 1. Inputs & Textareas placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      if (!el.hasAttribute('data-orig-ph')) {
        el.setAttribute('data-orig-ph', el.placeholder);
      }
      const original = el.getAttribute('data-orig-ph');
      if (lang === 'ar') {
        const match = phraseMap.find(p => p.en.toLowerCase() === original.toLowerCase().trim());
        if (match) el.placeholder = match.ar;
      } else {
        el.placeholder = original;
      }
    });

    // 2. Select option texts
    document.querySelectorAll('select option').forEach(opt => {
      if (!opt.hasAttribute('data-orig-text')) {
        opt.setAttribute('data-orig-text', opt.textContent.trim());
      }
      const original = opt.getAttribute('data-orig-text');
      if (lang === 'ar') {
        const match = phraseMap.find(p => p.en.toLowerCase() === original.toLowerCase());
        if (match) opt.textContent = match.ar;
      } else {
        opt.textContent = original;
      }
    });

    // 3. Recursive DOM Tree Walker for all text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'CODE' || tag === 'PRE') {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.classList.contains('lang-switch-btn') || parent.id === 'lang-switch-toggle') {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.nodeValue.trim();
          if (!text || text.length < 2) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent) continue;

      if (!parent.hasAttribute('data-orig-text')) {
        parent.setAttribute('data-orig-text', node.nodeValue);
      }

      const originalText = parent.getAttribute('data-orig-text');

      if (lang === 'ar') {
        let translatedText = originalText;
        phraseMap.forEach(item => {
          // Exact and boundary match
          const escaped = item.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const reg = new RegExp('\\b' + escaped + '\\b', 'gi');
          if (reg.test(translatedText)) {
            translatedText = translatedText.replace(reg, item.ar);
          } else if (translatedText.trim().toLowerCase() === item.en.toLowerCase()) {
            translatedText = item.ar;
          }
        });
        node.nodeValue = translatedText;
      } else {
        node.nodeValue = originalText;
      }
    }
  }

  function updateSwitcherButtons(lang) {
    const btns = document.querySelectorAll('.lang-switch-btn, #lang-switch-toggle');
    const label = (lang === 'en') ? 'العربية' : 'English';
    const icon = '<i class="fa-solid fa-globe"></i> ';

    btns.forEach(btn => {
      btn.innerHTML = `${icon}<span>${label}</span>`;
      btn.setAttribute('aria-label', `Switch to ${(lang === 'en') ? 'Arabic' : 'English'}`);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);
  });

  return {
    getCurrentLanguage: getCurrentLanguage,
    setLanguage: setLanguage,
    toggleLanguage: toggleLanguage
  };
})();

if (typeof window !== 'undefined') {
  window.ArtTouchI18n = ArtTouchI18n;
  window.toggleLanguage = ArtTouchI18n.toggleLanguage;
}
