import Campagne from "@/app/(main)/campagne/(mainpage)/CampagneCard";
import { fetchCampaigns } from "@/db/queries/campagne.query";
import { cn } from "@/lib/utils";

export default async function Page() {
    const campaigns = await fetchCampaigns()
    return (
        <section className={cn("p-2 flex flex-col h-full w-full gap-4")}>
            {campaigns.map((campaign) => <Campagne campaign={campaign} key={campaign.id} />)}
        </section>
    )
}