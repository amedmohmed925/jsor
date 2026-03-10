import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMapMarkerAlt, faTimes, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';

// Defined outside Hero to avoid remounting the map on every state change
const HeroMapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Hero = () => {
  const [activeFilter, setActiveFilter] = useState('fast'); // Default to fast/normal
  const [isMultiple, setIsMultiple] = useState(false);
  const [destinations, setDestinations] = useState(['']); // Array for delivery locations
  const [pickupLocation, setPickupLocation] = useState('');
  
  const [showMapModal, setShowMapModal] = useState(false);
  const [activeModalTarget, setActiveModalTarget] = useState({ type: 'pickup', index: 0 });
  const [tempCoords, setTempCoords] = useState([24.7136, 46.6753]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const searchTimeoutRef = useRef(null);

  const { t, i18n } = useTranslation('common');
  const { data: homeData, isLoading } = useGetHomeDataQuery();
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const toggleFilter = (name) => {
    setActiveFilter(name);
  };

  const handleIsMultipleChange = (val) => {
    setIsMultiple(val);
    if (val) {
      if (destinations.length < 2) {
        setDestinations(['', '']);
      }
    } else {
      if (destinations.length > 1) {
        setDestinations([destinations[0]]);
      }
    }
  };

  const addDestination = () => {
    if (destinations.length < 2) {
      setDestinations([...destinations, '']);
    }
  };

  const updateDestination = (index, value) => {
    const newDests = [...destinations];
    newDests[index] = value;
    setDestinations(newDests);
  };

  const removeDestination = (index) => {
    if (destinations.length > 1) {
      const newDests = destinations.filter((_, i) => i !== index);
      setDestinations(newDests);
    }
  };

  const getAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${i18n.language}`);
      const data = await response.json();
      return data.display_name;
    } catch (e) {
      return "Selected Location";
    }
  };

  // Debounced version for inline typing (called on every keystroke)
  const handleSearchAddress = (query) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!query || query.length < 2) { setSearchResults([]); return; }
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=${i18n.language}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  // Immediate version for modal button click / Enter key
  const handleSearchAddressImmediate = async (query) => {
    if (!query) return;
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=${i18n.language}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleModalSelect = async (lat, lng, displayName) => {
    setIsConfirming(true);
    try {
      const addr = displayName || await getAddress(lat, lng);
      if (activeModalTarget.type === 'pickup') {
        setPickupLocation(addr);
      } else {
        updateDestination(activeModalTarget.index, addr);
      }
      setShowMapModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsConfirming(false);
    }
  };

  const openMapModal = (type, index = 0) => {
    setActiveModalTarget({ type, index });
    setShowMapModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  // تعديل: هنا نجعل الضغط على الخريطة يغير الإحداثيات ويحدث نص البحث
  const handleMapModalClick = useCallback(async (lat, lng) => {
    setTempCoords([lat, lng]);
    const addr = await getAddress(lat, lng);
    setSearchQuery(addr);
  }, [i18n.language]);

  const handleSearch = () => {
    let targetPath = '/user/basic-upload';
    if (activeFilter === 'travel') targetPath = '/user/trip-upload';
    if (activeFilter === 'contract') targetPath = '/user/contract-upload';

    navigate(targetPath, { 
      state: { 
        pickup: pickupLocation, 
        destinations: destinations.filter(d => d.trim() !== ''),
        isMultiple: isMultiple
      } 
    });
  };
  
  // Helper to get localized field from API with fallback for bad API data
  const getLangField = (item, field) => {
    if (!item) return '';
    const isEn = i18n.language && i18n.language.startsWith('en');
    const enField = `${field}_en`;
    const arField = `${field}_ar`;
    
    if (isEn) {
      if (!item[enField] || item[enField] === item[field]) return null;
      return item[enField];
    } else {
      return item[arField] || item[field];
    }
  };

  const sliders = homeData?.slider || [];

  return (
    <section className="hero-section p-0 position-relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={sliders.length > 1}
        autoHeight={false}
        style={{ height: '100%', minHeight: '85vh' }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={800}
        pagination={{ clickable: true }}
        navigation={false}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        watchOverflow={false}
        className="hero-swiper"
      >
        {isLoading ? (
          <SwiperSlide>
            <div className="hero-slide-content d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          sliders.map((slider) => (
            <SwiperSlide key={slider.id}>
              <div 
                className="hero-slide-item" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${slider.image})`,
                }}
              >
                <div className="container hero-text-container">
                  {/* تعديل: تمت إضافة paddingBottom لرفع النصوص والأزرار وتفادي تداخلها مع الكارت */}
<div className="hero-content text-center my-4 mx-auto text-white" style={{ maxWidth: '850px' }}>                    <motion.h1 
                      className="hero-title fw-bold" 
                      style={{color:"#1a73e8"}}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      {getLangField(slider, 'title') || slider.title}
                    </motion.h1>
                    <motion.p 
                      className="hero-description fs-5 text-white"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {getLangField(slider, 'content') || slider.content}
                    </motion.p>

                    <motion.div 
                      className="hero-buttons d-flex justify-content-center align-items-center gap-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      style={{ paddingBottom: '40px' }} // رفع الأزرار لتجنب تداخلها مع الكارت
                    >
                      <Link to="/user/basic-upload" className="login-button text-decoration-none">{t('hero.orderTruck')}</Link>
                      <Link to="/signup-driver" className="join-button text-decoration-none">{t('common:hero.joinDriver', 'انضم كسائق')}</Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}

        {/* Custom Navigation Arrows moved inside Swiper */}
        {sliders.length > 1 && (
          <>
            <button
              className="hero-nav-btn hero-nav-prev"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={i18n.dir() === 'rtl' ? faChevronRight : faChevronLeft} />
            </button>
            <button
              className="hero-nav-btn hero-nav-next"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={i18n.dir() === 'rtl' ? faChevronLeft : faChevronRight} />
            </button>
          </>
        )}
      </Swiper>

      {/* Filter box - Restored to absolute positioning */}
      <motion.div 
  className="container filter-box-container position-absolute start-50 translate-middle-x" 
  style={{ top: '46%', zIndex: 110 }} // التثبيت من الأعلى يجعله يتمدد للأسفل
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <div className="filter-box text-start mx-auto mt-0 shadow-lg">
          <h6 className="search-filter-title text-start">{t('hero.orderNow')}</h6>

          {/* Filter Checkboxes */}
          <div className="d-flex gap-3 align-items-center flex-wrap justify-content-center justify-content-md-start">
            {[
              { id: "fast", label: t('requestTypes.normal') },
              { id: "travel", label: t('requestTypes.trips') },
              { id: "contract", label: t('requestTypes.contract') }
            ].map((item) => (
              <motion.div
                key={item.id}
                className={`filter-checkbox-box ${activeFilter === item.id ? 'active' : ''}`}
                onClick={() => toggleFilter(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="radio"
                  name="requestType"
                  className="checkbox-style"
                  checked={activeFilter === item.id}
                  readOnly
                />

                <span
                  className="mb-1 checkbox-label"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFilter(item.id);
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          
          {/* Additional Checkboxes */}
          <div className="mt-3 d-flex flex-wrap gap-2 gap-md-4 justify-content-center justify-content-md-start">
            <div 
              className="d-flex align-items-center gap-1 cursor-pointer" 
              onClick={() => handleIsMultipleChange(false)}
            >
              <input 
                type="radio" 
                name="locationCount"
                className="checkbox-style" 
                id="singleLocation" 
                checked={!isMultiple}
                onChange={() => handleIsMultipleChange(false)}
              />
              <label htmlFor="singleLocation" className="checkbox-label cursor-pointer">
                {t('requestTypes.singleLocation')}
              </label>
            </div>
            <div 
              className="d-flex align-items-center gap-1 cursor-pointer" 
              onClick={() => handleIsMultipleChange(true)}
            >
              <input 
                type="radio" 
                name="locationCount"
                className="checkbox-style" 
                id="multipleLocations" 
                checked={isMultiple}
                onChange={() => handleIsMultipleChange(true)}
              />
              <label htmlFor="multipleLocations" className="checkbox-label cursor-pointer">
                {t('requestTypes.multipleLocations')}
              </label>
            </div>
          </div>

          {/* Location Search Row */}
          <div className="location-search-row d-flex flex-column align-items-center gap-3 mt-3">
            <div className="d-flex flex-column flex-md-row w-100 align-items-center gap-2">
              {/* Pickup Location Input */}
              <div className="input-with-icon w-100 position-relative">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" onClick={() => openMapModal('pickup')} style={{ cursor: 'pointer' }} />
                <input
                  type="text"
                  className="form-control location-input"
                  placeholder={t('hero.pickupPlaceholder')}
                  value={pickupLocation}
                  onChange={(e) => {
                    setPickupLocation(e.target.value);
                    handleSearchAddress(e.target.value);
                    setActiveModalTarget({ type: 'pickup', index: 0 });
                  }}
                />
                {!showMapModal && pickupLocation && activeModalTarget.type === 'pickup' && searchResults.length > 0 && (
                  <AnimatePresence>
                    <motion.div 
                      className="list-group position-absolute w-100 shadow-lg mt-1" 
                      style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {searchResults.map((res, i) => (
                        <button 
                          key={i} 
                          className="list-group-item list-group-item-action text-start fs-7"
                          onClick={() => {
                            setPickupLocation(res.display_name);
                            setSearchResults([]);
                          }}
                        >
                          {res.display_name}
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Arrow Icon */}
              <i className={`material-icons arrow-icon d-none d-md-block ${i18n.language === 'en' ? 'rotate-180' : ''}`}>keyboard_backspace</i>

              {/* Delivery Location Input(s) */}
{/* تم إضافة maxHeight و overflowY لمنع الكارت من التمدد للأعلى */}
<div className="w-100 d-flex flex-column gap-2 custom-scrollbar" style={{ maxHeight: '115px', overflowY: 'auto', overflowX: 'hidden', paddingRight: i18n.language === 'ar' ? '0' : '5px', paddingLeft: i18n.language === 'ar' ? '5px' : '0' }}>
  <AnimatePresence mode="popLayout">
    {destinations.map((dest, idx) => {
      const hasRemove = isMultiple && idx > 0;
      const hasAdd = isMultiple && idx === destinations.length - 1 && destinations.length < 2;

      return (
        <motion.div 
          key={idx} 
          // تم تغيير الحاوية لتكون Flexbox لعرض الحقل والأزرار بجانب بعضهم
          className="d-flex align-items-center gap-2 w-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* حقل الإدخال يأخذ المساحة المتبقية بالكامل */}
          <div className="input-with-icon position-relative flex-grow-1">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" onClick={() => openMapModal('destination', idx)} style={{ cursor: 'pointer' }} />
            <input
              type="text"
              className="form-control location-input"
              placeholder={t('hero.deliveryPlaceholder')}
              value={dest}
              // تم إزالة حسابات الـ padding المعقدة من هنا
              onChange={(e) => {
                updateDestination(idx, e.target.value);
                handleSearchAddress(e.target.value);
                setActiveModalTarget({ type: 'destination', index: idx });
              }}
            />
            
            {/* القائمة المنسدلة للبحث */}
            {!showMapModal && dest && activeModalTarget.type === 'destination' && activeModalTarget.index === idx && searchResults.length > 0 && (
              <motion.div 
                className="list-group position-absolute w-100 shadow-lg mt-1" 
                style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {searchResults.map((res, i) => (
                  <button 
                    key={i} 
                    className="list-group-item list-group-item-action text-start fs-7"
                    onClick={() => {
                      updateDestination(idx, res.display_name);
                      setSearchResults([]);
                    }}
                  >
                    {res.display_name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* حاوية الأزرار بجانب حقل الإدخال */}
          <div className="d-flex align-items-center gap-1">
            {hasRemove && (
              <button 
                type="button"
                className="btn btn-light border shadow-sm text-danger d-flex align-items-center justify-content-center" 
                onClick={(e) => { e.preventDefault(); removeDestination(idx); }}
                style={{ width: '38px', height: '38px', borderRadius: '8px', flexShrink: 0 }}
                title={i18n.language === 'ar' ? 'حذف الوجهة' : 'Remove Destination'}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </motion.div>
      );
    })}
  </AnimatePresence>
</div>
            </div>

            <div className="d-flex w-100 flex-column flex-md-row gap-3">
              {/* Search Button */}
              <motion.button 
                className="login-button d-flex align-items-center justify-content-center gap-2 search-width w-100 ms-auto"
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-search"></i>
                {t('hero.search')}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>      
      {/* Map Selection Modal */}
      {showMapModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }} onClick={() => setShowMapModal(false)}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="modal-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="modal-title fw-bold m-0">
                  {i18n.language === 'ar' ? 'تحديد الموقع من الخريطة' : 'Select Location from Map'}
                </h5>
                <button type="button" className="btn-close btn-close-white m-0" onClick={() => setShowMapModal(false)}></button>
              </div>
              <div className="modal-body p-0 position-relative">
                {/* Search Overlay */}
                <div className="position-absolute top-0 start-50 translate-middle-x mt-3 w-75" style={{ zIndex: 10000 }}>
                  <div className="input-group shadow-sm">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={i18n.language === 'ar' ? 'ابحث عن عنوان...' : 'Search for address...'} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearchAddressImmediate(searchQuery)}
                    />
                    <button className="btn btn-primary" onClick={() => handleSearchAddressImmediate(searchQuery)}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="list-group mt-1 shadow-sm overflow-auto" style={{ maxHeight: '200px' }}>
                      {searchResults.map((res, i) => (
                        <button 
                          key={i} 
                          className="list-group-item list-group-item-action text-start fs-7"
                          onClick={() => handleModalSelect(res.lat, res.lon, res.display_name)}
                        >
                          {res.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ height: '400px', width: '100%' }}>
                  <MapContainer center={tempCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <HeroMapClickHandler onMapClick={handleMapModalClick} />
                    <Marker position={tempCoords} />
                  </MapContainer>
                </div>
                
                {/* تعديل: إضافة زر تأكيد الموقع (Confirm Button) */}
                <div className="p-3 bg-light d-flex justify-content-between align-items-center gap-3">
                  <p className="small text-muted mb-0 text-start" style={{ flex: 1 }}>
                    {i18n.language === 'ar' 
                      ? 'يمكنك الضغط مباشرة على الخريطة لتحديد الموقع أو استخدام البحث أعلاه.' 
                      : 'You can click directly on the map to set the location or use the search above.'}
                  </p>
                  <button 
                    className="btn btn-primary px-4 fw-bold d-flex align-items-center gap-2"
                    onClick={() => handleModalSelect(tempCoords[0], tempCoords[1])}
                    disabled={isConfirming}
                  >
                    {isConfirming ? (
                      <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> {i18n.language === 'ar' ? 'جاري التأكيد...' : 'Confirming...'}</>
                    ) : (
                      i18n.language === 'ar' ? 'تأكيد وإضافة' : 'Confirm & Add'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;