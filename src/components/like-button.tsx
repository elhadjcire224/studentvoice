'use client'
import { ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toggleLikeCritique } from "@/db/queries/critique.query";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default  function LikeButton({isLiked,critiqueId,count}:{critiqueId:string,isLiked:boolean,count:number}) {
    const session = useSession()
    const user = session.data?.user
    const [liked, setLiked] = useState({ count, isLiked })

    useEffect(() => {
        setLiked({count,isLiked})
    },[])


    if(user == undefined) throw new Error('user not exist on like button')
    
    const router = useRouter()
    return (
        <Button className=" gap-1 flex items-center" size={'sm'} variant={"ghost"} onClick={async ()=>{
            const prevState = {...liked}
            setLiked((prev => {

                return {count:!prev.isLiked ? prev.count++: prev.count--,isLiked:!prev.isLiked}
            }))
            const result = await toggleLikeCritique(critiqueId,user.id as string)
            if(result.type == 'unliked') {
                setLiked({...prevState})
            }
        }}><ThumbsUp className={cn(liked.isLiked && "text-gold")} />{liked.count}</Button>
    )
}
