import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

// Import Material Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const RequestMechanism = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const processSection = homeData?.Sections?.[17]; // ID 31: آلية الطلب
  const processSteps = homeData?.Process || [];

  // Default icons mapping if needed
  const defaultIcons = [
    <LocationOnOutlinedIcon className="fs-1" key="loc" />,
    <FullscreenOutlinedIcon className="fs-1" key="full" />,
    <PaidOutlinedIcon className="fs-1" key="paid" />,
    <ScheduleOutlinedIcon className="fs-1" key="sched" />,
    <PhoneOutlinedIcon className="fs-1" key="phone" />
  ];

  return (
    <section className="request-mechanism py-5">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-7 text-center mt-3">
            <h2 className="section-title">
              {isLoading ? '...' : (getLangField(processSection, 'title') || 'آلية الطلب')}
            </h2>
            <p className="section-desc">
              {isLoading ? '...' : getLangField(processSection, 'content')}
            </p>
            <div className="flow-chart">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flow-step">
                  {/* Left box for even steps (starting with index 0) */}
                  {index % 2 === 0 && (
                    <div className="step-box left-box">
                      <h3>{getLangField(step, 'title')}</h3>
                      <p>{getLangField(step, 'content')}</p>
                    </div>
                  )}
                  
                  {/* Empty space for odd steps */}
                  {index % 2 !== 0 && <div className="empty-space"></div>}
                  
                  {/* Center icon with line */}
                  <div className="step-icon-container">
                    <div className="step-icon">
                      {step.image ? (
                        <img 
                          src={step.image} 
                          alt={getLangField(step, 'title')} 
                          style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
                        />
                      ) : (
                        defaultIcons[index % defaultIcons.length]
                      )}
                    </div>
                    {index < processSteps.length - 1 && <div className="step-line"></div>}
                  </div>
                  
                  {/* Right box for odd steps */}
                  {index % 2 !== 0 && (
                    <div className="step-box right-box">
                      <h3>{getLangField(step, 'title')}</h3>
                      <p>{getLangField(step, 'content')}</p>
                    </div>
                  )}
                  
                  {/* Empty space for even steps */}
                  {index % 2 === 0 && <div className="empty-space"></div>}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 text-center mt-3">
            <img src="assets/iPhone.png" className="img-fluid" alt="iphone" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestMechanism;
