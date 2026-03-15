import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Import Material Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const RequestMechanism = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const [activeStep, setActiveStep] = useState(0);

  const processSection = homeData?.Sections?.[17]; // ID 31: آلية الطلب
  const processSteps = homeData?.Process || [];
  const activeStepIndex = processSteps.length > 0
    ? Math.min(activeStep, processSteps.length - 1)
    : 0;

  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const progressHeight = processSteps.length > 1 
    ? (activeStepIndex / (processSteps.length - 1)) * 100 
    : 0;

  const defaultIcons = [
    <LocationOnOutlinedIcon key="loc" />,
    <FullscreenOutlinedIcon key="full" />,
    <PaidOutlinedIcon key="paid" />,
    <ScheduleOutlinedIcon key="sched" />,
    <PhoneOutlinedIcon key="phone" />
  ];

  const renderStepContent = (step, isActive) => (
    <Motion.div 
      className={`p-3 rounded-4 border-2 border ${isActive ? 'border-primary bg-white shadow' : 'border-transparent text-muted'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ scale: isActive ? 1.05 : 1 }}
    >
      <h3 className="fw-bold fs-6 fs-md-5 mb-1">{getLangField(step, 'title')}</h3>
      <p className="small mb-0" style={{ fontSize: '0.85rem' }}>{getLangField(step, 'content')}</p>
    </Motion.div>
  );

  return (
    <section className="request-mechanism py-5 overflow-hidden">
      {/* تم استبدال نظام الـ Bootstrap المعقد بستايل Flexbox مخصص 
        لمنع أي تشوه في الأيقونات أو الكروت في الموبايل
      */}
      <style>{`
        .custom-timeline-container {
          position: relative;
          padding: 20px 0;
        }
        
        /* الخط العمودي */
        .custom-timeline-line {
          position: absolute;
          top: 20px;
          bottom: 20px;
          width: 4px;
          background-color: var(--border-color);
          z-index: 0;
          border-radius: 10px;
          /* موقع الخط في الموبايل - LTR */
          left: 23px; 
        }
        /* موقع الخط في الموبايل - RTL */
        html[dir="rtl"] .custom-timeline-line,
        body[dir="rtl"] .custom-timeline-line {
          left: auto;
          right: 23px;
        }

        /* العنصر الواحد (أيقونة + كارت) */
        .custom-timeline-item {
          display: flex;
          align-items: flex-start; /* لمنع تمدد الأيقونة عمودياً */
          margin-bottom: 1.5rem;
          position: relative;
          width: 100%;
        }

        /* حاوية الأيقونة - حجم ثابت لا يتأثر بطول النص */
        .custom-timeline-icon {
          width: 50px;
          height: 50px;
          min-width: 50px;
          min-height: 50px;
          flex-shrink: 0; /* يمنع المط أو الانكماش تماماً */
          z-index: 2;
          margin-right: 15px; /* مسافة بين الأيقونة والكارت في LTR */
        }
        html[dir="rtl"] .custom-timeline-icon,
        body[dir="rtl"] .custom-timeline-icon {
          margin-right: 0;
          margin-left: 15px; /* RTL */
        }

        /* حاوية الكارت النصي */
        .custom-timeline-content {
          flex-grow: 1;
          width: calc(100% - 65px);
          text-align: start;
        }

        /* الفراغ المستخدم في شاشات الكمبيوتر لعمل الشكل المتعرج */
        .custom-timeline-spacer {
          display: none;
        }

        /* === إعدادات الشاشات الكبيرة (كمبيوتر) === */
        @media (min-width: 768px) {
          .custom-timeline-item {
            align-items: center; /* محاذاة في المنتصف عمودياً في الكمبيوتر */
          }
          .custom-timeline-line {
            left: 50%;
            transform: translateX(-50%);
          }
          html[dir="rtl"] .custom-timeline-line,
          body[dir="rtl"] .custom-timeline-line {
            left: auto;
            right: 50%;
            transform: translateX(50%);
          }
          
          .custom-timeline-icon {
            margin: 0 30px !important;
          }
          
          .custom-timeline-spacer {
            display: block;
            width: calc(50% - 40px);
            flex-grow: 0;
          }
          
          .custom-timeline-content {
            width: calc(50% - 40px);
            flex-grow: 0;
          }
          
          /* محاذاة النصوص في الشاشات الكبيرة */
          .item-even .custom-timeline-content { text-align: end; }
          .item-odd .custom-timeline-content { text-align: start; }
          
          html[dir="rtl"] .item-even .custom-timeline-content,
          body[dir="rtl"] .item-even .custom-timeline-content { text-align: start; }
          
          html[dir="rtl"] .item-odd .custom-timeline-content,
          body[dir="rtl"] .item-odd .custom-timeline-content { text-align: end; }
        }
      `}</style>

      <div className="container">
        <div className="row align-items-center">
          
          {/* جزء الخطوات (Timeline) */}
          <div className="col-md-7 text-center mt-3">
            <Motion.h2 
              className="section-title mb-4 fw-bold"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {isLoading ? '...' : (getLangField(processSection, 'title') || 'آلية الطلب')}
            </Motion.h2>
            <Motion.p 
              className="section-desc mb-5 text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isLoading ? '...' : getLangField(processSection, 'content')}
            </Motion.p>

            <div className="custom-timeline-container text-start">
              
              {/* الخط العمودي والخلفية */}
              <div className="custom-timeline-line">
                 <Motion.div 
                   className="bg-primary"
                   style={{ width: '100%', borderRadius: '10px' }}
                   initial={{ height: 0 }}
                   animate={{ height: `${progressHeight}%` }}
                   transition={{ duration: 0.5 }}
                />
              </div>

              {processSteps.map((step, index) => {
                const isActive = activeStepIndex === index;
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={step.id} 
                    className={`custom-timeline-item ${isEven ? 'item-even' : 'item-odd'}`} 
                    onClick={() => setActiveStep(index)} 
                    style={{ cursor: 'pointer' }}
                  >
                    
                    {/* في الشاشات الكبيرة: الفراغ الأيسر للعناصر الفردية */}
                    {!isEven && <div className="custom-timeline-spacer"></div>}

                    {/* الكارت (يظهر قبل الأيقونة إذا كان العنصر زوجياً في الكمبيوتر، وفي الموبايل يظهر دائماً بعد الأيقونة بفضل Flexbox order) */}
                    {isEven && (
                       <div className="custom-timeline-content d-none d-md-block">
                          {renderStepContent(step, isActive)}
                       </div>
                    )}

                    {/* الأيقونة بحجم ثابت ومقاوم للتمدد */}
                    <div className="custom-timeline-icon">
                      <Motion.div 
                        className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm w-100 h-100 ${isActive ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
                        animate={{ scale: isActive ? 1.15 : 1 }}
                      >
                        {step.image_icon ? (
                          <img src={step.image_icon} alt="icon" style={{ width: '25px', height: '25px', filter: isActive ? 'brightness(0) invert(1)' : 'none' }} />
                        ) : (
                          defaultIcons[index % defaultIcons.length]
                        )}
                      </Motion.div>
                    </div>

                    {/* الكارت (للعناصر الفردية في الكمبيوتر، ولجميع العناصر في الموبايل) */}
                      <div className={`custom-timeline-content ${isEven ? 'd-md-none' : ''}`}>
                       {renderStepContent(step, isActive)}
                      </div>

                    {/* في الشاشات الكبيرة: الفراغ الأيمن للعناصر الزوجية */}
                    {isEven && <div className="custom-timeline-spacer"></div>}

                  </div>
                );
              })}
            </div>
          </div>

          {/* جزء هاتف الـ iPhone */}
          <div className="col-md-5 text-center mt-5 mt-md-3 position-relative">
            <div className="iphone-wrapper mx-auto" style={{ maxWidth: '300px' }}>
              <AnimatePresence mode="wait">
                <Motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="position-relative d-inline-block w-100"
                >
                  <img src="assets/iPhone.png" className="img-fluid" alt="iphone" style={{ position: 'relative', zIndex: 2 }} />
                  <Motion.img 
                    src={processSteps[activeStepIndex]?.image} 
                    className="position-absolute"
                    style={{
                      top: '2%', left: '5%', right: '5%', bottom: '2%',
                      width: '90%', height: '96%', objectFit: 'cover',
                      borderRadius: '32px', zIndex: 1
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                </Motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RequestMechanism;