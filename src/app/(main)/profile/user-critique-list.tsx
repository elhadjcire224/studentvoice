import { fetchCritiquesByUserId } from "@/db/queries/user.query"
import CritiqueCard from "../campagne/[id]/critique"

export default async function CritiqueList({ userId }: { userId: string }) {
    const critiques = await fetchCritiquesByUserId(userId)
    return (
        <div className="flex flex-col gap-4 mt-4">
            {critiques.map((critique) => <CritiqueCard critique={critique as any} campaignUserId={critique.campagne.userId} key={critique.id} />)}
        </div>
    )
}
