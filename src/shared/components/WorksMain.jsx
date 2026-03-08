import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const WorksMain = () => {
  const { t, i18n } = useTranslation(['common', 'auth']);
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API with fallback for bad API data
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language && i18n.language.startsWith('en');
    const enField = `${field}_en`;
    const arField = `${field}_ar`;
    
    if (isEn) {
      if (!item[enField] || item[enField] === item[field]) return null;
      return item[enField];
    } else {
      return item[arField] || item[field];
    }
  };

  const worksMainSection = homeData?.Sections?.find(section => section.id === 78);

  const isEn = i18n.language && i18n.language.startsWith('en');

  return (
    <section className='overflow-hidden py-4'>
      <div className="container">
        <div className="row align-items-center">
          <motion.div 
            className="col-md-6 mt-4 order-2 order-md-1"
            initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="shadow p-3 rounded-4 h-100 bg-white">
              <h2 className='services-card-title mb-3'>
                {isLoading ? '...' : (getLangField(worksMainSection, 'title') || (isEn ? 'Choose Service' : 'اختر الخدمة'))}
              </h2>
              <div className="row">
                <div className="col-12 text-start">
                  <div className="mb-3">
                    <label className="form-label mb-1">{t('auth:register.name')}</label>
                    <input
                      type="text"
                      className="form-control form-input py-2"
                      placeholder={t('auth:register.name')}
                    />
                  </div>
                </div>
                <div className="col-12 text-start">
                  <div className="mb-3">
                    <label className="form-label mb-1">{t('auth:register.phone')}</label>
                    <input
                      type="text"
                      className="form-control form-input py-2"
                      placeholder={t('auth:register.phone')}
                    />
                  </div>
                </div>
                <div className="col-12 text-start">
                  <div className="mb-3">
                    <label className="form-label mb-1">{t('common:labels.requiredService')}</label>
                    <div className="select-wrapper position-relative">
                      <select className="form-select form-input py-2 pe-3" defaultValue="">
                        <option value="" disabled>{t('common:labels.selectService')}</option>
                        <option value="contract">{t('common:options.contractRequest')}</option>
                      </select>
                      <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
                        <ExpandMoreIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-start">
                  <div className="mb-3">
                    <div className="works-note">
                      <h3 className='footer-link-title'>{t('common:labels.note')}</h3>
                      <p className='footer-link m-0'>{t('common:messages.responseWindow')}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-start">
                  <motion.button 
                    className="login-button py-2 rounded-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('common:buttons.sendRequest')}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="col-md-6 mt-4 order-1 order-md-2"
            initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className='h-100 position-relative'>
              <div className="works-overlay rounded-4"></div>
              <div className="works-img-texts px-4">
                <img src="assets/logo.png" alt="logo" />
                <h5 className="mt-3">
                  {isLoading ? '...' : (getLangField(worksMainSection, 'title') || (isEn ? 'What is Business Service?' : 'ما هي خدمة الأعمال؟'))}
                </h5>
                <h6>
                  {isLoading ? '...' : (getLangField(worksMainSection, 'content') || worksMainSection?.content)}
                </h6>
              </div>
              <img 
                src={worksMainSection?.image || "assets/works-main-img.png"} 
                className='img-fluid w-100 rounded-4 works-main-img shadow-sm' 
                alt="contact" 
                style={{ objectFit: 'cover', minHeight: '465px' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorksMain;
