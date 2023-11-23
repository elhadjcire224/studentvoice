import prisma from '@/db/prisma';
import { Prisma } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache'

// Fonction qui calcule le nombre de critiques et la moyenne
function calculateRatingInfo(critiques: any) {

    console.log(critiques)
    const totalReviews = critiques.length;
    const totalRating = critiques ? critiques.reduce((acc, critique) => acc + critique.rate, 0) : 0;
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';

    return {
        totalReviews,
        averageRating,
    };
}

// Fonction principale pour récupérer les campagnes avec les informations sur les critiques
export async function fetchCampaigns() {
    noStore();

    const campaignsWithRatingInfo = await prisma.campagne.findMany({
        orderBy: {
            updatedAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            updatedAt: true,
            closed: true,
            mutiple_critique: true,
            user: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            critiques: {
                where: {
                    signaled: {
                        equals: false
                    }
                },
                select: {
                    rate: true,
                },
            },
        },
    });

    return campaignsWithRatingInfo.map(campaign => {
        const { totalReviews, averageRating } = calculateRatingInfo(campaign.critiques);

        return {
            ...campaign,
            averageRating,
            totalReviews,
        };
    });
}

export type CampaignHome = Prisma.PromiseReturnType<typeof fetchCampaigns>[number]

export async function fetchCampaignById(campaignId: string) {
    noStore()
    const campaign = await prisma.campagne.findUnique({
        where: {
            id: campaignId
        },
        select: {

            id: true,
            title: true,
            updatedAt: true,
            closed: true,
            mutiple_critique: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                    subject: {
                        select: {
                            name: true
                        }
                    }

                }
            },
            critiques: {
                where: {
                    signaled: {
                        equals: false
                    }
                },
                orderBy: {
                    updatedAt: "desc"
                },

                select: {
                    _count: {
                        select: {
                            likes: true
                        }
                    },

                    updatedAt:true,
                    rate:true,
                    content:true,
                    signaled:true,
                    id:true

                

                }


            },

        }
    })
    const { totalReviews, averageRating } = calculateRatingInfo(campaign.critiques);
    return {
        ...campaign,
        totalReviews,
        averageRating
    }

}

export type campaignDetailsType = Prisma.PromiseReturnType<typeof fetchCampaignById>
