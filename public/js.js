(async function app(){
    

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/generate-sw.js')

        const r = await Notification.requestPermission()
        if(r == "granted"){
            
        }
    }
})()