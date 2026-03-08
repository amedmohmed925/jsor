import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const { t, i18n } = useTranslation('common');
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const [activeIndex, setActiveIndex] = useState(null);

  // Helper to get localized field from API with fallback for bad API data
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language && i18n.language.startsWith('en');
    const enField = `${field}_en`;
    const arField = `${field}_ar`;
    
    if (isEn) {
      if (!item[enField] || item[enField] === item[field]) return null;
      return item[enField];
    } else {
      return item[arField] || item[field];
    }
  };

  const faqs = homeData?.Question || [];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-5 overflow-hidden">
      <div className="container"> 
        <motion.h2 
          className="faq-title text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('faq.title')}
        </motion.h2>
        
        <div className="faq mx-auto">
          {isLoading ? (
            <div className="text-center py-4">...</div>
          ) : (
            faqs.map((item, index) => (
              <motion.div
                key={item.id || index}
                className={`faq-item border-bottom py-2 ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="m-0 faq-question">{getLangField(item, 'title') || item.title}</h5>
                  <motion.span 
                    className="faq-icon"
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeIndex === index ? "×" : "+"}
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div 
                      className="faq-answer show"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { duration: 0.25, ease: "easeOut" },
                        opacity: { duration: 0.2 }
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="m-0 pt-2 pb-3">{getLangField(item, 'content') || item.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
