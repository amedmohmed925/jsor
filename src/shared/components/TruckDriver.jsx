import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const TruckDriver = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const driverSection = homeData?.Sections?.[14]; // ID 66: سائقي الشركات
  const driverCards = homeData?.Drivers || [];

  return (
    <section className="container-fluid">
      <div className='truck-driver'>
        <div className="truck-overlay"></div>
        <div className="py-5 position-relative">
          <h3 className='driver-title text-center mb-3'>
            {isLoading ? '...' : getLangField(driverSection, 'title') || 'سائقي الشركات'}
          </h3>
          <p className='driver-desc text-center'>
            {isLoading ? '...' : getLangField(driverSection, 'content')}
          </p>
          <div className="container">
            <div className="row">
              {driverCards.map((card) => (
                <div className="col-lg-3 col-md-6 mt-3" key={card.id}>
                  <div className="driver-card h-100 d-flex flex-column align-items-start gap-2">
                    <img src={card.image} alt={getLangField(card, 'title')} />
                    <h4 className='driver-card-title m-0'>{getLangField(card, 'title')}</h4>
                    <p className='driver-card-desc m-0'>{getLangField(card, 'content')}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to='/login'>
                <button className="login-button mt-4">
                  {i18n.language === 'en' ? 'Join Us Now' : 'انضم الينا الان'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TruckDriver;
