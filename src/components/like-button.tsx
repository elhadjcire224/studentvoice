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
    console.log(`initial data count ${count} et isLiked =${isLiked}`)
    const [liked, setLiked] = useState({ count, isLiked })

    useEffect(() => {
        setLiked({count:liked.count,isLiked:liked.isLiked})
        console.log('use effect =',liked)

    },[])


    if(user == undefined) throw new Error('user not exist on like button')
    
    return (
        <Button className=" gap-1 flex items-center" size={'sm'} variant={"ghost"} onClick={async ()=>{
            
            const prevState = {...liked}

            console.log('clicked prev data =',prevState)
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
