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

    /**
     * Submit Contact Form
     * POST /api/web/v1/site/contact
     * Body: { name, email, body }
     */
    submitContact: builder.mutation({
      query: (contactData) => ({
        url: API_ENDPOINTS.SITE_CONTACT,
        method: 'POST',
        body: contactData,
      }),
    }),

    /**
     * Get Terms and Conditions Data
     * GET /api/web/v1/site/term
     */
    getTermsData: builder.query({
      query: () => API_ENDPOINTS.SITE_TERMS,
      transformResponse: (response) => {
        // The API returns { status: 1, data: [...] }
        return response.status === 1 ? response.data[0] : null;
      },
    }),

    /**
     * Get Lists (GoodType, TruckType, etc.)
     * GET /api/web/v1/site/lists
     */
    getLists: builder.query({
      query: () => API_ENDPOINTS.LISTS,
      transformResponse: (response) => {
        return response.status === 1 ? response.data[0] : null;
      },
    }),

    /**
     * Get Contact Info
     * GET /api/web/v1/site/contact-info
     */
    getContactInfo: builder.query({
      query: () => API_ENDPOINTS.CONTACT_INFO,
      transformResponse: (response) => {
        return response.status === 1 ? response.data[0].setting : null;
      },
    }),

    /**
     * Get Driver Info
     * GET /api/web/v1/site/driver-info
     */
    getDriverInfo: builder.query({
      query: ({ token, id }) => ({
        url: API_ENDPOINTS.DRIVER_INFO,
        params: { 'access-token': token, id },
      }),
      transformResponse: (response) => {
        return response.status === 1 ? response.data[0] : null;
      },
    }),

    /**
     * Get Sub Trucks by Truck ID
     * GET /api/web/v1/site/sub-truck?id={id}
     */
    getSubTrucks: builder.query({
      query: (id) => `${API_ENDPOINTS.SUB_TRUCK}?id=${id}`,
      transformResponse: (response) => {
        return response.status === 1 ? response.data[0] : [];
      },
    }),

    /**
     * Create Normal Request
     * POST /api/web/v1/site/create-normal-request
     */
    createNormalRequest: builder.mutation({
      query: (requestData) => ({
        url: API_ENDPOINTS.CREATE_NORMAL_REQUEST,
        method: 'POST',
        params: { 'access-token': localStorage.getItem('josur_auth_token') }, 
        body: requestData,
      }),
    }),

    /**
     * Create Trip Request
     * POST /api/web/v1/site/create-trip-request
     */
    createTripRequest: builder.mutation({
      query: (requestData) => ({
        url: API_ENDPOINTS.CREATE_TRIP_REQUEST,
        method: 'POST',
        params: { 'access-token': localStorage.getItem('josur_auth_token') },
        body: requestData,
      }),
    }),

    /**
     * Create Contract Request
     * POST /api/web/v1/site/create-contract-request
     */
    createContractRequest: builder.mutation({
      query: (requestData) => ({
        url: API_ENDPOINTS.CREATE_CONTRACT_REQUEST,
        method: 'POST',
        params: { 'access-token': localStorage.getItem('josur_auth_token') },
        body: requestData,
      }),
    }),

    /**
     * Cancel Request
     * POST /api/web/v1/site/cancel-request
     * Body: { request_id }
     */
    cancelRequest: builder.mutation({
      query: (requestId) => ({
        url: API_ENDPOINTS.CANCEL_REQUEST,
        method: 'POST',
        params: { 'access-token': localStorage.getItem('josur_auth_token') },
        body: { reqeust_id: requestId },
      }),
    }),

    /**
     * Driver Signup
     * POST /api/web/v1/site/signup-driver
     */
    driverSignup: builder.mutation({
      query: (signupData) => ({
        url: API_ENDPOINTS.SIGNUP_DRIVER,
        method: 'POST',
        body: signupData,
      }),
    }),

    /**
     * Get Cities by Country ID
     * GET /api/web/v1/site/city-of-country?id={id}
     */
    getCities: builder.query({
      query: (countryId) => `/api/web/v1/site/city-of-country?id=${countryId}`,
      transformResponse: (response) => {
        // Based on the nested structure: response.data[0][0] contains the city list
        if (response.status === 1 && response.data && response.data[0]) {
          return Array.isArray(response.data[0][0]) ? response.data[0][0] : response.data[0];
        }
        return [];
      },
    }),

    /**
     * Rate Request
     * POST /api/web/v1/site/rate-request
     * Body: { request_id, rate, comment }
     */
    rateRequest: builder.mutation({
      query: (ratingData) => ({
        url: API_ENDPOINTS.RATE_REQUEST,
        method: 'POST',
        params: { 'access-token': localStorage.getItem('josur_auth_token') },
        body: ratingData,
      }),
    }),

    /**
     * Accept Offer
     * POST /api/web/v1/site/accept-offer
     * Body: { offer_id }
     */
    acceptOffer: builder.mutation({
      query: (offerId) => ({
        url: API_ENDPOINTS.ACCEPT_OFFER,
        method: 'POST',
        params: { 'access-token': localStorage.getItem('josur_auth_token') },
        body: { offer_id: offerId },
      }),
    }),
  }),
});

export const {
  useGetHomeDataQuery,
  useSubmitContactMutation,
  useGetTermsDataQuery,
  useGetListsQuery,
  useGetDriverInfoQuery,
  useGetSubTrucksQuery,
  useCreateNormalRequestMutation,
  useCreateTripRequestMutation,
  useCreateContractRequestMutation,
  useCancelRequestMutation,
  useRateRequestMutation,
  useAcceptOfferMutation,
  useGetContactInfoQuery,
  useDriverSignupMutation,
  useGetCitiesQuery,
} = siteApi;
