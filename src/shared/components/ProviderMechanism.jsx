import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

// Import Material Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

const ProviderMechanism = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const mechanismSection = homeData?.Sections?.[6]; // ID 74: آلية الانضمام

  const steps = [
    {
      id: 1,
      icon: <LocationOnOutlinedIcon className='fs-1' />,
      title: i18n.language === 'en' ? 'Registration and Account Creation' : 'التسجيل وإنشاء الحساب',
      description: i18n.language === 'en' ? 'Create your account as a service provider.' : 'قم بإنشاء حسابك كمزود خدمة.'
    },
    {
      id: 2,
      icon: <FullscreenOutlinedIcon className='fs-1' />,
      title: i18n.language === 'en' ? 'Add Truck and Driver Data' : 'إضافة بيانات الشاحنات والسائقين',
      description: i18n.language === 'en' ? 'Add your truck and driver information.' : 'أدخل بيانات شاحنتك وسائقك.'
    },
    {
      id: 3,
      icon: <PaidOutlinedIcon className='fs-1' />,
      title: i18n.language === 'en' ? 'Account Review and Activation' : 'مراجعة الحساب وتفعيله',
      description: i18n.language === 'en' ? 'Wait for administrative review.' : 'انتظر مراجعة الإدارة لحسابك.'
    },
    {
      id: 4,
      icon: <ScheduleOutlinedIcon className='fs-1' />,
      title: i18n.language === 'en' ? 'Start Receiving Orders' : 'البدء في استقبال الطلبات',
      description: i18n.language === 'en' ? 'You are ready to work!' : 'أنت الآن مستعد للعمل!'
    }
  ];

  return (
    <div className="container">
      <section className='request-mechanism rounded-5 py-5'>
        <h2 className="services-card-title text-center">
          {isLoading ? '...' : getLangField(mechanismSection, 'title') || 'آلية الانضمام بخطوات بسيطة'}
        </h2>
        <p className="login-desc text-center">
          {isLoading ? '...' : getLangField(mechanismSection, 'content')}
        </p>
        <div className="row align-items-center">
          <div className="col-md-7 text-center mt-3">
            <div className="flow-chart">
              <div className="flow-content mx-auto">
                {/* Icons Column */}
                <div className="icons-column">
                  {steps.map((step, index) => (
                    <div key={step.id} className="step-icon-container">
                      <div className="step-icon">{step.icon}</div>
                      {index < steps.length - 1 && <div className="step-line"></div>}
                    </div>
                  ))}
                </div>
                
                {/* Content Column */}
                <div className="content-column">
                  {steps.map((step) => (
                    <div key={step.id} className="provider-step-box">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center mt-3">
            <img src="assets/iPhone.png" className='img-fluid' style={{maxHeight:"500px"}} alt="iphone" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderMechanism;
