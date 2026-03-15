import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { selectTheme, setTheme } from '../../store/slices/uiSlice';
import { useGetNotificationBadgeQuery } from '../../api/site/notificationApi';

const AdminNavbar = () => {
  const location = useLocation();
  const { t } = useTranslation(['common', 'admin']);
  const { user, role, logout } = useAuth();
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  
  // Fetch notification badge count
  const { data: badgeCount } = useGetNotificationBadgeQuery(undefined, {
    pollingInterval: 30000,
  });

  const handleToggleTheme = () => {
    dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Navigation items with translation keys
  const navItems = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.works'), path: '/works' },
    { name: t('navigation.providers'), path: '/service-provider' },
    { name: t('navigation.about'), path: '/about' },
    { name: t('navigation.contact'), path: '/contact' }
  ];

  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-2 navbar-background">
      <div className="container-fluid px-lg-5">
        {/* Logo */}
        <Link to='/'><img src="/assets/logo.png" alt="logo" /></Link>
        
        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Nav List in the middle */}
          <ul className="navbar-nav mx-auto pt-3 pt-md-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link nav-link-custom ${location.pathname === item.path ? 'active' : ''}`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side items (Language, Theme, Profile, Notifications) */}
          <ul className="navbar-nav align-items-lg-center gap-lg-5">
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
            <li className="nav-item d-flex align-items-center gap-2">
                <Link to="/admin/notifications" className="nav-labg-mode position-relative">
                  <img 
                    src="/assets/notification.svg" 
                    alt="notification" 
                    style={currentTheme === 'dark' ? { filter: 'invert(1) brightness(2)' } : {}}
                  />
                  {badgeCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                      {badgeCount}
                    </span>
                  )}
                </Link>
                <div 
                  className="theme-toggle-btn" 
                  onClick={handleToggleTheme} 
                  style={{ cursor: 'pointer' }}
                  title={currentTheme === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
                >
                  {currentTheme === 'light' ? (
                    <i className="fas fa-moon" style={{ fontSize: '18px' }}></i>
                  ) : (
                    <i className="fas fa-sun text-warning" style={{ fontSize: '18px' }}></i>
                  )}
                </div>
                
                <div className="dropdown">
                    <div 
                        className="d-flex gap-2 align-items-center text-decoration-none dropdown-toggle border-0 bg-transparent p-0" 
                        id="adminProfileDropdown"
                        role="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        style={{ cursor: 'pointer' }}
                    >
                        <img 
                            src={user?.avatar || "/assets/user-avatar.png"} 
                            className='user-img border border-white' 
                            alt="user" 
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} 
                            onError={(e) => { e.target.src = "/assets/user-avatar.png" }}
                        />
                        <div className="d-none d-md-block text-start">
                            <h6 className="user-name m-0" style={{ fontSize: '0.9rem' }}>{user?.name || 'Admin'}</h6>
                            <p className="user-desc m-0" style={{ fontSize: '0.75rem' }}>{t(`common:roles.${role}`, 'مشرف')}</p>
                        </div>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 p-2" aria-labelledby="adminProfileDropdown" style={{ borderRadius: '12px', minWidth: '180px' }}>
                        <li>
                            <Link className="dropdown-item d-flex align-items-center gap-2 py-2 rounded-3" to="/admin/dashboard">
                                <i className="fas fa-th-large text-primary"></i>
                                <span>{t('admin:dashboard.title', 'لوحة التحكم')}</span>
                            </Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button className="dropdown-item d-flex align-items-center gap-2 py-2 rounded-3 text-danger border-0 bg-transparent w-100 text-start" onClick={logout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>{t('common:buttons.logout')}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
