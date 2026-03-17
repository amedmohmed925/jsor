import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const TruckDriver = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const driverSection = homeData?.Sections?.find(section => section.id === 66); 
  // ID 66: سائقي الشركات
  const driverCards = homeData?.Drivers || [];

  return (
    <section className="container-fluid overflow-hidden">
      <div className='truck-driver'>
        <motion.div 
          className="truck-overlay"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        ></motion.div>
        <div className="py-5 position-relative">
          <motion.h3 
            className='driver-title text-center mb-3'
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {isLoading ? '...' : getLangField(driverSection, 'title') || 'سائقي الشركات'}
          </motion.h3>
          <motion.p 
            className='driver-desc text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {isLoading ? '...' : getLangField(driverSection, 'content')}
          </motion.p>
          <div className="container">
            <motion.div 
              className="row"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
            >
              {driverCards.map((card) => (
                <div className="col-lg-3 col-md-6 mt-3" key={card.id}>
                  <motion.div 
                    className="driver-card h-100 d-flex flex-column align-items-start gap-2"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: [0, -1, 1, -1, 0] }}
                  >
                    <img src={card.image} alt={getLangField(card, 'title')} />
                    <h4 className='driver-card-title m-0'>{getLangField(card, 'title')}</h4>
                    <p className='driver-card-desc m-0'>{getLangField(card, 'content')}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
            <div className="text-center">
              <Link 
                to={isAuthenticated ? "#" : "/signup-driver"} 
                onClick={(e) => {
                  if (isAuthenticated) {
                    e.preventDefault();
                    toast.info(i18n.language === 'en' ? 'You are already logged in' : 'أنت مسجل للدخول بالفعل');
                  }
                }}
                className="d-inline-block"
              >
                <motion.button 
                  className="login-button mt-4"
                  whileHover={{ scale: 1.1, backgroundColor: "#0056b3" }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {i18n.language === 'en' ? 'Join Us Now' : 'انضم الينا الان'}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TruckDriver;
