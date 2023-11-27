'use client'
import { AvatarImage ,Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { User } from "next-auth"
import { useSession } from "next-auth/react"

type props = {
    user:User
}
export default function UserAvatarPictureInput({user}:props) {
    return (
        <div className="">
            <Avatar className="w-20 h-20 relative overflow-visible">
                <AvatarFallback className="text-2xl font-semibold border border-foreground">{getInitials(user?.name ?? '')}</AvatarFallback>
                <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''}/>
                <input className=" appearance-none absolute w-6 h-6 z-10 bottom-0 right-0 " type="file"/>
            </Avatar>
        </div>
    )
}

