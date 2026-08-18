/**
 * ART TOUCH WOODWORKS & ARCHITECTURAL JOINERY
 * Central Site Configuration & Business Management Settings
 * 
 * Centralized settings for Location (Amman, Jordan), Business Hours (Sun-Thu 9:00 AM - 6:00 PM),
 * Official Social Channels, Google Maps, Leadership, and Verified Contact Info.
 */

const ArtTouchConfig = {
  companyName: "Art Touch for Wood Works",
  shortName: "Art Touch",
  tagline: "Crafting Wood Into Spaces That Feel Exceptional",
  
  // Location & Physical Address
  location: "Amman, Jordan",
  streetAddress: "Nadhmi Abdul Hadi St.",
  fullAddress: "Nadhmi Abdul Hadi St., Amman, Jordan",
  plantAddress: "Amman, Jordan",
  cityCountry: "Amman, Jordan",
  
  // Centralized Business Hours Configuration
  businessHours: {
    location: "Amman, Jordan",
    days: "Sunday - Thursday",
    displayDays: "Sunday – Thursday",
    displayHours: "9:00 AM – 6:00 PM (Jordan Local Time)",
    summary: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    weekend: "Friday & Saturday: Closed",
    open: "09:00",
    close: "18:00",
    openHour: 9,
    closeHour: 18,
    timeZone: "Asia/Amman",
    workingDays: [0, 1, 2, 3, 4], // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday
    closedDays: [5, 6] // 5 = Friday, 6 = Saturday (Closed)
  },

  // Verified Contact Channels from Official Site
  phone: "+962 (6) 222 3 707",
  phoneRaw: "+96262223707",
  email: "info@arttouchjo.com",
  emails: {
    generalManager: "m.shaheen@arttouchjo.com",
    ceoPlantManager: "m.maghari@arttouchjo.com",
    info: "info@arttouchjo.com"
  },
  
  // Official Social & Location Links (Centralized)
  socials: {
    instagram: "https://www.instagram.com/arttouchjo/",
    linkedin: "https://jo.linkedin.com/jobs/view/designer-at-art-touch-for-wood-works-3946056332",
    googleMaps: "https://www.google.com/maps/place/Art+touch+for+wood+works/@31.89789,35.9684667,17z/data=!3m1!4b1!4m6!3m5!1s0x151b5ecfb5920e9f:0xd71e64a8826292ac!8m2!3d31.8978855!4d35.9710416!16s%2Fg%2F11f2wdpxt7?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D"
  },

  // Official Branding Asset Paths
  logo: "images/logo/art-touch-logo.png",
  logoWhite: "images/logo/art-touch-logo.png",
  favicon: "images/logo/art-touch-logo.png",

  // Key Leadership
  leadership: {
    generalManager: "Mohammad Y. Shaheen",
    generalManagerEmail: "m.shaheen@arttouchjo.com",
    ceoPlantManager: "Mohammad S. Maghari",
    ceoPlantManagerEmail: "m.maghari@arttouchjo.com"
  },

  // Helper method: Calculates live Open/Closed status strictly in Jordan (Amman) timezone
  getOpenStatus: function() {
    try {
      const jordanNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Amman" }));
      const day = jordanNow.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
      const hour = jordanNow.getHours();
      const minute = jordanNow.getMinutes();
      const currentDecimal = hour + (minute / 60);

      const isWorkingDay = this.businessHours.workingDays.includes(day);
      const isOpenHour = currentDecimal >= this.businessHours.openHour && currentDecimal < this.businessHours.closeHour;

      if (isWorkingDay && isOpenHour) {
        return {
          isOpen: true,
          statusText: "Open Now",
          cssClass: "status-open",
          details: `Open today until 6:00 PM (Amman Time)`
        };
      } else {
        const nextOpenMsg = day === 4 && currentDecimal >= 18 ? "Opens Sunday at 9:00 AM" :
                            day === 5 ? "Closed today (Friday) • Opens Sunday at 9:00 AM" :
                            day === 6 ? "Closed today (Saturday) • Opens Sunday at 9:00 AM" :
                            currentDecimal < 9 ? "Opens today at 9:00 AM (Amman Time)" :
                            "Closed for today • Opens tomorrow at 9:00 AM";
        return {
          isOpen: false,
          statusText: "Closed",
          cssClass: "status-closed",
          details: nextOpenMsg
        };
      }
    } catch (e) {
      return {
        isOpen: true,
        statusText: "Open Sun–Thu",
        cssClass: "status-open",
        details: "9:00 AM – 6:00 PM (Jordan Time)"
      };
    }
  }
};

// Export to window for vanilla JS access across all pages
if (typeof window !== 'undefined') {
  window.ArtTouchConfig = ArtTouchConfig;
}
