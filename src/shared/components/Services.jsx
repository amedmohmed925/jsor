import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const Services = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const servicesSection = homeData?.Sections?.[16]; // ID 32: خدماتنا
  const servicesCards = homeData?.Services || [];

  return (
    <section className='my-5'>
      <div className="container">
        <h2 className="section-title text-center">
          {isLoading ? '...' : getLangField(servicesSection, 'title') || 'خدماتنا'}
        </h2>
        <p className="section-desc text-center">
          {isLoading ? '...' : getLangField(servicesSection, 'content')}
        </p>
        <div className="row">
          {servicesCards.map((service) => (
            <div className="col-md-4 mt-4" key={service.id}>
              <div className="why-card h-100 p-4 d-flex flex-column align-items-start justify-content-center gap-2">
                <div className="services-img-container mb-1 w-100">
                  <img src={service.image} alt={getLangField(service, 'title')} className="w-100" />
                </div>
                <h5 className='services-card-title m-0'>{getLangField(service, 'title')}</h5>
                <p className='services-card-desc m-0'>{getLangField(service, 'content')}</p>
                <Link to='/login' className="services-btn text-decoration-none">
                  {i18n.language === 'en' ? 'Order Now' : 'اطلب الآن'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
