import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDriverSignupMutation, useGetListsQuery, useGetCitiesQuery, useGetHomeDataQuery } from '../../api/site/siteApi';

const DriverSignupMain = () => {
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
    country_id: '1',
    city_id: '',
    item1: 1
  });

  const [error, setError] = useState('');
  const { data: homeData, isLoading: homeLoading } = useGetHomeDataQuery();
  const { data: listsData } = useGetListsQuery();
  const { data: citiesData, isLoading: citiesLoading } = useGetCitiesQuery(formData.country_id, {
    skip: !formData.country_id
  });
  const [driverSignup, { isLoading: signupLoading }] = useDriverSignupMutation();

  const driverSection = homeData?.Sections?.find(s => s.id === 110);

  const getLangField = (item, field) => {
    if (!item) return '';
    const enField = `${field}_en`;
    const arField = `${field}_ar`;

    if (isEn && item[enField]) return item[enField];
    if (!isEn && item[arField]) return item[arField];
    if (item[field]) return item[field];

    return '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
      };
      if (name === 'country_id') {
        next.city_id = '';
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const requiredFields = [
      'name', 'last_name', 'username', 'email', 'mobile', 'password', 'password_repeat', 
      'country_id', 'city_id'
    ];

    const missing = requiredFields.filter(f => !String(formData[f] || '').trim());

    if (missing.length > 0) {
      setError(t('auth:register.errors.fillAll'));
      return;
    }

    if (formData.password !== formData.password_repeat) {
      setError(t('auth:register.errors.match'));
      return;
    }

    if (!formData.item1) {
      setError(t('auth:register.errors.terms'));
      return;
    }

    const payload = {
      name: formData.name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      password_repeat: formData.password_repeat,
      country_id: formData.country_id,
      city_id: formData.city_id,
      item1: formData.item1
    };

    try {
      const result = await driverSignup(payload).unwrap();
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
        <h2 className="fw-bold mb-1">
          {homeLoading ? '...' : getLangField(driverSection, 'title') || (isEn ? 'Create Driver Account Now' : 'انشأ حسابك ك سائق الان')}
        </h2>
        <p className="text-muted">
          {homeLoading ? '...' : getLangField(driverSection, 'content') || (isEn ? 'Welcome! Do you want to join us?' : 'مرحباً بك! هل تريد الانضمام إلينا؟')}
        </p>
      </div>

      {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

      <form onSubmit={handleSubmit}>
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

        <div className="mb-3">
          <label className="form-label small">{isEn ? 'Password' : 'كلمة المرور'}</label>
          <div className="position-relative">
            <input name="password" type={showPassword ? 'text' : 'password'} className="form-control form-input py-2" placeholder={isEn ? 'Password' : 'كلمة المرور'} value={formData.password} onChange={handleInputChange} required />
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={`position-absolute top-50 translate-middle-y ${isRtl ? 'start-0 ms-3' : 'end-0 me-3'}`} style={{ cursor: 'pointer', color: '#6c757d' }} onClick={() => setShowPassword(!showPassword)} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small">{isEn ? 'Confirm Password' : 'تأكيد كلمة المرور'}</label>
          <input name="password_repeat" type={showPassword ? 'text' : 'password'} className="form-control form-input py-2" placeholder={isEn ? 'Confirm Password' : 'تأكيد كلمة المرور'} value={formData.password_repeat} onChange={handleInputChange} required />
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <label className="form-label small">{isEn ? 'Country' : 'الدولة'}</label>
            <select name="country_id" className="form-select form-input py-2" value={formData.country_id} onChange={handleInputChange} required>
              <option value="">{isEn ? 'Select Country' : 'اختر الدولة'}</option>
              {listsData?.Country?.map(country => (
                <option key={country.id} value={country.id}>{getLangField(country, 'name')}</option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label small">{isEn ? 'City' : 'المدينة'}</label>
            <select name="city_id" className="form-select form-input py-2" value={formData.city_id} onChange={handleInputChange} required disabled={!formData.country_id || citiesLoading}>
              <option value="">{isEn ? 'Select City' : 'اختر المدينة'}</option>
              {citiesData?.map(city => (
                <option key={city.id} value={city.id}>{getLangField(city, 'name')}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3">
          <input type="checkbox" id="driver-agree" name="item1" checked={formData.item1 === 1} onChange={handleInputChange} />
          <label htmlFor="driver-agree" className="m-0 small">
            {isEn ? 'By creating an account, you agree to our' : 'من خلال إنشاء حساب، فإنك توافق على'} {' '}
            <Link to="/terms" className="text-primary text-decoration-none fw-bold">
              {isEn ? 'Terms and Conditions' : 'الشروط والأحكام'}
            </Link>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill" disabled={signupLoading}>
          {signupLoading ? (isEn ? 'Submitting...' : 'جاري الإرسال...') : (isEn ? 'Create Account' : 'إنشاء الحساب')}
        </button>
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


