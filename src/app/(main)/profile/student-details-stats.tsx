import { fetchStudentStatsDetails } from "@/db/queries/user.query"
interface props extends React.HTMLAttributes<HTMLDivElement> {
    userId: string
}
export default async function StudentDetailsStats({ userId, ...props }: props) {
    const stats = await fetchStudentStatsDetails(userId)
    return (

        <div className="flex gap-4 justify-start text-md text-gray-500 items-center flex-wrap">
            <div className=""><strong className="font-semibold text-foreground">{stats.total}</strong>🔸critiques </div>
            <div ><strong className="font-semibold text-foreground">{stats.signaled}</strong>🔸signalées </div>
            {/* <div className="flex gap-1"> <StarIcon className="fill-gold text-gold" /> <strong className="font-semibold mr-1 text-foreground">{stats.averageRating}</strong>de moyenne</div> */}
        </div>

    )
}
