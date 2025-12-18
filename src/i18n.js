import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';

const resources = {
  ar: {
    translation: arTranslations
  },
  en: {
    translation: enTranslations
  }
};

i18n
  // Detect user language (from browser storage, navigator, etc.)
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language if the detected language is not available
    debug: false, // Set to true for detailed console logs during development

    interpolation: {
      escapeValue: false // React already escapes content to prevent XSS attacks
    }
  });

// IMPORTANT: This listener updates the HTML document's `lang` and `dir` attributes
// whenever the language is changed, ensuring correct text direction (RTL/LTR).
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  document.documentElement.dir = dir;
});

export default i18n;