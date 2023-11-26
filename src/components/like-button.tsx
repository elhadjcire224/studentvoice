'use client'
import { ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toggleLikeCritique } from "@/db/queries/critique.query";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default  function  LikeButton({isLiked,critiqueId,count}:{critiqueId:string,isLiked:boolean,count:number}) {
    const session = useSession()
    const user = session.data?.user
    const [liked, setLiked] = useState(isLiked)
    const [number, setNumber] = useState(count)


    if(user == undefined) throw new Error('user not exist on like button')
    
    return (
        <Button className=" gap-1 flex items-center" size={'sm'} variant={"ghost"} onClick={async ()=>{
            
            setNumber(prev => liked ? prev-1 : prev+1 )
            setLiked(!liked)
            const result = await toggleLikeCritique(critiqueId,user.id as string)
            if(result.type == 'unliked') {
                setNumber(prev => liked ? prev+1 : prev-1 )
                setLiked(!liked)
            }
        }}><ThumbsUp className={cn(liked && "text-gold")} />{number}</Button>
    )
}
