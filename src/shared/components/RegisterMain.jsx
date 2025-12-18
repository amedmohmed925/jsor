import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RegisterMain = () => {
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
          <h3 className="login-title mt-2 m-0">انشأ حسابك الان</h3>
          <p className="login-desc m-0">مرحباً بك! هل تريد الانضمام إلينا؟</p>

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
            <div className="row">
                <div className="col-md-6">
                <div className="mb-2">
              <label className="form-label">الاسم الأول</label>
              <input
                type="text"
                className="form-control form-input py-2"
                placeholder="الاسم الأول"
              />
            </div>
                </div>
                <div className="col-md-6">
                <div className="mb-2">
              <label className="form-label">اسم العائلة</label>
              <input
                type="text"
                className="form-control form-input py-2"
                placeholder="اسم العائلة"
              />
            </div>
                </div>
            </div>


            <div className="mb-2">
              <label className="form-label">البريد الإلكتروني</label>
              <input
                type="email"
                className="form-control form-input py-2"
                placeholder="البريد الإلكتروني"
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

            <div className="mt-2 mb-3">
              <label className="form-label">الدولة</label>
              <input
                type="email"
                className="form-control form-input py-2"
                placeholder="الدولة"
              />
            </div>

            <div className="d-flex align-items-center gap-1 mb-3">
              <input
                type="checkbox"
                id="agree"
              />
              <label htmlFor="agree" className="not-have m-0">
                من خلال إنشاء حساب، فإنك توافق على{' '}
                <a href="#" className="text-decoration-none register-link">الشروط والأحكام</a> الخاصة بنا
              </label>
            </div>

            {/* Login Button */}
            <Link to='/login'>
            <button className="login-button w-100 py-2 rounded-3">
              تسجيل الدخول
            </button>
            </Link>

            {/* Register Link */}
            <div className="text-center mt-2">
              <span className='not-have'>لديك حساب من قبل ؟ </span>
              <Link to='/login' className="register-link text-decoration-none">
              سجل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMain;
