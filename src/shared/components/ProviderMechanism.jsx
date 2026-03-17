import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// استيراد الأيقونات بناءً على الصورة المرفقة
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const ProviderMechanism = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  
  // حالة (State) لتتبع الخطوة المحددة حالياً
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const mechanismSection = homeData?.Sections?.find(section => section.id === 74);
   // ID 74: آلية الانضمام

  // Get provider steps from API and reverse to match logical flow
  const providerSteps = homeData?.ProviderProcess ? [...homeData.ProviderProcess].reverse() : [];

  // مصفوفة الأيقونات بالترتيب المطلوب
  const stepIcons = [
    LocationOnOutlinedIcon,
    CropFreeOutlinedIcon,
    AttachMoneyOutlinedIcon,
    AccessTimeOutlinedIcon,
    CheckCircleOutlineOutlinedIcon
  ];

  return (
    <div className="container">
      <section className='request-mechanism rounded-5 py-5'>
        <h2 className="services-card-title text-center fw-bold mb-3">
          {isLoading ? '...' : getLangField(mechanismSection, 'title') || 'آلية الانضمام بخطوات بسيطة'}
        </h2>
        <p className="login-desc text-center text-muted mb-5">
          {isLoading ? '...' : getLangField(mechanismSection, 'content')}
        </p>

        <div className="row align-items-center justify-content-center g-0">
          {/* قسم الخطوات (يمين) */}
          <div className="col-md-5 mt-3">
            <div className="flow-chart">
              {providerSteps.map((step, index) => {
                const IconComponent = stepIcons[index] || LocationOnOutlinedIcon;
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                return (
                  <div 
                    key={step.id || index} 
                    className="d-flex mb-4" // mb-4 لعمل مسافات بين الكروت
                    onClick={() => setActiveIndex(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* عمود الأيقونة والخط */}
                    <div className="d-flex flex-column align-items-center me-5 ms-md-3">
                      {/* الدائرة التي تحتوي على الأيقونة */}
                      <div 
                        className={`d-flex justify-content-center align-items-center rounded-circle border ${isActive || isPassed ? 'border-primary text-primary' : 'border-secondary text-secondary'}`}
                        style={{ 
                          width: '45px', 
                          height: '45px', 
                          backgroundColor: 'var(--card-bg)',
                          borderWidth: isActive || isPassed ? '2px' : '1px',
                          transition: 'all 0.3s ease',
                          zIndex: 2 
                        }}
                      >
                        <IconComponent fontSize="medium" />
                      </div>
                      
                      {/* الخط العمودي الرابط */}
                      {index < providerSteps.length - 1 && (
                        <div 
                          className="flex-grow-1"
                          style={{
                            width: '2px',
                            backgroundColor: isPassed ? 'var(--primary-color)' : 'var(--border-color)', // أزرق إذا مرت الخطوة، رمادي إذا لم تمر
                            transition: 'background-color 0.4s ease',
                            minHeight: '40px' // أقل ارتفاع للخط
                          }}
                        />
                      )}
                    </div>

                    {/* كارت المحتوى */}
                    <div 
                      className={`p-3 rounded-4 bg-white shadow-sm border d-flex flex-column justify-content-center align-items-center text-center ${isActive ? 'border-primary border-2' : 'border-light'}`}
                      style={{ 
                        transition: 'all 0.3s ease',
                        width: '350px',
                        height: '110px'
                      }}
                    >
                      <h6 className={`fw-bold mb-1 ${isActive ? 'text-primary' : 'text-secondary'}`}>
                        {getLangField(step, 'title')}
                      </h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                        {getLangField(step, 'content')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* قسم الصورة الديناميكية (يسار) */}
          <div className="col-md-5 text-center mt-5 mt-md-0 d-flex justify-content-center">
            <AnimatePresence mode="wait">
              <Motion.img 
                key={activeIndex} // تغيير الـ key يجبر الصورة على عمل أنيميشن عند كل تغيير
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                // استخدام صورة الخطوة المحددة، أو صورة افتراضية في حالة عدم وجودها
                src={providerSteps[activeIndex]?.image || "assets/iPhone.png"} 
                className='img-fluid drop-shadow' 
                style={{ maxHeight: "600px", objectFit: 'contain' }} 
                alt="App Preview" 
              />
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProviderMechanism;