"use client";

import { campaignDetailsType } from "@/db/queries/campagne.query";
import { useSession } from "next-auth/react";
import AddCritiqueButton from "./add-critique-button";
import UpdateCampaignButton from "./update-campagne-button";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";


export default  function CampaignActions({
	campaign,
	morethanOne
}: {
	campaign: campaignDetailsType,
	morethanOne:any
}) {
	const session = useSession();
	const user = session.data?.user

	if(!campaign) throw new Error("cannot see campaign details")
	console.log("campagne actions",user)
	const canUserCritique = (user?.role == Role.STUDENT || user?.role == Role.ADMIN) && (campaign.mutiple_critique || morethanOne == 0)
	console.log(morethanOne)
	return (
		<>
			{
				!campaign.closed && (
					<>
						{
							session?.data?.user.id === campaign?.user?.id
								? (
									<UpdateCampaignButton campaign={campaign} />
								)
								:canUserCritique ?<AddCritiqueButton campaignId={campaign.id as string}/> : <Button size={"sm"} className="bg-gold capitalize" disabled>Critiquer</Button>
						}

					</>
				)
			}
		</>
	);
}
