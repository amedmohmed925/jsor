import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery, useGetContactInfoQuery } from '../../api/site/siteApi';
import { motion } from 'framer-motion';

const DownloadApp = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const { data: contactInfo } = useGetContactInfoQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const appSection = homeData?.Sections?.find(section => section.id === 68); 
  // ID 68: احصل على تطبيقنا المحمول المجاني

  return (
    <section className='mt-5 pt-5 pb-0 mb-0 overflow-hidden'>
      <div className="container pb-0 mb-0">
        <div className="mx-auto text-center">
          <motion.h1 
            className="app-title mx-auto mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isLoading ? '...' : getLangField(appSection, 'title') || 'احصل على تطبيقنا المحمول المجاني'}
          </motion.h1>
          <motion.p 
            className="app-description mx-auto mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isLoading ? '...' : getLangField(appSection, 'content')}
          </motion.p>

          <motion.div 
            className="d-flex justify-content-center align-items-center gap-3 mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {contactInfo?.android_url && (
              <motion.a 
                href={contactInfo.android_url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="assets/Google Play.png" alt="Google Play" />
              </motion.a>
            )}
            {contactInfo?.ios_url && (
              <motion.a 
                href={contactInfo.ios_url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="assets/App Store.png" alt="App Store" />
              </motion.a>
            )}
            {!contactInfo && (
              <>
                 <motion.img 
                  src="assets/Google Play.png" 
                  alt="Google Play" 
                  whileHover={{ scale: 1.05 }}
                 />
                 <motion.img 
                  src="assets/App Store.png" 
                  alt="App Store" 
                  whileHover={{ scale: 1.05 }}
                 />
              </>
            )}
          </motion.div>
          <motion.div 
            className="app-mobiles-wrapper"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <img src={appSection?.image || "assets/mobiles.jpg"} className='img-fluid' alt="mobiles" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
