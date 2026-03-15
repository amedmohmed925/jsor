import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong, faCircle } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const CompletedOrders = ({ orders, isLoading, onRateClient }) => {
  const { t } = useTranslation(['driver', 'common']);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-4">{t('common:loading')}...</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="alert alert-info mt-3">{t('driver:orders.no_completed_orders') || 'لا توجد طلبات مكتملة'}</div>;
  }

  return (
    <div className="shipped-orders-card">
      {orders.map((order) => {
        const orderTitle = order.good_type_id?.name || order.type?.name || 'طلب توصيل';
        const userAvatar = order.user_id?.avatar || "/assets/man.png";
        const userName = order.user_id?.name || 'عميل';
        const userRate = order.user_id?.rate || 0;
        
        const displayDate = order.date !== "0000-00-00" ? order.date : '--';
        const displayTime = order.time || '--';

        // Prepare destinations
        const destinations = [];
        for (let i = 1; i <= 5; i++) {
          const address = order[`address_to${i === 1 ? '1' : i === 2 ? '2' : i}`] || order[`address_to${i}`];
          const cityName = order[`city_to${i === 1 ? '' : i}`];
          const hasData = address && address !== 'null';

          if (hasData) {
            destinations.push(address);
          } else if (cityName) {
            destinations.push(cityName);
          }
        }
        if (destinations.length === 0 && order.city_to) {
          destinations.push(order.city_to);
        }

        return (
          <div key={order.id} className="card-order-details p-2 border rounded-3 mt-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <div>
                  <h3 className='orders-card-title m-0 mb-1'>{orderTitle}</h3>
                </div>
                <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                    {t('driver:orders.status.completed') || 'تم الشحن'}
                </div>
              </div>

              <div className="d-flex flex-wrap gap-4">
                <div>
                  <h5 className='footer-link'>{t('driver:orders.client') || 'العميل'}</h5>
                  <div className="d-flex gap-2 align-items-start">
                    <img src={userAvatar} className='user-img' alt="user" style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">{userName}</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">
                            {userRate} <img src="/assets/star.svg" alt="rate" />
                        </div>
                      </div>
                      <p className="user-desc m-0">{order.user_id?.mobile || '--'}</p>
                      <p className="user-desc m-0">{order.address_from && order.address_from !== 'null' ? order.address_from : (order.city_from || '--')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="from-to-wrapper">
                <div className="from-to-icons">
                  <div className="location-icon">
                    <LocationOnOutlinedIcon className='fs-6' />
                  </div>
                  <div className="circle"></div>
                  <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                  {destinations.length > 1 &&
                    destinations.slice(1).map((_, i) => (
                      <React.Fragment key={`arrow-${i}`}>
                        <div className="circle"></div>
                        <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                      </React.Fragment>
                    ))}
                  <div className="location-icon">
                    <LocationOnOutlinedIcon className='fs-6' />
                  </div>
                </div>
                <div className="from-to-text">
                  <span>{order.address_from && order.address_from !== 'null' ? order.address_from : (order.city_from || '--')}</span>
                  {destinations.length > 0 ? (
                    destinations.map((dest, i) => (
                      <span key={i}>{dest}</span>
                    ))
                  ) : (
                    <span>--</span>
                  )}
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center">
                <img src="/assets/calendar.svg" className='mb-1' alt="calendar" />
                <h6 className='user-desc m-0'>{displayDate}</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>{displayTime}</h6>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
                <div className="d-flex align-items-center gap-2">
                  <div className="contact-driver-button" onClick={() => onRateClient(order)}>
                    <p className='m-0'>{t('driver:orders.rate_client') || 'تقييم العميل'}</p>
                  </div>
                  <div 
                    className="code-badge d-flex align-items-center gap-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/driver/order-details/${order.id}`, { state: { order } })}
                  >
                    {t('driver:orders.details') || 'التفاصيل'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompletedOrders;
