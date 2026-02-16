import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDown, faArrowDownLong, faDotCircle, faCircleDot, faCircle, faCaretDown, faChevronDown, faChevronUp, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';

const OrdersMain = () => {
  // State for tracking active main filter and sub-filter
  const [showRating, setShowRating] = useState(false);
const [rating, setRating] = useState(0);

  const [activeMainFilter, setActiveMainFilter] = useState('basic-orders');
  const [activeSubFilter, setActiveSubFilter] = useState('new-request');
  
  // State for tracking if offers section is expanded
  const [offersExpanded, setOffersExpanded] = useState(false);
  
  // Main filters data
  const mainFilters = [
    {
      id: 'basic-orders',
      label: 'طلبات عادية'
    },
    {
      id: 'trip-orders',
      label: 'طلب باقة رحلات'
    },
    {
      id: 'contract-orders',
      label: 'طلب باقة عقد'
    }
  ];
  
  // Sub filters data
  const subFilters = [
    {
      id: 'new-request',
      label: 'طلب جديد',
      icon: 'subfilter-icon-1.svg'
    },
    {
      id: 'waiting',
      label: 'قيد الانتظار',
      icon: 'subfilter-icon-2.svg'
    },
    {
      id: 'shipped',
      label: 'تم الشحن',
      icon: 'subfilter-icon-3.svg'
    },
    {
      id: 'cancelled',
      label: 'ملغي',
      icon: 'subfilter-icon-4.svg'
    }
  ];
  
  // Handle main filter change
  const handleMainFilterChange = (filterId) => {
    setActiveMainFilter(filterId);
    // Reset sub-filter to first option when main filter changes
    setActiveSubFilter('new-request');
    // Reset offers expanded state when changing filters
    setOffersExpanded(false);
  };
  
  // Handle sub-filter click
  const handleSubFilterClick = (filterId) => {
    setActiveSubFilter(filterId);
    // Reset offers expanded state when changing sub-filters
    setOffersExpanded(false);
  };
  
  // Toggle offers section
  const toggleOffers = () => {
    setOffersExpanded(!offersExpanded);
  };

  // Function to render the appropriate card based on both filters
  const renderOrderCard = () => {
    // Basic Orders
    if (activeMainFilter === 'basic-orders') {
      if (activeSubFilter === 'new-request') {
        return (
          <div className="new-orders-card p-2 border rounded-3 mt-2">
            <div className="card-order-details border-bottom pb-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <h3 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h3>
                  <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">طلب جديد</div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex justify-content-between text-center align-items-center w-100 mb-1">
                  <div>
                    <h6 className='user-desc m-0 mt-1'>نوع الشاحنة</h6>
                    <p className='footer-main-sublabel m-0'>تريلا</p>
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>حجم الشاحنة</h6>
                    <img src="../assets/filter-badge-img-1.png" alt="truck" />
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>نوع البضاعة</h6>
                    <p className='footer-main-sublabel m-0'>مواد بناء</p>
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>قيمة البضاعة</h6>
                    <p className='footer-main-sublabel m-0'>500</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2" onClick={toggleOffers} style={{ cursor: 'pointer' }}>
                    <h6 className='offers-dropdown-text m-0'>العروض</h6>
                    <FontAwesomeIcon icon={offersExpanded ? faChevronUp : faChevronDown} />
                  </div>
                  <div className="cancel-order-btn">
                    <p className='m-0'>الغاء الطلب</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Offers section - now conditional based on offersExpanded state */}
            {offersExpanded && (
              <div className="orders-new-offers">
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <h5 className='orders-card-title m-0'>العروض المستلمة (02)</h5>
                  <div className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faCircle} className='dot-green' />
                    <p className="orders-status m-0">تلقي العروض</p>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق تريلا</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>تريلا</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 250</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق تريلا</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>تريلا</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 300</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق تريلا</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>تريلا</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 500</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      } else if (activeSubFilter === 'waiting') {
        return (
          <div className="waiting-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                    <h5 className='footer-link m-0'>مقدم الخدمة</h5>
                  </div>
                  <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                    <FontAwesomeIcon icon={faCircle} className='dot-orange' /> قيد الشحن
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Omar alrajihi</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق تريلا</p>
                  </div>
                </div>
                <h5 className='footer-link m-0'>الشاحنة</h5>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                  <h6 className='driver-truck-type m-0'>تريلا</h6>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
                    <Link to='/user/tracking' className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>تتبع الحمولة</h6>
                    </Link>
                    <div className="contact-driver-button">
                      <p className='m-0'>الاتصال بالسائق</p>
                    </div>
                  </div>
                  <div className="code-badge d-flex align-items-center gap-2 ms-5">
                    <img src="../assets/document-copy.svg" alt="" />
                    KB438472
                  </div>
                </div>
              </div>
            </div>
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                    <h5 className='footer-link m-0'>مقدم الخدمة</h5>
                  </div>
                  <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                    <FontAwesomeIcon icon={faCircle} className='dot-orange' /> قيد الشحن
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Omar alrajihi</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق تريلا</p>
                  </div>
                </div>
                <h5 className='footer-link m-0'>الشاحنة</h5>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                  <h6 className='driver-truck-type m-0'>تريلا</h6>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
                    <Link to='/tracking' className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>تتبع الحمولة</h6>
                    </Link>
                    <div className="contact-driver-button">
                      <p className='m-0'>الاتصال بالسائق</p>
                    </div>
                  </div>
                  <div className="code-badge d-flex align-items-center gap-2 ms-5">
                    <img src="../assets/document-copy.svg" alt="" />
                    KB438472
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (activeSubFilter === 'shipped') {
        return (
          <div className="shipped-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                  </div>
                  <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">تم الشحن</div>
                </div>
                <div className="d-flex flex-wrap gap-4">
                  <div>
                    <h5 className='footer-link'>مقدم الخدمة</h5>
                    <div className="d-flex gap-2 align-items-start">
                      <img src="../assets/man.png" className='user-img' alt="user" />
                      <div>
                        <div className="d-flex gap-1 align-items-center">
                          <h6 className="user-name m-0">Omar alrajihi</h6>
                          <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                        </div>
                        <p className="user-desc m-0">سائق تريلا</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className='footer-link'>الشاحنة</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>تريلا</h6>
                    </div>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                    <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>الطلب مرة اخرى</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                  </div>
                  <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">تم الشحن</div>
                </div>
                <div className="d-flex flex-wrap gap-4">
                  <div>
                    <h5 className='footer-link'>مقدم الخدمة</h5>
                    <div className="d-flex gap-2 align-items-start">
                      <img src="../assets/man.png" className='user-img' alt="user" />
                      <div>
                        <div className="d-flex gap-1 align-items-center">
                          <h6 className="user-name m-0">Omar alrajihi</h6>
                          <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                        </div>
                        <p className="user-desc m-0">سائق تريلا</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className='footer-link'>الشاحنة</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <img src="../assets/filter-card-img-1.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>تريلا</h6>
                    </div>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                    <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>الطلب مرة اخرى</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (activeSubFilter === 'cancelled') {
        return (
          <div className="cancelled-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                  </div>
                  <div className="cancelled-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">ملغي</div>
                </div>
                <h5 className='footer-link'>مقدم الخدمة</h5>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Omar alrajihi</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق تريلا</p>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                  </div>
                </div>
              </div>
            </div>
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                  </div>
                  <div className="cancelled-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">ملغي</div>
                </div>
                <h5 className='footer-link'>مقدم الخدمة</h5>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Omar alrajihi</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق تريلا</p>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>03-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>08:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    // Trip Orders
    else if (activeMainFilter === 'trip-orders') {
      if (activeSubFilter === 'new-request') {
        return (
          <div className="new-orders-card p-2 border rounded-3 mt-2">
            <div className="card-order-details border-bottom pb-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <h3 className='orders-card-title m-0'>رحلة شحن جماعي</h3>
                  <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">طلب جديد</div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>جدة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>05-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>10:00</h6>
                </div>
                <div className="d-flex justify-content-between text-center align-items-center w-100 mb-1">
                  <div>
                    <h6 className='user-desc m-0 mt-1'>نوع الشاحنة</h6>
                    <p className='footer-main-sublabel m-0'>نقل خفيف</p>
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>حجم الشاحنة</h6>
                    <img src="../assets/filter-badge-img-2.png" alt="truck" />
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>عدد الرحلات</h6>
                    <p className='footer-main-sublabel m-0'>5 رحلات</p>
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>قيمة البضاعة</h6>
                    <p className='footer-main-sublabel m-0'>1000</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2" onClick={toggleOffers} style={{ cursor: 'pointer' }}>
                    <h6 className='offers-dropdown-text m-0'>العروض</h6>
                    <FontAwesomeIcon icon={offersExpanded ? faChevronUp : faChevronDown} />
                  </div>
                  <div className="cancel-order-btn">
                    <p className='m-0'>الغاء الطلب</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Offers section - now conditional based on offersExpanded state */}
            {offersExpanded && (
              <div className="orders-new-offers">
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <h5 className='orders-card-title m-0'>العروض المستلمة (03)</h5>
                  <div className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faCircle} className='dot-green' />
                    <p className="orders-status m-0">تلقي العروض</p>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Ahmed Khalid</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,8 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق نقل خفيف</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-2.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>نقل خفيف</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 150</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Mohammed Ali</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,7 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق نقل خفيف</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-2.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>نقل خفيف</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 180</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Salem Omar</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق نقل خفيف</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-2.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>نقل خفيف</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 200</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      } else if (activeSubFilter === 'waiting') {
        return (
          <div className="waiting-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>رحلة شحن جماعي</h3>
                    <h5 className='footer-link m-0'>مقدم الخدمة</h5>
                  </div>
                  <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                    <FontAwesomeIcon icon={faCircle} className='dot-orange' /> قيد الشحن
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Ahmed Khalid</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,8 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق نقل خفيف</p>
                  </div>
                </div>
                <h5 className='footer-link m-0'>الشاحنة</h5>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/filter-card-img-2.png" className='driver-truck-type-img' alt="truck" />
                  <h6 className='driver-truck-type m-0'>نقل خفيف</h6>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>جدة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>05-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>10:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
                    <Link to='/tracking' className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>تتبع الحمولة</h6>
                    </Link>
                    <div className="contact-driver-button">
                      <p className='m-0'>الاتصال بالسائق</p>
                    </div>
                  </div>
                  <div className="code-badge d-flex align-items-center gap-2 ms-5">
                    <img src="../assets/document-copy.svg" alt="" />
                    TR589432
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (activeSubFilter === 'shipped') {
        return (
          <div className="shipped-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>رحلة شحن جماعي</h3>
                  </div>
                  <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">تم الشحن</div>
                </div>
                <div className="d-flex flex-wrap gap-4">
                  <div>
                    <h5 className='footer-link'>مقدم الخدمة</h5>
                    <div className="d-flex gap-2 align-items-start">
                      <img src="../assets/man.png" className='user-img' alt="user" />
                      <div>
                        <div className="d-flex gap-1 align-items-center">
                          <h6 className="user-name m-0">Mohammed Ali</h6>
                          <div className="new-order-badge p-1 rounded-2 text-nowrap">4,7 <img src="../assets/star.svg" alt="" /></div>
                        </div>
                        <p className="user-desc m-0">سائق نقل خفيف</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className='footer-link'>الشاحنة</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <img src="../assets/filter-card-img-2.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>نقل خفيف</h6>
                    </div>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>جدة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>05-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>10:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                    <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>الطلب مرة اخرى</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (activeSubFilter === 'cancelled') {
        return (
          <div className="cancelled-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>رحلة شحن جماعي</h3>
                  </div>
                  <div className="cancelled-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">ملغي</div>
                </div>
                <h5 className='footer-link'>مقدم الخدمة</h5>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Salem Omar</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق نقل خفيف</p>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>جدة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>05-06-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>10:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    // Contract Orders
    else if (activeMainFilter === 'contract-orders') {
      if (activeSubFilter === 'new-request') {
        return (
          <div className="new-orders-card p-2 border rounded-3 mt-2">
            <div className="card-order-details border-bottom pb-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <h3 className='orders-card-title m-0'>عقد شحن شهري</h3>
                  <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">طلب جديد</div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الدمام</span>
                    <span>مكة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>01-07-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>09:00</h6>
                </div>
                <div className="d-flex justify-content-between text-center align-items-center w-100 mb-1">
                  <div>
                    <h6 className='user-desc m-0 mt-1'>نوع الشاحنة</h6>
                    <p className='footer-main-sublabel m-0'>شاحنة صغيرة</p>
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>حجم الشاحنة</h6>
                    <img src="../assets/filter-badge-img-3.png" alt="truck" />
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>مدة العقد</h6>
                    <p className='footer-main-sublabel m-0'>6 أشهر</p>
                  </div>
                  <div>
                    <h6 className='user-desc m-0 mt-1'>قيمة البضاعة</h6>
                    <p className='footer-main-sublabel m-0'>5000</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2" onClick={toggleOffers} style={{ cursor: 'pointer' }}>
                    <h6 className='offers-dropdown-text m-0'>العروض</h6>
                    <FontAwesomeIcon icon={offersExpanded ? faChevronUp : faChevronDown} />
                  </div>
                  <div className="cancel-order-btn">
                    <p className='m-0'>الغاء الطلب</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Offers section - now conditional based on offersExpanded state */}
            {offersExpanded && (
              <div className="orders-new-offers">
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <h5 className='orders-card-title m-0'>العروض المستلمة (01)</h5>
                  <div className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faCircle} className='dot-green' />
                    <p className="orders-status m-0">تلقي العروض</p>
                  </div>
                </div>
                <div className="driver-applicant card p-2 mt-2">
                  <div className="d-flex gap-2 align-items-start mb-3">
                    <img src="../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Yousef Hassan</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,6 <img src="../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق شاحنة صغيرة</p>
                    </div>
                    <div className="card-type-badge d-flex align-items-center">
                      <img src="../assets/filter-card-img-3.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>شاحنة صغيرة</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='driver-card-price m-0'> $ 800</h4>
                    <button type='button' className="login-button text-decoration-none">قبول العرض</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      } else if (activeSubFilter === 'waiting') {
        return (
          <div className="waiting-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>عقد شحن شهري</h3>
                    <h5 className='footer-link m-0'>مقدم الخدمة</h5>
                  </div>
                  <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                    <FontAwesomeIcon icon={faCircle} className='dot-orange' /> قيد الشحن
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Yousef Hassan</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,6 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق شاحنة صغيرة</p>
                  </div>
                </div>
                <h5 className='footer-link m-0'>الشاحنة</h5>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/filter-card-img-3.png" className='driver-truck-type-img' alt="truck" />
                  <h6 className='driver-truck-type m-0'>شاحنة صغيرة</h6>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الدمام</span>
                    <span>مكة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>01-07-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>09:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
                    <Link to='/tracking' className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>تتبع الحمولة</h6>
                    </Link>
                    <div className="contact-driver-button">
                      <p className='m-0'>الاتصال بالسائق</p>
                    </div>
                  </div>
                  <div className="code-badge d-flex align-items-center gap-2 ms-5">
                    <img src="../assets/document-copy.svg" alt="" />
                    CT789456
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (activeSubFilter === 'shipped') {
        return (
          <div className="shipped-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>عقد شحن شهري</h3>
                  </div>
                  <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">تم الشحن</div>
                </div>
                <div className="d-flex flex-wrap gap-4">
                  <div>
                    <h5 className='footer-link'>مقدم الخدمة</h5>
                    <div className="d-flex gap-2 align-items-start">
                      <img src="../assets/man.png" className='user-img' alt="user" />
                      <div>
                        <div className="d-flex gap-1 align-items-center">
                          <h6 className="user-name m-0">Fahad Nasser</h6>
                          <div className="new-order-badge p-1 rounded-2 text-nowrap">4,8 <img src="../assets/star.svg" alt="" /></div>
                        </div>
                        <p className="user-desc m-0">سائق شاحنة صغيرة</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className='footer-link'>الشاحنة</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <img src="../assets/filter-card-img-3.png" className='driver-truck-type-img' alt="truck" />
                      <h6 className='driver-truck-type m-0'>شاحنة صغيرة</h6>
                    </div>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الدمام</span>
                    <span>مكة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>01-07-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>09:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                    <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2">
                      <h6 className='offers-dropdown-text m-0'>الطلب مرة اخرى</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (activeSubFilter === 'cancelled') {
        return (
          <div className="cancelled-orders-card">
            <div className="card-order-details p-2 border rounded-3 mt-2">
              <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div>
                    <h3 className='orders-card-title m-0 mb-1'>عقد شحن شهري</h3>
                  </div>
                  <div className="cancelled-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">ملغي</div>
                </div>
                <h5 className='footer-link'>مقدم الخدمة</h5>
                <div className="d-flex gap-2 align-items-start">
                  <img src="../assets/man.png" className='user-img' alt="user" />
                  <div>
                    <div className="d-flex gap-1 align-items-center">
                      <h6 className="user-name m-0">Fahad Nasser</h6>
                      <div className="new-order-badge p-1 rounded-2 text-nowrap">4,8 <img src="../assets/star.svg" alt="" /></div>
                    </div>
                    <p className="user-desc m-0">سائق شاحنة صغيرة</p>
                  </div>
                </div>
                <div className="from-to-wrapper">
                  {/* الأيقونات */}
                  <div className="from-to-icons">
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <div className="circle"></div>
                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                    <div className="location-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                  </div>
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الدمام</span>
                    <span>مكة</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                  <h6 className='user-desc m-0'>01-07-2025</h6>
                  <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                  <h6 className='user-desc m-0'>09:00</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                  <div className="d-flex align-items-center gap-2">
<div
  className="contact-driver-button"
  onClick={() => setShowRating(true)}
>
  <p className='m-0'>تقييم السائق</p>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Default case
    return <div className="alert alert-info">لا توجد طلبات في هذا القسم</div>;
  };

  return (
    <section>
      <h4 className="orders-title">الطلبات</h4>
      
      {/* Main Filters */}
      <div className="orders-main-filter d-flex align-items-center gap-4 mt-2">
        {mainFilters.map((filter) => (
          <div key={filter.id} className="main-filter-item d-flex gap-1 align-items-center">
            <input 
              type="radio" 
              id={filter.id} 
              name='orders-main-filter'
              checked={activeMainFilter === filter.id}
              onChange={() => handleMainFilterChange(filter.id)}
            />
            <label 
              className='main-filter-text' 
              htmlFor={filter.id}
            >
              {filter.label}
            </label>
          </div>
        ))}
      </div>
      
      {/* Sub Filters */}
      <div className="orders-sub-filter row align-items-center mt-2 border-bottom">
        {subFilters.map((filter) => (
          <div key={filter.id} className="col-lg-3 col-md-6">
            <div 
              className={`sub-filter-item d-flex justify-content-center gap-1 align-items-center ${activeSubFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleSubFilterClick(filter.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={`../assets/${activeSubFilter === filter.id ? filter.icon.replace('.svg', '-active.svg') : filter.icon}`} 
                alt={filter.label} 
              />                
              <h6 className='sub-filter-text m-0'>{filter.label}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Render appropriate card based on both filters */}
      {renderOrderCard()}
      {showRating && (
  <div className="rating-overlay" onClick={() => setShowRating(false)}>
    <div
      className="rating-modal"
      onClick={(e) => e.stopPropagation()}
    >


      {/* Driver Info */}
      <img src="../assets/man.png" className="rating-user-img" alt="" />
      <h4 className="orders-card-title mb-2">Omar Alrajihi</h4>
      <h4 className="user-desc mb-2">سائق تريلا</h4>
      <div className="flex gap-1 align-items-center">
            <FontAwesomeIcon
                  icon={faStar}
                  className='yellow-star'
                />
            <FontAwesomeIcon
                  icon={faStar}
                  className='yellow-star'
                />
            <FontAwesomeIcon
                  icon={faStar}
                  className='yellow-star'
                />
            <FontAwesomeIcon
                  icon={faStar}
                  className='yellow-star'
                />
            <FontAwesomeIcon
                  icon={faStar}
                  className='yellow-star'
                />
            </div>
      {/* Stars */}
      <p className="orders-title mb-2">ما تقييمك للخدمة</p>
      <h4 className="user-desc mb-2">ستساعدنا ملاحظاتك على تحسين خدمة الشحن بشكل أفضل</h4>

      <div className="stars-wrapper">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={`star ${rating >= star ? "active" : ""}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Comment */}
      <textarea
        className="form-control form-input mb-3"
        placeholder="اكتب تقييمك..."
        rows='5'
      />

      {/* Submit */}
      <button className="login-button w-100">
        تقييم
      </button>
    </div>
  </div>
)}

    </section>
  )
}

export default OrdersMain;