"use client"
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { CampaignHome } from '@/db/queries/campagne.query'
import { MoreHorizontal, Trash2, XOctagon } from 'lucide-react'
import React from 'react'
import { deleteCampaign, stopCampaign } from './actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {
    closed: boolean,
    campaign: CampaignHome
}
export default function ActionButtons({ closed, campaign }: Props) {
    const router = useRouter()
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='m-auto'>
                    {!closed && (

                        <DropdownMenuItem className='flex gap-4 bg-blue-400' onClick={async () => {
                            const r = await stopCampaign(campaign.id)
                            if (r.success) {
                                toast.success(r.message)
                                // revalidatePath(routes.CAMPAGNE)
                                router.refresh()
                                return
                            }

                            toast.error("error lors de la fermeture")
                        }}>
                            <XOctagon /><div>Férmer </div>
                        </DropdownMenuItem>

                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex gap-4 bg-destructive' onClick={async () => {
                        const r = await deleteCampaign(campaign.id)
                        if (r.success) {
                            toast.success(r.message)
                            // revalidatePath(routes.CAMPAGNE)
                            router.refresh()
                            return
                        }

                        toast.error("error lors de la suppression")
                    }}>
                        <Trash2 /><div>Supprimer</div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
