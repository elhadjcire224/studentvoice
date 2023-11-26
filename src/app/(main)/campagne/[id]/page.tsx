import { campaignDetailsType, fetchCampaignById, unSignaledCritiques } from '@/db/queries/campagne.query'
import { notFound } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import AvatarProf from '../(mainpage)/AvatarProf'
import { MessagesSquare, Star } from 'lucide-react'
import CloseBadge from '@/components/close-badge'
import OpenBadge from '@/components/open-badge'
import { formatDate, truncate30 } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import CritiquesList from './critiques-list'
import CampaignActions from './campaign-actions'
import BackButton from '@/components/back-button'
import prisma from '@/db/prisma'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import Loader from '@/components/loader'
import { fetchUserCritiqueNumber } from '@/db/queries/critique.query'
import { resolve } from 'path'
type props =  {
    params: {
        id: string
    }
}
export default async function Campagne({ params }: props) {
    const campaign = await fetchCampaignById(params.id)

    // console.log(campaign, params.id)
    // const p = new Promise((resolve) => {
    //     setTimeout(()=>{resolve(true)},10000)
    // })

    // await p
    
    if (!campaign) notFound()
    const { user, critiques } = campaign
    const session = await getServerSession(options)
    const count = await fetchUserCritiqueNumber(campaign.id as string, session?.user.id as string)
    // console.log("morde", likeMoreThanOne)

    return (
        <div className=' p-4 '>
            <div className="details pb-3 flex flex-col gap-4 ">
                <div className=' flex items-center gap-2 justify-between '>
                    
                        <BackButton/>
                        <div>crée le {formatDate(campaign.createdAt as Date)}</div>
                    
                </div>
                <div className="flex items-center gap-4 ">
                    <div>
                        <AvatarProf
                            subject={user?.subject?.name}
                            name={user?.name as string}
                            image={user?.image as string}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div><strong>Mr/Mdme&nbsp;&nbsp;{campaign?.user?.name as string}</strong></div>
                        <div className="italic font-bold ">Prof de {user?.subject?.name as string}</div>
                    </div>
                </div>
                <div className='p-3'>
                    Objectif: <em> {campaign.title}</em>
                </div>
                <div>
                    <div className="flex  mt-4 justify-between px-4 items-center">
                        
                        <div className="flex items-end gap-1">
                            <Star className="fill-gold border-none text-gold" />{campaign.averageRating}
                        </div>
                        <div className="flex gap-1 items-center">
                            <MessagesSquare className="" />{campaign.totalReviews}
                        </div>
                        <div>
                            {campaign.closed ? <CloseBadge /> : <OpenBadge />}
                        </div>
                        <CampaignActions morethanOne={count} campaign={campaign}/>    
                    </div>
                </div>
            </div>
            

            <Separator />
            <CritiquesList campaignUserId={campaign?.user?.id as string}  critiques={critiques as any} />
        </div>
    )
}
