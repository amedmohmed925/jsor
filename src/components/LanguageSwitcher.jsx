import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/slices/uiSlice';
import { setDocumentDirection } from '../utils/rtlUtils';
import './LanguageSwitcher.css';

/**
 * Language Switcher Component
 * Allows users to switch between Arabic and English
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  
  const currentLanguage = i18n.language || 'ar';
  
  const changeLanguage = (lng) => {
    // Change i18n language
    i18n.changeLanguage(lng);
    
    // Update Redux state
    dispatch(setLanguage(lng));
    
    // Update document direction
    setDocumentDirection(lng);
  };
  
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    changeLanguage(newLanguage);
  };
  
  return (
    <div className="language-switcher">
      <button 
        onClick={toggleLanguage}
        className="language-switcher-btn"
        aria-label="Switch Language"
      >
        <span className="language-icon">🌐</span>
        <span className="language-text">
          {currentLanguage === 'ar' ? 'English' : 'العربية'}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
