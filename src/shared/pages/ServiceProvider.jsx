import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import Navbar from '../components/Navbar';
import ProviderFeatures from '../components/ProviderFeatures';
import ProviderMechanism from '../components/ProviderMechanism';
import ProviderDocuments from '../components/ProviderDocuments';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const ServiceProvider = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const providerHero = homeData?.Sections?.[8]; // ID 72: انضم كمزود خدمة

  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div className="provider-container position-relative d-flex justify-content-center align-items-center">
        <div className="provider-overlay"></div>
        <div className="position-relative d-flex flex-column align-items-center px-3">
          <motion.h2 
            className='provider-main-title text-center'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {isLoading ? '...' : getLangField(providerHero, 'title') || 'انضم كمزود خدمة وابدأ في استقبال الطلبات مباشرة'}
          </motion.h2>
          <motion.p 
            className='provider-main-desc text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {isLoading ? '...' : getLangField(providerHero, 'content')}
          </motion.p>
        </div>
      </div>
      <ProviderFeatures />
      <ProviderMechanism />
      <ProviderDocuments />   
      <Footer isProviderPage={true} />
    </div>
  );
};

export default ServiceProvider;
