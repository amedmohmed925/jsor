import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetListsQuery, useRegisterCompanyMutation, useGetCitiesByCountryQuery } from '../../api/auth/authApi';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const CompanySignupMain = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['auth', 'common']);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    password_repeat: '',
    country_id: '1', // Default to 1 as per request
    city_id: '',
    item1: 0,
  });

  const { data: homeData, isLoading: homeLoading } = useGetHomeDataQuery();
  const { data: listsData } = useGetListsQuery();
  const { data: citiesData } = useGetCitiesByCountryQuery(formData.country_id, {
    skip: !formData.country_id,
  });
  const [registerCompany, { isLoading: registerLoading }] = useRegisterCompanyMutation();

  const companySection = homeData?.Sections?.find(s => s.id === 111);

  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language?.startsWith('en');
    const enField = `${field}_en`;
    const arField = `${field}_ar`;

    if (isEn && item[enField]) return item[enField];
    if (!isEn && item[arField]) return item[arField];
    if (item[field]) return item[field]; // Fallback to plain field (e.g., 'title' or 'name')

    return '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
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
      setError(t('auth:companySignup.errors.fillAll'));
      return;
    }

    if (formData.password !== formData.password_repeat) {
      setError(t('auth:companySignup.errors.match'));
      return;
    }

    if (!formData.item1) {
      setError(t('auth:companySignup.errors.terms'));
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
      item1: formData.item1,
      account_type: 'company',
    };

    try {
      const result = await registerCompany(payload).unwrap();
      const registerData = result.status === 1 && result.data?.[0]?.status === 1 ? result.data[0] : (result.status === 1 ? result : null);

      if (registerData && (registerData.status === 1 || result.status === 1)) {
        navigate('/activate-account', { state: { email: formData.email } });
      } else {
        const backendMsg = result.data?.[0]?.message || result.message;
        setError(backendMsg || t('auth:companySignup.errors.failed'));
      }
    } catch (err) {
      const backendError = err.data?.data?.[0]?.message || err.data?.message;
      setError(backendError || t('auth:companySignup.errors.failed'));
    }
  };

  return (
    <div className="company-signup-card login-main bg-white shadow position-relative w-100">
      <div className="text-center mb-4">
        <Link to="/" className="d-inline-block">
          <img src="/assets/logo.png" alt="Josur Logo" style={{ height: '52px' }} className="mb-3" />
        </Link>
        <h2 className="login-title m-0">
          {homeLoading ? '...' : getLangField(companySection, 'title') || t('auth:companySignup.title')}
        </h2>
        <p className="login-desc mt-2 mb-0">
          {homeLoading ? '...' : getLangField(companySection, 'content') || t('auth:companySignup.description')}
        </p>
      </div>

      {error && <div className="alert alert-danger py-2 small mb-3 text-center">{error}</div>}

      <form onSubmit={handleSubmit}>
        <h3 className="company-signup-section-title mb-3">{t('auth:companySignup.steps.personal')}</h3>
        
        <div className="row g-2 mb-3">
          <div className="col-6">
            <label className="form-label small">{t('auth:companySignup.fields.firstName')}</label>
            <input
              name="name"
              className="form-control form-input py-2"
              placeholder={t('auth:companySignup.fields.firstName')}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label small">{t('auth:companySignup.fields.lastName')}</label>
            <input
              name="last_name"
              className="form-control form-input py-2"
              placeholder={t('auth:companySignup.fields.lastName')}
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small">{t('auth:companySignup.fields.username')}</label>
          <input
            name="username"
            className="form-control form-input py-2"
            placeholder={t('auth:companySignup.fields.username')}
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label small">{t('auth:companySignup.fields.email')}</label>
          <input
            name="email"
            type="email"
            className="form-control form-input py-2"
            placeholder={t('auth:companySignup.fields.email')}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label small">{t('auth:companySignup.fields.phone')}</label>
          <div className="input-group company-signup-phone-prefix">
            <span className="input-group-text border-end-0">
              <img src="https://flagcdn.com/w20/sa.png" alt="SA" width="20" className="me-1" />
            </span>
            <input
              name="mobile"
              className="form-control form-input py-2 border-start-0"
              placeholder="05XXXXXXXX"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small">{t('auth:companySignup.fields.password')}</label>
          <div className="position-relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="form-control form-input py-2"
              placeholder={t('auth:companySignup.fields.password')}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small">{t('auth:companySignup.fields.confirmPassword')}</label>
          <input
            name="password_repeat"
            type={showPassword ? 'text' : 'password'}
            className="form-control form-input py-2"
            placeholder={t('auth:companySignup.fields.confirmPassword')}
            value={formData.password_repeat}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <label className="form-label small">{t('auth:companySignup.fields.country')}</label>
            <select
              name="country_id"
              className="form-select form-input py-2"
              value={formData.country_id}
              onChange={handleInputChange}
              required
            >
              <option value="">{t('auth:companySignup.fields.selectCountry')}</option>
              {(listsData?.Country || []).map((country) => (
                <option key={country.id} value={country.id}>
                  {getLangField(country, 'name')}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label small">{t('auth:companySignup.fields.city')}</label>
            <select
              name="city_id"
              className="form-select form-input py-2"
              value={formData.city_id}
              onChange={handleInputChange}
              required
              disabled={!formData.country_id}
            >
              <option value="">{t('auth:companySignup.fields.selectCity')}</option>
              {(citiesData || []).map((city) => (
                <option key={city.id} value={city.id}>
                  {getLangField(city, 'name')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3 company-signup-terms">
          <input
            type="checkbox"
            id="company-agree"
            name="item1"
            checked={formData.item1 === 1}
            onChange={handleInputChange}
          />
          <label htmlFor="company-agree" className="m-0">
            {t('auth:companySignup.terms.prefix')} {' '}
            <Link to="/terms" className="text-decoration-none register-link">
              {t('auth:companySignup.terms.link')}
            </Link>
          </label>
        </div>

        <button type="submit" className="login-button w-100 py-2 rounded-3" disabled={registerLoading}>
          {registerLoading ? t('auth:companySignup.buttons.loading') : t('auth:companySignup.buttons.createAccount')}
        </button>
      </form>

      <div className="text-center mt-4 company-signup-login">
        <p className="m-0 small">
          {t('auth:companySignup.haveAccount')} {' '}
          <Link to="/login" className="register-link text-decoration-none fw-bold">
            {t('auth:companySignup.signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanySignupMain;
