import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
const DriverNavbar = () => {
  const location = useLocation();
  
  // Static Arabic navigation items with their corresponding routes
  const navItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الاعمال', path: '/works' },
    { name: 'مزودي الخدمات', path: '/service-provider' },
    { name: 'عن المنصة', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' }
  ];

  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-2 navbar-background">
      <div className="container-fluid px-lg-5">
        {/* Logo */}
        <Link to='/'><img src="../assets/logo.png" alt="logo" /></Link>
        
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

          {/* Right side items (Language, Login, Join) */}
          <ul className="navbar-nav align-items-lg-center gap-lg-5">
            <li className="nav-item">
              <button className="nav-link lang-button">
                English
                <i className="fas fa-globe pe-1"></i>
              </button>
            </li>
            <li className="nav-item d-flex align-items-center gap-2">
                <div className="nav-labg-mode"><img src="../../assets/notification.svg" alt="notification" /></div>
                <div className="nav-labg-mode"><img src="../../assets/moon.svg" alt="mode" /></div>
                <div className="d-flex gap-2 align-items-center">
                    <img src="../../assets/man.png" className='user-img' alt="user" />
                    <div>
                        <h6 className="user-name m-0">Habib M</h6>
                        <p className="user-desc m-0">جديد</p>
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DriverNavbar;