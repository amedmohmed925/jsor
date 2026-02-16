import React, { useState } from 'react'
import DriverNavbar from '../components/DriverNavbar'
import Footer from '../../shared/components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons'
const DriverNotifications = () => {
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);

  return (
    <>
        <DriverNavbar />
        <div className="container my-5">
            <h2 className='orders-title'>الإشعارات</h2>
            <label className="form-label mb-1 mt-2">جديدة</label>
            <div className="notifications-container py-3 px-2 rounded-3">
                <div className="notification-item d-flex align-items-start gap-2">
                    <img src="../assets/man.png" className='notification-user-img' alt="user" />
                    <div>
                    <div className="d-flex align-items-center gap-1 mb-1 flex-wrap"><h6 className='document-li m-0'>وافق عبدالعزيز الحايك على</h6><h5 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h5></div>
                    <div className="d-flex gap-1 align-items-center footer-main-sublabel mb-2">
                        <FontAwesomeIcon icon={faClock} />
                        <p className='m-0'>03:48 am</p>
                    </div>
                    <div className="d-flex gap-1">
                        <button type='button' className="services-btn py-1 px-3 text-decoration-none">تجاهل</button>
                        <button type='button' className="login-button py-1 px-3 text-decoration-none">ابدأ الان</button>
                    </div>

                    </div>
                </div>
                <hr />
                <div className="notification-item d-flex align-items-start gap-2">
                    <img src="../assets/man.png" className='notification-user-img' alt="user" />
                    <div>
                    <div className="d-flex align-items-center gap-1 mb-1 flex-wrap"><h6 className='document-li m-0'>لقد قام عبدالعزيز الحامد بإلغاء طلبك</h6><h5 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h5></div>
                    <div className="d-flex gap-1 align-items-center footer-main-sublabel">
                        <FontAwesomeIcon icon={faClock} />
                        <p className='m-0'>03:48 am</p>
                    </div>
                    <div className="d-flex gap-1 mt-1">
                        <button type='button' className="services-btn py-1 px-3 text-decoration-none">تجاهل</button>
                        <button type='button' className="login-button py-1 px-3 text-decoration-none">ابدأ الان</button>
                    </div>
                    </div>
                </div>
            </div>
            <label className="form-label mb-1 mt-2">منذ فترة</label>
            <div className="notifications-container py-3 px-2 rounded-3">
                <div className="notification-item d-flex align-items-start gap-2">
                    <img src="../assets/man.png" className='notification-user-img' alt="user" />
                    <div>
                    <div className="d-flex align-items-center gap-1 mb-1 flex-wrap"><h6 className='document-li m-0'>لقد تم توصيل حمولة عبدالعزيز الحايك</h6><h5 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h5><h6 className='document-li m-0'>يمكنك تقييم هذا العميل</h6></div>
                    <div className="d-flex gap-1 align-items-center footer-main-sublabel mb-2">
                        <FontAwesomeIcon icon={faClock} />
                        <p className='m-0'>03:48 am</p>
                    </div>
                    <div className="d-flex gap-1">
                        <button type='button' className="services-btn py-1 px-3 text-decoration-none">تجاهل</button>
                        <button type='button' className="orange-btn py-1 px-3 text-decoration-none" onClick={() => setShowRating(true)}>تقييم</button>
                    </div>

                    </div>
                </div>
                <hr />
                <div className="notification-item d-flex align-items-start gap-2">
                    <img src="../assets/man.png" className='notification-user-img' alt="user" />
                    <div>
                    <div className="d-flex align-items-center gap-1 mb-1 flex-wrap"><h6 className='document-li m-0'>لديك عرض جديد من عبدالعزيز الحايك على</h6><h5 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h5></div>
                    <div className="d-flex gap-1 align-items-center footer-main-sublabel mb-2">
                        <FontAwesomeIcon icon={faClock} />
                        <p className='m-0'>03:48 am</p>
                    </div>
                    <div className="d-flex gap-1">
                        <button type='button' className="services-btn py-1 px-3 text-decoration-none">تجاهل</button>
                        <button type='button' className="login-button py-1 px-3 text-decoration-none">ابدأ الان</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>
        <Footer />
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
    </>
  )
}

export default DriverNotifications
