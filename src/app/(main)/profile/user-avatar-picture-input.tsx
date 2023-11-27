'use client'
import { AvatarImage ,Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getInitials } from "@/lib/utils"
import { Camera } from "lucide-react"
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
                
                    <Button size={'sm'} variant={"outline"} className="w-8 h-8 p-0 m-0  rounded-full  absolute bottom-[-7px] right-[-5px]"><Camera />
                        <input className="appearance-none absolute left-0 right-0 top-0 bottom-0 opacity-0" type="file" />
                    </Button>
                
            </Avatar>
        </div>
    )
}

