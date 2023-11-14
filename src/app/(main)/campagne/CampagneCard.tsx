"use client"
import { cn } from "@/lib/utils";
import AvatarProf from "./AvatarProf";


export default function CampagneCard() {
    return (
        <article className={cn("bg-secondary   h-36 w-full rounded-lg p-2 flex flex-col")}>
            <div className="border-b border-gray-30">
                <AvatarProf/>
            </div>

        </article>
    )
}
