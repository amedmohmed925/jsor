import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Import translation files
import arCommon from './locales/ar/common.json';
import arAuth from './locales/ar/auth.json';
import arUser from './locales/ar/user.json';
import arDriver from './locales/ar/driver.json';
import arAdmin from './locales/ar/admin.json';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enUser from './locales/en/user.json';
import enDriver from './locales/en/driver.json';
import enAdmin from './locales/en/admin.json';

const resources = {
  ar: {
    common: arCommon,
    auth: arAuth,
    user: arUser,
    driver: arDriver,
    admin: arAdmin,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    user: enUser,
    driver: enDriver,
    admin: enAdmin,
  }
};

i18n
  // Load translation files
  .use(HttpBackend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'ar', // Default language is Arabic
    lng: 'ar', // Initial language
    debug: false,
    
    // Namespace configuration
    ns: ['common', 'auth', 'user', 'driver', 'admin'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // React already escapes content
    },
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'josur_language',
    },
    
    react: {
      useSuspense: false,
    }
  });

// Update HTML attributes when language changes
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  document.documentElement.dir = dir;
  
  // Store language in localStorage
  localStorage.setItem('josur_language', lng);
});

// Set initial direction
const initialDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.dir = initialDir;
document.documentElement.lang = i18n.language || 'ar';

export default i18n;