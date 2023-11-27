import { Critique, Role } from "@prisma/client";
import CritiqueCard from "./critique";
import {
	campaignDetailsType,
	unSignaledCritiques,
} from "@/db/queries/campagne.query";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

type Props = {
	critiques: unSignaledCritiques[];
	campaignUserId: string;
};
export default async function CritiquesList({ critiques, campaignUserId }: Props) {
  const session = await getServerSession(options)

  const user = session?.user
  // const CritiqueUserList =  critiques.filter((critique) =>  )
	return (
		<section className="flex flex-col gap-2 mt-3 ">
			<div className="text-2xl font-extrabold">Critiques</div>
			<div className="flex flex-col gap-3">
				{critiques.map((critique) => critique.signaled ? (critique.userId == user?.id || user?.role == Role.ADMIN) && <CritiqueCard campaignUserId={campaignUserId} critique={critique} key={critique.id} /> : <CritiqueCard	campaignUserId={campaignUserId} critique={critique} key={critique.id}/> 
				)}
			</div>
		</section>
	);
}
