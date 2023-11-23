'use client'
import { ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toggleLikeCritique } from "@/db/queries/critique.query";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default  function LikeButton({isLiked,critiqueId}:{critiqueId:string,isLiked:boolean}) {
    const session = useSession()
    const user = session.data.user
    
    const router = useRouter()
    return (
        <Button size={'sm'} variant={"ghost"} onClick={async ()=>{
            const result = await toggleLikeCritique(critiqueId,user.id)
            if(result.success) router.refresh()
        }}><ThumbsUp className={cn(isLiked && "text-gold")} /></Button>
    )
}
