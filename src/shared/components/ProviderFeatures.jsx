import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion } from 'framer-motion';

const ProviderFeatures = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const featuresSection = homeData?.Sections?.find(section => section.id === 73); 
  // ID 73: مميزات الانضمام كمزود خدمة

  return (
    <section className='my-5 overflow-hidden'>
      <div className="container text-center">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isLoading ? '...' : getLangField(featuresSection, 'title') || 'مميزات الانضمام كمزود خدمة'}
        </motion.h2>
        <motion.p 
          className="contact-main-desc mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? '...' : getLangField(featuresSection, 'content')}
        </motion.p>
        <div className="row text-start mt-4">
          {(homeData?.AdvantageProvider || []).map((feature, index) => (
            <div key={feature.id} className="col-lg-3 col-md-6 mb-4">
              <motion.div 
                className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2 shadow-sm rounded-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <img 
                  src={feature.image} 
                  className='img-fluid provider-features-icon' 
                  alt={getLangField(feature, 'title')} 
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                />
                <h5 className='why-card-title m-0 text-center'>{getLangField(feature, 'title')}</h5>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderFeatures;
