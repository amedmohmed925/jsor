import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WorksMain = () => {
  const { t, i18n } = useTranslation(['common', 'auth']);
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const worksMainSection = homeData?.Sections?.[10]; // ID 70: ما هي خدمة الأعمال؟

  return (
    <section className=''>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mt-4 order-2 order-md-1">
            <div className="shadow p-3 rounded-4 h-100">
              <h2 className='services-card-title mb-3'>{i18n.language === 'en' ? 'Choose Service' : 'اختر الخدمة'}</h2>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label mb-1">{t('auth:register.name')}</label>
                    <input
                      type="text"
                      className="form-control form-input py-2"
                      placeholder={t('auth:register.name')}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label mb-1">{t('auth:register.phone')}</label>
                    <input
                      type="text"
                      className="form-control form-input py-2"
                      placeholder={t('auth:register.phone')}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label mb-1">{i18n.language === 'en' ? 'Required Service' : 'الخدمة المطلوبة'}</label>
                    <div className="select-wrapper position-relative">
                      <select className="form-select form-input py-2 pe-3">
                        <option value="طلب تعاقد ">{i18n.language === 'en' ? 'Contract Request' : 'طلب تعاقد '}</option>
                      </select>
                      <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
                        <ExpandMoreIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <div className="works-note">
                      <h3 className='footer-link-title'>{i18n.language === 'en' ? 'Note' : 'ملاحظة'}</h3>
                      <p className='footer-link m-0'>{i18n.language === 'en' ? 'You may receive a response within 48 hours' : 'قد تتلقى الرد خلال 48 ساعة'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-start">
                  <button className="login-button py-2 rounded-3">
                    {i18n.language === 'en' ? 'Send Request' : 'ارسال الطلب'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4 order-1 order-md-2">
            <div className='h-100 position-relative'>
              <div className="works-overlay rounded-4"></div>
              <div className="works-img-texts px-4">
                <img src="assets/logo.png" alt="logo" />
                <h5>
                  {isLoading ? '...' : getLangField(worksMainSection, 'title') || 'ما هي خدمة الأعمال؟'}
                </h5>
                <h6>
                  {isLoading ? '...' : getLangField(worksMainSection, 'content')}
                </h6>
              </div>
              <img 
                src={worksMainSection?.image || "assets/works-main-img.png"} 
                className='img-fluid w-100 rounded-4 works-main-img' 
                alt="contact" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksMain;
