import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const Why = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const whySection = homeData?.Sections?.[18]; // ID 27: لماذا نحن
  const whyCards = homeData?.Why || [];

  return (
    <section className='my-5'>
      <div className="container text-center">
        <h2 className="section-title">
          {isLoading ? '...' : getLangField(whySection, 'title') || 'لماذا نحن'}
        </h2>
        <p className="section-desc">
          {isLoading ? '...' : getLangField(whySection, 'content')}
        </p>
        <div className="row">
          {whyCards.map((card) => (
            <div className="col-md-4 mt-4" key={card.id}>
              <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <div className="card-img-container p-2 rounded-circle">
                  <img src={card.image} alt={getLangField(card, 'title')} />
                </div>
                <h5 className='why-card-title m-0'>{getLangField(card, 'title')}</h5>
                <p className='why-card-desc m-0'>{getLangField(card, 'content')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
