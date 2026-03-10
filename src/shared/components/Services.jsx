import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion } from 'framer-motion';

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

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10
      }
    }
  };

  const getServiceLink = (service) => {
    const title = (service.title || '').toLowerCase();
    const titleEn = (service.title_en || '').toLowerCase();
    
    // Check if it's for service providers (drivers/truck owners) - ID 64
    if (title.includes('مقدم') || titleEn.includes('provider')) {
      return '/signup-driver';
    }
    
    // Check if it's for companies/contract - ID 62
    if (title.includes('شركات') || titleEn.includes('companies')) {
      return '/user/contract-upload';
    }

    // Default for individuals / regular orders - ID 63
    return '/user/basic-upload';
  };

  return (
    <section className='my-5 overflow-hidden'>
      <div className="container">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {isLoading ? '...' : getLangField(servicesSection, 'title') || 'خدماتنا'}
        </motion.h2>
        <motion.p 
          className="section-desc text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? '...' : getLangField(servicesSection, 'content')}
        </motion.p>
        <motion.div 
          className="row overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
        >
          {servicesCards.map((service) => (
            <div className="col-md-4 mt-4" key={service.id}>
              <motion.div 
                className="why-card h-100 p-4 d-flex flex-column align-items-start justify-content-center gap-2"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="services-img-container mb-1 w-100 overflow-hidden rounded-3">
                  <motion.img 
                    src={service.image} 
                    alt={getLangField(service, 'title')} 
                    className="w-100"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <h5 className='services-card-title m-0'>{getLangField(service, 'title')}</h5>
                <p className='services-card-desc m-0'>{getLangField(service, 'content')}</p>
                <Link to={getServiceLink(service)} className="services-btn text-decoration-none">
                  {i18n.language === 'en' ? 'Order Now' : 'اطلب الآن'}
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
