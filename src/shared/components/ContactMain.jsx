import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery, useSubmitContactMutation } from '../../api/site/siteApi';
import { toast } from 'react-toastify';

const ContactMain = () => {
  const { i18n } = useTranslation();
  const { data: homeData, isLoading: isHomeLoading } = useGetHomeDataQuery();
  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: ''
  });

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const contactSection = homeData?.Sections?.find(section => section.id === 71);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.body) {
      toast.error(i18n.language === 'en' ? 'Please fill all fields' : 'يرجى ملء جميع الحقول');
      return;
    }

    try {
      const response = await submitContact(formData).unwrap();
      if (response.status === 1) {
        toast.success(i18n.language === 'en' ? 'Message sent successfully' : 'تم إرسال الرسالة بنجاح');
        setFormData({ name: '', email: '', body: '' });
      } else {
        toast.error(response.message || (i18n.language === 'en' ? 'Failed to send message' : 'فشل في إرسال الرسالة'));
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error(i18n.language === 'en' ? 'An error occurred. Please try again later.' : 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.');
    }
  };

  return (
    <section className='pt-md-5 pb-5'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mt-4">
            <h2 className='contact-main-title'>
              {isHomeLoading ? '...' : getLangField(contactSection, 'title') || 'تواصل معنا'}
            </h2>
            <p className='contact-main-desc'>
              {isHomeLoading ? '...' : getLangField(contactSection, 'content')}
            </p>
            <form onSubmit={handleSubmit} className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control form-input py-2"
                    placeholder={i18n.language === 'en' ? 'Name' : 'الاسم'}
                  />
                </div>
              </div>
              {/* الهاتف الموجود في الفورم قم بتهميشه ك كومنت كما طلب المستخدم */}
              {/* 
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder={i18n.language === 'en' ? 'Phone Number*' : 'رقم الجوال*'}
                  />
                </div>
              </div> 
              */}
              <div className="col-12">
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-input py-2"
                    placeholder={i18n.language === 'en' ? 'Email Address*' : 'عنوان البريد الإلكتروني*'}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <textarea 
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows="5" 
                    className="form-control form-input" 
                    placeholder={i18n.language === 'en' ? 'Share your problems or inquiries here' : 'شاركنا مشاكلك أو استفساراتك هنا'}
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="login-button w-100 py-2 rounded-3"
                >
                  {isSubmitting 
                    ? (i18n.language === 'en' ? 'Sending...' : 'جاري الإرسال...') 
                    : (i18n.language === 'en' ? 'Send' : 'إرسال')}
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 mt-4">
            <img 
              src={contactSection?.image || "assets/contact-man-img.png"} 
              className='img-fluid w-100 contact-man-img' 
              alt="contact" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;
