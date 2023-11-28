'use client'
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getInitials } from "@/lib/utils"
import { Camera } from "lucide-react"
import { User } from "next-auth"
import { useState } from "react"
import { uploadImage } from "./actions"


type props = {
    user: User
}
export default function UserAvatarPictureInput({ user }: props) {
    const [img, setImg] = useState < string | ArrayBuffer | null>(user?.image ?? '')
    
    const previewFile = (file:File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImg((p) => reader.result);
        };
    };
    return (
        <div className=" relative">
            <Avatar className="w-20 h-20 ">
                <AvatarFallback className="text-2xl font-semibold border border-foreground">{getInitials(user?.name ?? '')}</AvatarFallback>
                <AvatarImage src={img as string ?? ''} alt={user?.name ?? ''} />


            </Avatar>
            <Button size={'sm'} variant={"outline"} className="w-8 h-8 p-0 m-0  rounded-full absolute right-0 bottom-[-7px]"><Camera />
                    <input className="appearance-none absolute left-0 right-0 top-0 bottom-0 opacity-0" type="file" accept="image/*" onChange={async (e) => {

                        const file = e.target.files?.[0] as File
                        previewFile(file)
                        const formData = new FormData()
                        formData.append('file',file)
                        formData.append('userId',user.id as string)
                        formData.append('image_public_id',user.image_public_id)

                        const result = await uploadImage(formData)
                        // setImg(result as string)
                        
                    }}/>
            </Button>
        </div>
    )
}

