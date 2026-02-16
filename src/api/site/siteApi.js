import { baseApi } from '../baseApi';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Site API
 * Public site data endpoints using RTK Query
 */

export const siteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get Home Data
     * GET /api/web/v1/site/home-web
     */
    getHomeData: builder.query({
      query: () => API_ENDPOINTS.SITE_HOME,
      transformResponse: (response) => {
        // The API returns { status: 1, data: [...] }
        // We want the first item of the data array
        return response.status === 1 ? response.data[0] : null;
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetHomeDataQuery,
} = siteApi;
