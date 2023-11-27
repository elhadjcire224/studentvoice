import fectchTeacherStatsDetails from "@/db/queries/user.query"

import {  StarIcon } from "lucide-react"

interface props extends React.HTMLAttributes<HTMLDivElement> {
    userId: string
}
export default async function TeacherDetailsStats({ userId,...props }: props) {
    const stats =await fectchTeacherStatsDetails(userId)
    return (
        <div {...props} className="p-2">
            <div className="gap-4 text-lg ">
                Matiere : <strong>{stats.subject?.name}</strong>
            </div>
            <div className="flex gap-4 justify-between text-md text-gray-500 items-center flex-wrap">
                <div className=""><strong className="font-semibold text-foreground">{stats.campagnes?.length}</strong>🔸campagnes </div>
                <div ><strong className="font-semibold text-foreground">{stats.closed}</strong>🔸fermées </div>
                <div className="flex gap-1"> <StarIcon className="fill-gold text-gold"/> <strong className="font-semibold mr-1 text-foreground">{stats.averageRating}</strong>de moyenne</div>
            </div>
        </div>
    )
}
