import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const ProviderDocuments = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const docsSection = homeData?.Sections?.[5]; // ID 75: الوثائق المطلوبة

  const docItems = [
    i18n.language === 'en' ? 'Copy of ID or Residency' : 'ـ صورة الهوية أو الإقامة',
    i18n.language === 'en' ? 'Valid Driver\'s License' : 'ـ رخصة قيادة سارية',
    i18n.language === 'en' ? 'Truck Registration (Istimara)' : 'ـ استمارة الشاحنة',
    i18n.language === 'en' ? 'Vehicle Insurance Document' : 'ـ وثيقة تأمين المركبة',
    i18n.language === 'en' ? 'Commercial Register (for companies)' : 'ـ سجل تجاري (للشركات)'
  ];

  return (
    <section>
      <div className="container provider-documents rounded-5 my-5">
        <div className="row align-items-center">
          <div className="col-md-6 px-4">
            <h3 className='login-title'>
              {isLoading ? '...' : getLangField(docsSection, 'title') || 'الوثائق المطلوبة لإتمام التسجيل'}
            </h3>
            <p className='services-card-desc'>
              {isLoading ? '...' : getLangField(docsSection, 'content')}
            </p>
            {docItems.map((item, index) => (
              <div key={index} className='document-li'>{item}</div>
            ))}
            <button className="login-button mt-3">
              {i18n.language === 'en' ? 'Attach Documents Now' : 'إرفاق الوثائق الآن'}
            </button>
          </div>
          <div className="col-md-6">
            <img 
              src={docsSection?.image || "assets/provider-document-img.png"} 
              className='img-fluid provider-document-img w-100' 
              alt="truck" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderDocuments;
