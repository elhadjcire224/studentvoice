'use client'

import { User } from "@prisma/client"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { getInitials } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"

export default function UserCritiqueAvatar({userCritique}:{userCritique:any}) {
    const { data: session } = useSession()
    const user = session?.user as User
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">@{userCritique.name}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto max-w-lg overflow-hidden">
                <div className="flex justify-between space-x-2">
                    <Avatar>
                        <AvatarImage src={user.image ?? ''} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user.name}</h4>
                        <p className="text-sm">
                            {user.email}
                        </p>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
