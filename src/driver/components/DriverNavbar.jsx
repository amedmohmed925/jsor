import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { selectTheme, setTheme } from '../../store/slices/uiSlice';
import { useGetNotificationBadgeQuery } from '../../api/site/notificationApi';

const DriverNavbar = () => {
  const location = useLocation();
  const { t } = useTranslation('common');
  const { user, role } = useAuth();
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

          {/* Right side items (Language, Profile, Notifications) */}
          <ul className="navbar-nav align-items-lg-center gap-lg-5">
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
            <li className="nav-item d-flex align-items-center gap-2">
                <Link to="/driver/notifications" className="nav-labg-mode position-relative">
                  <img src="/assets/notification.svg" alt="notification" />
                  {badgeCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                      {badgeCount}
                    </span>
                  )}
                </Link>
                <div className="nav-labg-mode" onClick={handleToggleTheme} style={{ cursor: 'pointer' }}>
                  <img src="/assets/moon.svg" alt="mode" />
                </div>
                <Link to="/driver/profile" className="d-flex gap-2 align-items-center text-decoration-none">
                    <img src={user?.avatar || "/assets/man.png"} className='user-img' alt="user" />
                    <div className="d-none d-md-block">
                        <h6 className="user-name m-0">{user?.name || 'Habib M'}</h6>
                        <p className="user-desc m-0">{t(`roles.${role}`, 'جديد')}</p>
                    </div>
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DriverNavbar;