import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';

const LoginMain = () => {
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

  const loginSection = homeData?.Sections?.[2]; // ID 79: Login description

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
          <h3 className="login-title mt-2 m-0">{t('auth:login.title')}</h3>
          <p className="login-desc m-0">
            {isLoading ? '...' : getLangField(loginSection, 'content') || t('auth:login.description', 'مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة')}
          </p>

          {/* Google Login */}
          <div className="google-sign d-flex justify-content-center align-items-center gap-2 mt-2">
            <img src="assets/google.svg" alt="google" />
            <h4 className="m-0">{t('auth:login.googleLogin', 'سجل الدخول باستخدام Google')}</h4>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>{t('common:buttons.or', 'أو')}</span>
          </div>

          {/* Inputs */}
          <div className="login-form">
            {/* Mobile Number/Email */}
            <div className="mb-2">
              <label className="form-label">{t('auth:login.email')}</label>
              <input
                type="text"
                className="form-control form-input py-2"
                placeholder={t('auth:login.email')}
              />
            </div>

            {/* Password */}
            <div className=" position-relative">
              <label className="form-label">{t('auth:login.password')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-input py-2"
                placeholder={t('auth:login.password')}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={togglePassword}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-start mb-2">
              <Link to='/create-account' className="forgot-link text-decoration-none">
                {t('auth:login.forgotPassword')}
              </Link>
            </div>

            {/* Login Button */}
            <Link to='/'>
              <button className="login-button w-100 py-2 rounded-3">
                {t('auth:login.loginButton')}
              </button>
            </Link>

            {/* Register Link */}
            <div className="text-center mt-2">
              <span className='not-have'>{t('auth:login.noAccount')} </span>
              <Link to='/create-account' className="register-link text-decoration-none">
                {t('auth:login.signUp')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
