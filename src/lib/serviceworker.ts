import webpush from 'web-push'
import { fetchVapidPublicKey, saveSubscription } from "./sw-actions"
import { getSession, useSession } from "next-auth/react"

export async function askpermission() {
    // const event = new CustomEvent("askperm", {
    //     detail: {},
    //     bubbles: true,
    //     cancelable: true,
    //     composed: false,
    // })
    // document.dispatchEvent(event)

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
        const r = await Notification.requestPermission()
        if (r == "granted") {
            await registerServiceWorker()
            // return true
        }

        return false
    }
}

export function ispermitted() {
    if (Notification.permission == 'default') {
        return true
    }

    return false
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




