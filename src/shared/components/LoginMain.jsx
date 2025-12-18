import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LoginMain = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="login-main bg-white shadow position-relative">
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          <Link to='/'>
          <img src="../assets/logo.png" alt="logo" />
          </Link>
          <h3 className="login-title mt-2 m-0">سجل الدخول إلى حسابك</h3>
          <p className="login-desc m-0">مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة</p>

          {/* Google Login */}
          <div className="google-sign d-flex justify-content-center align-items-center gap-2 mt-2">
            <img src="../assets/google.svg" alt="google" />
            <h4 className="m-0">سجل الدخول باستخدام Google</h4>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>أو</span>
          </div>

          {/* Inputs */}
          <div className="login-form">
            {/* Mobile Number */}
            <div className="mb-2">
              <label className="form-label">الموبايل</label>
              <input
                type="text"
                className="form-control form-input py-2"
                placeholder="الموبايل"
              />
            </div>

            {/* Password */}
            <div className=" position-relative">
              <label className="form-label">كلمة المرور</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-input py-2"
                placeholder="كلمة المرور"
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
                هل نسيت كلمة السر؟
              </Link>
            </div>

            {/* Login Button */}
            <Link to='/'>
            <button className="login-button w-100 py-2 rounded-3">
              تسجيل الدخول
            </button>
            </Link>

            {/* Register Link */}
            <div className="text-center mt-2">
              <span className='not-have'>ليس لديك حساب؟ </span>
              <Link to='/create-account' className="register-link text-decoration-none">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
