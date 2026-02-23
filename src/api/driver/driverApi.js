import { baseApi } from '../baseApi';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Driver API
 * Driver-specific endpoints using RTK Query
 */

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get Driver Orders
     * GET /driver/orders
     */
    getDriverOrders: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.DRIVER_ORDERS,
        params,
      }),
      providesTags: ['Order'],
    }),

    /**
     * Get Driver New Orders
     * GET /api/web/v1/site/driver-new-order
     */
    getDriverNewOrders: builder.query({
      query: (token) => ({
        url: `${API_ENDPOINTS.DRIVER_NEW_ORDERS}?access-token=${token}`,
      }),
      providesTags: ['Order'],
    }),

    /**
     * Get Driver Shipping Orders
     * GET /api/web/v1/site/driver-shipping-order
     */
    getDriverShippingOrders: builder.query({
      query: (token) => ({
        url: `${API_ENDPOINTS.DRIVER_SHIPPING_ORDERS}?access-token=${token}`,
      }),
      providesTags: ['Order'],
    }),

    /**
     * Get Driver Completed Orders
     * GET /api/web/v1/site/driver-complete-order
     */
    getDriverCompletedOrders: builder.query({
      query: (token) => ({
        url: `${API_ENDPOINTS.DRIVER_COMPLETE_ORDERS}?access-token=${token}`,
      }),
      providesTags: ['Order'],
    }),
    
    /**
     * Get Driver Balance
     * GET /driver/balance
     */
    getDriverBalance: builder.query({
      query: () => API_ENDPOINTS.DRIVER_BALANCE,
      providesTags: ['Balance'],
    }),
    
    /**
     * Get Driver Profile
     * GET /driver/profile
     */
    getDriverProfile: builder.query({
      query: () => API_ENDPOINTS.DRIVER_PROFILE,
      providesTags: ['Profile'],
    }),
    
    /**
     * Update Driver Profile
     * POST /driver/profile
     */
    updateDriverProfile: builder.mutation({
      query: (profileData) => ({
        url: API_ENDPOINTS.DRIVER_PROFILE,
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
    
    /**
     * Update Order Status
     * PUT /driver/orders/:id/status
     */
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `${API_ENDPOINTS.DRIVER_ORDERS}/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    
    /**
     * Accept Order
     * POST /driver/orders/:id/accept
     */
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: `${API_ENDPOINTS.DRIVER_ORDERS}/${orderId}/accept`,
        method: 'POST',
      }),
      invalidatesTags: ['Order'],
    }),
    
    /**
     * Create Offer
     * POST /api/web/v1/site/create-offer
     */
    createOffer: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.CREATE_OFFER}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * Rate Customer
     * POST /api/web/v1/site/rate-customer
     */
    rateCustomer: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.RATE_CUSTOMER}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * View Vehicle
     * GET /api/web/v1/site/veiw-vehicle
     */
    getVehicle: builder.query({
      query: (token) => ({
        url: API_ENDPOINTS.VIEW_VEHICLE,
        params: { 'access-token': token },
      }),
      providesTags: ['Vehicle'],
    }),

    /**
     * Start Order
     * POST /api/web/v1/site/start-order
     */
    startOrder: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.START_ORDER}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * Upload Image Before
     * POST /api/web/v1/site/upload-image-before
     */
    uploadImageBefore: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.UPLOAD_IMAGE_BEFORE}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * Upload Image After
     * POST /api/web/v1/site/upload-image-after
     */
    uploadImageAfter: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.UPLOAD_IMAGE_AFTER}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * Customer Signature
     * POST /api/web/v1/site/customer-signature
     */
    customerSignature: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.CUSTOMER_SIGNATURE}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * End Order
     * POST /api/web/v1/site/end-order
     */
    endOrder: builder.mutation({
      query: ({ token, body }) => ({
        url: `${API_ENDPOINTS.END_ORDER}?access-token=${token}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    /**
     * Add Vehicle
     * POST /api/web/v1/site/add-vehicle
     */
    addVehicle: builder.mutation({
      query: ({ token, body }) => ({
        url: API_ENDPOINTS.ADD_VEHICLE,
        method: 'POST',
        params: { 'access-token': token },
        body,
      }),
      invalidatesTags: ['Vehicle'],
    }),

    /**
     * Update Vehicle
     * POST /api/web/v1/site/update-vehicle
     */
    updateVehicle: builder.mutation({
      query: ({ token, body }) => ({
        url: API_ENDPOINTS.UPDATE_VEHICLE,
        method: 'POST',
        params: { 'access-token': token },
        body,
      }),
      invalidatesTags: ['Vehicle'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetDriverOrdersQuery,
  useGetDriverNewOrdersQuery,
  useGetDriverShippingOrdersQuery,
  useGetDriverCompletedOrdersQuery,
  useGetDriverBalanceQuery,
  useGetDriverProfileQuery,
  useUpdateDriverProfileMutation,
  useUpdateOrderStatusMutation,
  useAcceptOrderMutation,
  useCreateOfferMutation,
  useRateCustomerMutation,
  useGetVehicleQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useStartOrderMutation,
  useUploadImageBeforeMutation,
  useUploadImageAfterMutation,
  useCustomerSignatureMutation,
  useEndOrderMutation,
} = driverApi;
