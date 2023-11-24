import { Critique } from "@prisma/client"
import CritiqueCard from "./critique"
import { campaignDetailsType, unSignaledCritiques } from "@/db/queries/campagne.query"

type Props = {
    critiques: unSignaledCritiques[],
    campaignId:string
}
export default function CritiquesList({critiques,campaignId}:Props) {
  return (
    <section className="flex flex-col gap-2 mt-3 ">
        <div className="text-2xl font-extrabold">Critiques</div>
        <div className="flex flex-col gap-3">
        {critiques.map((critique) => <CritiqueCard campaignId={campaignId} critique={critique} key={critique.id} />)}
        </div>
    </section>
  )
}
