import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

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

  const featuresSection = homeData?.Sections?.[7]; // ID 73: مميزات الانضمام كمزود خدمة

  return (
    <section className='my-5'>
      <div className="container">
        <h2 className="section-title">
          {isLoading ? '...' : getLangField(featuresSection, 'title') || 'مميزات الانضمام كمزود خدمة'}
        </h2>
        <p className="contact-main-desc">
          {isLoading ? '...' : getLangField(featuresSection, 'content')}
        </p>
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
              <img src="assets/provider-features-icon-1.svg" className='img-fluid provider-features-icon' alt="icon" />
              <h5 className='why-card-title m-0'>{i18n.language === 'en' ? 'Goods Insurance' : 'تأمين على البضائع'}</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
              <img src="assets/provider-features-icon-2.svg" className='img-fluid provider-features-icon' alt="icon" />
              <h5 className='why-card-title m-0'>{i18n.language === 'en' ? 'Continuous Daily Orders' : 'طلبات يومية مستمرة'}</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
              <img src="assets/provider-features-icon-3.svg" className='img-fluid provider-features-icon' alt="icon" />
              <h5 className='why-card-title m-0'>{i18n.language === 'en' ? 'Easy App Management' : 'إدارة سهلة من التطبيق'}</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
              <img src="assets/provider-features-icon-4.svg" className='img-fluid provider-features-icon' alt="icon" />
              <h5 className='why-card-title m-0'>{i18n.language === 'en' ? 'Direct Back Office Support' : 'دعم مباشر من الباك أوفيس'}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderFeatures;
