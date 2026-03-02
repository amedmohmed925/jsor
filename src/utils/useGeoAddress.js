import { useState, useEffect, useRef } from 'react';

/**
 * Global cache for geocoded addresses to avoid redundant API calls.
 * Shared across all components that import this module.
 */
const geoCache = {};

/** Track in-flight fetches to avoid duplicate requests for the same key */
const pendingFetches = {};

/**
 * Reverse-geocode coordinates to a human-readable address using Google Maps Geocoding API.
 * Results are cached globally so the same coordinates are never fetched twice.
 *
 * @param {string|number} lat - Latitude
 * @param {string|number} lng - Longitude
 * @param {string} language - 'ar' or 'en'
 * @param {string} fallback - Fallback text if geocoding fails
 * @returns {string} The resolved address, fallback, or '...' while loading
 */
export const useGeoAddress = (lat, lng, language, fallback = '--') => {
  const isValid = (v) =>
    v !== null && v !== undefined && v !== 'null' && v !== '' && !isNaN(parseFloat(v));

  const validLat = isValid(lat);
  const validLng = isValid(lng);

  const cacheKey = validLat && validLng ? `${lat},${lng},${language}` : null;

  const [address, setAddress] = useState(() => {
    if (!cacheKey) return fallback;
    return geoCache[cacheKey] ?? null;
  });

  // Track the previous cacheKey to reset state when coordinates change.
  // This uses the React-recommended "adjust state during render" pattern.
  const prevKeyRef = useRef(cacheKey);
  if (prevKeyRef.current !== cacheKey) {
    prevKeyRef.current = cacheKey;
    if (!cacheKey) {
      setAddress(fallback);
    } else {
      setAddress(geoCache[cacheKey] ?? null);
    }
  }

  useEffect(() => {
    if (!cacheKey) return;

    // Already cached → set directly
    if (geoCache[cacheKey]) {
      setAddress(geoCache[cacheKey]);
      return;
    }

    let cancelled = false;

    const doFetch = async () => {
      // If another instance is already fetching the same key, wait for it
      if (pendingFetches[cacheKey]) {
        try {
          const result = await pendingFetches[cacheKey];
          if (!cancelled) setAddress(result);
        } catch {
          if (!cancelled) setAddress(fallback);
        }
        return;
      }

      const lang = (language || 'ar').startsWith('en') ? 'en' : 'ar';
      const cleanLat = parseFloat(lat);
      const cleanLng = parseFloat(lng);
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        console.warn('[GeoAddress] VITE_GOOGLE_MAPS_API_KEY is not set in .env');
        geoCache[cacheKey] = fallback;
        if (!cancelled) setAddress(fallback);
        return;
      }

      // Create a shared promise for this fetch
      pendingFetches[cacheKey] = (async () => {
        try {
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cleanLat},${cleanLng}&key=${apiKey}&language=${lang}`;
          const res = await fetch(url);
          const data = await res.json();

          console.log('[GeoAddress]', cacheKey, 'status:', data.status, data.error_message || '');

          if (data.status === 'OK' && data.results?.length > 0) {
            const components = data.results[0].address_components || [];
            const short =
              components.find((c) => c.types.includes('neighborhood'))?.long_name ||
              components.find((c) => c.types.includes('sublocality'))?.long_name ||
              components.find((c) => c.types.includes('route'))?.long_name ||
              components.find((c) => c.types.includes('locality'))?.long_name ||
              data.results[0].formatted_address.split(',')[0];

            const result = short || data.results[0].formatted_address;
            geoCache[cacheKey] = result;
            return result;
          } else {
            console.warn('[GeoAddress] Non-OK response for', cacheKey, data);
            geoCache[cacheKey] = fallback;
            return fallback;
          }
        } catch (err) {
          console.error('[GeoAddress] fetch error:', err);
          geoCache[cacheKey] = fallback;
          return fallback;
        } finally {
          delete pendingFetches[cacheKey];
        }
      })();

      try {
        const result = await pendingFetches[cacheKey];
        if (!cancelled) setAddress(result);
      } catch {
        if (!cancelled) setAddress(fallback);
      }
    };

    doFetch();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  if (!validLat || !validLng) return fallback;
  return address ?? '...';
};
