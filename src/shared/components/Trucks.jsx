import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const Trucks = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const [activeFilter, setActiveFilter] = useState(null);

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  // Prepend API base URL if needed, although the API seems to provide full URLs
  const getImageUrl = (image) => {
    if (!image) return 'assets/truck-type-img.png';
    // If it's a relative path, we might need a base URL, but assuming absolute from API
    return image;
  };

  const trucksSection = homeData?.Sections?.[15]; // ID 29: انواع الشاحنات
  const allTrucks = homeData?.Truks || [];

  // Filter trucks into parent and child (sub-trucks)
  const parentTrucks = allTrucks.filter((t) => !t.parent_id);
  const childTrucks = allTrucks.filter((t) => t.parent_id);

  useEffect(() => {
    if (parentTrucks.length > 0 && !activeFilter) {
      setActiveFilter(parentTrucks[0].id);
    }
  }, [parentTrucks, activeFilter]);

  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  const currentParent = parentTrucks.find((t) => t.id === activeFilter);
  const currentChildren = childTrucks.filter((t) => t.parent_id === activeFilter);

  return (
    <section className="trucks py-4">
      <div className="container">
        <h2 className="section-title text-center">
          {isLoading ? '...' : getLangField(trucksSection, 'title') || 'انواع الشاحنات'}
        </h2>
        <p className="section-desc text-center">
          {isLoading ? '...' : getLangField(trucksSection, 'content')}
        </p>

        <div className="row">
          {/* Main Truck Categories (Filters) */}
          {parentTrucks.map((type) => (
            <div className="col-lg-3 col-md-6 mt-3" key={type.id}>
              <div
                className={`trucks-filter-card d-flex justify-content-between align-items-center w-100 ${
                  activeFilter === type.id ? 'active' : ''
                }`}
                onClick={() => handleFilterClick(type.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <img src={getImageUrl(type.image)} alt={getLangField(type, 'name')} />
                  <span>{getLangField(type, 'name')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="trucks-details-container p-4 rounded-4 shadow-sm bg-white">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h3 className="mb-3 text-primary">{getLangField(currentParent, 'name')}</h3>
                  <p className="truck-main-desc mb-4">{getLangField(currentParent, 'content')}</p>

                  <div className="row">
                    {currentChildren.length > 0 ? (
                      currentChildren.map((child) => (
                        <div key={child.id} className="col-md-6 mb-3">
                          <div className="truck-child-item p-3 border rounded-3 h-100">
                            <h5 className="fs-6 fw-bold mb-2">{getLangField(child, 'name')}</h5>
                            <p className="small text-muted mb-0">{getLangField(child, 'content')}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <p className="text-muted italic">{i18n.language === 'en' ? 'No sub-types available' : 'لا توجد أنواع فرعية متاحة'}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-5 text-center">
                  <img
                    src={getImageUrl(currentParent?.image)}
                    alt={getLangField(currentParent, 'name')}
                    className="img-fluid rounded-3"
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trucks;
