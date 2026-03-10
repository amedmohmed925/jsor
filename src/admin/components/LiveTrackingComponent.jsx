import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown, faChevronUp, faEnvelope, faTriangleExclamation, faArrowDownLong, faSearch } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGetListsQuery } from "../../api/site/siteApi";
import { useGetCompanyOrdersMutation } from "../../api/admin/adminApi";
import LoadingSpinner from "../../components/LoadingSpinner";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker for current truck location
const truckIcon = new L.Icon({
    iconUrl: '../assets/truck-icon.svg',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

    const getRelativeTime = (dateString, isRtl) => {
        if (!dateString) return "";
        const now = new Date();
        const past = new Date(dateString.replace(/-/g, '/'));
        const diffInMs = now - past;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return isRtl ? "الآن" : "Just now";
        if (diffInMinutes < 60) return isRtl ? `منذ ${diffInMinutes} دقيقة` : `${diffInMinutes} mins ago`;
        if (diffInHours < 24) return isRtl ? `منذ ${diffInHours} ساعة` : `${diffInHours} hours ago`;
        return isRtl ? `منذ ${diffInDays} يوم` : `${diffInDays} days ago`;
    };

const LiveTrackingComponent = () => {
    const { t, i18n } = useTranslation(['admin', 'common']);
    const isRtl = i18n.language === 'ar';
    
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: listsData } = useGetListsQuery();
    const [getCompanyOrders, { isLoading: isLoadingOrders }] = useGetCompanyOrdersMutation();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getCompanyOrders({}).unwrap();
                if (response.status === 1) {
                    const items = response.data[0]?.items || [];
                    setOrders(items);
                    setFilteredOrders(items);
                    if (items.length > 0) setSelectedOrder(items[0]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, [getCompanyOrders]);

    useEffect(() => {
        let result = orders;
        
        if (searchQuery) {
            result = result.filter(order => 
                order.id.toString().includes(searchQuery) ||
                (order.user_id?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (order.driver_id?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== "") {
            result = result.filter(order => order.status.toString() === statusFilter);
        }

        setFilteredOrders(result);
    }, [searchQuery, statusFilter, orders]);

    const getStatusName = (statusId) => {
        const status = listsData?.Status?.find(s => s.id === statusId);
        return isRtl ? status?.name : status?.name_en;
    };

    const getName = (obj) => {
        if (!obj) return '';
        return isRtl ? (obj.name || '') : (obj.name_en || obj.name || '');
    };

    const MapComponent = ({ order }) => {
        const map = useMap();
        
        useEffect(() => {
            if (order?.lat_from && order?.lang_from) {
                map.setView([parseFloat(order.lat_from), parseFloat(order.lang_from)], 13);
            }
        }, [order, map]);

        if (!order) return null;

        return (
            <>
                {order.lat_from && order.lang_from && (
                    <Marker position={[parseFloat(order.lat_from), parseFloat(order.lang_from)]}>
                        <Popup>{isRtl ? 'موقع الشحن' : 'Pickup Location'}</Popup>
                    </Marker>
                )}
                {order.lat_to1 && order.lang_to1 && (
                    <Marker position={[parseFloat(order.lat_to1), parseFloat(order.lang_to1)]}>
                        <Popup>{isRtl ? 'موقع التوصيل' : 'Delivery Location'}</Popup>
                    </Marker>
                )}
            </>
        );
    };

    return (
        <div className="vehicles-content mt-2">
            <div className="shadow p-2 rounded-3">
                <h4 className="orders-title m-0">{t('admin:liveTracking.title')}</h4>
                
                <div className="row mt-2">
                    <div className="col-md-9 mb-2">
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control form-input py-2"
                                style={{ paddingInlineStart: '35px' }}
                                placeholder={t('admin:liveTracking.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="search-input-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                    <div className="col-md-3 mb-2">
                        <div className="select-wrapper position-relative">
                            <select 
                                className="form-select form-input py-2" 
                                style={{ paddingInlineEnd: '2.2rem' }}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">{t('admin:liveTracking.allStatuses')}</option>
                                {listsData?.Status?.map(s => (
                                    <option key={s.id} value={s.id}>{isRtl ? s.name : s.name_en}</option>
                                ))}
                            </select>
                            <div className="select-icon position-absolute top-50 translate-middle-y pe-1" style={{ insetInlineEnd: 0, pointerEvents: 'none' }}>
                                <ExpandMoreIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-5" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        {isLoadingOrders ? (
                            <div className="text-center p-5"><LoadingSpinner /></div>
                        ) : filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <div 
                                    key={order.id} 
                                    className={`card-order-details p-2 border rounded-3 mb-3 cursor-pointer ${selectedOrder?.id === order.id ? 'border-primary' : ''}`}
                                    onClick={() => setSelectedOrder(order)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex flex-column align-items-start gap-2 w-100">
                                        <div className='d-flex align-items-start justify-content-between w-100'>
                                            <div className="d-flex gap-2 align-items-start">
                                                <div className="truck-icon-container d-flex justify-content-center align-items-center">
                                                    <img src={order.truck_id?.image || "../assets/truck-icon.svg"} alt="truck" style={{width:'24px'}} />
                                                </div>
                                                <div>
                                                    <div className="d-flex gap-1 align-items-center">
                                                        <h6 className="orders-title m-0">{getName(order.truck_id)}</h6>
                                                    </div>
                                                    <p className="driver-truck-type m-0">{order.driver_id?.name || t('admin:liveTracking.noDriver')}</p>
                                                </div>
                                            </div>
                                            <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">
                                                {getStatusName(order.status)}
                                            </div>
                                        </div>

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
                                                <span>{order.address_from || order.city_from || (isRtl ? 'موقع الاستلام' : 'Pickup')}</span>
                                                <span>{order.address_to1 || order.address_to || order.city_to || (isRtl ? 'موقع التوصيل' : 'Delivery')}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 align-items-center">
                                            <img src="../assets/calendar.svg" className='mb-1' alt="calendar" />
                                            <h6 className='user-desc m-0'>{order.date !== '0000-00-00' ? order.date : (order.created_at?.split(' ')[0] || '--')}</h6>
                                            <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                                            <h6 className='user-desc m-0'>{order.time || (order.created_at?.split(' ')[1] || '--')}</h6>
                                        </div>

                                        <div className='d-flex gap-1 align-items-center flex-wrap'>
                                            <p className="user-desc m-0">{isRtl ? 'العميل:' : 'Customer:'}</p>
                                            <h4 className="orders-card-title mb-0">{order.user_id?.name}</h4>
                                        </div>

                                        {(order.date_delivery || order.time_delivery) && (
                                            <div className='d-flex gap-1 align-items-center flex-wrap'>
                                                <p className="user-desc m-0">{t('admin:liveTracking.expectedDelivery')}</p>
                                                <h4 className="orders-card-title mb-0">{order.date_delivery || '--'}</h4>
                                                <h4 className="orders-card-title mb-0">{order.time_delivery || '--'}</h4>
                                            </div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center gap-2 pt-2 border-top mt-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <h4 className="orders-card-title mb-0">65 {isRtl ? 'ميلاً في الساعة' : 'mph'}</h4>
                                            <img src="../assets/gas-station.svg" alt="gas-station" />
                                            <p className="percent-green m-0">76%</p>
                                        </div>
                                        <div className='not-have'>
                                            {getRelativeTime(order.created_at, isRtl)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-5 text-muted">{isRtl ? 'لا توجد طلبات متوفرة' : 'No orders available'}</div>
                        )}
                    </div>
                    
                    <div className="col-md-7">
                        <h2 className='orders-title'>{t('admin:liveTracking.mapView')}</h2>
                        <div className="mt-1 pb-3" style={{ height: '500px' }}>
                            <MapContainer 
                                center={[24.7136, 46.6753]} 
                                zoom={13} 
                                className="rounded-3 h-100"
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; OpenStreetMap contributors'
                                />
                                <MapComponent order={selectedOrder} />
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTrackingComponent;