import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { Modal } from 'react-bootstrap';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

// Import required modules
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';

const Partners = () => {
  const { t, i18n } = useTranslation('common');
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedPartner(null), 300); // Clear after fade out
  };

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language && i18n.language.startsWith('en');
    const enField = `${field}_en`;
    const arField = `${field}_ar`;
    
    if (isEn) {
      return item[enField] || item[field];
    } else {
      return item[arField] || item[field];
    }
  };

  const partnersSection = homeData?.Sections?.find(s => s.id === 67);
  const partnerLogos = homeData?.Partners || [];

  // مضاعفة المصفوفة لضمان عمل السلايدر في الشاشات الكبيرة دائماً
  // قمنا بنسخها 5 مرات لضمان تغطية أي شاشة مهما كان حجمها
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  const isEn = i18n.language && i18n.language.startsWith('en');

  // تنظيف شروط العنوان والوصف لتسهيل قراءة الكود
  const renderTitle = () => {
    if (isLoading) return '...';
    if (isEn && partnersSection?.title_en !== partnersSection?.title) return partnersSection?.title_en;
    return partnersSection?.title || t('partners.title');
  };

  const renderContent = () => {
    if (isLoading) return '...';
    if (isEn && partnersSection?.content_en !== partnersSection?.content) return partnersSection?.content_en;
    return partnersSection?.content || t('partners.content');
  };

  return (
    <section>
      <div className="container my-5 text-center">
        <h2 className='parteners-title mb-3'>
          {renderTitle()}
        </h2>
        <p className='parteners-desc mb-5 mx-auto'>
          {renderContent()}
        </p>
      </div>
      
      {/* Use container-fluid for a full-width slider */}
    {/* عرض السلايدر فقط إذا انتهى التحميل وهناك بيانات بالفعل */}
      <div className="container-fluid mb-5">
        {!isLoading && partnerLogos.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={'auto'}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            freeMode={true}
            // إضافات هامة جداً لمراقبة التغييرات في الشاشة
            observer={true}
            observeParents={true}
            className="partners-swiper"
          >
            {duplicatedLogos.map((partner, index) => (
              <SwiperSlide 
                key={`${partner.id}-${index}`} 
                className="d-flex align-items-stretch"
                style={{ width: '279px' }} 
              >
                <div 
                  className="partner-slide text-center w-100" 
                  onClick={() => handlePartnerClick(partner)} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="partner-img-wrapper w-100 d-flex align-items-center justify-content-center" style={{ height: '80px' }}>
                    <img src={partner.image} alt={getLangField(partner, 'title')} className="img-fluid partners-img" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // يمكنك ترك هذا فارغاً أو وضع تصميم "جاري التحميل" لطيف هنا
          <div style={{ height: '80px' }}></div> 
        )}
      </div>

      {/* Partner Detail Modal */}
      <Modal 
        show={showModal} 
        onHide={closeModal} 
        centered 
        className="partner-detail-modal"
        backdrop="static"
      >
        <Modal.Header closeButton style={{ border: 'none' }}>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <div className="partner-modal-img-container mb-4 p-4 rounded-4" style={{ backgroundColor: '#f3f4f6' }}>
            <img 
              src={selectedPartner?.image} 
              alt={getLangField(selectedPartner, 'title')} 
              className="img-fluid" 
              style={{ maxHeight: '150px', objectFit: 'contain' }} 
            />
          </div>
          <h3 className="partner-modal-title mb-3" style={{ color: '#374151', fontWeight: '700' }}>
            {getLangField(selectedPartner, 'title')}
          </h3>
          <p className="partner-modal-content text-muted lh-base">
            {getLangField(selectedPartner, 'content')}
          </p>
        </Modal.Body>
        <Modal.Footer style={{ border: 'none', justifyContent: 'center' }}>
          <button className="btn btn-secondary px-4" onClick={closeModal} style={{ borderRadius: '10px' }}>
            {isEn ? 'Close' : 'إغلاق'}
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Partners;