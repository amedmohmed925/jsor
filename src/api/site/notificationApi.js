import { baseApi } from '../baseApi';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Notification API
 * Handles fetching notifications and badge count
 */

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get Notifications
     * GET /api/web/v1/site/notification
     */
    getNotifications: builder.query({
      query: () => API_ENDPOINTS.NOTIFICATIONS,
      providesTags: ['Notification'],
      transformResponse: (response) => {
        // Response format: { status: 1, data: [{ items: [], _meta: {} }] }
        if (response.status === 1 && response.data && response.data.length > 0) {
          return response.data[0];
        }
        return { items: [], _meta: { totalCount: 0 } };
      },
    }),

    /**
     * Get Notification Badge Count
     * GET /api/web/v1/site/notification-budge
     */
    getNotificationBadge: builder.query({
      query: () => API_ENDPOINTS.NOTIFICATION_BADGE,
      providesTags: ['Notification'],
      transformResponse: (response) => {
        // Response format: { status: 1, data: "0" }
        return response.status === 1 ? response.data : "0";
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationBadgeQuery,
} = notificationApi;
