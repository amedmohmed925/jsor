import React from 'react';

// Import Material Icons for social media
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/Twitter'; // X is the new name for Twitter
import { Link } from 'react-router-dom';

const Footer = ({ isProviderPage = false }) => {
      return (
    <footer className='py-4'>
        <div className="container">
            {/* General Footer - Hidden on Provider Page */}
            <div className={`d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-3 general-footer ${isProviderPage ? 'd-none' : ''}`}>
                <h3 className='footer-title'>حلول ذكية لشحن وتوصيل البضائع</h3>
                <Link to='/login' className="login-button text-decoration-none">انضم الينا الان</Link>
            </div>
            
            {/* Provider Footer - Only Shown on Provider Page */}
            <div className={`d-flex justify-content-center flex-column align-items-center flex-wrap gap-2 border-bottom pb-3 provider-footer ${!isProviderPage ? 'd-none' : ''}`}>
                <h3 className='login-title'>هل أنت مستعد لبدء العمل وزيادة دخلك؟</h3>
                <Link to='/login' className="login-button text-decoration-none">ابدأ الآن كمزود خدمة</Link>
            </div>
            <div className="row align-items-center">
                <div className="col-md-4 mt-4">
                    <h5 className='footer-main-label'>عن جسور</h5>
                    <p className='footer-main-sublabel'>جسور هي منصة رقمية متخصصة في شحن وتوصيل البضائع عبر الشاحنات، تربط بين العملاء ومقدمي خدمات النقل بكل سهولة وموثوقية. نقدم حلولاً مرنة وآمنة للشركات والأفراد، مع مزايا مثل التأمين على البضائع، التتبع اللحظي، وخدمة عملاء على مدار الساعة. نسعى لبناء تجربة شحن سلسة تعزز الثقة وتدعم الاقتصاد المحلي.</p>
                    <div className="d-flex justify-content-start align-items-center flex-wrap gap-3 mb-4">
                        <img src="../assets/Google Play.png" alt="Google" />
                        <img src="../assets/App Store.png" alt="App" />
                    </div>
                    <div className="d-flex gap-5 align-items-center mb-3">
                            <GitHubIcon  className='fs-2 icon-color'/>
                            <InstagramIcon  className='fs-2 icon-color'/>
                            <FacebookIcon  className='fs-2 icon-color'/>
                            <XIcon  className='fs-2 icon-color'/>
                    </div>
                </div>
                <div className="col-md-2 col-6 pe-md-5 mt-4">
                    <h6 className='mb-3 footer-link-title'>اختصارات</h6>
                    <p className='mb-3 footer-link'>الرئيسية</p>
                    <p className='mb-3 footer-link'>الاعمال</p>
                    <p className='mb-3 footer-link'>مقدمي الخدمات</p>
                    <p className='mb-3 footer-link'>عن المنصة</p>
                </div>
                <div className="col-md-1 d-none d-md-block"></div>
                <div className="col-md-2 col-6 pe-md-4 mt-4">
                    <h6 className='mb-3 footer-link-title'>اختصارات</h6>
                    <p className='mb-3 footer-link'>الرئيسية</p>
                    <p className='mb-3 footer-link'>الاعمال</p>
                    <p className='mb-3 footer-link'>مقدمي الخدمات</p>
                    <p className='mb-3 footer-link'>عن المنصة</p>
                </div>
                <div className="col-md-1 d-none d-md-block"></div>
                <div className="col-md-2 col-6 pe-md-4 mt-4">
                    <h6 className='mb-3 footer-link-title'>اختصارات</h6>
                    <p className='mb-3 footer-link'>الرئيسية</p>
                    <p className='mb-3 footer-link'>الاعمال</p>
                    <p className='mb-3 footer-link'>مقدمي الخدمات</p>
                    <p className='mb-3 footer-link'>عن المنصة</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;