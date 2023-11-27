import { fetchCampaignsByUserId } from "@/db/queries/campagne.query"
import CampagneCard from "../campagne/(mainpage)/CampagneCard"

export default async function CampaignList({userId}:{userId:string}) {
    const campaings = await fetchCampaignsByUserId(userId)
  return (
    <div className="flex flex-col gap-4">
        {campaings.map((camp) => <CampagneCard campaign={camp} key={camp.id}/>)}
    </div>
  )
}
