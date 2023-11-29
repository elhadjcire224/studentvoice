'use client'
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getInitials } from "@/lib/utils"
import { Camera } from "lucide-react"
import { User } from "next-auth"
import { useState } from "react"
import { saveToDatabase, signuploadform } from "./actions"
import { getSession, useSession } from "next-auth/react"
import toast from "react-hot-toast"


type props = {
    user: User
}
export default function UserAvatarPictureInput({ }: props) {
    const { data: session, update } = useSession()
    const [disable, setDisable] = useState(false)
    const user = session?.user
    console.log(getSession().then(d => console.log(d)))

    const [img, setImg] = useState<string | ArrayBuffer | null>(user?.image ?? '')
    const previewFile = (file: File) => {
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
            <Button disabled={disable} size={'sm'} variant={img ? "ghost" : "outline"} className="w-8 h-8 p-0 m-0  rounded-full absolute right-0 bottom-[-7px]"><Camera />
                <input className="appearance-none absolute left-0 right-0 top-0 bottom-0 opacity-0" type="file" accept="image/*" onChange={async (e) => {
                    setDisable(true)
                    const file = e.target.files?.[0] as File
                    // previewFile(file)
                    const formData = new FormData()
                    formData.append('file', file)
                    const { timestamp, signature, api_key, cloud_name } = await signuploadform()

                    formData.append("api_key", api_key);
                    formData.append("timestamp", timestamp.toString());
                    formData.append("signature", signature);
                    formData.append("folder", "studentvoice")

                    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                        method: 'POST',
                        body: formData
                    })
                    console.log("awaiting data")

                    // update({ picture: data.secure_url, image_public_id: data.public_id })
                    const data = await res.json()
                    if (!data.error) {
                        console.log(data)
                        const sup = await saveToDatabase(user?.id as string, data.public_id, data.secure_url)
                        if (sup) {
                            toast.success("photo de profile mis a jour reconnecter vous pour voir le changement", { duration: 5000 })
                            update({ picture: data.secure_url, image_public_id: data.public_id })
                        }

                    } else {
                        setImg(null)
                        toast.error("impossible de mettre a jour la photo de profile")
                    }

                    setDisable(false)
                    // const result = await uploadImage(formData)
                    // setImg(result as string)

                }} />
            </Button>
        </div>
    )
}

