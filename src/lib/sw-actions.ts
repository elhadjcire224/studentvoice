'use server'
import prisma from "@/db/prisma"
import { notifs } from "./constants"
import { sendNotififs } from "./serviceworker"
import { Role, Subscription } from "@prisma/client"
import { routes } from "./routes"
import webpush from 'web-push'
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
export async function fetchVapidPublicKey() {
    return process.env.VAPID_PUBLIC_KEY
}
type data = {
    endpoint: string,
    expiration: string | null,
    keys: {
        p256dh: string
        auth: string
    }
}

webpush.setVapidDetails(
    `mailto:${process.env.EMAIL as string}`,
    process.env.VAPID_PUBLIC_KEY as string,
    process.env.VAPID_PRIVATE_KEY as string
)

export async function saveSubscription(data: string, userId?: string,) {

    if (!userId || userId == undefined) return
    // console.log(userId, JSON.parse(data))
    const extrated = JSON.parse(data) as data

    const user = await prisma.subscription.findUnique({
        where: {
            endpoint: extrated.endpoint,
            userId
        },
        select: {
            id: true,
        }
    })

    if (user) {
        await prisma.subscription.update({
            where: {
                id: user.id
            },
            data: {
                publicKey: extrated.keys.p256dh,
                authToken: extrated.keys.auth
            }
        }).then(async (sub) => {
            const notif = notifs.welcome
            await webpush.sendNotification({
                endpoint: sub.endpoint,
                keys: {
                    auth: sub.authToken,
                    p256dh: sub.publicKey
                }
            }, JSON.stringify(notif), {
                urgency: 'high'
            })
        })

        return
    }

    await prisma.subscription.create({
        data: {
            userId,
            authToken: extrated.keys.auth,
            publicKey: extrated.keys.p256dh,
            endpoint: extrated.endpoint
        }
    }).then(async (sub) => {
        await sendWecolmeNotification(sub)
    })
}


export async function sendWecolmeNotification(sub: Subscription) {
    const notif = notifs.welcome
    await webpush.sendNotification({
        endpoint: sub.endpoint,
        keys: {
            auth: sub.authToken,
            p256dh: sub.publicKey
        }
    }, JSON.stringify(notif), {
        urgency: 'high'
    })
}

export async function sendCampagneCreateNotification(campaignId: string, campaignUserName: string) {
    const users = await prisma.user.findMany({
        include: { subscriptions: true }
    })
    const notif = notifs.newcampaign
    notif.data.url = `https://studentvoice.vercel.app/${routes.CAMPAGNE}/${campaignId}`
    notif.body = `Mr/Mdme ${campaignUserName} vient de créer un campagne`
    const payload = JSON.stringify(notif)
    for (const user of users) {
        console.log(user.name)
        for (const sub of user.subscriptions) {
            await webpush.sendNotification({
                endpoint: sub.endpoint,
                keys: {
                    auth: sub.authToken,
                    p256dh: sub.publicKey
                }
            }, payload, {
                urgency: 'high'
            }).catch(async (e) => {
                console.log(e.statusCode)
                await prisma.subscription.delete({ where: { id: sub.id } })
                console.log('sub delete')
            }).then((e) => {
                console.log(e, sub)
            })
        }
    }
}

export async function sendCritiqueNotification(campaignUserId: string, campaignId: string) {
    const authuser = await getServerSession(options)
    const users = await prisma.user.findMany({
        include: { subscriptions: true, }
    })

    const notif = notifs.newcritique
    notif.data.url = `https://studentvoice.vercel.app/${routes.CAMPAGNE}/${campaignId}`

    const payload = JSON.stringify(notif)
    for (const user of users) {
        if (authuser?.user.id == user.id || (user.role == Role.TEACHER && user.id != campaignUserId)) return
        for (const sub of user.subscriptions) {
            await webpush.sendNotification({
                endpoint: sub.endpoint,
                keys: {
                    auth: sub.authToken,
                    p256dh: sub.publicKey
                }
            }, payload, {
                urgency: 'high'
            })
        }
    }


    // const campaigns = await prisma.campagne.findUnique({
    //     where: {
    //         id: campaingId
    //     },
    //     select: {
    //         user:{
    //             select:{
    //                 subscriptions:true,
    //             }
    //         },
    //         critiques: {
    //             select: {
    //                 user: {
    //                     select: {
    //                         subscriptions: true,
    //                         id: true,
    //                         role: true,
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
    // notif.data.url = `https://studentvoice.vercel.app/${routes.CAMPAGNE}/${campaingId}#${critiqueId}`
    // campaigns?.critiques.forEach((critique) => {
    //     const user = critique.user
    //     if (user.id == authuser?.user.id) return
    //     critique.user.subscriptions.forEach(async (sub) => {
    //         if (user.role == Role.TEACHER ) {

    //             await webpush.sendNotification({
    //                 endpoint: sub.endpoint,
    //                 keys: {
    //                     auth: sub.authToken,
    //                     p256dh: sub.publicKey
    //                 }
    //             }, JSON.stringify(notif), {
    //                 urgency: 'high'
    //             })
    //             return
    //         }

    //         await webpush.sendNotification({
    //             endpoint: sub.endpoint,
    //             keys: {
    //                 auth: sub.authToken,
    //                 p256dh: sub.publicKey
    //             }
    //         }, JSON.stringify(notif), {
    //             urgency: 'high'
    //         })

    //     })
    // })

}