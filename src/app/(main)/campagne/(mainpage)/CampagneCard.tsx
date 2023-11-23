"use client";
import { cn, truncate30 } from "@/lib/utils";
import AvatarProf from "./AvatarProf";
import { CampaignHome } from "@/db/queries/campagne.query";

import Time from "./time";
import ActionButtons from "./action-buttons";
import { Separator } from "@/components/ui/separator";
import {ArrowRightToLine, MessagesSquare, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import CloseBadge from "@/components/close-badge";
import OpenBadge from "@/components/open-badge";
import {  buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/lib/routes";
type Props = {
    campaign: CampaignHome;
};

export default function CampagneCard({ campaign }: Props) {
    const session = useSession()
    const user = session.data.user
    return (
        <>
            <Separator />
            <article  className={cn("bg-background  w-full px-4 flex flex-col")}>
                <div className="flex justify-end gap-3">
                    <Time updatedAt={campaign.updatedAt} />
                    {campaign.user.id === session.data?.user.id && <ActionButtons campaign={campaign} closed={campaign.closed} />}
                </div>

                <div className="flex items-center gap-4">
                    <div>
                        
                        <AvatarProf
                            subject={campaign.user.subject.name}
                            name={campaign.user.name}
                            image={campaign.user.image}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div><strong>Mr/Mdme&nbsp;&nbsp;{campaign.user.name}</strong></div>
                        <div className="italic text-gray-400">{truncate30(campaign.title)}</div>
                    </div>
                </div>
                <div className="flex  mt-4 justify-between px-4 items-center">
                    <div className="flex items-end gap-1">
                        <Star className="fill-gold border-none text-gold" />{campaign.averageRating}
                    </div>
                    <div className="flex gap-1 items-center">
                        <MessagesSquare className="" />{campaign.totalReviews}
                    </div>
                    <div>
                        {campaign.closed ? <CloseBadge/> : <OpenBadge/>}
                    </div>
                    <div>
                        <Link href={`${routes.CAMPAGNE}/${campaign.id}`} className={cn(`${buttonVariants({variant:"default"})}`,'p-1 px-2 text-sm flex items-center h-auto text-foreground bg-gold font-bold gap-2' )}>Voir<ArrowRightToLine/></Link>
                    </div>
                </div>
            </article>
        </>
    );
}
