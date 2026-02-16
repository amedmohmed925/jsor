import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const Hero = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const { t, i18n } = useTranslation('common');
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  const toggleFilter = (name) => {
    setActiveFilter(name);
  };
  
  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const slider = homeData?.slider?.[0];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center text-center position-relative pb-5">

          {/* Main Content */}
          <div className="hero-content my-4">
            <h1 className="hero-title">
              {isLoading ? '...' : getLangField(slider, 'title') || t('hero.title')}
            </h1>
            <p className="hero-description">
              {isLoading ? '...' : getLangField(slider, 'content') || t('hero.description')}
            </p>

            <div className="hero-buttons d-flex justify-content-center align-items-center gap-2">
              <Link to="/login" className="login-button text-decoration-none">{t('hero.orderTruck')}</Link>
              <Link to="/login" className="join-button text-decoration-none">{t('hero.joinDriver', 'انضم كسائق')}</Link>
            </div>
          </div>

          {/* Filter box */}
          <div className="filter-box text-end">
            <h6 className="serach-filter-title">{t('hero.orderNow')}</h6>

            {/* Filter Checkboxes */}
            <div className="d-flex gap-3 align-items-center flex-wrap justify-content-center justify-content-md-start">
              {[
                { id: "fast", label: t('requestTypes.normal') },
                { id: "travel", label: t('requestTypes.trips') },
                { id: "contract", label: t('requestTypes.contract') }
              ].map((item) => (
                <div
                  key={item.id}
                  className={`filter-checkbox-box ${activeFilter === item.id ? 'active' : ''}`}
                  onClick={() => toggleFilter(item.id)}
                >
                  <input
                    type="radio"
                    name="requestType"
                    className="checkbox-style"
                    checked={activeFilter === item.id}
                    readOnly
                  />

                  <span
                    className="mb-1 checkbox-label"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter(item.id);
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            
            {/* Additional Checkboxes */}
            <div className="mt-3 d-flex gap-4">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" className="checkbox-style" id="doorPickup" />
                <label htmlFor="doorPickup" className="checkbox-label">
                  {t('requestTypes.singleLocation')}
                </label>
              </div>
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" className="checkbox-style" id="cashOnDelivery" />
                <label htmlFor="cashOnDelivery" className="checkbox-label">
                  {t('requestTypes.multipleLocations')}
                </label>
              </div>
            </div>

            {/* --- NEW LOCATION SEARCH ROW --- */}
            <div className="location-search-row d-flex align-items-center gap-3 mt-3">
              {/* Pickup Location Input */}
              <div className="input-with-icon">
                <i className="far fa-map map-icon"></i>
                <input
                  type="text"
                  className="form-control location-input"
                  placeholder={t('hero.pickupPlaceholder')}
                />
              </div>

              {/* Arrow Icon */}
              <i className="material-icons arrow-icon">keyboard_backspace</i>

              {/* Delivery Location Input */}
              <div className="input-with-icon">
                <i className="far fa-map map-icon"></i>
                <input
                  type="text"
                  className="form-control location-input"
                  placeholder={t('hero.deliveryPlaceholder')}
                />
              </div>

              {/* Search Button */}
              <button className="login-button d-flex align-items-center justify-content-center gap-2 search-width">
                <i className="fas fa-search"></i>
                {t('hero.search')}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;