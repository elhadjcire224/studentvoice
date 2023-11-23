"use server"

import prisma from "@/db/prisma";
import { createCampaignFormType } from "@/lib/definitions"

export const createCampagne =  async (values:createCampaignFormType,userId:string) =>{
    try {
        const campaign = await prisma.campagne.create({
            data: {
                userId,
                title:values.title,
                mutiple_critique:values.onemore // Vous pouvez définir le statut initial ici
            },
        });
        return campaign ? { success: true, message: "campagne crée avec success" } : { success: false, message: "impossible de creer une campagne" }
    } catch (error) {
        console.error('Error creating campagne:', error);
        throw new Error('Failed to create campagne');
    }
}

export const stopCampaign = async (campaignId:string) => {
    try {
        const campaign = await prisma.campagne.update({
            where:{
                id:campaignId
            },
            data:{
                closed:true
            }
        })
        return campaign ? { success: true, message: "campagne fermée avec success" } : { success: false, message: "impossible de fermer la campagne" }
    }catch(e){
        console.error('Error closing campagne:', e);
        throw new Error('Failed to close campagne');
    }
}

export const deleteCampaign = async (campaignId:string) => {
    try {
        const campaign = await prisma.campagne.delete({
            where:{
                id:campaignId
            }
        })
        return campaign && { success: true, message: "campagne supprimer avec success" } 
    }catch(e){
        console.error('Error deleting campagne:', e);
        throw new Error('Failed to delete campagne');
    }
}

export const updateCampaign = async (data:createCampaignFormType,campaignId:string) => {
    
        const campaign = await prisma.campagne.update({
            where:{
                id:campaignId
            },
            data:{
                title:data.title,
                mutiple_critique:data.onemore
            }
        })
        return campaign && { success: true, message: "campagne mis a jour avec success" } 
    
}

