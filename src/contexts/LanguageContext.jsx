import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(undefined);

const translations = {
  en: {
    nav: {
      home: 'Home',
      events: 'Events',
      archive: 'Archive',
      artists: 'Artists',
      gallery: 'Gallery',
      awards: 'Awards',
      about: 'About',
      blog: 'Blog',
    },
    hero: {
      headline: "Celebrating India's Literary Heritage",
      subtitle: 'Poetry • Literature • Music • Theatre • Conversations',
      registerBtn: 'Register for Events',
      archiveBtn: 'Explore Archive',
    },
    sections: {
      featuredEvents: 'Featured Events',
      upcomingEvents: 'Upcoming Experiences',
      about: 'About Jashn-e-Adab',
      founder: 'Meet the Founder',
      legendaryGuests: 'Legendary Guests',
      testimonials: 'Words of Praise',
      sponsors: 'Our Partners & Supporters',
      newsletter: 'Stay Connected',
      quoteOfDay: 'Quote of the Day',
      viewAll: 'View All',
      register: 'Register',
      readMore: 'Read More',
    },
    newsletter: {
      title: 'Stay Connected',
      subtitle: 'Subscribe to receive updates on upcoming events, literary stories, and cultural insights.',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
    },
    footer: {
      quickLinks: 'Quick Links',
      eventLinks: 'Events',
      contact: 'Contact Us',
      followUs: 'Follow Us',
      copyright: '© 2026 Jashn-e-Adab. All rights reserved.',
      tagline: 'Preserving India\'s Literary Heritage',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      events: 'कार्यक्रम',
      archive: 'संग्रह',
      artists: 'कलाकार',
      gallery: 'गैलरी',
      awards: 'पुरस्कार',
      about: 'हमारे बारे में',
      blog: 'ब्लॉग',
    },
    hero: {
      headline: 'भारत की साहित्यिक विरासत का उत्सव',
      subtitle: 'काव्य • साहित्य • संगीत • रंगमंच • संवाद',
      registerBtn: 'कार्यक्रम के लिए पंजीकरण',
      archiveBtn: 'संग्रह देखें',
    },
    sections: {
      featuredEvents: 'विशेष कार्यक्रम',
      upcomingEvents: 'आगामी अनुभव',
      about: 'जश्न-ए-अदब के बारे में',
      founder: 'संस्थापक से मिलें',
      legendaryGuests: 'दिग्गज अतिथि',
      testimonials: 'प्रशंसा के शब्द',
      sponsors: 'हमारे साझेदार',
      newsletter: 'जुड़े रहें',
      quoteOfDay: 'आज का शेर',
      viewAll: 'सभी देखें',
      register: 'पंजीकरण',
      readMore: 'और पढ़ें',
    },
    newsletter: {
      title: 'जुड़े रहें',
      subtitle: 'आगामी कार्यक्रमों, साहित्यिक कहानियों और सांस्कृतिक अंतर्दृष्टि पर अपडेट प्राप्त करने के लिए सदस्यता लें।',
      placeholder: 'अपना ईमेल दर्ज करें',
      button: 'सदस्यता लें',
    },
    footer: {
      quickLinks: 'त्वरित लिंक',
      eventLinks: 'कार्यक्रम',
      contact: 'संपर्क करें',
      followUs: 'फॉलो करें',
      copyright: '© 2026 जश्न-ए-अदब। सर्वाधिकार सुरक्षित।',
      tagline: 'भारत की साहित्यिक विरासत का संरक्षण',
    },
  },
  ur: {
    nav: {
      home: 'ہوم',
      events: 'پروگرام',
      archive: 'آرکائیو',
      artists: 'فنکار',
      gallery: 'گیلری',
      awards: 'ایوارڈز',
      about: 'ہمارے بارے میں',
      blog: 'بلاگ',
    },
    hero: {
      headline: 'ہندوستان کی ادبی وراثت کا جشن',
      subtitle: 'شاعری • ادب • موسیقی • تھیٹر • گفتگو',
      registerBtn: 'پروگرام کے لیے رجسٹر',
      archiveBtn: 'آرکائیو دیکھیں',
    },
    sections: {
      featuredEvents: 'نمایاں پروگرام',
      upcomingEvents: 'آنے والے تجربات',
      about: 'جشنِ ادب کے بارے میں',
      founder: 'بانی سے ملیں',
      legendaryGuests: 'مشہور مہمان',
      testimonials: 'تعریفی کلمات',
      sponsors: 'ہمارے شراکت دار',
      newsletter: 'جڑے رہیں',
      quoteOfDay: 'آج کا شعر',
      viewAll: 'سب دیکھیں',
      register: 'رجسٹریشن',
      readMore: 'مزید پڑھیں',
    },
    newsletter: {
      title: 'جڑے رہیں',
      subtitle: 'آنے والے پروگراموں اور ثقافتی خبروں کے لیے سبسکرائب کریں',
      placeholder: 'اپنا ای میل درج کریں',
      button: 'سبسکرائب',
    },
    footer: {
      quickLinks: 'فوری لنکس',
      eventLinks: 'پروگرام',
      contact: 'رابطہ',
      followUs: 'فالو کریں',
      copyright: '© 2026 جشنِ ادب۔ جملہ حقوق محفوظ ہیں۔',
      tagline: 'ہندوستان کی ادبی وراثت کا تحفظ',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    return value || key;
  };

  const isRTL = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
