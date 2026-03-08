import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import DriverNavbar from '../components/DriverNavbar';
import Footer from '../../shared/components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDownLong, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useStartOrderMutation, useUploadImageBeforeMutation } from '../../api/driver/driverApi';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons for map
const pickupIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const deliveryIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
};

const MissionStarted = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(['driver', 'common', 'user']);
    const isRtl = i18n.language === 'ar';
    const token = localStorage.getItem('josur_auth_token');

    const order = location.state?.order;

    const [startOrder, { isLoading: isStarting }] = useStartOrderMutation();
    const [uploadImageBefore, { isLoading: isUploading }] = useUploadImageBeforeMutation();

    const [pickupLocation, setPickupLocation] = useState([24.7136, 46.6753]);
    const [deliveryLocation, setDeliveryLocation] = useState([24.7700, 46.7200]);
    const [distance, setDistance] = useState('0');
    const [currentStep] = useState(0);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const handleCameraCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            stream.getTracks().forEach(t => t.stop());
            cameraInputRef.current?.click();
        } catch {
            cameraInputRef.current?.click();
        }
    };

    useEffect(() => {
        if (!order) { navigate('/driver/orders'); return; }
        const pLat = parseFloat(order.lat_from) || 24.7136;
        const pLon = parseFloat(order.lang_from) || 46.6753;
        const dLat = parseFloat(order.lat_to1) || 24.7700;
        const dLon = parseFloat(order.lang_to1) || 46.7200;
        setPickupLocation([pLat, pLon]);
        setDeliveryLocation([dLat, dLon]);
        setDistance(calculateDistance(pLat, pLon, dLat, dLon));
    }, [order, navigate]);

    if (!order) return null;

    const getName = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return isRtl ? (obj.name || '') : (obj.name_en || obj.name || '');
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(prev => [...prev, ...files]);
            setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleStartMission = async () => {
        if (images.length === 0) {
            toast.error(isRtl ? 'يرجى رفع صور الحمولة أولاً' : 'Please upload cargo images first');
            return;
        }
        try {
            // 1. Upload images before
            const imgData = new FormData();
            imgData.append('reqeust_id', order.id);
            images.forEach(img => imgData.append('image[]', img));
            const uploadRes = await uploadImageBefore({ token, body: imgData }).unwrap();
            if (uploadRes.status !== 1 || uploadRes.data?.[0]?.status === 0) {
                toast.error(uploadRes.data?.[0]?.message || uploadRes.message || (isRtl ? 'فشل رفع الصور' : 'Failed to upload images'));
                return;
            }

            // 2. Start order
            const startData = new FormData();
            startData.append('request_id', order.id);
            const startRes = await startOrder({ token, body: startData }).unwrap();
            if (startRes.status !== 1 || startRes.data?.[0]?.status === 0) {
                toast.error(startRes.data?.[0]?.message || startRes.message || (isRtl ? 'فشل بدء المهمة' : 'Failed to start mission'));
                return;
            }

            toast.success(isRtl ? 'تم بدء المهمة بنجاح' : 'Mission started successfully');
            navigate('/driver/mission-in-road', { state: { order } });
        } catch (err) {
            toast.error(isRtl ? 'حدث خطأ ما' : 'Something went wrong');
        }
    };

    const MapComponent = () => (
        <MapContainer center={pickupLocation} zoom={12} className="rounded-3"
            style={{ height: '95%', minHeight: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
            <Marker position={pickupLocation} icon={pickupIcon}>
                <Popup>{isRtl ? 'موقع الاستلام' : 'Pickup Location'}</Popup>
            </Marker>
            <Marker position={deliveryLocation} icon={deliveryIcon}>
                <Popup>{isRtl ? 'موقع التسليم' : 'Delivery Location'}</Popup>
            </Marker>
            <Polyline positions={[pickupLocation, deliveryLocation]} color="#f97316" weight={3} dashArray="8" />
        </MapContainer>
    );

    const isLoading = isStarting || isUploading;

    return (
        <>
            <DriverNavbar />
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="shadow p-3 rounded-3 h-100">
                            <h2 className='orders-title'>
                                {isRtl ? 'بدأ تنفيذ المهمة يمكنك تتبع موقعك' : 'Mission started, track your location'}
                            </h2>
                            <div className="mt-3 pb-3 h-100">
                                <MapComponent />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="shadow p-3 rounded-3 h-100">
                            {/* Shipment Progress */}
                            <div className="shipment-progress">
                                <div className="progress-labels">
                                    {[
                                        isRtl ? 'استلام الشحنة' : 'Pickup',
                                        isRtl ? 'في الطريق للشحن' : 'On the way',
                                        isRtl ? 'تسليم الحمولة' : 'Delivery'
                                    ].map((item, index) => (
                                        <span key={index} className={`progress-label ${currentStep >= index ? "active" : ""}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="progress-line-wrapper mt-4">
                                    <div className="progress-line-bg" />
                                    <div className="progress-line-active" style={{ width: `${currentStep * 50}%` }} />
                                    <div className={`truck-position step-${currentStep}`}>
                                        <img src="/assets/filter-card-img-1.png" alt="truck" />
                                    </div>
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="d-flex gap-2 mt-3">
                                <button type='button'
                                    className="login-button text-decoration-none flex-grow-1 d-flex align-items-center gap-1 justify-content-center take-img-btn"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <img src="/assets/camera.svg" alt="camera" />
                                    {isRtl ? 'التقاط صورة للحمولة' : 'Take cargo photo'}
                                </button>
                                <button type='button'
                                    className="orange-btn text-decoration-none px-3 d-flex align-items-center justify-content-center"
                                    style={{ borderRadius: '10px' }}
                                    onClick={handleCameraCapture}
                                    title={isRtl ? 'فتح الكاميرا' : 'Open Camera'}
                                >
                                    <i className="fas fa-camera fs-5"></i>
                                </button>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                hidden 
                                multiple 
                                accept="image/*" 
                                onChange={handleImageChange} 
                            />
                            <input 
                                type="file" 
                                ref={cameraInputRef} 
                                hidden 
                                multiple 
                                accept="image/*" 
                                capture="environment"
                                onChange={handleImageChange} 
                            />

                            {previews.length > 0 && (
                                <div className="taken-imgs d-flex gap-2 align-items-center flex-wrap mt-3">
                                    {previews.map((src, i) => (
                                        <div key={i} className="taken-img position-relative">
                                            <img src={src} className="taken-img" alt={`cargo-${i}`} />
                                            <img src="/assets/close.svg" className="delete-taken-img" alt="remove"
                                                style={{ cursor: 'pointer' }} onClick={() => removeImage(i)} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Footer Info */}
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="from-to-wrapper mt-3">
                                    <div className="from-to-icons">
                                        <div className="location-icon">
                                            <FontAwesomeIcon icon={faLocationDot} className='fs-6 text-primary' />
                                        </div>
                                        <div className="circle"></div>
                                        <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                                        <div className="location-icon">
                                            <FontAwesomeIcon icon={faLocationDot} className='fs-6 text-danger' />
                                        </div>
                                    </div>
                                    <div className="from-to-text">
                                        <span>{getName(order.city_from) || (isRtl ? 'موقع الانطلاق' : 'Pickup point')}</span>
                                        <span>{getName(order.city_to) || (isRtl ? 'موقع الوصول' : 'Delivery point')}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap gap-2 mt-3">
                                    <h2 className='orders-title'>{isRtl ? 'المسافة' : 'Distance'}</h2>
                                    <img src="/assets/distance.svg" alt="distance" />
                                    <p className="orders-card-title mb-2">{distance} {isRtl ? 'كلم' : 'km'}</p>
                                    <FontAwesomeIcon icon={faCircle} className='dot-gray-8' />
                                    <h2 className='orders-title'>{isRtl ? 'الحمولة' : 'Cargo'}</h2>
                                    <img src="/assets/box.svg" alt="cargo" />
                                    <p className="orders-card-title mb-2">{getName(order.good_type_id) || '--'}</p>
                                </div>
                                <div className="d-flex gap-2 align-items-center mt-3">
                                    <button type='button' className="login-button text-decoration-none"
                                        onClick={handleStartMission} disabled={isLoading}>
                                        {isLoading
                                            ? (isRtl ? 'جارٍ التحميل...' : 'Loading...')
                                            : (isRtl ? 'ابدأ المهمة' : 'Start Mission')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MissionStarted;