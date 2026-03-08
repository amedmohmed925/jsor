import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className='my-5'>
      <div className="container text-center">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isLoading ? '...' : getLangField(whySection, 'title') || 'لماذا نحن'}
        </motion.h2>
        <motion.p 
          className="section-desc"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? '...' : getLangField(whySection, 'content')}
        </motion.p>
        <motion.div 
          className="row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {whyCards.map((card) => (
            <div className="col-md-4 mt-4" key={card.id}>
              <motion.div 
                className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="card-img-container p-2 rounded-circle">
                  <img src={card.image} alt={getLangField(card, 'title')} />
                </div>
                <h5 className='why-card-title m-0'>{getLangField(card, 'title')}</h5>
                <p className='why-card-desc m-0'>{getLangField(card, 'content')}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Why;
