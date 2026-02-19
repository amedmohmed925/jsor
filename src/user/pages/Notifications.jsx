import React, { useState } from 'react'
import UserNavbar from '../components/UserNavbar'
import Footer from '../../shared/components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { useGetNotificationsQuery } from '../../api/site/notificationApi'
import LoadingSpinner from '../../components/LoadingSpinner'

const Notifications = () => {
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);

    const { data: notificationsData, isLoading } = useGetNotificationsQuery();
    const notifications = notificationsData?.items || [];

  return (
    <>
        <UserNavbar />
        <div className="container my-5">
            <h2 className='orders-title'>الإشعارات</h2>
            
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                    <LoadingSpinner />
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">لا توجد إشعارات حالياً</p>
                </div>
            ) : (
                <>
                    <label className="form-label mb-1 mt-2">الإشعارات</label>
                    <div className="notifications-container py-3 px-2 rounded-3">
                        {notifications.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="notification-item d-flex align-items-start gap-2">
                                    <img src={item.avatar || "../assets/man.png"} className='notification-user-img' alt="user" />
                                    <div>
                                        <div className="d-flex align-items-center gap-1 mb-1 flex-wrap">
                                            <h6 className='document-li m-0'>{item.message || item.title}</h6>
                                            {item.order_title && <h5 className='orders-card-title m-0'>{item.order_title}</h5>}
                                        </div>
                                        <div className="d-flex gap-1 align-items-center footer-main-sublabel mb-2">
                                            <FontAwesomeIcon icon={faClock} />
                                            <p className='m-0'>{item.created_at}</p>
                                        </div>
                                        
                                        {/* Dynamic buttons based on notification type */}
                                        {item.type === 'offer' && (
                                            <div className="d-flex gap-1">
                                                <button type='button' className="services-btn py-1 px-3 text-decoration-none">رفض</button>
                                                <button type='button' className="login-button py-1 px-3 text-decoration-none">قبول</button>
                                            </div>
                                        )}
                                        {item.type === 'rating' && (
                                            <div className="d-flex gap-1">
                                                <button type='button' className="services-btn py-1 px-3 text-decoration-none">تجاهل</button>
                                                <button type='button' className="orange-btn py-1 px-3 text-decoration-none" onClick={() => setShowRating(true)}>تقييم</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {index < notifications.length - 1 && <hr />}
                            </React.Fragment>
                        ))}
                    </div>
                </>
            )}
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

export default Notifications
