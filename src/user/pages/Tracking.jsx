import React, { useRef, useState } from "react";
import UserNavbar from '../components/UserNavbar'
import Footer from '../../shared/components/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDown, faArrowDownLong, faDotCircle, faCircleDot, faCircle, faCaretDown, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Tracking = () => {
    
    // State for map markers
    const [pickupLocation, setPickupLocation] = useState([24.7136, 46.6753]); // Default to Riyadh, Saudi Arabia
    const [deliveryLocation, setDeliveryLocation] = useState([24.7136, 46.6753]); // Default to Riyadh, Saudi Arabia
    const [currentStep, setCurrentStep] = useState(1);


  const [open, setOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);


  // Function to handle map clicks
  const handleMapClick = (e) => {
    // You can implement logic to determine if this is pickup or delivery location
    // For now, we'll just update the pickup location
    setPickupLocation([e.latlng.lat, e.latlng.lng]);
  };
  
  // Map component
  const MapComponent = () => (
    <MapContainer 
      center={pickupLocation} 
      zoom={13} 
      className="rounded-3"
      style={{ height: '95%', minHeight: '400px', width: '100%' }}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={pickupLocation}>
        <Popup>موقع الشحن</Popup>
      </Marker>
      <Marker position={deliveryLocation}>
        <Popup>موقع التوصيل</Popup>
      </Marker>
    </MapContainer>
  );

  return (
    <>
      <UserNavbar />

      <div className="container mb-5">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="shadow p-3 rounded-3 h-100">
            <h2 className='orders-title'>تتبع الحمولة</h2>
            <div className="mt-3 pb-3 h-100">
              <MapComponent />
            </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="shadow p-3 rounded-3 h-100">
                <div className="tracking-item p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2 active">
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} className='dot-gray' />
                        <div>
                            <h6 className='document-li m-0'>استلام الشحنة</h6>
                            <p className='user-desc m-0'>الرياض</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <h6 className='user-desc m-0'>03-06-2025</h6>
                        <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                        <h6 className='user-desc m-0'>08:00</h6>
                    </div>
                </div>
                <div className="tracking-item p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} className='dot-gray' />
                        <div>
                            <h6 className='document-li m-0'>في الطريق للشحن </h6>
                            <p className='user-desc m-0'>الرياض</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <h6 className='user-desc m-0'>03-06-2025</h6>
                        <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                        <h6 className='user-desc m-0'>08:00</h6>
                    </div>
                </div>
                <div className="tracking-item p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} className='dot-gray' />
                        <div>
                            <h6 className='document-li m-0'>تسليم الحمولة</h6>
                            <p className='user-desc m-0'>الرياض</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <h6 className='user-desc m-0'>03-06-2025</h6>
                        <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                        <h6 className='user-desc m-0'>08:00</h6>
                    </div>
                </div>
                {/* Shipment Progress */}
<div className="shipment-progress">

{/* Top Labels */}
<div className="progress-labels">
  {["استلام الشحنة", "في الطريق للشحن", "تسليم الحمولة"].map((item, index) => (
    <span
      key={index}
      className={`progress-label ${
        currentStep >= index ? "active" : ""
      }`}
    >
      {item}
    </span>
  ))}
</div>

{/* Line & Truck */}
<div className="progress-line-wrapper mt-4">
  <div className="progress-line-bg" />

  <div
    className="progress-line-active"
    style={{ width: `${currentStep * 50}%` }}
  />

  <div
    className={`truck-position step-${currentStep}`}
  >
    <img src="../../assets/filter-card-img-1.png" alt="truck" />
  </div>
</div>
</div>
<div className="d-flex justify-content-between align-items-center flex-wrap">
<div className="from-to-wrapper mt-3">
                  {/* الأيقونات */}
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
                  {/* النص */}
                  <div className="from-to-text">
                    <span>الرياض</span>
                    <span>الجزائر</span>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-2 mt-3">
                    <h2 className='orders-title'>المسافة</h2>
                    <img src="../../assets/distance.svg" alt="distance" />
                    <p className="orders-card-title mb-2">33 كلم</p>
                    <FontAwesomeIcon icon={faCircle} className='dot-gray-8' />
                    <h2 className='orders-title'>الحمولة</h2>
                    <img src="../../assets/box.svg" alt="distance" />
                    <p className="orders-card-title mb-2">أثاث منزلي</p>
                </div>
                <div className="mt-3 rest-kms">باقي 13 كلم</div>
</div>

            </div>
          </div>         
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Tracking;