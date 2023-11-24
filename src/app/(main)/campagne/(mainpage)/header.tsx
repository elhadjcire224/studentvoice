"use client"
import { useSession } from "next-auth/react"
import CreateCampaignButton from "./create-campaign-button"
import { Role } from "@/lib/definitions"

export default function CampaignHeader() {
    const session = useSession()
    const user = session.data?.user
    return (
        <div className=" sticky text-2xl p-3 flex justify-between">
            <strong >
                Campagnes
            </strong>
            {user?.role !== Role.STUDENT && <CreateCampaignButton />}

        </div>
    )
}
