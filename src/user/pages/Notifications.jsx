import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserNavbar from '../components/UserNavbar'
import AdminNavbar from '../../admin/components/AdminNavbar'
import DriverNavbar from '../../driver/components/DriverNavbar'
import Footer from '../../shared/components/Footer'
import { useAuth } from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { useGetNotificationsQuery } from '../../api/site/notificationApi'
import { 
  useCancelRequestMutation, 
  useAcceptOfferMutation, 
  useRateRequestMutation 
} from '../../api/site/siteApi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const Notifications = () => {
    const { t, i18n } = useTranslation(['user', 'common']);
    const { role } = useAuth();
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const { data: notificationsData, isLoading, refetch } = useGetNotificationsQuery();
    const notifications = notificationsData?.data?.[0]?.items || notificationsData?.items || [];

    const [cancelRequest, { isLoading: isRejecting }] = useCancelRequestMutation();
    const [acceptOffer, { isLoading: isAccepting }] = useAcceptOfferMutation();
    const [rateRequest, { isLoading: isRating }] = useRateRequestMutation();

    // Helper to get localized field
    const getLangField = (item, field) => {
        if (!item) return '';
        const isEn = i18n.language === 'en';
        const enField = `${field}_en`;
        return (isEn && item[enField]) ? item[enField] : item[field];
    };

    const handleReject = async (requestId) => {
        if (!requestId) return;
        try {
            const response = await cancelRequest(requestId).unwrap();
            if (response.status === 1) {
                toast.success(t('user:user.orders.cancelSuccess') || 'Request rejected');
                refetch();
            } else {
                toast.error(response.message || t('common:messages.error'));
            }
        } catch (error) {
            toast.error(error?.data?.message || t('common:messages.error'));
        }
    };

    const handleAccept = async (offerId) => {
        if (!offerId) return;
        try {
            const response = await acceptOffer(offerId).unwrap();
            if (response.status === 1) {
                toast.success(t('user:user.orders.acceptSuccess') || 'Offer accepted');
                refetch();
            } else {
                toast.error(response.message || t('common:messages.error'));
            }
        } catch (error) {
            toast.error(error?.data?.message || t('common:messages.error'));
        }
    };

    const handleRateSubmit = async () => {
        if (!selectedItem || rating === 0) {
            toast.error(t('user:user.orders.rating_error_no_stars'));
            return;
        }

        try {
            const finalRequestId = selectedItem?.requestStatus?.[0]?.reqeust_id || selectedItem?.request_id || selectedItem?.id;
            const response = await rateRequest({
                reqeust_id: finalRequestId,
                rate: rating,
                comment: comment
            }).unwrap();

            if (response.status === 1) {
                toast.success(t('user:user.orders.rating_success'));
                setShowRating(false);
                refetch();
            } else {
                toast.error(response.message || t('common:messages.error'));
            }
        } catch (error) {
            toast.error(error?.data?.message || t('common:messages.error'));
        }
    };

  return (
    <>
        {role === 'admin' ? <AdminNavbar /> : role === 'driver' ? <DriverNavbar /> : <UserNavbar />}
        <div className="container my-5">
            <h2 className='orders-title'>{t('notification.title')}</h2>
            
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                    <LoadingSpinner />
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">{t('notification.noNotifications')}</p>
                </div>
            ) : (
                <>
                    <label className="form-label mb-1 mt-2">{t('notification.label')}</label>
                    <div className="notifications-container py-3 px-2 rounded-3">
                        {notifications.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="notification-item d-flex align-items-start gap-2">
                                    <img src={item.avatar || "../assets/man.png"} className='notification-user-img' alt="user" />
                                    <div>
                                        <div className="d-flex align-items-center gap-1 mb-1 flex-wrap">
                                            <h6 className='document-li m-0'>{getLangField(item, 'msg')}</h6>
                                            {item.order_title && <h5 className='orders-card-title m-0'>{item.order_title}</h5>}
                                        </div>
                                        <div className="d-flex gap-1 align-items-center footer-main-sublabel mb-2">
                                            <FontAwesomeIcon icon={faClock} />
                                            <p className='m-0'>{item.created_at}</p>
                                        </div>
                                        
                                        {/* Dynamic buttons based on notification type */}
                                        {item.type === 'offer' && (
                                            <div className="d-flex gap-1">
                                                <button 
                                                    type='button' 
                                                    className="services-btn py-1 px-3 text-decoration-none"
                                                    onClick={() => handleReject(item.request_id || item.id)}
                                                    disabled={isRejecting}
                                                >
                                                    {isRejecting ? '...' : t('notification.reject')}
                                                </button>
                                                <button 
                                                    type='button' 
                                                    className="login-button py-1 px-3 text-decoration-none"
                                                    onClick={() => handleAccept(item.offer_id || item.id)}
                                                    disabled={isAccepting}
                                                >
                                                    {isAccepting ? '...' : t('notification.accept')}
                                                </button>
                                            </div>
                                        )}
                                        {item.type === 'rating' && (
                                            <div className="d-flex gap-1">
                                                <button type='button' className="services-btn py-1 px-3 text-decoration-none">{t('notification.ignore')}</button>
                                                <button 
                                                    type='button' 
                                                    className="orange-btn py-1 px-3 text-decoration-none" 
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setShowRating(true);
                                                    }}
                                                >
                                                    {t('notification.rate')}
                                                </button>
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
      <h3 className="orders-title mb-4">{t('notification.rating.title')}</h3>

      {/* Driver Info */}
      <img src={selectedItem?.avatar || "../assets/man.png"} className="rating-user-img mb-2" alt="" />
      <h4 className="orders-card-title mb-1">{selectedItem?.driver_name || 'Omar Alrajihi'}</h4>
      <h6 className="user-desc mb-4">
        {t('user:user.orders.driver_title')}: {selectedItem?.truck_type || '---'}
      </h6>
      <div className="d-flex gap-1 align-items-center justify-content-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={rating >= star ? 'yellow-star' : 'gray-star'}
                    onClick={() => setRating(star)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
      </div>

      <textarea
        className="form-control form-input mb-3"
        placeholder={t('user:user.orders.rating_placeholder')}
        rows='4'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      
      <button 
        className="login-button w-100" 
        onClick={handleRateSubmit}
        disabled={isRating}
      >
        {isRating ? '...' : t('notification.rating.submit')}
      </button>
    </div>
  </div>
)}
    </>
  )
}

export default Notifications
          