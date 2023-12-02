self.addEventListener('install', (e) => {
    self.skipWaiting()
})
self.addEventListener('activate', (e) => {
    clients.claim()
})

self.addEventListener("push", (e) => {
    console.log('incomming push')
    const data = e.data ? e.data.json() : {}
    const promiseChain = null

    switch (data.data.event) {
        case "welcome":
            promiseChain = self.registration.showNotification(data.title, {
                icon: "/icon-512x512.png",
                bagde: 'icon-192x192.png',
                vibrate: [
                    500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
                    40, 500,
                ],
                body: data.body
            });
            break;
        case "newcritique":
            promiseChain = self.registration.showNotification(data.title);
            break;
        default:
            break;
    }


    e.waitUntil(promiseChain);
})