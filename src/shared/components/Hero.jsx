import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMapMarkerAlt, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

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
    if (!val && destinations.length > 1) {
      setDestinations([destinations[0]]);
    }
  };

  const addDestination = () => {
    if (destinations.length < 3) {
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
    const addr = displayName || await getAddress(lat, lng);
    if (activeModalTarget.type === 'pickup') {
      setPickupLocation(addr);
    } else {
      updateDestination(activeModalTarget.index, addr);
    }
    setShowMapModal(false);
  };

  const openMapModal = (type, index = 0) => {
    setActiveModalTarget({ type, index });
    setShowMapModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMapModalClick = useCallback((lat, lng) => {
    handleModalSelect(lat, lng);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModalTarget]);

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
        autoHeight={true}
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
                  <div className="hero-content text-center my-4 mx-auto text-white" style={{ maxWidth: '850px' }}>
                    <h1 className="hero-title fw-bold" style={{color:"#1a73e8"}}>
                      {getLangField(slider, 'title') || slider.title}
                    </h1>
                    <p className="hero-description fs-5 text-white">
                      {getLangField(slider, 'content') || slider.content}
                    </p>

                    <div className="hero-buttons d-flex justify-content-center align-items-center gap-2">
                      <Link to="/user/basic-upload" className="login-button text-decoration-none">{t('hero.orderTruck')}</Link>
                      <Link to="/login" className="join-button text-decoration-none">{t('common:hero.joinDriver', 'انضم كسائق')}</Link>
                    </div>
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

      {/* Filter box - Static and positioned absolutely on top of the slider */}
      <div className="container position-absolute start-50 translate-middle-x filter-box-container" style={{ bottom: '50px', zIndex: 110 }}>
        <div className="filter-box text-start mx-auto mt-0">
          <h6 className="search-filter-title text-start">{t('hero.orderNow')}</h6>

          {/* Filter Checkboxes */}
          <div className="d-flex gap-3 align-items-center flex-wrap justify-content-center justify-content-md-start">
            {[
              { id: "fast", label: t('requestTypes.normal') },
              { id: "travel", label: t('requestTypes.trips') },
              { id: "contract", label: t('requestTypes.contract') }
            ].map((item) => (
              <div
                key={item.id}
                className={`filter-checkbox-box ${activeFilter === item.id ? 'active' : ''}`}
                onClick={() => toggleFilter(item.id)}
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
              </div>
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
                  <div className="list-group position-absolute w-100 shadow-lg mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
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
                  </div>
                )}
              </div>

              {/* Arrow Icon */}
              <i className={`material-icons arrow-icon d-none d-md-block ${i18n.language === 'en' ? 'rotate-180' : ''}`}>keyboard_backspace</i>

              {/* Delivery Location Input(s) */}
              <div className="w-100 d-flex flex-column gap-2">
                {destinations.map((dest, idx) => (
                  <div key={idx} className="input-with-icon w-100 position-relative">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" onClick={() => openMapModal('destination', idx)} style={{ cursor: 'pointer' }} />
                    <input
                      type="text"
                      className="form-control location-input"
                      placeholder={t('hero.deliveryPlaceholder')}
                      value={dest}
                      onChange={(e) => {
                        updateDestination(idx, e.target.value);
                        handleSearchAddress(e.target.value);
                        setActiveModalTarget({ type: 'destination', index: idx });
                      }}
                    />
                    {!showMapModal && dest && activeModalTarget.type === 'destination' && activeModalTarget.index === idx && searchResults.length > 0 && (
                      <div className="list-group position-absolute w-100 shadow-lg mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
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
                      </div>
                    )}
                    {isMultiple && idx > 0 && (
                      <button className="btn btn-sm text-danger position-absolute end-0 top-50 translate-middle-y me-5" onClick={() => removeDestination(idx)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex w-100 flex-column flex-md-row gap-3">
              {isMultiple && destinations.length < 3 && (
                <button 
                  className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                  onClick={addDestination}
                  style={{ minWidth: '150px' }}
                >
                  <i className="fas fa-plus"></i>
                  {i18n.language === 'ar' ? 'أضف موقعاً (بحد أقصى 3)' : 'Add Location (Max 3)'}
                </button>
              )}

              {/* Search Button */}
              <button 
                className="login-button d-flex align-items-center justify-content-center gap-2 search-width w-100 ms-auto"
                onClick={handleSearch}
              >
                <i className="fas fa-search"></i>
                {t('hero.search')}
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Map Selection Modal */}
      {showMapModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="modal-header bg-primary text-white py-3">
                <h5 className="modal-title fw-bold">
                  {i18n.language === 'ar' ? 'تحديد الموقع من الخريطة' : 'Select Location from Map'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowMapModal(false)}></button>
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
                
                <div className="p-3 bg-light text-center">
                  <p className="small text-muted mb-0">
                    {i18n.language === 'ar' 
                      ? 'يمكنك الضغط مباشرة على الخريطة لتحديد الموقع أو استخدام البحث أعلاه.' 
                      : 'You can click directly on the map to set the location or use the search above.'}
                  </p>
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