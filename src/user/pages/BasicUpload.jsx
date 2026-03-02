import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AuthModal from '../../components/AuthModal';
import { useAuth } from "../../hooks/useAuth";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGetListsQuery, useGetSubTrucksQuery, useCreateNormalRequestMutation } from "../../api/site/siteApi";
import { toast } from "react-toastify";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Handles map click — defined outside to stay stable across renders
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Stable map component: defined outside BasicUpload so React never remounts it on state changes
const BasicMapComponent = ({ pickup, destinations, onMapClick, pickupLabel, deliveryLabel }) => (
  <MapContainer
    center={[24.7136, 46.6753]}
    zoom={13}
    className="rounded-3"
    style={{ height: '95%', minHeight: '400px', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <MapClickHandler onMapClick={onMapClick} />
    <Marker position={[pickup.lat, pickup.lng]}>
      <Popup>{pickupLabel}</Popup>
    </Marker>
    {destinations.map((dest, index) => (
      <Marker key={index} position={[dest.lat, dest.lng]}>
        <Popup>{deliveryLabel} {index + 1}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

const BasicUpload = () => {
    const { t, i18n } = useTranslation('user');
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();
    const { data: listsData } = useGetListsQuery();
    const [truckId, setTruckId] = useState("");
    const { data: subTrucksData } = useGetSubTrucksQuery(truckId, { skip: !truckId });
    const [createNormalRequest, { isLoading: isSubmitting }] = useCreateNormalRequestMutation();

    const [selectedService, setSelectedService] = useState(null);
    const dateRef = useRef(null);
    const timeRef = useRef(null);
  
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [numTrucks, setNumTrucks] = useState("1");
    const [goodTypeId, setGoodTypeId] = useState("");
    const [goodPrice, setGoodPrice] = useState("");
    
    // State for map markers and addresses
    const [pickup, setPickup] = useState({ lat: 24.7136, lng: 46.6753, address: "" });
    const [destinations, setDestinations] = useState([{ lat: 24.7136, lng: 46.6753, address: "" }]);
    const [selectingTarget, setSelectingTarget] = useState({ type: 'pickup' });

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // Handle initial state from Hero search
    useEffect(() => {
      const savedForm = sessionStorage.getItem('jsor_pending_order');
      if (savedForm) {
        try {
          const parsed = JSON.parse(savedForm);
          if (parsed.type === 'basic') {
            setPickup(parsed.pickup);
            setDestinations(parsed.destinations);
            setTruckId(parsed.truckId || "");
            setNumTrucks(parsed.numTrucks || "1");
            setGoodTypeId(parsed.goodTypeId || "");
            setGoodPrice(parsed.goodPrice || "");
            setDate(parsed.date || "");
            setTime(parsed.time || "");
            setSelectedService(parsed.selectedService || null);
            // Don't clear yet, wait for successful submit
          }
        } catch (e) {
          console.error("Error parsing saved form", e);
        }
      } else if (location.state) {
        if (location.state.pickup) {
          setPickup(prev => ({ ...prev, address: location.state.pickup }));
        }
        if (location.state.destinations && location.state.destinations.length > 0) {
          setDestinations(location.state.destinations.map(d => ({ lat: 24.7136, lng: 46.6753, address: d })));
        }
      }
    }, [location.state]);

    const [open, setOpen] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const isRtl = i18n.language === 'ar';

    // Helper to get localized field from API
    const getLangField = (item, field) => {
      if (!item) return '';
      const isEn = i18n.language && i18n.language.startsWith('en');
      const enField = `${field}_en`;
      const arField = `${field}_ar`;
      
      if (isEn && item[enField]) return item[enField];
      if (!isEn && item[arField]) return item[arField];
      
      return item[field] || '';
    };

    const getAddress = async (lat, lng) => {
      try {
        const lang = i18n.language.startsWith('en') ? 'en' : 'ar';
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${lang}`);
        const data = await response.json();
        return data.display_name || (lang === 'en' ? "Unknown address" : "عنوان غير معروف");
      } catch (error) {
        console.error("Error fetching address:", error);
        return i18n.language.startsWith('en') ? "Error fetching address" : "خطأ في جلب العنوان";
      }
    };

    const searchTimeoutRef = useRef(null);
    const handleSearchAddress = (query) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (!query || query.length < 3) { setSearchResults([]); return; }
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const lang = i18n.language.startsWith('en') ? 'en' : 'ar';
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=${lang}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (e) {
          console.error(e);
        }
      }, 500);
    };

    const handleMapClick = useCallback(async (lat, lng) => {
      const address = await getAddress(lat, lng);
      if (selectingTarget.type === 'pickup') {
        setPickup({ lat, lng, address });
      } else if (selectingTarget.type === 'destination') {
        const newDests = [...destinations];
        newDests[selectingTarget.index] = { lat, lng, address };
        setDestinations(newDests);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectingTarget, destinations, i18n.language]);

    const addDestination = () => {
      if (destinations.length < 3) { // Limit to 3 destinations
        setDestinations([...destinations, { lat: 24.7136, lng: 46.6753, address: "" }]);
      } else {
        toast.info(i18n.language.startsWith('en') ? "Maximum is 3 points" : "الحد الأقصى للنقاط هو 3");
      }
    };

    const handleSelect = (option) => {
      setSelectedTruck(option);
      setTruckId(option.id);
      setOpen(false);
      setSelectedService(null);
    };

    const handleSubmit = async () => {
      if (!truckId || !selectedService || !date || !time || !goodTypeId || !goodPrice) {
        toast.error(t('basicUpload.errorFillAll'));
        return;
      }

      // Check if user is authenticated and is a client
      if (!isAuthenticated || role !== 'user') {
        // Save form data to session storage
        sessionStorage.setItem('jsor_pending_order', JSON.stringify({
          type: 'basic',
          pickup,
          destinations,
          truckId,
          numTrucks,
          goodTypeId,
          goodPrice,
          date,
          time,
          selectedService
        }));
        
        setShowAuthModal(true);
        return;
      }

      // Format date to DD-MM-YYYY
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year}`;

      const formData = new FormData();
      formData.append('lat_from', pickup.lat);
      formData.append('lang_from', pickup.lng);
      
      destinations.forEach((dest, index) => {
        formData.append(`lat_to${index + 1}`, dest.lat);
        formData.append(`lang_to${index + 1}`, dest.lng);
      });

      formData.append('truck_id', truckId);
      formData.append('number', numTrucks);
      formData.append('sub_truck_id', selectedService);
      formData.append('date', formattedDate);
      formData.append('time', time);
      formData.append('good_type_id', goodTypeId);
      formData.append('good_price', goodPrice);

      try {
        const response = await createNormalRequest(formData).unwrap();
        if (response.status === 1) {
          toast.success(t('basicUpload.successMessage'));
          
          // Clear saved form if any
          sessionStorage.removeItem('jsor_pending_order');

          // Clear all fields
          setTruckId("");
          setSelectedTruck(null);
          setSelectedService(null);
          setDate("");
          setTime("");
          setNumTrucks("1");
          setGoodTypeId("");
          setGoodPrice("");
          setPickup({ lat: 24.7136, lng: 46.6753, address: "" });
          setDestinations([{ lat: 24.7136, lng: 46.6753, address: "" }]);
          setSelectingTarget({ type: 'pickup' });
          
        } else {
          toast.error(response.message || t('basicUpload.errorMessage'));
        }
      } catch (error) {
        toast.error(t('basicUpload.errorMessage'));
      }
    };

  return (
    <>
      {isAuthenticated && role === 'user' ? <UserNavbar /> : <Navbar />}
      
      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
        returnPath={location.pathname} 
      />

      <div className="container mb-5">
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="shadow p-3 rounded-3 h-100">

              <h2 className='orders-title'>{t('basicUpload.title')}</h2>
              <p className='orders-card-title mb-2'>{t('basicUpload.subtitle')}</p>

              {/* Locations */}
              <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div className='w-100'>
                  <div className={`input-with-icon mb-2 position-relative ${selectingTarget.type === 'pickup' ? 'border border-primary' : ''}`} 
                       onClick={() => setSelectingTarget({ type: 'pickup' })} style={{ cursor: 'pointer' }}>
                    <div className="location-icon map-icon">
                      <LocationOnOutlinedIcon className='fs-6' />
                    </div>
                    <input
                      type="text"
                      className="form-control form-input location-input"
                      placeholder={t('basicUpload.pickupPlaceholder') + " (" + (i18n.language === 'ar' ? 'حدد من الخريطة' : 'Select from map') + ")"}
                      value={pickup.address}
                      onChange={(e) => {
                        setPickup({ ...pickup, address: e.target.value });
                        handleSearchAddress(e.target.value);
                      }}
                    />
                    {selectingTarget.type === 'pickup' && searchResults.length > 0 && (
                      <div className="list-group position-absolute w-100 shadow-lg mt-1" style={{ zIndex: 1100, maxHeight: '200px', overflowY: 'auto', left: 0 }}>
                        {searchResults.map((res, i) => (
                          <button 
                            key={i} 
                            className="list-group-item list-group-item-action text-start fs-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPickup({ lat: parseFloat(res.lat), lng: parseFloat(res.lon), address: res.display_name });
                              setSearchResults([]);
                            }}
                          >
                            {res.display_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {destinations.map((dest, index) => (
                    <div key={index} 
                         className={`input-with-icon mb-2 position-relative ${selectingTarget.type === 'destination' && selectingTarget.index === index ? 'border border-primary' : ''}`}
                         onClick={() => setSelectingTarget({ type: 'destination', index })} style={{ cursor: 'pointer' }}>
                      <div className="location-icon map-icon">
                        <LocationOnOutlinedIcon className='fs-6' />
                      </div>
                      <input
                        type="text"
                        className="form-control form-input location-input"
                        placeholder={`${t('basicUpload.deliveryPlaceholder')} ${index + 1} (${i18n.language === 'ar' ? 'حدد من الخريطة' : 'Select from map'})`}
                        value={dest.address}
                        onChange={(e) => {
                          const newDests = [...destinations];
                          newDests[index] = { ...newDests[index], address: e.target.value };
                          setDestinations(newDests);
                          handleSearchAddress(e.target.value);
                        }}
                      />
                      {selectingTarget.type === 'destination' && selectingTarget.index === index && searchResults.length > 0 && (
                        <div className="list-group position-absolute w-100 shadow-lg mt-1" style={{ zIndex: 1100, maxHeight: '200px', overflowY: 'auto', left: 0 }}>
                          {searchResults.map((res, i) => (
                            <button 
                              key={i} 
                              className="list-group-item list-group-item-action text-start fs-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newDests = [...destinations];
                                newDests[index] = { lat: parseFloat(res.lat), lng: parseFloat(res.lon), address: res.display_name };
                                setDestinations(newDests);
                                setSearchResults([]);
                              }}
                            >
                              {res.display_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <img src="../assets/arrow-round-vector.svg" alt="vector" />
                <img src="../assets/plus-vector.svg" alt="plus" onClick={addDestination} style={{ cursor: 'pointer' }} />
              </div>

              <div className="d-flex align-items-center gap-1 border-bottom pb-2">
                <img src="../assets/map-hotel.svg" alt="map" />
                <h6 className='choose-from-map m-0'>{t('basicUpload.mapSelectInstruction')}</h6>
              </div>

              {/* Truck Data */}
              <h2 className='orders-title mt-3'>{t('basicUpload.truckData')}</h2>
                <div className="row">
                    <div className="col-lg-8">
                        <label className="form-label mb-1">{t('basicUpload.truckType')}</label>

                        {/* ✅ Custom Select */}
                        <div className="custom-select-wrapper" style={{ zIndex: open ? 1100 : 10 }}>
                            
                            <div
                            className="custom-select form-input"
                            onClick={() => setOpen(!open)}
                            >
                            {selectedTruck ? (
                                <div className="d-flex align-items-center gap-2">
                                {selectedTruck.image && <img src={selectedTruck.image} alt="" style={{ width: '24px' }} />}
                                <span>{getLangField(selectedTruck, 'name')}</span>
                                </div>
                            ) : (
                                <span className="placeholder">{t('basicUpload.truckTypePlaceholder')}</span>
                            )}

                            <ExpandMoreIcon className={`arrow ${open ? "rotate" : ""}`} />
                            </div>

                            {open && (
                            <div className="custom-options">
                                {(listsData?.Truck || []).map((option) => (
                                <div
                                    key={option.id}
                                    className="custom-option"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.image && <img src={option.image} alt="" style={{ width: '24px' }} />}
                                    <span>{getLangField(option, 'name')}</span>
                                </div>
                                ))}
                            </div>
                            )}

                        </div>

                    </div>
                    <div className="col-lg-4">
                    <div className="mb-3">
                    <label className="form-label mb-1">{t('basicUpload.truckCount')}</label>
                    <div className="select-wrapper position-relative">
    <select className={`form-select form-input py-2 ${isRtl ? 'ps-3' : 'pe-3'} blue-select`} value={numTrucks} onChange={(e) => setNumTrucks(e.target.value)}>
        {[...Array(10)].map((_, i) => (
          <option key={i+1} value={i+1}>{i+1 < 10 ? `0${i+1}` : i+1}</option>
        ))}
    </select>
    <div className={`select-icon position-absolute ${isRtl ? 'start-0 ps-2' : 'end-0 pe-2'} top-50 translate-middle-y`}>
        <ExpandMoreIcon />
    </div>
</div>
                </div>
                    </div>
                </div>
                {/* Service Type Filter (Radio with Images) */}
<div>
<h2 className='orders-title'>{t('basicUpload.truckSize')}</h2>

  <div className="horizontal-scroll-wrapper">
    {(subTrucksData || []).map((item) => (
      <div
        key={item.id}
        className={`truck-size-card ${
          selectedService === item.id ? "active" : ""
        }`}
        onClick={() => setSelectedService(item.id)}
      >
        <div className="truck-img-wrapper">
          <img
            src={item.image}
            alt={getLangField(item, 'name')}
          />
        </div>
        
        <input
          type="radio"
          className="checkbox-style"
          checked={selectedService === item.id}
          readOnly
        />
      </div>
    ))}
    {truckId && (!subTrucksData || subTrucksData.length === 0) && (
      <p className="text-muted w-100 text-center">{t('basicUpload.noSizes')}</p>
    )}
  </div>
</div>
<h2 className='orders-title mt-3'>{t('basicUpload.orderData')}</h2>
<div className="mb-3">
                    <label className="form-label mb-1">{t('basicUpload.date')}</label>
                    <div className="datetime-wrapper position-relative">
      
      {/* Hidden native inputs */}
      <input
        ref={dateRef}
        type="date"
        className="hidden-native-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        ref={timeRef}
        type="time"
        className="hidden-native-input"
        value={time}
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
          {date || t('basicUpload.date')}
        </span>

        <span className="datetime-separator">/</span>

        {/* Time */}
        <span
          className="datetime-part"
          onClick={() => timeRef.current.showPicker()}
        >
          {time || t('basicUpload.time')}
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
                    <label className="form-label mb-1">{t('basicUpload.goodType')}</label>
                    <div className="select-wrapper position-relative">
    <select className={`form-select form-input py-2 ${isRtl ? 'ps-3' : 'pe-3'} blue-select`} value={goodTypeId} onChange={(e) => setGoodTypeId(e.target.value)}>
        <option value="" disabled>{t('basicUpload.goodTypePlaceholder')}</option>
        {(listsData?.GoodType || []).map((type) => (
          <option key={type.id} value={type.id}>{getLangField(type, 'name')}</option>
        ))}
    </select>
    <div className={`select-icon position-absolute ${isRtl ? 'start-0 ps-2' : 'end-0 pe-2'} top-50 translate-middle-y`}>
        <ExpandMoreIcon />
    </div>
</div>
                </div>

                    </div>
                    <div className="col-lg-3">
                    <label className="form-label mb-1">{t('basicUpload.goodPrice')}</label>
                    <div className="input-with-icon mb-3">
                    <div className="map-icon">
                      <span className="kg">{t('basicUpload.kg')}</span>
                    </div>
                    <input
                      type="text"
                      className="form-control form-input py-2 blue-input"
                      placeholder="500"
                      value={goodPrice}
                      onChange={(e) => setGoodPrice(e.target.value)}
                    />
                  </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-end gap-2">
                                <button 
                                  type='button' 
                                  className="login-button text-decoration-none" 
                                  onClick={handleSubmit}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? t('basicUpload.submitting') : t('basicUpload.submit')}
                                </button>
                            </div>

            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow p-3 rounded-3 h-100">
            <h2 className='orders-title'>{t('basicUpload.mapTitle')}</h2>
            <div className="mt-3 pb-3 h-100">
              <BasicMapComponent
                pickup={pickup}
                destinations={destinations}
                onMapClick={handleMapClick}
                pickupLabel={t('basicUpload.pickupPopup')}
                deliveryLabel={t('basicUpload.deliveryPopup')}
              />
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