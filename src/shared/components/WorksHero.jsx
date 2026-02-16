import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const WorksHero = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const worksHeroSection = homeData?.Sections?.[11]; // ID 69: الحلول المخصصة للشركات

  return (
    <section className='my-5'>
      <div className="container text-center">
        <h1 className='section-title'>
          {isLoading ? '...' : getLangField(worksHeroSection, 'title') || 'الحلول المخصصة للشركات والعقود طويلة الأجل'}
        </h1>
        <p className='works-desc mx-auto mb-4'>
          {isLoading ? '...' : getLangField(worksHeroSection, 'content')}
        </p>
        <img 
          src={worksHeroSection?.image || "assets/works-main-bg.png"} 
          className='img-fluid w-100' 
          alt="trucks" 
        />
      </div>
    </section>
  );
};

export default WorksHero;