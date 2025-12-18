import React, { useRef, useState } from "react";
import UserNavbar from '../components/UserNavbar'
import Footer from '../../shared/components/Footer'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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

const BasicUpload = () => {
    const [selectedService, setSelectedService] = useState(null);
    const dateRef = useRef(null);
    const timeRef = useRef(null);
  
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    
    // State for map markers
    const [pickupLocation, setPickupLocation] = useState([24.7136, 46.6753]); // Default to Riyadh, Saudi Arabia
    const [deliveryLocation, setDeliveryLocation] = useState([24.7136, 46.6753]); // Default to Riyadh, Saudi Arabia

const serviceOptions = [
  {
    id: "service1",
    image: "../../assets/truck-size-1.png",
  },
  {
    id: "service2",
    image: "../../assets/truck-size-2.png",
  },
  {
    id: "service3",
    image: "../../assets/truck-size-3.png",
  },
  {
    id: "service4",
    image: "../../assets/truck-size-4.png",
  },
];


  const truckOptions = [
    {
      value: "trailer",
      label: "تريلا",
      image: "../../assets/filter-card-img-1.png",
    },
    {
      value: "dina",
      label: "دينا",
      image: "../../assets/filter-card-img-2.png",
    },
    {
      value: "refrigerated",
      label: "ثلاجة",
      image: "../../assets/filter-card-img-3.png",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const handleSelect = (option) => {
    setSelectedTruck(option);
    setOpen(false);
  };

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
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="shadow p-3 rounded-3 h-100">

              <h2 className='orders-title'>رفع الطلب</h2>
              <p className='orders-card-title mb-2'>حدد موقع الشحن و التوصيل</p>

              {/* Locations */}
              <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div className='w-100'>
                  <div className="input-with-icon mb-2">
                    <div className="location-icon map-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <input
                      type="text"
                      className="form-control form-input location-input"
                      placeholder="اختر موقع الشحن"
                    />
                  </div>

                  <div className="input-with-icon">
                    <div className="location-icon map-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <input
                      type="text"
                      className="form-control form-input location-input"
                      placeholder="اختر موقع التوصيل"
                    />
                  </div>
                </div>

                <img src="../../assets/arrow-round-vector.svg" alt="vector" />
                <img src="../../assets/plus-vector.svg" alt="plus" />
              </div>

              <div className="d-flex align-items-center gap-1 border-bottom pb-2">
                <img src="../../assets/map-hotel.svg" alt="map" />
                <h6 className='choose-from-map m-0'>حدد من الخريطة</h6>
              </div>

              {/* Truck Data */}
              <h2 className='orders-title mt-3'>بيانات الشاحنة</h2>
                <div className="row">
                    <div className="col-lg-8">
                        <label className="form-label mb-1">نوع الشاحنة</label>

                        {/* ✅ Custom Select */}
                        <div className="custom-select-wrapper">
                            
                            <div
                            className="custom-select form-input"
                            onClick={() => setOpen(!open)}
                            >
                            {selectedTruck ? (
                                <div className="d-flex align-items-center gap-2">
                                <img src={selectedTruck.image} alt="" />
                                <span>{selectedTruck.label}</span>
                                </div>
                            ) : (
                                <span className="placeholder">اختر نوع الشاحنة</span>
                            )}

                            <ExpandMoreIcon className={`arrow ${open ? "rotate" : ""}`} />
                            </div>

                            {open && (
                            <div className="custom-options">
                                {truckOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className="custom-option"
                                    onClick={() => handleSelect(option)}
                                >
                                    <img src={option.image} alt="" />
                                    <span>{option.label}</span>
                                </div>
                                ))}
                            </div>
                            )}

                        </div>

                    </div>
                    <div className="col-lg-4">
                    <div className="mb-3">
                    <label className="form-label mb-1">عدد الشاحنات</label>
                    <div className="select-wrapper position-relative">
    <select className="form-select form-input py-2 pe-3 blue-select">
        <option value="01">01</option>
    </select>
    <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
        <ExpandMoreIcon />
    </div>
</div>
                </div>
                    </div>
                </div>
                {/* Service Type Filter (Radio with Images) */}
<div>
<h2 className='orders-title'>حجم الشاحنة</h2>

  <div className="d-flex gap-md-1 gap-3 justify-content-center justify-content-md-between flex-wrap">
    {serviceOptions.map((item) => (
      <div
        key={item.id}
        className={`filter-checkbox-box-2 ${
          selectedService === item.id ? "active" : ""
        }`}
        onClick={() => setSelectedService(item.id)}
      >
        <input
          type="radio"
          className="checkbox-style"
          checked={selectedService === item.id}
          readOnly
        />

        <div className="d-flex flex-column align-items-center gap-1">
          <img
            src={item.image}
            alt={item.label}
          />
        </div>
      </div>
    ))}
  </div>
</div>
<h2 className='orders-title mt-3'>بيانات الطلب</h2>
<div className="mb-3">
                    <label className="form-label mb-1">التاريخ</label>
                    <div className="datetime-wrapper position-relative">
      
      {/* Hidden native inputs */}
      <input
        ref={dateRef}
        type="date"
        className="hidden-native-input"
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        ref={timeRef}
        type="time"
        className="hidden-native-input"
        onChange={(e) => setTime(e.target.value)}
      />

      {/* Visible fake input */}
      <div className="form-input datetime-input d-flex align-items-center justify-content-between">

        <div className="d-flex align-items-center gap-4">
                    {/* Right: Date */}
        <span
          className="datetime-part"
          onClick={() => dateRef.current.showPicker()}
        >
          {date || "التاريخ"}
        </span>

        <span className="datetime-separator">/</span>

        {/* Time */}
        <span
          className="datetime-part"
          onClick={() => timeRef.current.showPicker()}
        >
          {time || "الوقت"}
        </span>

        </div>
        {/* Left Icon */}
        <CalendarMonthIcon className="calendar-icon" />
      </div>
    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9">
                    <div className="mb-3">
                    <label className="form-label mb-1">نوع البضاعة</label>
                    <div className="select-wrapper position-relative">
    <select className="form-select form-input py-2 pe-3 blue-select">
        <option value="مواد بناء">مواد بناء</option>
    </select>
    <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
        <ExpandMoreIcon />
    </div>
</div>
                </div>

                    </div>
                    <div className="col-lg-3">
                    <label className="form-label mb-1">قيمة البضاعة</label>
                    <div className="input-with-icon mb-3">
                    <div className="map-icon">
                      <span className="kg">KG</span>
                    </div>
                    <input
                      type="text"
                      className="form-control form-input py-2 blue-input"
                      placeholder="500"
                    />
                  </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-end gap-2">
                                <button type='button' className="login-button text-decoration-none">ارسال الطلب</button>
                            </div>

            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow p-3 rounded-3 h-100">
            <h2 className='orders-title'>تحديد المواقع على الخريطة</h2>
            <div className="mt-3 pb-3 h-100">
              <MapComponent />
            </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default BasicUpload;