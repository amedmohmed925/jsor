import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { 
  useGetContractNewOrdersQuery, 
  useGetContractShippingOrdersQuery, 
  useGetContractCompleteOrdersQuery, 
  useGetContractCanceledOrdersQuery 
} from '../../api/user/userApi';
import { useGetListsQuery } from '../../api/site/siteApi';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';

const ContractOrders = ({ activeSubFilter, offersExpanded, toggleOffers, setShowRating }) => {
  const { t, i18n } = useTranslation();
  const { token } = useAuth();
  const currentLanguage = i18n.language || 'ar';

  // Fetch lists for truck images
  const { data: listsResponse } = useGetListsQuery();
  const truckList = listsResponse?.data?.[0]?.Truck || [];

  // Call all hooks to follow Rules of Hooks, but use 'skip' to only fire the active one
  const newRequests = useGetContractNewOrdersQuery(token, { skip: activeSubFilter !== 'new-request' });
  const shippingRequests = useGetContractShippingOrdersQuery(token, { skip: activeSubFilter !== 'waiting' });
  const completeRequests = useGetContractCompleteOrdersQuery(token, { skip: activeSubFilter !== 'shipped' });
  const canceledRequests = useGetContractCanceledOrdersQuery(token, { skip: activeSubFilter !== 'cancelled' });

  // Select the active query result
  const activeQueryResult = 
    activeSubFilter === 'new-request' ? newRequests :
    activeSubFilter === 'waiting' ? shippingRequests :
    activeSubFilter === 'shipped' ? completeRequests :
    activeSubFilter === 'cancelled' ? canceledRequests :
    newRequests;

  const { data: response, isLoading, isError } = activeQueryResult;

  // Helper to get localized name
  const getName = (obj) => {
    if (!obj) return '';
    if (currentLanguage === 'en' && obj.name_en) return obj.name_en;
    return obj.name || obj.name_en || '';
  };

  // Helper to get truck image
  const getTruckImage = (truckId) => {
    if (!truckId) return null;
    const truck = truckList.find(t => t.id === truckId || t.id === truckId.id);
    return truck?.image || null;
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <LoadingSpinner size="medium" message={currentLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'} />
      </div>
    );
  }

  if (isError) {
    return <div className="alert alert-danger mt-3">{currentLanguage === 'ar' ? 'حدث خطأ أثناء تحميل البيانات' : 'Error loading data'}</div>;
  }

  // Extract orders from the response structure: response.data[0].items
  const orders = response?.data?.[0]?.items || [];

  if (orders.length === 0) {
    return <div className="alert alert-info mt-3">{t('user:orders.noOrders') || t('user:orders.no_orders')}</div>;
  }

  return (
    <div className="contract-orders-wrapper mt-3">
      {orders.map((order) => {
        const truckImg = (activeSubFilter === 'waiting' || activeSubFilter === 'shipped') ? getTruckImage(order.truck_id) : null;
        
        return (
          <div key={order.id} className="order-card p-3 mb-3 border rounded-3 bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-center gap-3">
                {truckImg && (
                  <div className="truck-image-small">
                    <img src={truckImg} alt="truck" style={{ width: '50px', height: 'auto', borderRadius: '4px' }} />
                  </div>
                )}
                <div>
                  <h3 className="orders-card-title m-0">#{order.id}</h3>
                  <h5 className="footer-link m-0 mt-1">{getName(order.category_id)}</h5>
                </div>
              </div>
              <div className={`status-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center ${
                activeSubFilter === 'new-request' ? 'new-order-badge' : 
                activeSubFilter === 'waiting' ? 'charging-badge' : 
                activeSubFilter === 'shipped' ? 'shipped-badge' : 
                'cancelled-badge'
              }`}>
                {activeSubFilter === 'new-request' && t('user:orders.newOrder')}
                {activeSubFilter === 'waiting' && <><FontAwesomeIcon icon={faCircle} className='dot-orange me-1' /> {t('common:buttons.shipping')}</>}
                {activeSubFilter === 'shipped' && t('common:buttons.completed')}
                {activeSubFilter === 'cancelled' && t('common:status.cancelled')}
              </div>
            </div>

            <div className="order-details-grid mt-3">
              <div className="row">
                <div className="col-6 col-md-3 mb-2">
                  <h6 className="user-desc m-0">{t('user:orders.contract_duration')}</h6>
                  <p className="footer-main-sublabel m-0">{getName(order.contract_duration_id)}</p>
                </div>
                <div className="col-6 col-md-3 mb-2">
                  <h6 className="user-desc m-0">{t('user:basicUpload.truckType')}</h6>
                  <p className="footer-main-sublabel m-0">{getName(order.truck_id)}</p>
                </div>
                <div className="col-6 col-md-3 mb-2">
                  <h6 className="user-desc m-0">{t('user:basicUpload.truckSize')}</h6>
                  <p className="footer-main-sublabel m-0">{getName(order.sub_truck_id)}</p>
                </div>
                <div className="col-6 col-md-3 mb-2">
                  <h6 className="user-desc m-0">{t('user:basicUpload.goodType')}</h6>
                  <p className="footer-main-sublabel m-0">{getName(order.good_type_id)}</p>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 align-items-center mt-2">
              <img src="../assets/calendar.svg" className='mb-1' alt="calendar" />
              <h6 className='user-desc m-0'>{order.created_at !== "0000-00-00 00:00:00" ? order.created_at : '--'}</h6>
            </div>

            <div className="order-actions d-flex flex-wrap gap-2 mt-3 pt-2 border-top">
              {activeSubFilter === 'new-request' && (
                <>
                  <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2" onClick={toggleOffers} style={{ cursor: 'pointer' }}>
                     <h6 className='offers-dropdown-text m-0'>{t('common:buttons.offers')}</h6>
                     <FontAwesomeIcon icon={offersExpanded ? faChevronUp : faChevronDown} />
                  </div>
                  <div className="cancel-order-btn">
                     <p className='m-0'>{t('common:buttons.cancel_order')}</p>
                  </div>
                </>
              )}
              {activeSubFilter === 'waiting' && (
                <div className="offers-dropdown d-flex align-items-center justify-content-center gap-2">
                  <h6 className='offers-dropdown-text m-0'>{t('user:user.tracking')}</h6>
                </div>
              )}
              {activeSubFilter === 'shipped' && (
                <div className="contact-driver-button" onClick={() => setShowRating(true)}>
                  <p className='m-0'>{t('user:notification.rate')}</p>
                </div>
              )}
            </div>
            
            {activeSubFilter === 'new-request' && offersExpanded && (
              <div className="orders-new-offers mt-2 p-2 border-top">
                 <p className="text-center text-muted m-0">{t('common:buttons.no_offers')}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContractOrders;
