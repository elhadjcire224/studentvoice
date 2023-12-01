"use server"

import prisma from "@/db/prisma";
import { createCampaignFormType } from "@/lib/definitions"
import { routes } from "@/lib/routes";
import { sendCampagneCreateNotification } from "@/lib/sw-actions";
import { revalidatePath } from "next/cache";

export const createCampagne = async (values: createCampaignFormType, userId: string, userName: string) => {
    let campagneId = null
    try {
        const campaign = await prisma.campagne.create({
            data: {
                userId,
                title: values.title,
                mutiple_critique: values.onemore // Vous pouvez définir le statut initial ici
            },
        });
        campagneId = campaign.id
        revalidatePath(routes.CAMPAGNE)
        return { success: true, message: "campagne crée avec success" }
    } catch (error) {
        console.error('Error creating campagne:', error);
        throw new Error('Failed to create campagne');
        // return { success: false, message: "impossible de creer une campagne" }
    } finally {

        if (campagneId)
            setTimeout(
                async (campagneId: string) => { await sendCampagneCreateNotification(campagneId, userName) }, 1000)
    }
}

export const stopCampaign = async (campaignId: string) => {
    try {
        const campaign = await prisma.campagne.update({
            where: {
                id: campaignId
            },
            data: {
                closed: true
            }
        })
        revalidatePath(routes.CAMPAGNE)
        return campaign ? { success: true, message: "campagne fermée avec success" } : { success: false, message: "impossible de fermer la campagne" }
    } catch (e) {
        console.error('Error closing campagne:', e);
        throw new Error('Failed to close campagne');
    }
}

export const deleteCampaign = async (campaignId: string) => {
    try {
        const campaign = await prisma.campagne.delete({
            where: {
                id: campaignId
            }
        })
        revalidatePath(routes.CAMPAGNE)
        return campaign && { success: true, message: "campagne supprimer avec success" }
    } catch (e) {
        console.error('Error deleting campagne:', e);
        throw new Error('Failed to delete campagne');
    }
}

export const updateCampaign = async (data: createCampaignFormType, campaignId: string) => {

    const campaign = await prisma.campagne.update({
        where: {
            id: campaignId
        },
        data: {
            title: data.title,
            mutiple_critique: data.onemore
        }
    })
    revalidatePath(routes.CAMPAGNE)
    return campaign && { success: true, message: "campagne mis a jour avec success" }

}

