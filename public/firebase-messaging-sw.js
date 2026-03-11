// Firebase Cloud Messaging Service Worker
//
// ⚠️  لماذا البيانات هنا وليست في .env؟
//    Service Workers لا تُعالَج بواسطة Vite ولا يمكنها الوصول لـ import.meta.env
//    لأنها تعمل كملفات JavaScript مستقلة في متصفح المستخدم بعيداً عن build pipeline.
//
// ✅  هل هذا أمان مشكلة؟  لا — Firebase config (apiKey, projectId...) هي بيانات
//    تعريفية للتطبيق وليست مفاتيح سرية. Firebase نفسها تُوثّق أنها safe للعرض.
//    الأمان الحقيقي يأتي من Firebase Security Rules وليس من إخفاء هذه القيم.
//    المرجع: https://firebase.google.com/docs/projects/api-keys

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Force immediate activation — skip waiting for old SW to die
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyCm3zuJasC9sDerNOWWcod0JFEzI-apbzE",
  authDomain: "jsor-962ed.firebaseapp.com",
  projectId: "jsor-962ed",
  storageBucket: "jsor-962ed.firebasestorage.app",
  messagingSenderId: "890233353307",
  appId: "1:890233353307:web:625580bcdd4d7d92e67b7e",
  measurementId: "G-MJE06MQLWD"
});

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon, image } = payload.notification || {};

  const notificationTitle = title || 'جديد';
  const notificationOptions = {
    body: body || '',
    icon: icon || '/assets/logo.png',
    image: image || undefined,
    badge: '/assets/logo.png',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    requireInteraction: true,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click → open app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const dataUrl = event.notification.data?.url;
  // Use absolute URL from data payload, or fall back to the app's root (derived from SW scope)
  const url = dataUrl || self.registration.scope;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus any already-open tab belonging to this app
      for (const client of clientList) {
        if (client.url.startsWith(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
