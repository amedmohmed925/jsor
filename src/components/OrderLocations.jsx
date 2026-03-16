import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useGeoAddress } from '../utils/useGeoAddress';
import { useTranslation } from 'react-i18next';

/**
 * Renders a single geocoded address span.
 */
export const GeoAddress = ({ lat, lng, language, fallback = '--', onAddressResolved }) => {
  const address = useGeoAddress(lat, lng, language, fallback);
  
  React.useEffect(() => {
    if (address && address !== fallback) {
      onAddressResolved?.(address);
    }
  }, [address, fallback, onAddressResolved]);

  return <span>{address}</span>;
};

/**
 * Renders the "From → To" location block for an order card,
 * resolving coordinates to human-readable addresses via Google Geocoding API.
 *
 * Supports up to 5 destination points (lat_to1…lat_to5).
 */
export const OrderLocations = ({ order, currentLanguage, getName }) => {
  const { t } = useTranslation();
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const cityFromName = getName?.(order.city_from) || '--';
  const cityToName = getName?.(order.city_to) || '--';

  const toggleAddress = (id) => {
    setExpandedAddresses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const AddressDisplay = ({ addr, id }) => {
    if (!addr || addr === 'null') return <span>--</span>;
    const parts = addr.split(',');
    const isLong = parts.length > 2;
    const isExpanded = expandedAddresses[id];
    
    if (!isLong) return <span>{addr}</span>;
    
    const short = `${parts[0].trim()}, ${parts[1].trim()}`;
    return (
      <span className="d-inline-flex flex-wrap align-items-center gap-1">
        {isExpanded ? addr : short} 
        <span 
          onClick={(e) => { e.stopPropagation(); toggleAddress(id); }} 
          style={{ color: '#007bff', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {isExpanded ? t('common:messages.show_less') || 'عرض أقل' : t('common:messages.show_more') || 'عرض المزيد'}
        </span>
      </span>
    );
  };

  // Destinations check - Address prioritized over Coordinates
  const getDestinations = () => {
    const dests = [];
    for (let i = 1; i <= 5; i++) {
        const address = order[`address_to${i === 1 ? '1' : i === 2 ? '2' : i}`] || order[`address_to${i}`];
        const lat = order[`lat_to${i}`];
        const lng = order[`lang_to${i}`];

        if (address && address !== 'null') {
            dests.push({ address });
        } else if (lat && lng && lat !== 'null' && lng !== 'null') {
            dests.push({ lat, lng });
        }
    }
    return dests;
  };

  const destinations = getDestinations();

  return (
    <div className="from-to-wrapper">
      <div className="from-to-icons">
        <div className="location-icon">
          <LocationOnOutlinedIcon className="fs-6" />
        </div>
        <div className="circle"></div>
        <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
        {destinations.length > 1 &&
          destinations.slice(1).map((_, i) => (
            <React.Fragment key={`arrow-${i}`}>
              <div className="circle"></div>
              <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
            </React.Fragment>
          ))}
        <div className="location-icon">
          <LocationOnOutlinedIcon className="fs-6" />
        </div>
      </div>
      <div className="from-to-text">
        {/* Origin */}
        {order.address_from && order.address_from !== 'null' ? (
            <AddressDisplay addr={order.address_from} id={`${order.id}-from`} />
        ) : (
            <GeoAddress
              lat={order.lat_from}
              lng={order.lang_from}
              language={currentLanguage}
              fallback={cityFromName}
            />
        )}
        
        {/* Destinations */}
        {destinations.length > 0 ? (
          destinations.map((d, i) => (
            d.address ? (
                <AddressDisplay key={i} addr={d.address} id={`${order.id}-to-${i}`} />
            ) : (
                <GeoAddress
                  key={i}
                  lat={d.lat}
                  lng={d.lng}
                  language={currentLanguage}
                  fallback={cityToName}
                />
            )
          ))
        ) : (
          <GeoAddress
            lat={order.lat_to1}
            lng={order.lang_to1}
            language={currentLanguage}
            fallback={cityToName}
          />
        )}
      </div>
    </div>
  );
};
