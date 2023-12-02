import { options } from "@/app/api/auth/[...nextauth]/options"
import ChatBulle from "@/components/chat-bulle"
import Pb16 from "@/components/pb-16"
import prisma from "@/db/prisma"
import { getServerSession } from "next-auth"

export default async function Contact() {
    const session = await getServerSession(options)

    const messages = await prisma.contact.findMany({ where: { userId: { equals: session?.user.id } } })

    return (
        < >{messages.length > 0 ? (
            <div className=" flex flex-col gap-2 pt-4">
                {messages ? messages.map((m) => (
                    <ChatBulle message={m} key={m.id} />
                )) : null}
                <Pb16 value={"pb-24"} />
            </div>)
            : (<div className="flex items-center justify-center h-[60vh] text-center text-lg">Bienvenue dans notre espace de suggestions et de messages !

                Envie de partager une idée, un commentaire ou une question ? Tapez simplement dans la zone de texte ci-dessous 👇 et faites-nous part de votre pensée. Votre avis compte !

                Si vous avez déjà partagé quelque chose avec nous, vous pouvez le voir ci-dessous. Alors, que voulez-vous nous dire aujourd&lsquo;hui ?
            </div>)}
        </>
    )
}