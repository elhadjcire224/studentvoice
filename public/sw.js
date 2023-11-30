self.addEventListener('install', (e) => {
    self.skipWaiting()
})

self.addEventListener("push", (e) => {
    const data = e.data ? e.data.json() : {}
    console.log(data)
})