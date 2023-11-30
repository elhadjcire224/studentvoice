'use client'
import LikeButton from "@/components/like-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Time from "../(mainpage)/time";
import CritiqueButtonActions from "./critique-button-actions";
import { existingLike } from "@/db/queries/critique.query";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { unSignaledCritiques } from "@/db/queries/campagne.query";
import RatingStars from "./rating";
import { cn } from "@/lib/utils";
import UserCritiqueAvatar from "@/components/userCritiqueAvatar";
import { Role } from "@prisma/client";
import SignaledCritique from "@/components/signaledCritique";
import { useSession } from "next-auth/react";


export default function CritiqueCard({ critique, campaignUserId }: { critique: unSignaledCritiques, campaignUserId: string }) {
    const { data: session } = useSession()
    // console.log(session)
    return (
        <Card className={cn(critique.signaled && "border-red-500")}>
            <CardHeader className={cn("pt-2 text-sm flex flex-row gap-4 justify-end  items-center", session?.user.role == Role.ADMIN && "justify-between")}>
                {session?.user.role == Role.ADMIN && <UserCritiqueAvatar userCritique={critique.user} />}
                <div className="flex flex-row gap-4 justify-end items-center"><Time updatedAt={critique.updatedAt} />
                    <CritiqueButtonActions campaignUserId={campaignUserId} critique={critique} /></div>
            </CardHeader>
            <CardContent className="break-words whitespace-pre-wrap px-4 pb-4 text-center text-md">
                {critique.content}
            </CardContent>
            <CardFooter className="p-2 flex items-center justify-between">
                <LikeButton count={critique._count.likes} critiqueId={critique.id} />
                {critique.signaled && <SignaledCritique />}
                <RatingStars maxWidth={80} readonly defaultValue={critique.rate} />

            </CardFooter>
        </Card>
    )
}
