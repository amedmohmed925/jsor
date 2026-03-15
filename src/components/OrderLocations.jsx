import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useGeoAddress } from '../utils/useGeoAddress';

/**
 * Renders a single geocoded address span.
 */
export const GeoAddress = ({ lat, lng, language, fallback = '--' }) => {
  const address = useGeoAddress(lat, lng, language, fallback);
  return <span>{address}</span>;
};

/**
 * Renders the "From → To" location block for an order card,
 * resolving coordinates to human-readable addresses via Google Geocoding API.
 *
 * Supports up to 5 destination points (lat_to1…lat_to5).
 */
export const OrderLocations = ({ order, currentLanguage, getName }) => {
  const cityFromName = getName?.(order.city_from) || '--';
  const cityToName = getName?.(order.city_to) || '--';

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
            <span>{order.address_from}</span>
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
                <span key={i}>{d.address}</span>
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
