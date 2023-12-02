import { options } from "@/app/api/auth/[...nextauth]/options"
import ChatBulle from "@/components/chat-bulle"
import Pb16 from "@/components/pb-16"
import prisma from "@/db/prisma"
import { getServerSession } from "next-auth"

export default async function Contact() {
    const session = await getServerSession(options)

    const messages = await prisma.contact.findMany({ where: { userId: { equals: session?.user.id } } })

    return (
        < >{messages ? (
            <div className=" flex flex-col gap-2">
                {messages ? messages.map((m) => (
                    <ChatBulle message={m} key={m.id} />
                )) : null}
                <Pb16 value={"pb-24"} />
            </div>)
            : <div className="flex items-center justify-center"> il y&lsquo;a aucun message pour le moment </div>}
        </>
    )
}