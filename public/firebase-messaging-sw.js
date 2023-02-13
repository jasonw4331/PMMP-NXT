// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('./localforage.min.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js'
)

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCKHRLF6IvjhdJZy3QH7ma0-RhsPBKsu3g',
  authDomain: 'poggit-tailwind.firebaseapp.com',
  projectId: 'poggit-tailwind',
  storageBucket: 'poggit-tailwind.appspot.com',
  messagingSenderId: '1053465471389',
  appId: '1:1053465471389:web:6ed3777d3b06bfabb4e774',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (message) {
  console.log('[SW] Received Background Notification!')
  message = {
    messageId: message.messageId,
    title: message.notification.title,
    body: message.notification.body,
    image: message.notification?.image,
    link: message.fcmOptions?.link,
    timestamp: Date.now(),
    seen: false,
  }
  localforage
    .getItem('messages')
    .then(messages => {
      if (messages) {
        messages.push(message)
        localforage
          .setItem('messages', messages)
          .then(() => console.log('[SW] Background Notification Saved!'))
          .catch(error => {
            console.log(error)
          })
      }
    })
    .catch(error => {
      console.log(error)
    })
})
