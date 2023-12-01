// import webpush from 'web-push'
import { fetchVapidPublicKey, saveSubscription } from "./sw-actions"
import { getSession } from "next-auth/react"
import { Subscription } from '@prisma/client'
export async function askpermission() {


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
        const r = await Notification.requestPermission()
        if (r == "granted") {
            await registerServiceWorker()
        }
        return false
    }
}

async function registerServiceWorker() {
    const session = await getSession()
    const registration = await navigator.serviceWorker.register('/sw.js')
    let subscription = await registration.pushManager.getSubscription()
    const key = await fetchVapidPublicKey()
    if (!subscription) {
        console.log(subscription)
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key
        })
    }
    let data = JSON.stringify(subscription)

    await saveSubscription(data, session?.user.id)
    // console.log(session)

}

export async function config() {

    // return webpush
}

export async function sendNotififs(payload: string, sub: Subscription) {
    // const push = await config()
    // await push.sendNotification({
    //     endpoint: sub.endpoint,
    //     keys: {
    //         auth: sub.authToken,
    //         p256dh: sub.publicKey
    //     }
    // }, payload, {
    //     urgency: 'high'
    // })
}






