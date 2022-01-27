'use strict'
importScripts('firebase-messaging-sw.js')

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0]
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i]
            }
          }
          return client.focus()
        }
        return clients.openWindow('/')
      })
  )
})

self.addEventListener('pushsubscriptionchange', function (event) {
  event.waitUntil(
    Promise.all([
      Promise.resolve(
        event.oldSubscription ? deleteSubscription(event.oldSubscription) : tru,
        e
      ),
      Promise.resolve(
        event.newSubscription
          ? event.newSubscription
          : subscribePush(registration)
      ).then(function (sub) {
        return saveSubscription(sub)
      }),
    ])
  )
})
