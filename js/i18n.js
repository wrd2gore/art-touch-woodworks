/**
 * ============================================================================
 * ART TOUCH WOODWORKS — BILINGUAL (ARABIC / ENGLISH) i18n ENGINE
 * Seamless translation, RTL layout, and authentic Jordanian terminology
 * ============================================================================
 */

const ArtTouchI18n = (function() {
  'use strict';

  const STORAGE_KEY = 'arttouch_language';

  // Comprehensive Dictionary
  const translations = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.projects': 'Projects',
      'nav.all_projects': 'All Projects Archive',
      'nav.banks': 'BANKS',
      'nav.commercial': 'Commercial Fit-Outs',
      'nav.residential': 'Residential Joinery',
      'nav.embassies': 'EMBASSIES & Diplomatic',
      'nav.gov': 'Government Projects',
      'nav.about': 'About Us',
      'nav.services': 'Services',
      'nav.process': 'Our Process',
      'nav.team': 'Our Team',
      'nav.faq': 'FAQ',
      'nav.quote': 'Request Quote',
      'nav.contact': 'Contact Us',
      'nav.admin': 'Admin App',
      'nav.switch_lang': 'العربية',

      // Hero
      'hero.badge': 'Master Architectural Woodworking — Amman, Jordan',
      'hero.title': 'Architectural Joinery & Custom Woodwork Excellence',
      'hero.desc': 'Specialized woodcraft fabrication, executive commercial fit-outs, bank branches, luxury residential millwork, and diplomatic interiors across Jordan.',
      'hero.btn_explore': 'Explore Projects',
      'hero.btn_quote': 'Get Instant Quote',

      // Contact Details
      'contact.title': 'Get In Touch',
      'contact.subtitle': 'Direct communication with our plant engineering and commercial management in Amman.',
      'contact.phone_label': 'Direct Telephone',
      'contact.gm_label': 'General Manager',
      'contact.gm_name': 'Mohammad Y. Shaheen',
      'contact.ceo_label': 'CEO — Plant Manager',
      'contact.ceo_name': 'Mohammad S. Maghari',
      'contact.hours_label': 'Business Hours (Jordan Time)',
      'contact.hours_val': 'Sunday – Thursday: 9:00 AM – 6:00 PM',
      'contact.weekend_val': 'Friday & Saturday: Closed',
      'contact.address': 'Nadhmi Abdul Hadi St., Amman, Jordan',
      'contact.btn_map': 'View on Google Maps',
      'contact.form_title': 'Send Us a Message',
      'contact.form_name': 'Full Name',
      'contact.form_email': 'Email Address',
      'contact.form_phone': 'Phone Number',
      'contact.form_subject': 'Subject / Project Type',
      'contact.form_message': 'Your Message / Scope Requirements',
      'contact.form_send': 'Send Message',

      // Categories
      'cat.banks': 'BANKS',
      'cat.commercial': 'Commercial',
      'cat.residential': 'Residential',
      'cat.embassies': 'EMBASSIES',
      'cat.gov': 'Government Projects',

      // Admin Center
      'admin.title': 'Art Touch Control Center',
      'admin.tab_inquiries': 'Requests & Inquiries',
      'admin.tab_projects': 'Projects & Galleries',
      'admin.tab_settings': 'Business Settings',
      'admin.tab_sync': 'Website Sync & Export',
      'admin.stat_requests': 'Total Requests',
      'admin.stat_projects': 'Active Projects',
      'admin.stat_categories': 'Categories',
      'admin.btn_add_project': 'Add New Project',
      'admin.btn_export_csv': 'Export CSV',
      'admin.btn_save_data': 'Save to data.js',
      'admin.modal_save': 'Save Project & Gallery',
      'admin.modal_cancel': 'Cancel'
    },
    ar: {
      // Navigation
      'nav.home': 'الرئيسية',
      'nav.projects': 'المشاريع',
      'nav.all_projects': 'أرشيف كافة المشاريع',
      'nav.banks': 'البنوك والمصارف',
      'nav.commercial': 'المشاريع التجارية',
      'nav.residential': 'الأعمال السكنية الفاخرة',
      'nav.embassies': 'السفارات والهيئات الدبلوماسية',
      'nav.gov': 'المشاريع الحكومية',
      'nav.about': 'من نحن',
      'nav.services': 'خدماتنا',
      'nav.process': 'مراحل العمل والتنفيذ',
      'nav.team': 'فريق العمل والقيادة',
      'nav.faq': 'الأسئلة الشائعة',
      'nav.quote': 'طلب تسعير',
      'nav.contact': 'اتصل بنا',
      'nav.admin': 'لوحة التحكم',
      'nav.switch_lang': 'English',

      // Hero
      'hero.badge': 'ريادة الأعمال الخشبية المعمارية الفاخرة — عمّان، الأردن',
      'hero.title': 'صناعة النجارة المعمارية والديكورات الخشبية المتقنة',
      'hero.desc': 'متخصصون في تصنيع وتركيب الديكورات الخشبية المعمارية، فروع البنوك، المقرات التجارية، الفلل والقصور، والسفارات في المملكة الأردنية الهاشمية.',
      'hero.btn_explore': 'استعرض المشاريع',
      'hero.btn_quote': 'طلب تسعير فوري',

      // Contact Details
      'contact.title': 'تواصل معنا',
      'contact.subtitle': 'تواصل مباشر مع الإدارة التجارية وإدارة المصنع في عمّان.',
      'contact.phone_label': 'الهاتف المباشر',
      'contact.gm_label': 'المدير العام',
      'contact.gm_name': 'محمد ي. شاهين',
      'contact.ceo_label': 'الرئيس التنفيذي — مدير المصنع',
      'contact.ceo_name': 'محمد س. مغاري',
      'contact.hours_label': 'أوقات العمل (بتوقيت الأردن)',
      'contact.hours_val': 'الأحد – الخميس: 9:00 صباحاً – 6:00 مساءً',
      'contact.weekend_val': 'الجمعة والسبت: عطلة أسبوعية',
      'contact.address': 'شارع نظمي عبد الهادي، عمّان، الأردن',
      'contact.btn_map': 'عرض الموقع على خرائط جوجل',
      'contact.form_title': 'أرسل لنا استفسارك',
      'contact.form_name': 'الاسم الكامل',
      'contact.form_email': 'البريد الإلكتروني',
      'contact.form_phone': 'رقم الهاتف',
      'contact.form_subject': 'الموضوع / نوع المشروع',
      'contact.form_message': 'تفاصيل الرسالة والمتطلبات',
      'contact.form_send': 'إرسال الرسالة',

      // Categories
      'cat.banks': 'البنوك والمصارف',
      'cat.commercial': 'المشاريع التجارية',
      'cat.residential': 'المشاريع السكنية',
      'cat.embassies': 'السفارات',
      'cat.gov': 'المشاريع الحكومية',

      // Admin Center
      'admin.title': 'لوحة تحكم آرت تاتش',
      'admin.tab_inquiries': 'الطلبات والاستفسارات الواردة',
      'admin.tab_projects': 'المشاريع ومعارض الصور المستقلة',
      'admin.tab_settings': 'إعدادات الشركة وأوقات العمل',
      'admin.tab_sync': 'مزامنة وحفظ الموقع',
      'admin.stat_requests': 'إجمالي الطلبات',
      'admin.stat_projects': 'المشاريع النشطة',
      'admin.stat_categories': 'الأقسام والتصنيفات',
      'admin.btn_add_project': 'إضافة مشروع جديد',
      'admin.btn_export_csv': 'تصدير ملف CSV',
      'admin.btn_save_data': 'حفظ في data.js',
      'admin.modal_save': 'حفظ المشروع والمعرض',
      'admin.modal_cancel': 'إلغاء'
    }
  };

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

    applyTranslations(lang);
    updateSwitcherButtons(lang);
  }

  function toggleLanguage() {
    const current = getCurrentLanguage();
    const next = (current === 'en') ? 'ar' : 'en';
    setLanguage(next);
  }

  function t(key, defaultText) {
    const lang = getCurrentLanguage();
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return defaultText || key;
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.placeholder) el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
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
    toggleLanguage: toggleLanguage,
    t: t
  };
})();

if (typeof window !== 'undefined') {
  window.ArtTouchI18n = ArtTouchI18n;
  window.toggleLanguage = ArtTouchI18n.toggleLanguage;
}
