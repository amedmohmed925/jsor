import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion } from 'framer-motion';

const WorksHero = () => {
  const { i18n } = useTranslation();
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

  const worksHeroSection = homeData?.Sections?.find(section => section.id === 77);

  const isEn = i18n.language && i18n.language.startsWith('en');

  return (
    <section className='my-5 overflow-hidden'>
      <div className="container text-center">
        <motion.h1 
          className='section-title'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isLoading ? '...' : (getLangField(worksHeroSection, 'title') || (isEn ? 'Tailored Solutions for Companies' : 'الحلول المخصصة للشركات والعقود طويلة الأجل'))}
        </motion.h1>
        <motion.p 
          className='works-desc mx-auto mb-4'
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? '...' : (getLangField(worksHeroSection, 'content') || worksHeroSection?.content)}
        </motion.p>
        <motion.img 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          src={worksHeroSection?.image || "assets/works-main-bg.png"} 
          className='img-fluid w-100' 
          alt="solutions" 
          style={{ borderRadius: '12px', marginTop: '20px' }}
        />
      </div>
    </section>
  );
};

export default WorksHero;