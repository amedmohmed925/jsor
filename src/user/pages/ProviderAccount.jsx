import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import UserNavbar from '../components/UserNavbar'
import UserSidebar from '../components/UserSidebar'
import ProfileMain from '../components/ProfileMain'
import Footer from '../../shared/components/Footer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDownLong, faCircle, faStar} from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useAuth } from '../../hooks/useAuth';
import { useGetDriverInfoQuery, useGetListsQuery } from '../../api/site/siteApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useTranslation } from 'react-i18next';

const ProviderAccount = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const currentLanguage = i18n.language || 'ar';
    const location = useLocation();
    const { token } = useAuth();
    const providerState = location.state?.provider || {};
    // Ensure we have an ID
    const driverId = providerState.id || providerState.user_id;

    const { data: driverData, isLoading, isError } = useGetDriverInfoQuery(
        { token, id: driverId },
        { skip: !driverId }
    );
    
    // Fetch lists for city and country names
    const { data: listsResponse } = useGetListsQuery();
    const citiesList = listsResponse?.city || [];
    const countriesList = listsResponse?.Country || [];

    const provider = driverData || providerState;

    const [activeSubFilter, setActiveSubFilter] = useState('new-request');

    // Helper to get localized name
    const getName = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        if (currentLanguage === 'en' && obj.name_en) return obj.name_en;
        return obj.name || obj.name_en || '';
    };

    // Helper to find city and country names
    const getCityName = (id) => {
        const city = citiesList.find(c => c.id === id);
        return getName(city) || '---';
    };

    const getCountryName = (id) => {
        const country = countriesList.find(c => c.id === id);
        return getName(country) || '---';
    };

    // Sub filters data
    const subFilters = [
        {
            id: 'new-request',
            label: t('providerAccount.personalInfo'),
            icon: 'provider-subfilter-icon-1.svg'
        },
        {
            id: 'waiting',
            label: t('providerAccount.truckInfo'),
            icon: 'provider-subfilter-icon-2.svg'
        },
        {
            id: 'shipped',
            label: t('providerAccount.orders'),
            icon: 'provider-subfilter-icon-3.svg'
        },
        {
            id: 'cancelled',
            label: t('providerAccount.ratings'),
            icon: 'provider-subfilter-icon-4.svg'
        }
    ];

    // Handle sub-filter click
    const handleSubFilterClick = (filterId) => {
        setActiveSubFilter(filterId);
    };

    if (isLoading) {
        return (
            <>
                <UserNavbar />
                <div className="d-flex justify-content-center p-5 min-vh-50" style={{ minHeight: '50vh', alignItems: 'center' }}>
                    <LoadingSpinner size="medium" message={t('messages.loading')} />
                </div>
                <Footer />
            </>
        );
    }

    if (isError || (!provider && !isLoading)) {
        return (
            <>
                <UserNavbar />
                <div className="container mt-5">
                   <div className="alert alert-danger">{t('providerAccount.errorLoading')}</div>
                </div>
                <Footer />
            </>
        );
    }
    
    // Extract data arrays safely
    const vehicles = provider.DriverVehicles || [];
    const requests = provider.DriverRequest || [];
    const reviews = provider.DriverRequestRates || [];

    return (
        <>
            <UserNavbar />
            <div className="container mb-5">
                <div className='row mt-3'>
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pb-4">
                            <div className="d-flex gap-3 align-items-center">
                                <img src={provider?.avatar || "../assets/man.png"} className='profile-main-img' alt="user" />
                                <div>
                                    <h6 className="orders-title m-0">{getName(provider)} {provider?.last_name || ''}</h6>
                                    <div className="d-flex gap-2 align-items-center mt-2">
                                        <div className="new-order-badge p-1 rounded-2 text-nowrap">{provider?.rate || '0'} <img src="../assets/star.svg" alt="" /></div>
                                        <div className="completed-orders-badge p-1 rounded-2 text-nowrap">
                                            <span className='number'>{requests.length}</span> <span>{t('providerAccount.order')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div classNa
                                    type='button' 
                                    className="login-button text-decoration-none"
                                    onClick={() => navigate('/user/basic-upload', { state: { driver_id: driverId } })}
                                >
                                    {t('providerAccount.requestService')}
                                

                            </div>
                        </div>
                        <div className="orders-sub-filter row align-items-center border-bottom">
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
                        
                        {/* Personal Information Section - Show when activeSubFilter is 'new-request' */}
                        {activeSubFilter === 'new-request' && (
                            <div className="provider-personal-info mt-4">
                                <h3 className="why-card-title m-0 mb-2">{t('providerAccount.aboutMe')}</h3>
                                <p className='why-card-desc m-0'>{provider?.description || (provider?.status_name ? `${t('providerAccount.status')}: ${provider.status_name}` : t('providerAccount.noDescription'))}</p>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label mb-1">{t('providerAccount.firstName')}</label>
                                            <p className='why-card-desc m-0 border-bottom'>{getName(provider) || '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label mb-1">{t('providerAccount.lastName')}</label>
                                            <p className='why-card-desc m-0 border-bottom'>{provider?.last_name || '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label mb-1">{t('providerAccount.email')}</label>
                                            <p className='why-card-desc m-0 border-bottom'>{provider?.email || '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label mb-1">{t('providerAccount.region')}</label>
                                            <p className='why-card-desc m-0 border-bottom'>
                                                {getCountryName(provider?.country_id)} - {getCityName(provider?.city_id)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label mb-1">{t('providerAccount.phone')}</label>
                                            <p className='why-card-desc m-0 border-bottom'>{provider?.mobile || '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label mb-1">{t('providerAccount.location')}</label>
                                            <p className='why-card-desc m-0 border-bottom'>
                                                {provider?.address || '---'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Truck Information Section - Show when activeSubFilter is 'waiting' */}
                        {activeSubFilter === 'waiting' && (
                            <div className="provider-truck-info mt-4">
                                {vehicles.length > 0 ? vehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="row mb-4 border-bottom pb-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.truckType')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>
                                                    {vehicle.truck_id?.name || '---'}
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.subTruckType')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>
                                                    {vehicle.sub_truck_id?.name || '---'}
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.plateNumber')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>{vehicle.plate_number || '---'}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.yearManufacture')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>{vehicle.year_manufacture || '---'}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.capacity')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>
                                                    {vehicle.capacity ? `${vehicle.capacity} ${t('providerAccount.ton')}` : '---'}
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.color')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>{vehicle.color || '---'}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label mb-1">{t('providerAccount.description')}</label>
                                                <p className='why-card-desc m-0 border-bottom'>{vehicle.description || '---'}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <img src="../assets/truck-details-img.png" className='img-fluid truck-details-img w-100' alt="truck" />
                                        </div>
                                    </div>
                                )) : (
                                    <div className="alert alert-info">{t('providerAccount.noTrucks')}</div>
                                )}
                            </div>
                        )}
                        
                        {/* Orders Information Section - Show when activeSubFilter is 'shipped' */}
                        {activeSubFilter === 'shipped' && (
                            <div className="provider-orders-info mt-4">
                                {requests.length > 0 ? requests.map((req) => (
                                    <div key={req.id} className="card-order-details p-2 border rounded-3 mt-2">
                                        <div className="d-flex flex-column align-items-start gap-2 w-100">
                                            <div className='d-flex align-items-center justify-content-between w-100'>
                                                <div>
                                                    <h3 className='orders-card-title m-0 mb-1'>
                                                        {getName(req.good_type_id) || (req.type?.name ? `${req.type.name} #${req.id}` : `${t('providerAccount.order')} #${req.id}`)}
                                                    </h3>
                                                </div>
                                                <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                                                    {currentLanguage === 'ar' 
                                                        ? (['جديد', 'قيد التنفيذ', 'مكتمل'][req.status] || 'حالة غير معروفة')
                                                        : (['New', 'In Progress', 'Completed'][req.status] || 'Unknown status')}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-wrap gap-4">
                                                <div>
                                                    <h5 className='footer-link'>{t('providerAccount.customer')}</h5>
                                                    <div className="d-flex gap-2 align-items-start">
                                                        <img src={req.user_id?.avatar || "../assets/man.png"} className='user-img' alt="user" />
                                                        <div>
                                                            <div className="d-flex gap-1 align-items-center">
                                                                <h6 className="user-name m-0">{getName(req.user_id) || '---'}</h6>
                                                                <div className="new-order-badge p-1 rounded-2 text-nowrap">
                                                                    {req.user_id?.rate || '0'} <img src="../assets/star.svg" alt="" />
                                                                </div>
                                                            </div>
                                                            <p className="user-desc m-0">{req.user_id?.mobile || ''}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Truck Info in order */}
                                            {req.truck_id && (
                                                <div className="d-flex gap-2 align-items-center">
                                                     <h6 className='user-desc m-0'>{t('providerAccount.truckType')}: {getName(req.truck_id)} {req.sub_truck_id ? `- ${getName(req.sub_truck_id)}` : ''}</h6>
                                                </div>
                                            )}

                                            {/* Price */}
                                            <div className="d-flex gap-2 align-items-center">
                                                 <h6 className='user-desc m-0'>{t('buttons.currency')} {req.driver_price}</h6>
                                            </div>

                                            {/* Locations if available */}
                                            {(req.city_from || req.city_to || req.lat_from) && (
                                                <div className="from-to-wrapper">
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
                                                    <div className="from-to-text">
                                                        <span>{getName(req.city_from) || (currentLanguage === 'ar' ? 'من الموقع' : 'From Location')}</span>
                                                        <span>{getName(req.city_to) || (req.lat_to1 ? (currentLanguage === 'ar' ? 'إلى الموقع' : 'To Location') : '---')}</span>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="d-flex gap-2 align-items-center">
                                                <img src="../assets/calendar.svg" className='mb-1' alt="calender" />
                                                <h6 className='user-desc m-0'>
                                                    {req.date !== '0000-00-00' ? req.date : (req.created_at ? req.created_at.split(' ')[0] : '--')}
                                                </h6>
                                                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                                                <h6 className='user-desc m-0'>{req.time || (req.created_at ? req.created_at.split(' ')[1] : '--')}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="alert alert-info">{t('providerAccount.noOrders')}</div>
                                )}
                            </div>
                        )}
                        
                        {/* Customer Reviews Section - Show when activeSubFilter is 'cancelled' */}
                        {activeSubFilter === 'cancelled' && (
                            <div className="provider-rates-info mt-4">
                                {reviews.length > 0 ? reviews.map((rate) => (
                                    <div key={rate.id} className="card-order-details p-2 border rounded-3 mt-2">
                                        <div className="d-flex flex-column align-items-start gap-2 w-100">
                                            <div className="d-flex gap-2 align-items-start">
                                                <img src={rate.user?.avatar || "../assets/man.png"} className='user-img' alt="user" />
                                                <div>
                                                    <div className="d-flex gap-1 align-items-center">
                                                        <h6 className="user-name m-0">{getName(rate.user) || '---'}</h6>
                                                    </div>
                                                    <p className="not-have m-0 mt-1">{rate.created_at}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FontAwesomeIcon 
                                                        key={i} 
                                                        icon={faStar} 
                                                        className={i < rate.rate ? 'text-warning' : 'text-muted'} 
                                                    />
                                                ))}
                                                <p className="not-have m-0">({rate.rate}.0)</p>
                                            </div>
                                            <h3 className='orders-card-title m-0'>
                                                {rate.reqeust?.name || `${t('providerAccount.order')} #${rate.reqeust?.id || rate.reqeust_id}`}
                                            </h3>
                                            <h5 className='footer-link'>"{rate.comment}"</h5>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="alert alert-info">{t('providerAccount.noRatings')}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProviderAccount;

             