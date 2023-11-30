'use server'
import prisma from "@/db/prisma"

import webpush from 'web-push'


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
export async function saveSubscription(data: string, userId?: string,) {
    webpush.setVapidDetails(
        `mailto:${process.env.EMAIL as string}`,
        process.env.VAPID_PUBLIC_KEY as string,
        process.env.VAPID_PRIVATE_KEY as string
    )

    if (!userId || userId == undefined) return
    // console.log(userId, JSON.parse(data))
    const extrated = JSON.parse(data) as data

    const user = await prisma.subscription.findUnique({
        where: {
            endpoint: extrated.endpoint,
            userId
        },
        select: {
            id: true
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
            const res = await webpush.sendNotification({
                endpoint: sub.endpoint,
                keys: {
                    auth: sub.authToken,
                    p256dh: sub.publicKey
                }
            }, JSON.stringify({ data: 'holhoh', sub: 'subuccc' }), {
                urgency: 'high'
            })

            console.log(sub, res)
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
        const res = await webpush.sendNotification({
            endpoint: sub.endpoint,
            keys: {
                auth: sub.authToken,
                p256dh: sub.publicKey
            }
        }, JSON.stringify({ data: 'holhoh', sub: 'subuccc' }), {
            urgency: 'high'
        })

        console.log(res)
    })
}