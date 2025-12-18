import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDown, faArrowDownLong, faDotCircle, faCircleDot, faCircle, faCaretDown, faChevronDown, faChevronUp, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';

const DriverOrdersMain = () => {
  // State for tracking active sub-filter
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [activeSubFilter, setActiveSubFilter] = useState('new-request');
  
  // State for tracking if offers section is expanded
  const [offersExpanded, setOffersExpanded] = useState(false);
  
  // Sub filters data (removed cancelled)
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
    }
  ];
  
  // Handle sub-filter click
  const handleSubFilterClick = (filterId) => {
    setActiveSubFilter(filterId);
  };

  // Function to render the appropriate card based on sub-filter
  const renderOrderCard = () => {
    // New Request
    if (activeSubFilter === 'new-request') {
      return (
       <>
         <div className="new-orders-card p-2 border rounded-3 mt-2">
          <div className="card-order-details pb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <h3 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h3>
                <div className='d-flex gap-2 align-items-center'>
                <div className='not-have'>منذ 10 دقائق</div>
                <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">طلب جديد</div>
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
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
                <h6 className='user-desc m-0'>03-06-2025</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>08:00</h6>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2">
                    <img src="../../assets/distance.svg" alt="distance" />
                    <p className="orders-card-title mb-2">33 كلم</p>
                    <FontAwesomeIcon icon={faCircle} className='dot-gray-8' />
                    <img src="../../assets/box.svg" alt="distance" />
                    <p className="orders-card-title mb-2">أثاث منزلي</p>
                </div>
              {/* <div className="d-flex justify-content-between text-center align-items-center w-100 mb-1">
                <div>
                  <h6 className='user-desc m-0 mt-1'>نوع الشاحنة</h6>
                  <p className='footer-main-sublabel m-0'>تريلا</p>
                </div>
                <div>
                  <h6 className='user-desc m-0 mt-1'>حجم الشاحنة</h6>
                  <img src="../../assets/filter-badge-img-1.png" alt="truck" />
                </div>
                <div>
                  <h6 className='user-desc m-0 mt-1'>نوع البضاعة</h6>
                  <p className='footer-main-sublabel m-0'>مواد بناء</p>
                </div>
                <div>
                  <h6 className='user-desc m-0 mt-1'>قيمة البضاعة</h6>
                  <p className='footer-main-sublabel m-0'>500</p>
                </div>
              </div> */}
              <h3 className='orders-card-title m-0'>ادخل السعر المناسب لك</h3>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                <div className="d-flex align-items-center flex-wrap gap-2">
                <input
                        type="text"
                        className="form-control form-input py-2 blue-input"
                        placeholder="500" style={{width:'200px'}}
                        />
                    <button type='button' className="login-button text-nowrap text-decoration-none">التقدم ب  120$</button>
                    <button type='button' className="login-button text-nowrap text-decoration-none">التقدم ب  150$</button>

                </div>
                <div className="code-badge d-flex align-items-center gap-2">
                التفاصيل
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="new-orders-card p-2 border rounded-3 mt-2">
          <div className="card-order-details pb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <h3 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h3>
                <div className='d-flex gap-2 align-items-center'>
                <div className='not-have'>منذ 10 دقائق</div>
                <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">طلب جديد</div>
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
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
                <h6 className='user-desc m-0'>03-06-2025</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>08:00</h6>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2">
                    <img src="../../assets/distance.svg" alt="distance" />
                    <p className="orders-card-title mb-2">33 كلم</p>
                    <FontAwesomeIcon icon={faCircle} className='dot-gray-8' />
                    <img src="../../assets/box.svg" alt="distance" />
                    <p className="orders-card-title mb-2">أثاث منزلي</p>
                </div>
              {/* <div className="d-flex justify-content-between text-center align-items-center w-100 mb-1">
                <div>
                  <h6 className='user-desc m-0 mt-1'>نوع الشاحنة</h6>
                  <p className='footer-main-sublabel m-0'>تريلا</p>
                </div>
                <div>
                  <h6 className='user-desc m-0 mt-1'>حجم الشاحنة</h6>
                  <img src="../../assets/filter-badge-img-1.png" alt="truck" />
                </div>
                <div>
                  <h6 className='user-desc m-0 mt-1'>نوع البضاعة</h6>
                  <p className='footer-main-sublabel m-0'>مواد بناء</p>
                </div>
                <div>
                  <h6 className='user-desc m-0 mt-1'>قيمة البضاعة</h6>
                  <p className='footer-main-sublabel m-0'>500</p>
                </div>
              </div> */}
              <h3 className='orders-card-title m-0'>ادخل السعر المناسب لك</h3>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                <div className="d-flex align-items-center flex-wrap gap-2">
                <input
                        type="text"
                        className="form-control form-input py-2 blue-input"
                        placeholder="500" style={{width:'200px'}}
                        />
                    <button type='button' className="login-button text-nowrap text-decoration-none">التقدم ب  120$</button>
                    <button type='button' className="login-button text-nowrap text-decoration-none">التقدم ب  150$</button>

                </div>
                <div className="code-badge d-flex align-items-center gap-2">
                التفاصيل
                </div>
              </div>
            </div>
          </div>
          
        </div>
       </>
      );
    } 
    // Waiting
    else if (activeSubFilter === 'waiting') {
      return (
        <div className="waiting-orders-card">
          <div className="card-order-details p-2 border rounded-3 mt-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <div>
                  <h3 className='orders-card-title m-0 mb-1'>طلب توصيل أثاث منزلي</h3>
                  <h5 className='footer-link m-0'>العميل</h5>
                </div>
                <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                  <FontAwesomeIcon icon={faCircle} className='dot-orange' /> قيد الشحن
                </div>
              </div>
              <div className="d-flex gap-2 align-items-start">
                <img src="../../assets/man.png" className='user-img' alt="user" />
                <div>
                  <div className="d-flex gap-1 align-items-center">
                    <h6 className="user-name m-0">Omar alrajihi</h6>
                    <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                  </div>
                  <p className="user-desc m-0">الرياض</p>
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
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
                <h6 className='user-desc m-0'>03-06-2025</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>08:00</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                <div className="d-flex align-items-center gap-2">
                  <Link to='/tracking' className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2">
                    <h6 className='offers-dropdown-text m-0'>تتبع موقعك</h6>
                  </Link>
                  <div className="contact-driver-button">
                    <p className='m-0'>الاتصال بالعميل</p>
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
                  <h5 className='footer-link m-0'>العميل</h5>
                </div>
                <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                  <FontAwesomeIcon icon={faCircle} className='dot-orange' /> قيد الشحن
                </div>
              </div>
              <div className="d-flex gap-2 align-items-start">
                <img src="../../assets/man.png" className='user-img' alt="user" />
                <div>
                  <div className="d-flex gap-1 align-items-center">
                    <h6 className="user-name m-0">Omar alrajihi</h6>
                    <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                  </div>
                  <p className="user-desc m-0">الرياض</p>
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
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
                <h6 className='user-desc m-0'>03-06-2025</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>08:00</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                <div className="d-flex align-items-center gap-2">
                  <Link to='/tracking' className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2">
                    <h6 className='offers-dropdown-text m-0'>تتبع موقعك</h6>
                  </Link>
                  <div className="contact-driver-button">
                    <p className='m-0'>الاتصال بالعميل</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } 
    // Shipped
    else if (activeSubFilter === 'shipped') {
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
                  <h5 className='footer-link'>العميل</h5>
                  <div className="d-flex gap-2 align-items-start">
                    <img src="../../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">الرياض</p>
                    </div>
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
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
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
                    <p className='m-0'>تقييم العميل</p>
                  </div>
                  <div className="code-badge d-flex align-items-center gap-2">
                التفاصيل
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
                  <h5 className='footer-link'>العميل</h5>
                  <div className="d-flex gap-2 align-items-start">
                    <img src="../../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">الرياض</p>
                    </div>
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
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
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
                    <p className='m-0'>تقييم العميل</p>
                  </div>
                  <div className="code-badge d-flex align-items-center gap-2">
                التفاصيل
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Default case
    return <div className="alert alert-info">لا توجد طلبات في هذا القسم</div>;
  };

  return (
    <section>
      <h4 className="orders-title">الطلبات</h4>
      
      {/* Sub Filters */}
      <div className="orders-sub-filter row align-items-center justify-content-between mt-2 border-bottom">
        {subFilters.map((filter) => (
          <div key={filter.id} className="col-lg-3 col-md-6">
            <div 
              className={`sub-filter-item d-flex justify-content-center gap-1 align-items-center ${activeSubFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleSubFilterClick(filter.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={`../../assets/${activeSubFilter === filter.id ? filter.icon.replace('.svg', '-active.svg') : filter.icon}`} 
                alt={filter.label} 
              />                
              <h6 className='sub-filter-text m-0'>{filter.label}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Render appropriate card based on sub-filter */}
      {renderOrderCard()}
      {showRating && (
        <div className="rating-overlay" onClick={() => setShowRating(false)}>
          <div
            className="rating-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Driver Info */}
            <img src="../../assets/man.png" className="rating-user-img" alt="" />
            <h4 className="orders-card-title mb-2">Omar Alrajihi</h4>
            <h4 className="user-desc mb-2">الرياض</h4>
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
            <p className="orders-title mb-2">يرجى تقييم العميل</p>
            <h4 className="user-desc mb-2">كيف كانت تجربة العميل يرجى تقييمه</h4>

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

export default DriverOrdersMain;