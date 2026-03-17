import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery, useGetSubTrucksQuery } from '../../api/site/siteApi';
import { motion, AnimatePresence } from 'framer-motion';

const Trucks = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const [activeFilter, setActiveFilter] = useState(null);
  
  const { data: currentChildren = [], isLoading: isSubLoading } = useGetSubTrucksQuery(activeFilter, { 
    skip: !activeFilter 
  });

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const getImageUrl = (image) => {
    if (!image) return 'assets/truck-type-img.png';
    return image;
  };

  
  const trucksSection = homeData?.Sections?.find(section => section.id === 65); // ID 29: انواع الشاحنات
  const allTrucks = homeData?.Truks || [];

  // تحديد الشاحنات الأساسية بالـ IDs
  const parentIds = [3, 11, 12, 13];
  const parentTrucks = allTrucks.filter((t) => parentIds.includes(t.id));
  
  useEffect(() => {
    if (parentTrucks.length > 0 && !activeFilter) {
      setActiveFilter(parentTrucks[0].id);
    }
  }, [parentTrucks, activeFilter]);

  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  const currentParent = parentTrucks.find((t) => t.id === activeFilter);

  return (
    <section className="trucks py-4 overflow-hidden">
      <div className="container">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isLoading ? '...' : getLangField(trucksSection, 'title') || 'انواع الشاحنات'}
        </motion.h2>
        <motion.p 
          className="section-desc text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? '...' : getLangField(trucksSection, 'content')}
        </motion.p>

        <div className="row">
          {/* Main Truck Categories (Filters) */}
          {parentTrucks.map((type, index) => (
            <motion.div 
              className="col-lg-3 col-md-6 mt-3" 
              key={type.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`trucks-filter-card d-flex justify-content-between align-items-center w-100 ${
                  activeFilter === type.id ? 'active' : ''
                }`}
                onClick={() => handleFilterClick(type.id)}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="trucks-filter-title">{getLangField(type, 'name')}</span>
                <img
                  src={getImageUrl(type.image)}
                  alt={getLangField(type, 'name')}
                  className="filter-card-img"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <motion.div 
              className="filter-item-container"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="row align-items-center">
                {/* الصورة الكبيرة على اليمين (في RTL) واليسار (في LTR) */}
                <div className="col-md-5 text-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeFilter}
                      src={getImageUrl(currentParent?.image)}
                      alt={getLangField(currentParent, 'name')}
                      className="img-fluid filter-card-item-img"
                      style={{ objectFit: 'contain' }}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.4 }}
                    />
                  </AnimatePresence>
                </div>
                {/* القائمة الفرعية على اليسار (في RTL) واليمين (في LTR) */}
                <div className="col-md-7">
                  <div className="d-flex flex-column gap-3 align-items-end">
                    {isSubLoading ? (
                       <div className="col-12 text-center">
                        <p className="text-muted italic">
                          {i18n.language === 'en' ? 'Loading...' : 'جاري التحميل...'}
                        </p>
                      </div>
                    ) : currentChildren.length > 0 ? (
                      <AnimatePresence mode="popLayout">
                        {currentChildren.map((child, index) => (
                          <motion.div
                            key={child.id}
                            className="filter-badge d-flex justify-content-between align-items-center"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <span className="filter-badge-text">
                              {getLangField(child, 'name')}
                            </span>
                            <img
                              src={getImageUrl(child.image)}
                              alt={getLangField(child, 'name')}
                              className="filter-badge-img"
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    ) : (
                      <div className="col-12 text-center">
                        <p className="text-muted italic">
                          {i18n.language === 'en'
                            ? 'No sub-types available'
                            : 'لا توجد أنواع فرعية متاحة'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trucks;
