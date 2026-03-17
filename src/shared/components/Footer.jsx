import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery, useGetContactInfoQuery } from '../../api/site/siteApi';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

// Import Material Icons for social media
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/Twitter'; // X is the new name for Twitter
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = ({ isProviderPage = false, isWorksPage = false }) => {
  const { t, i18n } = useTranslation(['common', 'auth']);
  const { isAuthenticated } = useAuth();
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const { data: contactInfo } = useGetContactInfoQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const footerSection = homeData?.Sections?.[4];

   // ID 76: هل أنت مستعد لبدء العمل وزيادة دخلك؟
  const providerBannerSection = homeData?.Sections?.find(s => s.id === 76);
  
  // ID 109: حلول ذكية لشحن وتوصيل البضائع
  const solutionSection = homeData?.Sections?.find(s => s.id === 109);

  // ID 112: حلول ذكية لشحن وتوصيل البضائع (لصفحة الأعمال)
  const worksBannerSection = homeData?.Sections?.find(s => s.id === 112);
  
  const aboutData = homeData?.About?.[0];

  return (
    <footer className='py-4'>
      <div className="container">
        {/* General Footer - Hidden on Provider or Works Page */}
        <div className={`d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-3 general-footer ${isProviderPage || isWorksPage ? 'd-none' : ''}`}>
          <h3 className='footer-title'>{isLoading ? '...' : getLangField(solutionSection, 'title') || t('footer.solutionTitle', 'حلول ذكية لشحن وتوصيل البضائع')}</h3>
          <Link 
            to={isAuthenticated ? "#" : "/signup-driver"} 
            onClick={(e) => {
              if (isAuthenticated) {
                e.preventDefault();
                toast.info(i18n.language === 'en' ? 'You are already logged in' : 'أنت مسجل للدخول بالفعل');
              }
            }}
            className="login-button text-decoration-none"
          >
            {t('common:hero.joinDriver', 'انضم الينا الان')}
          </Link>
        </div>
        
        {/* Provider Footer - Only Shown on Provider Page */}
        <div className={`d-flex flex-column align-items-center text-center gap-3 border-bottom pb-3 provider-footer ${!isProviderPage ? 'd-none' : ''}`}>
          <h3 className='footer-title m-0'>{isLoading ? '...' : getLangField(providerBannerSection, 'title') || 'هل أنت مستعد لبدء العمل وزيادة دخلك؟'}</h3>
          <Link 
            to={isAuthenticated ? "#" : "/signup-driver"} 
            onClick={(e) => {
              if (isAuthenticated) {
                e.preventDefault();
                toast.info(i18n.language === 'en' ? 'You are already logged in' : 'أنت مسجل للدخول بالفعل');
              }
            }}
            className="login-button text-decoration-none"
          >
            {isLoading ? '...' : getLangField(providerBannerSection, 'content') || 'ابدأ الآن كمزود خدمة'}
          </Link>
        </div>

        {/* Works Footer - Only Shown on Works Page */}
        <div className={`d-flex flex-column align-items-center text-center gap-3 border-bottom pb-3 works-footer ${!isWorksPage ? 'd-none' : ''}`}>
          <h3 className='footer-title m-0'>{isLoading ? '...' : getLangField(worksBannerSection, 'title') || 'حلول ذكية لشحن وتوصيل البضائع'}</h3>
          <Link 
            to="/signup-company" 
            className="login-button text-decoration-none"
          >
            {i18n.language === 'en' ? 'Join as a company' : 'انضم كشركة'}
          </Link>
        </div>

        <div className="row align-items-center">
          <div className="col-md-4 mt-4">
            {aboutData?.image && (
              <img 
                src={aboutData.image} 
                alt="About Jusoor" 
                className="img-fluid mb-3" 
                style={{ maxHeight: '60px' }} 
              />
            )}
            <h5 className='footer-main-label'>
              {isLoading ? '...' : getLangField(aboutData, 'title') || t('footer.aboutTitle', 'عن جسور')}
            </h5>
            <p className='footer-main-sublabel'>
              {isLoading ? '...' : getLangField(aboutData, 'content') || t('footer.aboutDescription')}
            </p>
            <div className="d-flex justify-content-start align-items-center flex-wrap gap-3 mb-4">
              {contactInfo?.android_url && (
                <a href={contactInfo.android_url} target="_blank" rel="noopener noreferrer">
                  <img src="/assets/Google Play.png" alt="Google Play" style={{ maxHeight: '45px' }} />
                </a>
              )}
              {contactInfo?.ios_url && (
                <a href={contactInfo.ios_url} target="_blank" rel="noopener noreferrer">
                  <img src="/assets/App Store.png" alt="App Store" style={{ maxHeight: '45px' }} />
                </a>
              )}
            </div>
            <div className="d-flex gap-5 align-items-center mb-3">
              {contactInfo?.facebook && contactInfo.facebook !== '#' && (
                <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                  <FacebookIcon className='fs-2 icon-color' />
                </a>
              )}
              {contactInfo?.instegram && contactInfo.instegram !== '#' && (
                <a href={contactInfo.instegram} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                  <InstagramIcon className='fs-2 icon-color' />
                </a>
              )}
              {contactInfo?.twitter && contactInfo.twitter !== '#' && (
                <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                  <XIcon className='fs-2 icon-color' />
                </a>
              )}
              {contactInfo?.youtube && contactInfo.youtube !== '#' && (
                <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                  <YouTubeIcon className='fs-2 icon-color' />
                </a>
              )}
               {contactInfo?.snapchat && contactInfo.snapchat !== '#' && (
                <a href={contactInfo.snapchat} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                  <i className="fab fa-snapchat fs-2 icon-color"></i>
                </a>
              )}
            </div>
          </div>

          <div className="col-md-3 col-6 pe-md-4 mt-4">
            <h6 className='mb-3 footer-link-title'>{t('footer.links.shortcuts')}</h6>
            <Link to="/" className='mb-3 footer-link d-block text-decoration-none'>{t('footer.links.home')}</Link>
            <Link to="/works" className='mb-3 footer-link d-block text-decoration-none'>{t('footer.links.business')}</Link>
            <Link to="/service-provider" className='mb-3 footer-link d-block text-decoration-none'>{t('footer.links.providers')}</Link>
            <Link to="/contact" className='mb-3 footer-link d-block text-decoration-none'>{t('footer.links.contact')}</Link>
            <Link to="/terms" className='mb-3 footer-link d-block text-decoration-none'>{i18n.language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}</Link>
          </div>
          
          <div className="col-md-3 col-6 pe-md-4 mt-4">
             <h6 className='mb-3 footer-link-title'>{t('footer.links.contact')}</h6>
             {contactInfo?._address && (
                <div className="d-flex align-items-start gap-2 mb-3 footer-link">
                  <LocationOnIcon fontSize="small" className="mt-1" />
                  <span>{contactInfo._address}</span>
                </div>
             )}
             {contactInfo?.mobile && (
                <div className="d-flex align-items-center gap-2 mb-3 footer-link">
                  <PhoneIcon fontSize="small" />
                  <a href={`tel:${contactInfo.mobile}`} className="text-decoration-none text-inherit" style={{ color: 'inherit' }}>{contactInfo.mobile}</a>
                </div>
             )}
             {contactInfo?.whatsap && (
                <div className="d-flex align-items-center gap-2 mb-3 footer-link">
                  <WhatsAppIcon fontSize="small" />
                  <a href={`https://wa.me/${contactInfo.whatsap}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-inherit" style={{ color: 'inherit' }}>{contactInfo.whatsap}</a>
                </div>
             )}
          </div>

         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
