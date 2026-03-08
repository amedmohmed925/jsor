import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import BasicOrders from './BasicOrders';
import TripOrders from './TripOrders';
import ContractOrders from './ContractOrders';
import { useTranslation } from 'react-i18next';
import { useRateRequestMutation, useCancelRequestMutation, useGetListsQuery } from '../../api/site/siteApi';
import { toast } from 'react-toastify';

const OrdersMain = () => {
  const { t, i18n } = useTranslation(['user', 'common']);
  const currentLanguage = i18n.language || 'ar';

  // State for tracking active main filter and sub-filter
  const [showRating, setShowRating] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [activeMainFilter, setActiveMainFilter] = useState('basic-orders');
  const [activeSubFilter, setActiveSubFilter] = useState('new-request');

  const [rateOrder, { isLoading: isRating }] = useRateRequestMutation();
  const [cancelOrder, { isLoading: isCancelling }] = useCancelRequestMutation();
  const { data: listsResponse } = useGetListsQuery();
  const truckList = listsResponse?.Truck || [];
  
  // State for tracking if offers section is expanded
  const [offersExpanded, setOffersExpanded] = useState(false);

  // Helper to get localized name
  const getName = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (currentLanguage === 'en' && obj.name_en) return obj.name_en;
    return obj.name || obj.name_en || '';
  };

  const handleShowRating = (order) => {
    setSelectedOrder(order);
    setShowRating(true);
    setRating(0);
    setComment('');
  };

  const handleShowCancel = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleCancelSubmit = async () => {
    if (!selectedOrder) return;
    try {
      const finalRequestId = selectedOrder?.requestStatus?.[0]?.reqeust_id || selectedOrder?.id || selectedOrder;

      const response = await cancelOrder(finalRequestId).unwrap();
      if (response.status === 1) {
        toast.success(t('user:user.orders.cancelSuccess') || 'Order cancelled successfully');
        setShowCancelModal(false);
      } else {
        const errorMsg = response.data?.[0]?.message || response.message || t('common:messages.error');
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error(error?.data?.message || t('common:messages.error'));
    }
  };

  const handleRateSubmit = async () => {
    if (!selectedOrder) return;
    if (rating === 0) {
      toast.error(t('user:user.orders.rating_error_no_stars') || 'Please select stars');
      return;
    }

    try {
      const finalRequestId = selectedOrder?.requestStatus?.[0]?.reqeust_id || selectedOrder?.id || selectedOrder;
      
      const response = await rateOrder({
        reqeust_id: finalRequestId,
        rate: rating,
        comment: comment
      }).unwrap();
      
      if (response.status === 1) {
        toast.success(t('user:user.orders.rating_success') || 'Rating submitted successfully');
        setShowRating(false);
      } else {
        const errorMsg = response.data?.[0]?.message || response.message || t('common:messages.error');
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error(error?.data?.message || t('common:messages.error'));
    }
  };
  
  // Main filters data
  const mainFilters = [
    {
      id: 'basic-orders',
      label: t('common:requestTypes.normal')
    },
    {
      id: 'trip-orders',
      label: t('common:requestTypes.trips')
    },
    {
      id: 'contract-orders',
      label: t('common:requestTypes.contract')
    }
  ];
  
  // Sub filters data
  const subFilters = [
    {
      id: 'new-request',
      label: t('user:user.orders.status.new'),
      icon: 'subfilter-icon-1.svg'
    },
    {
      id: 'waiting',
      label: t('user:user.orders.status.waiting'),
      icon: 'subfilter-icon-2.svg'
    },
    {
      id: 'shipped',
      label: t('user:user.orders.status.shipped'),
      icon: 'subfilter-icon-3.svg'
    },
    {
      id: 'cancelled',
      label: t('user:user.orders.status.cancelled'),
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
      return (
        <BasicOrders 
          activeSubFilter={activeSubFilter} 
          setShowRating={handleShowRating} 
          setShowCancel={handleShowCancel}
        />
      );
    }
    // Trip Orders
    else if (activeMainFilter === 'trip-orders') {
      return (
        <TripOrders 
          activeSubFilter={activeSubFilter} 
          setShowRating={handleShowRating}
          setShowCancel={handleShowCancel}
        />
      );
    }
    // Contract Orders
    else if (activeMainFilter === 'contract-orders') {
      return (
        <ContractOrders 
          activeSubFilter={activeSubFilter} 
          setShowRating={handleShowRating}
          setShowCancel={handleShowCancel}
        />
      );
    }
    
    // Default case
    return <div className="alert alert-info">{t('user:user.orders.no_orders')}</div>;
  };

  return (
    <section>
      <h4 className="orders-title">{t('user:user.orders.title')}</h4>
      
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
      <div className="orders-sub-filter row align-items-center mt-2 border-bottom g-2">
        {subFilters.map((filter) => (
          <div key={filter.id} className="col-6 col-lg-3">
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

      {/* Rating Modal */}
      {showRating && (
        <div className="rating-overlay" onClick={() => setShowRating(false)}>
          <div
            className="rating-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Driver Info */}
            <img 
              src={selectedOrder?.driver_id?.avatar || selectedOrder?.driver?.avatar || "../assets/man.png"} 
              className="rating-user-img mb-2" 
              alt="" 
            />
            <h4 className="orders-card-title mb-1">
              {selectedOrder?.driver_id?.name || selectedOrder?.driver?.name || '---'}
            </h4>
            <h6 className="user-desc mb-3">
              {t('user:user.orders.driver_title')}: {
                getName(truckList.find(t => t.id === selectedOrder?.truck_id || t.id === selectedOrder?.truck_id?.id)) || 
                getName(selectedOrder?.truck_id) || 
                getName(selectedOrder?.truck) || 
                '---'
              }
            </h6>
            <div className="d-flex gap-1 align-items-center justify-content-center mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <FontAwesomeIcon
                  key={s}
                  icon={faStar}
                  className={s <= (selectedOrder?.driver_id?.rate || selectedOrder?.driver?.rate || 0) ? 'yellow-star' : 'gray-star'}
                />
              ))}
            </div>

            {/* Stars for Rating */}
            <p className="orders-title mb-2">{t('user:user.orders.rating_title')}</p>
            <h4 className="user-desc mb-2">{t('user:user.orders.rating_subtitle')}</h4>

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
              placeholder={t('user:user.orders.rating_placeholder')}
              rows='5'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Submit */}
            <button 
              className="login-button w-100" 
              onClick={handleRateSubmit}
              disabled={isRating}
            >
              {isRating ? t('common:messages.loading') : t('user:user.orders.rating_button')}
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="rating-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="rating-modal p-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="orders-card-title mb-3">{t('user:user.orders.cancelConfirmTitle')}</h3>
            <p className="user-desc mb-4">{t('user:user.orders.cancelConfirmMessage')}</p>
            <div className="d-flex gap-2">
              <button 
                className="login-button w-100 bg-danger border-danger" 
                onClick={handleCancelSubmit}
                disabled={isCancelling}
              >
                {isCancelling ? t('common:messages.loading') : t('common:buttons.cancel_order')}
              </button>
              <button 
                className="login-button w-100 bg-secondary border-secondary" 
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
              >
                {t('common:buttons.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default OrdersMain;