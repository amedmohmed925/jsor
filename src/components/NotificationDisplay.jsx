import { useEffect, useState, useRef } from 'react';
import { useNotifications } from './NotificationProvider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './NotificationDisplay.css';

const iconMap = {
    info: (
        <svg viewBox="0 0 24 24" fill="none" className="notif-svg">
            <circle cx="12" cy="12" r="10" fill="#3B82F6" opacity="0.15"/>
            <path d="M12 8v4m0 4h.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="1.5"/>
        </svg>
    ),
    success: (
        <svg viewBox="0 0 24 24" fill="none" className="notif-svg">
            <circle cx="12" cy="12" r="10" fill="#10B981" opacity="0.15"/>
            <path d="M8 12l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="1.5"/>
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 24 24" fill="none" className="notif-svg">
            <path d="M12 3L2 20h20L12 3z" fill="#F59E0B" opacity="0.15"/>
            <path d="M12 9v5m0 2.5h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 4L2.5 20h19L12 4z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    ),
    error: (
        <svg viewBox="0 0 24 24" fill="none" className="notif-svg">
            <circle cx="12" cy="12" r="10" fill="#EF4444" opacity="0.15"/>
            <path d="M8.5 8.5l7 7m0-7l-7 7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="1.5"/>
        </svg>
    ),
    order: (
        <svg viewBox="0 0 24 24" fill="none" className="notif-svg">
            <rect x="2" y="3" width="20" height="18" rx="3" fill="#6366F1" opacity="0.15"/>
            <path d="M7 8h10M7 12h6M7 16h4" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round"/>
            <rect x="2" y="3" width="20" height="18" rx="3" stroke="#6366F1" strokeWidth="1.5"/>
        </svg>
    ),
};

const colorMap = {
    info:    { bar: '#3B82F6', bg: 'rgba(59,130,246,0.06)' },
    success: { bar: '#10B981', bg: 'rgba(16,185,129,0.06)' },
    warning: { bar: '#F59E0B', bg: 'rgba(245,158,11,0.06)' },
    error:   { bar: '#EF4444', bg: 'rgba(239,68,68,0.06)'  },
    order:   { bar: '#6366F1', bg: 'rgba(99,102,241,0.06)' },
};

const NotificationItem = ({ notification, onClose, isRtl }) => {
    const [progress, setProgress] = useState(100);
    const [paused, setPaused] = useState(false);
    const navigate = useNavigate();
    const duration = notification.duration || 6000;
    const color = colorMap[notification.type] || colorMap.info;

    const pausedRef = useRef(false);
    const elapsedRef = useRef(0);
    const lastTickRef = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            if (!pausedRef.current) {
                const now = Date.now();
                elapsedRef.current += now - lastTickRef.current;
                const remaining = Math.max(0, 100 - (elapsedRef.current / duration) * 100);
                setProgress(remaining);
                if (remaining === 0) clearInterval(interval);
            }
            lastTickRef.current = Date.now();
        }, 50);
        return () => clearInterval(interval);
    }, [duration]);

    const handleMouseEnter = () => {
        pausedRef.current = true;
        setPaused(true);
    };

    const handleMouseLeave = () => {
        lastTickRef.current = Date.now();
        pausedRef.current = false;
        setPaused(false);
    };

    const handleClick = () => {
        if (notification.data?.url) navigate(notification.data.url);
        onClose();
    };

    return (
        <div
            className={`notif-item ${notification.isLeaving ? 'notif-leave' : 'notif-enter'} ${isRtl ? 'notif-rtl' : 'notif-ltr'}`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="alert"
        >
            <div className="notif-left-bar" style={{ background: color.bar }} />

            <div className="notif-icon-wrap">
                {notification.icon
                    ? <img src={notification.icon} alt="" className="notif-custom-icon" />
                    : (iconMap[notification.type] || iconMap.info)
                }
            </div>

            <div className="notif-content">
                {notification.title && (
                    <p className="notif-title">{notification.title}</p>
                )}
                {notification.body && (
                    <p className="notif-body">{notification.body}</p>
                )}
            </div>

            <button
                className="notif-close"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                aria-label="close"
            >
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            <div
                className="notif-progress"
                style={{ width: `${progress}%`, background: color.bar }}
            />
        </div>
    );
};

const NotificationDisplay = () => {
    const { notifications, removeNotification } = useNotifications();
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    if (!notifications.length) return null;

    return (
        <div className={`notif-container ${isRtl ? 'notif-container-rtl' : 'notif-container-ltr'}`}>
            {notifications.map((notif) => (
                <NotificationItem
                    key={notif.id}
                    notification={notif}
                    onClose={() => removeNotification(notif.id)}
                    isRtl={isRtl}
                />
            ))}
        </div>
    );
};

export default NotificationDisplay;
