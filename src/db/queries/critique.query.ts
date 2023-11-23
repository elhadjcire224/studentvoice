'use server'
import prisma from '@/db/prisma';
import { createCritiqueFormType } from '@/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache'


// Fonction principale pour récupérer les campagnes avec les informations sur les critiques
export async function createCritique(data: createCritiqueFormType, campaignId: string, userId: string) {
    noStore();
    const critique = await prisma.critique.create({
        data: {
            ...data,
            userId,
            campagneId: campaignId
        }
    })


    return { success: true, message: "critique ajouté avec success" }
}
export async function deleteCritique(critiqueId: string) {
    noStore();
    const critique = await prisma.critique.delete({
        where: {
            id: critiqueId
        }
    })


    return { success: true, message: "critique supprimée avec success" }
}
export async function signalCritique(critiqueId: string) {
    noStore();
    const critique = await prisma.critique.update({
        where: {
            id: critiqueId
        },
        data: {
            signaled: true,
        }
    })

    return { success: true, message: "critique signalé avec success \n nous prenons en compte votre signalement" }
}

export async function existingLike(critiqueId: string, userId: string) {
    noStore();
    const isExistingLike = await prisma.like.findFirst({
        where: {
            AND:{
                critiqueId:{
                    equals:critiqueId
                },
                userId:{
                    equals:userId
                }
            }
        },
    });

    // console.log(`result = ${isExistingLike} critiqueId = ${critiqueId} et usr=${userId}`)

    return isExistingLike
}

export async function toggleLikeCritique(critiqueId: string, userId: string) {
    noStore()
    const isLiked = await existingLike(critiqueId, userId)

    if (isLiked) {
        // Si l'utilisateur a déjà aimé la critique, supprimez le "like"
        await prisma.like.delete({
            where: {
                id: isLiked.id
            },
        });

        return { success: true, message: "Like supprimé avec succès" };
    } else {
        // Si l'utilisateur n'a pas encore aimé la critique, ajoutez un "like"
        await prisma.like.create({
            data: {
                critiqueId,
                userId
            }
        });

        return { success: true, message: "Like ajouté avec succès" };
    }
}
