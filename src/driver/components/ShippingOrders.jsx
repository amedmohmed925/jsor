import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong, faCircle } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const ShippingOrders = ({ orders, isLoading }) => {
  const { t, i18n } = useTranslation(['driver', 'common']);
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  const getName = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return isRtl ? (obj.name || '') : (obj.name_en || obj.name || '');
  };

  if (isLoading) {
    return <div className="text-center py-4">{t('common:loading')}...</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="alert alert-info mt-3">{t('driver:orders.no_shipping_orders') || 'لا توجد طلبات قيد الشحن'}</div>;
  }

  return (
    <div className="waiting-orders-card">
      {orders.map((order) => {
        const orderTitle = order.good_type_id?.name || order.type?.name || 'طلب توصيل';
        const userAvatar = order.user_id?.avatar || "/assets/man.png";
        const userName = order.user_id?.name || 'عميل';
        const userRate = order.user_id?.rate || 0;
        
        const displayDate = order.date !== "0000-00-00" ? order.date : '--';
        const displayTime = order.time || '--';

        // Prepare destinations - Address prioritized over Coordinates
        const destinations = [];
        for (let i = 1; i <= 5; i++) {
          const address = order[`address_to${i === 1 ? '1' : i === 2 ? '2' : i}`] || order[`address_to${i}`];
          const cityName = getName(order[`city_to${i === 1 ? '' : i}`]);
          const hasData = address && address !== 'null';

          if (hasData) {
            destinations.push(address);
          } else if (cityName) {
            destinations.push(cityName);
          }
        }
        if (destinations.length === 0 && order.city_to) {
          destinations.push(getName(order.city_to));
        }

        return (
          <div key={order.id} className="card-order-details p-2 border rounded-3 mt-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <div>
                  <h3 className='orders-card-title m-0 mb-1'>{orderTitle}</h3>
                  <h5 className='footer-link m-0'>{t('driver:orders.client') || 'العميل'}</h5>
                </div>
                <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                  <FontAwesomeIcon icon={faCircle} className='dot-orange' /> {t('driver:orders.status.shipping') || 'قيد الشحن'}
                </div>
              </div>

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
                  <span>{order.address_from && order.address_from !== 'null' ? order.address_from : (getName(order.city_from) || '--')}</span>
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
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <div 
                    className="offers-dropdown text-decoration-none d-flex align-items-center justify-content-center gap-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      // Check order status to direct to the correct page
                      // If status is 2 (Shipping), we check if internal tracking or images suggest we are "In Road" or "Arrived"
                      // For now, based on user's request, we improve navigation logic
                      if (order.requestImageBefore?.length > 0) {
                        navigate('/driver/mission-in-road', { state: { order } });
                      } else {
                        navigate('/driver/mission-started', { state: { order } });
                      }
                    }}
                  >
                    <h6 className='offers-dropdown-text m-0 text-nowrap'>{t('driver:orders.track_location') || 'تتبع موقعك'}</h6>
                  </div>
                  <a 
                    href={`tel:${order.user_id?.mobile}`} 
                    className="contact-driver-button text-decoration-none"
                    style={{ cursor: 'pointer' }}
                  >
                    <p className='m-0 text-nowrap'>{t('driver:orders.call_client') || 'الاتصال بالعميل'}</p>
                  </a>
                  <Link 
                    to={`/driver/order-details/${order.id}`} 
                    state={{ order }}
                    className="code-badge d-flex align-items-center gap-2 text-decoration-none"
                    style={{ cursor: 'pointer', color: 'inherit' }}
                  >
                    <span className="text-nowrap">{t('driver:orders.details') || 'التفاصيل'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShippingOrders;
