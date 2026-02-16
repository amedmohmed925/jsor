import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const RegisterMain = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation(['auth', 'common']);
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  // Helper to get localized field from API
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language === 'en';
    const enField = `${field}_en`;
    return (isEn && item[enField]) ? item[enField] : item[field];
  };

  const registerSection = homeData?.Sections?.[1]; // ID 80: Register Driver description

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="login-main bg-white shadow position-relative">
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          <Link to='/'>
            <img src="assets/logo.png" alt="logo" />
          </Link>
          <h3 className="login-title mt-2 m-0">{t('auth:register.title', 'انشأ حسابك الان')}</h3>
          <p className="login-desc m-0">
            {isLoading ? '...' : getLangField(registerSection, 'content') || t('auth:register.description', 'مرحباً بك! هل تريد الانضمام إلينا؟')}
          </p>

          {/* Google Login */}
          <div className="google-sign d-flex justify-content-center align-items-center gap-2 mt-2">
            <img src="assets/google.svg" alt="google" />
            <h4 className="m-0">{t('auth:login.googleLogin')}</h4>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>{t('common:buttons.or')}</span>
          </div>

          {/* Inputs */}
          <div className="login-form">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2">
                  <label className="form-label">{t('auth:register.firstName')}</label>
                  <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder={t('auth:register.firstName')}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2">
                  <label className="form-label">{t('auth:register.lastName')}</label>
                  <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder={t('auth:register.lastName')}
                  />
                </div>
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">{t('auth:register.email')}</label>
              <input
                type="email"
                className="form-control form-input py-2"
                placeholder={t('auth:register.email')}
              />
            </div>

            {/* Password */}
            <div className=" position-relative">
              <label className="form-label">{t('auth:register.password')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-input py-2"
                placeholder={t('auth:register.password')}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={togglePassword}
              />
            </div>

            <div className="mt-2 mb-3">
              <label className="form-label">{t('auth:register.country')}</label>
              <input
                type="text"
                className="form-control form-input py-2"
                placeholder={t('auth:register.country')}
              />
            </div>

            <div className="d-flex align-items-center gap-1 mb-3">
              <input
                type="checkbox"
                id="agree"
              />
              <label htmlFor="agree" className="not-have m-0">
                {i18n.language === 'en' ? 'By creating an account, you agree to our ' : 'من خلال إنشاء حساب، فإنك توافق على '}
                <a href="#" className="text-decoration-none register-link">
                  {i18n.language === 'en' ? 'Terms and Conditions' : 'الشروط والأحكام'}
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Link to='/login'>
              <button className="login-button w-100 py-2 rounded-3">
                {t('auth:register.signUpButton')}
              </button>
            </Link>

            {/* Login Link */}
            <div className="text-center mt-2">
              <span className='not-have'>{t('auth:register.alreadyHaveAccount')} </span>
              <Link to='/login' className="register-link text-decoration-none">
                {t('auth:register.loginLink')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMain;
