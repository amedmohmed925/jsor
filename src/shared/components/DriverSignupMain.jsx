import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDriverSignupMutation, useGetListsQuery, useGetCitiesQuery } from '../../api/site/siteApi';

const DriverSignupMain = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['auth', 'common']);
  const isEn = i18n.language && i18n.language.startsWith('en');
  const isRtl = i18n.dir() === 'rtl';

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    password_repeat: '',
    country_id: '',
    city_id: '',
    license_number: '',
    experience_year: '',
    address: ''
  });

  const [error, setError] = useState('');
  const { data: listsData } = useGetListsQuery();
  const { data: citiesData, isLoading: citiesLoading } = useGetCitiesQuery(formData.country_id, {
    skip: !formData.country_id
  });
  const [driverSignup, { isLoading: signupLoading }] = useDriverSignupMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'country_id') {
      setFormData(prev => ({ ...prev, city_id: '' }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name || !formData.last_name || !formData.email || !formData.mobile || !formData.password || !formData.password_repeat) {
        setError(t('auth:register.errors.fillAll'));
        return;
      }
      if (formData.password !== formData.password_repeat) {
        setError(t('auth:register.errors.match'));
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await driverSignup(formData).unwrap();
      if (result.status === 1) {
        navigate('/activate-account', { state: { email: formData.email } });
      } else {
        setError(result.message || t('auth:register.errors.failed'));
      }
    } catch (err) {
      const backendError = err.data?.message || err.message;
      setError(backendError || t('auth:register.errors.failed'));
    }
  };

  return (
    <div className="login-main bg-white shadow position-relative p-4 rounded-4 w-100" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <div className="text-center mb-4">
        <img src="/assets/logo.png" alt="Jusor Logo" style={{ height: '50px' }} className="mb-3" />
        <h2 className="fw-bold mb-1">{isEn ? 'Create Driver Account Now' : 'انشأ حسابك ك سائق الان'}</h2>
        <p className="text-muted">{isEn ? 'Welcome! Do you want to join us?' : 'مرحباً بك! هل تريد الانضمام إلينا؟'}</p>
      </div>

      {/* Stepper */}
      <div className="d-flex align-items-center justify-content-center position-relative mb-5" style={{ gap: '0' }}>
        <div style={{ 
          position: 'absolute', 
          top: '17px', 
          left: 'calc(50% - 50px)', 
          right: 'calc(50% - 50px)', 
          height: '4px', 
          backgroundColor: '#f0f0f0', 
          zIndex: 0,
          borderRadius: '10px'
        }}></div>
        
        <div className="d-flex flex-column align-items-center" style={{ width: '150px', zIndex: 1 }}>
          <div className={`step-circle ${step === 1 ? 'active' : 'completed'} d-flex align-items-center justify-content-center rounded-circle text-white mb-2`} 
               style={{ width: '35px', height: '35px', backgroundColor: step === 1 ? '#007bff' : '#28a745' }}>
            01
          </div>
          <span className={step === 1 ? 'fw-bold text-primary small' : 'text-muted small'}>{isEn ? 'Personal Information' : 'المعلومات الشخصية'}</span>
        </div>

        <div className="d-flex flex-column align-items-center" style={{ width: '150px', zIndex: 1 }}>
          <div className={`step-circle ${step === 2 ? 'active' : ''} d-flex align-items-center justify-content-center rounded-circle text-white mb-2`} 
               style={{ width: '35px', height: '35px', backgroundColor: step === 2 ? '#007bff' : '#ccc' }}>
            02
          </div>
          <span className={step === 2 ? 'fw-bold text-primary small' : 'text-muted small'}>{isEn ? 'Truck Information' : 'معلومات الشاحنة'}</span>
        </div>
      </div>

      {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

      <form onSubmit={step === 1 ? handleNext : handleSubmit}>
        {step === 1 ? (
          <>
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label small">{isEn ? 'First Name' : 'الاسم الأول'}</label>
                <input name="name" className="form-control form-input py-2" placeholder={isEn ? 'First Name' : 'الاسم الأول'} value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="col-6">
                <label className="form-label small">{isEn ? 'Last Name' : 'اسم العائلة'}</label>
                <input name="last_name" className="form-control form-input py-2" placeholder={isEn ? 'Last Name' : 'اسم العائلة'} value={formData.last_name} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small">{isEn ? 'Username' : 'اسم المستخدم'}</label>
              <input name="username" className="form-control form-input py-2" placeholder={isEn ? 'Username' : 'اسم المستخدم'} value={formData.username} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label small">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
              <input name="email" type="email" className="form-control form-input py-2" placeholder={isEn ? 'Email' : 'البريد الإلكتروني'} value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label small">{isEn ? 'Phone Number' : 'رقم الهاتف'}</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <img src="https://flagcdn.com/w20/sa.png" alt="SA" width="20" className="me-1" />
                </span>
                <input name="mobile" className="form-control form-input py-2 border-start-0" placeholder="05XXXXXXXX" value={formData.mobile} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small">{isEn ? 'Password' : 'كلمة المرور'}</label>
              <div className="position-relative">
                <input name="password" type={showPassword ? 'text' : 'password'} className="form-control form-input py-2" placeholder={isEn ? 'Password' : 'كلمة المرور'} value={formData.password} onChange={handleInputChange} required />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={`position-absolute top-50 translate-middle-y ${isRtl ? 'start-0 ms-3' : 'end-0 me-3'}`} style={{ cursor: 'pointer', color: '#6c757d' }} onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small">{isEn ? 'Confirm Password' : 'تأكيد كلمة المرور'}</label>
              <input name="password_repeat" type={showPassword ? 'text' : 'password'} className="form-control form-input py-2" placeholder={isEn ? 'Confirm Password' : 'تأكيد كلمة المرور'} value={formData.password_repeat} onChange={handleInputChange} required />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2">
              <span>{isEn ? 'Next' : 'التالي'}</span>
              <FontAwesomeIcon icon={isRtl ? faArrowLeft : faArrowRight} />
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label small">{isEn ? 'Country' : 'الدولة'}</label>
              <select name="country_id" className="form-select form-input py-2" value={formData.country_id} onChange={handleInputChange} required>
                <option value="">{isEn ? 'Select Country' : 'اختر الدولة'}</option>
                {listsData?.Country?.map(country => (
                  <option key={country.id} value={country.id}>{isEn ? country.name_en : country.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small">{isEn ? 'City' : 'المدينة'}</label>
              <select name="city_id" className="form-select form-input py-2" value={formData.city_id} onChange={handleInputChange} required disabled={!formData.country_id || citiesLoading}>
                <option value="">{isEn ? 'Select City' : 'اختر المدينة'}</option>
                {citiesData?.map(city => (
                  <option key={city.id} value={city.id}>{isEn ? city.name_en : city.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small">{isEn ? 'License Number' : 'رقم الرخصة'}</label>
              <input name="license_number" className="form-control form-input py-2" placeholder={isEn ? 'License Number' : 'رقم الرخصة'} value={formData.license_number} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label small">{isEn ? 'Years of Experience' : 'سنوات الخبرة'}</label>
              <input name="experience_year" type="number" className="form-control form-input py-2" placeholder={isEn ? 'Years of Experience' : 'سنوات الخبرة'} value={formData.experience_year} onChange={handleInputChange} required />
            </div>

            <div className="mb-4">
              <label className="form-label small">{isEn ? 'Address' : 'العنوان'}</label>
              <textarea name="address" className="form-control form-input py-2" rows="2" placeholder={isEn ? 'Address' : 'العنوان'} value={formData.address} onChange={handleInputChange} required></textarea>
            </div>

            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary w-100 py-2 rounded-pill" onClick={handleBack}>
                {isEn ? 'Back' : 'رجوع'}
              </button>
              <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill" disabled={signupLoading}>
                {signupLoading ? (isEn ? 'Submitting...' : 'جاري الإرسال...') : (isEn ? 'Create Account' : 'إنشاء الحساب')}
              </button>
            </div>
          </>
        )}
      </form>

      <div className="text-center mt-4 pt-2">
        <p className="text-muted small">
          {isEn ? 'Already have an account?' : 'لديك حساب من قبل ؟'} {' '}
          <Link to="/login" className="text-primary text-decoration-none fw-bold">{isEn ? 'Login' : 'سجل الدخول'}</Link>
        </p>
      </div>
    </div>
  );
};

export default DriverSignupMain;
