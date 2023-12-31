'use server'
import prisma from '@/db/prisma';
import { createCritiqueFormType } from '@/lib/definitions';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { fetchCampaignById } from './campagne.query';
import { routes } from '@/lib/routes';


// Fonction principale pour récupérer les campagnes avec les informations sur les critiques
export async function createCritique(data: createCritiqueFormType, campaignId: string, userId: string) {
    noStore();
    const count = await fetchUserCritiqueNumber(campaignId,userId)
    const campaign = await fetchCampaignById(campaignId)

    if(campaign && !(campaign.mutiple_critique || count == 0)){
        return {success:false,message:"vous n'etes pas autorise a critique plus d'une fois"}
    }
    await prisma.critique.create({
        data: {
            ...data,
            userId,
            campagneId: campaignId
        }
    })

    await prisma.campagne.update({
        where:{
            id:campaignId
        },
        data:{
            updatedAt: (new Date()).toISOString()
        }
    })

    revalidatePath(routes.CAMPAGNE)


    return { success: true, message: "critique ajouté avec success" }
}

export async function fetchUserCritiqueNumber(campagneId:string,userId:string){
    return await prisma.critique.count({
        where: {
            userId,
            campagneId
        }
    })

}
export async function deleteCritique(critiqueId: string) {
    noStore();
    const critique = await prisma.critique.delete({
        where: {
            id: critiqueId
        }
    })
    revalidatePath(routes.CAMPAGNE)
    
    
    

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
    
    revalidatePath(routes.CAMPAGNE)
    return { success: true, message: "critique signalé avec success \n nous prenons en compte votre signalement" }
}

export async function existingLike(critiqueId: string, userId?: string) {
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

export async function toggleLikeCritique(critiqueId: string, userId?: string) {
    noStore()
    if (!userId) throw new Error("userId is null")
    const isLiked = await existingLike(critiqueId, userId)
    if (isLiked) {
        // Si l'utilisateur a déjà aimé la critique, supprimez le "like"
        await prisma.like.delete({
            where: {
                id: isLiked.id
            },
        });
        
        revalidatePath(routes.CAMPAGNE)
        return { success: true, type:'like' };
    } else {
        // Si l'utilisateur n'a pas encore aimé la critique, ajoutez un "like"
        await prisma.like.create({
            data: {
                critiqueId,
                userId 
            }
        });
        
        revalidatePath(routes.CAMPAGNE)
        return { success: true, type:'unlike' };
    }
}
