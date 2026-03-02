import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, onHide, returnPath }) => {
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';

  if (!show) return null;

  const handleLogin = () => {
    onHide();
    navigate('/login', { state: { from: returnPath } });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
          </div>
          <div className="modal-body text-center py-4">
            <div className="mb-4">
              <img 
                src="/assets/login-required.svg" 
                alt="Login Required" 
                style={{ width: '80px', height: '80px', opacity: 0.8 }}
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/295/295128.png'; }}
              />
            </div>
            <h4 className="fw-bold mb-3">
              {isRtl ? 'تسجيل الدخول مطلوب' : 'Login Required'}
            </h4>
            <p className="text-muted mb-4 px-3">
              {isRtl 
                ? 'يجب عليك تسجيل الدخول بحساب عميل لتتمكن من إتمام عملية الحجز وإرسال الطلب.' 
                : 'You must be logged in with a client account to complete the booking and submit your request.'}
            </p>
            <div className="d-grid gap-2 px-4">
              <button 
                className="btn btn-primary py-2 fw-bold" 
                onClick={handleLogin}
                style={{ backgroundColor: '#1a73e8', borderColor: '#1a73e8', borderRadius: '8px' }}
              >
                {isRtl ? 'تسجيل الدخول' : 'Login'}
              </button>
              <button 
                className="btn btn-link text-muted text-decoration-none" 
                onClick={onHide}
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
