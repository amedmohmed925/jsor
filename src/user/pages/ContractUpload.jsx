import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AuthModal from '../../components/AuthModal';
import { useAuth } from "../../hooks/useAuth";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGetListsQuery, useGetSubTrucksQuery, useCreateContractRequestMutation } from "../../api/site/siteApi";
import { toast } from "react-toastify";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Flies to new coordinates without remounting the map
const ContractMapViewController = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

// Handles map click — defined outside to stay stable across renders
const ContractMapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Stable map component: defined outside ContractUpload so React never remounts it on state changes
const ContractMapComponent = ({ location, onMapClick }) => (
  <MapContainer
    center={[location.lat, location.lng]}
    zoom={13}
    className="rounded-3"
    style={{ height: '95%', minHeight: '400px', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <ContractMapViewController lat={location.lat} lng={location.lng} />
    <ContractMapClickHandler onMapClick={onMapClick} />
    <Marker position={[location.lat, location.lng]}>
      <Popup>{location.address}</Popup>
    </Marker>
  </MapContainer>
);

const ContractUpload = () => {
    const { t, i18n } = useTranslation('user');
    const locationRoute = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();
    const { data: listsData } = useGetListsQuery();
    const [truckId, setTruckId] = useState("");
    const { data: subTrucksData } = useGetSubTrucksQuery(truckId, { skip: !truckId });
    const [createContractRequest, { isLoading: isSubmitting }] = useCreateContractRequestMutation();

    const dateRef = useRef(null);
  
    const [cityId, setCityId] = useState("");
    const [selectedService, setSelectedService] = useState(null); // This is sub_truck_id
    const [numTrips, setNumTrips] = useState("1");
    const [goodTypeId, setGoodTypeId] = useState("");
    const [date, setDate] = useState("");
    const [contractDurationId, setContractDurationId] = useState(null);
    
    // State for map markers
    const [location, setLocation] = useState({ lat: 24.7136, lng: 46.6753, address: "" });

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // Handle initial state from Hero search or saved form
    useEffect(() => {
      const savedForm = sessionStorage.getItem('jsor_pending_order');
      if (savedForm) {
        try {
          const parsed = JSON.parse(savedForm);
          if (parsed.type === 'contract') {
            setCityId(parsed.cityId || "");
            setTruckId(parsed.truckId || "");
            setNumTrips(parsed.numTrips || "1");
            setGoodTypeId(parsed.goodTypeId || "");
            setDate(parsed.date || "");
            setContractDurationId(parsed.contractDurationId || null);
            setLocation(parsed.location || { lat: 24.7136, lng: 46.6753, address: "" });
            setSelectedService(parsed.selectedService || null);
          }
        } catch (e) {
          console.error("Error parsing saved form", e);
        }
      } else if (locationRoute.state) {
        if (locationRoute.state.pickup) {
          setLocation(prev => ({ ...prev, address: locationRoute.state.pickup }));
        }
      }
    }, [locationRoute.state]);

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

    const handleSelect = (option) => {
      setSelectedTruck(option);
      setTruckId(option.id);
      setOpen(false);
      setSelectedService(null);
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
      setLocation({ lat, lng, address });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleSubmit = async () => {
      if (!cityId || !truckId || !selectedService || !numTrips || !goodTypeId || !date || !contractDurationId) {
        toast.error(t('contractUpload.errorFillAll'));
        return;
      }

      // Check if user is authenticated and is a client
      if (!isAuthenticated || role !== 'user') {
        // Save form data to session storage
        sessionStorage.setItem('jsor_pending_order', JSON.stringify({
          type: 'contract',
          cityId,
          truckId,
          numTrips,
          goodTypeId,
          date,
          contractDurationId,
          location,
          selectedService
        }));
        
        setShowAuthModal(true);
        return;
      }

      // Format date to DD-MM-YYYY
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year}`;

      const formData = new FormData();
      formData.append('in_city', cityId);
      formData.append('lat_from', location.lat);
      formData.append('lang_from', location.lng);
      formData.append('address_from', location.address);
      formData.append('address_to', location.address); // For contracts, it's usually the same address context
      formData.append('truck_id', truckId);
      formData.append('sub_truck_id', selectedService);
      formData.append('number', numTrips);
      formData.append('good_type_id', goodTypeId);
      formData.append('date', formattedDate);
      formData.append('contract_duration_id', contractDurationId);

      try {
        const response = await createContractRequest(formData).unwrap();
        if (response.status === 1) {
          toast.success(t('contractUpload.successMessage'));
          
          // Clear saved form if any
          sessionStorage.removeItem('jsor_pending_order');

          // Clear all fields
          setCityId("");
          setTruckId("");
          setSelectedTruck(null);
          setSelectedService(null);
          setNumTrips("1");
          setGoodTypeId("");
          setDate("");
          setContractDurationId(null);
        } else {
          toast.error(response.message || t('contractUpload.errorMessage'));
        }
      } catch (error) {
        toast.error(t('contractUpload.errorMessage'));
      }
    };

  return (
    <>
      {isAuthenticated && role === 'user' ? <UserNavbar /> : <Navbar />}
      
      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
        returnPath={locationRoute.pathname} 
      />

      <div className="container mb-5">
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="shadow p-3 rounded-3 h-100">

              <h2 className='orders-title'>{t('contractUpload.title')}</h2>
              
              {/* Added location display with map hint */}
              {/* <div className="mb-2">
                <label className="form-label mb-1">
                  {i18n.language === 'ar' ? 'موقع العقد' : 'Contract Location'}
                </label>
                <div className="input-with-icon border border-primary rounded position-relative" style={{ cursor: 'text' }}>
                  <div className="location-icon map-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control form-input location-input"
                    placeholder={(i18n.language === 'ar' ? 'ابحث أو حدد من الخريطة' : 'Search or select from map')}
                    value={location.address}
                    onChange={(e) => {
                      setLocation({ ...location, address: e.target.value });
                      handleSearchAddress(e.target.value);
                    }}
                  />
                  {searchResults.length > 0 && (
                    <div className="list-group position-absolute w-100 shadow-lg mt-1" style={{ zIndex: 1100, maxHeight: '200px', overflowY: 'auto', left: 0 }}>
                      {searchResults.map((res, i) => (
                        <button 
                          key={i} 
                          className="list-group-item list-group-item-action text-start fs-7"
                          onClick={() => {
                            setLocation({ lat: parseFloat(res.lat), lng: parseFloat(res.lon), address: res.display_name });
                            setSearchResults([]);
                          }}
                        >
                          {res.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="row">
                <div className="col-12">
                    <div className="mb-2">
                    <label className="form-label mb-1">{t('contractUpload.whereTruck')}</label>
                    <div className="select-wrapper position-relative">
    <select className={`form-select form-input py-2 ${isRtl ? 'ps-3' : 'pe-3'} blue-select`} value={cityId} onChange={(e) => setCityId(e.target.value)}>
        <option value="" disabled>{t('contractUpload.selectOption')}</option>
        {listsData?.InCity && Object.entries(listsData.InCity).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
    </select>
    <div className={`select-icon position-absolute ${isRtl ? 'start-0 ps-2' : 'end-0 pe-2'} top-50 translate-middle-y`}>
        <ExpandMoreIcon />
    </div>
</div>
                </div>
                    </div>
                    <div className="d-flex align-items-center gap-1 border-bottom pb-2">
                        <img src="../assets/map-hotel.svg" alt="map" />
                        <h6 className='choose-from-map m-0'>{t('contractUpload.mapSelect')}</h6>
                    </div>
                    <div className="col-12 mt-3">
                        <label className="form-label mb-1">{t('contractUpload.truckType')}</label>

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
                                <span className="placeholder">{t('contractUpload.truckTypePlaceholder')}</span>
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
                                    {/* Service Type Filter (Radio with Images) */}
<div>
<label className="form-label mb-1 mt-3">{t('contractUpload.truckSize')}</label>

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
      <p className="text-muted w-100 text-center">{t('contractUpload.noSizes')}</p>
    )}
  </div>

  <div className="row mt-3">
                    <div className="col-lg-8">
                    <div className="mb-3">
                    <label className="form-label mb-1">{t('contractUpload.goodType')}</label>
                    <div className="select-wrapper position-relative">
    <select className={`form-select form-input py-2 ${isRtl ? 'ps-3' : 'pe-3'} blue-select`} value={goodTypeId} onChange={(e) => setGoodTypeId(e.target.value)}>
        <option value="" disabled>{t('contractUpload.goodTypePlaceholder')}</option>
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
                    <div className="col-lg-4">
                    <label className="form-label mb-1">{t('contractUpload.tripsPerMonth')}</label>
                    <div className="select-wrapper position-relative">
                        <select className={`form-select form-input py-2 ${isRtl ? 'ps-3' : 'pe-3'} blue-select`} value={numTrips} onChange={(e) => setNumTrips(e.target.value)}>
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
<div className="mb-3">
                    <label className="form-label mb-1">{t('contractUpload.startDate')}</label>
                    <div className="datetime-wrapper position-relative">
      
      {/* Hidden native inputs */}
      <input
        ref={dateRef}
        type="date"
        className="hidden-native-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Visible fake input */}
      <div className="form-input datetime-input d-flex align-items-center justify-content-between" onClick={() => dateRef.current.showPicker()} style={{ cursor: 'pointer' }}>

        <div className="d-flex align-items-center gap-4">
                    {/* Right: Date */}
        <span className="datetime-part">
          {date || t('contractUpload.startDate')}
        </span>
        </div>
        {/* Left Icon */}
        <CalendarMonthIcon className="calendar-icon" />
      </div>
    </div>
                </div>   
                </div>
                <div className="mb-3">
                <label className="form-label mb-1">{t('contractUpload.contractDuration')}</label>
                    <div className="d-flex align-items-center gap-2">
                        {(listsData?.ContractDuration || []).map((duration) => (
                            <div 
                                key={duration.id}
                                className={`filter-checkbox-box-2 months-filter-item px-4 ${
                                    contractDurationId === duration.id ? "active" : ""
                                }`}
                                onClick={() => setContractDurationId(duration.id)}
                                style={{ flex: 1, textAlign: 'center' }}
                            >
                                {getLangField(duration, 'name')}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-end gap-2">
                    <button 
                      type='button' 
                      className="login-button text-decoration-none" 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('contractUpload.submitting') : t('contractUpload.submit')}
                    </button>
                </div>

            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow p-3 rounded-3 h-100">
            <h2 className='orders-title'>{t('basicUpload.mapTitle')}</h2>
            <div className="mt-3 pb-3 h-100">
              <ContractMapComponent
                location={location}
                onMapClick={handleMapClick}
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

export default ContractUpload;
