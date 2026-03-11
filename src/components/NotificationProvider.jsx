import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { messaging, getToken, onMessage } from '../firebase';
import { useTranslation } from 'react-i18next';
import { useSaveFcmTokenMutation } from '../api/user/userApi';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const NotificationContext = createContext(null);

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const authToken = useSelector((state) => state.auth.token);
    const [notifications, setNotifications] = useState([]);
    const [fcmToken, setFcmToken] = useState(null);
    const [permission, setPermission] = useState(Notification.permission);
    const timeoutsRef = useRef({});
    const [saveFcmToken] = useSaveFcmTokenMutation();
    const isRequestingRef = useRef(false);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        clearTimeout(timeoutsRef.current[id]);
        delete timeoutsRef.current[id];
    }, []);

    const addNotification = useCallback((notification) => {
        const id = Date.now() + Math.random();
        const newNotif = { id, ...notification, isLeaving: false };

        setNotifications((prev) => [newNotif, ...prev].slice(0, 5));

        const duration = notification.duration || 6000;
        timeoutsRef.current[id] = setTimeout(() => {
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, isLeaving: true } : n))
            );
            setTimeout(() => removeNotification(id), 400);
        }, duration);
    }, [removeNotification]);

    const requestPermissionAndGetToken = useCallback(async () => {
        // Prevent double execution (React StrictMode runs effects twice)
        if (isRequestingRef.current) return null;
        isRequestingRef.current = true;

        try {
            const perm = await Notification.requestPermission();
            setPermission(perm);

            if (perm !== 'granted') {
                isRequestingRef.current = false;
                return null;
            }

            await navigator.serviceWorker.register('/firebase-messaging-sw.js', { updateViaCache: 'none' });
            const swReg = await navigator.serviceWorker.ready;

            // Unsubscribe any existing push subscription to avoid VAPID key mismatch
            const existingSub = await swReg.pushManager.getSubscription();
            if (existingSub) {
                await existingSub.unsubscribe();
                localStorage.removeItem('fcm_token');
            }

            const token = await getToken(messaging, { vapidKey: VAPID_KEY });

            if (token) {
                setFcmToken(token);
                localStorage.setItem('fcm_token', token);
                // Note: We are now handling saving token primarily in LoginMain for the device-token endpoint
                isRequestingRef.current = false;
                return token;
            }
        } catch (error) {
            console.error('[FCM] Error during token process:', error);
        }
        isRequestingRef.current = false;
        return null;
    }, [authToken, saveFcmToken]);

    // Request permission when user logs in
    useEffect(() => {
        if (!isAuthenticated) return;

        const savedFcm = localStorage.getItem('fcm_token');
        if (savedFcm) {
            setFcmToken(savedFcm);
        }

        if (Notification.permission === 'default') {
            requestPermissionAndGetToken();
        } else if (Notification.permission === 'granted' && !savedFcm) {
            requestPermissionAndGetToken();
        }
    }, [isAuthenticated, requestPermissionAndGetToken]);

    // Listen for foreground messages
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            const { title, body, icon } = payload.notification || {};
            addNotification({
                title: title || (isRtl ? 'إشعار جديد' : 'New Notification'),
                body: body || '',
                icon: icon || null,
                data: payload.data || {},
                type: payload.data?.type || 'info',
            });
        });

        return () => unsubscribe();
    }, [addNotification, isRtl]);

    return (
        <NotificationContext.Provider
            value={{ fcmToken, permission, notifications, addNotification, removeNotification, requestPermissionAndGetToken }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
