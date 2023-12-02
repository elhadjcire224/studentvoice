import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import prisma from "@/db/prisma";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    const session = await getServerSession()
    // if(!session?.user) redirect(`${routes.LOGIN}/cal`)
    const lastMessageId = await prisma.contact.findFirst({ orderBy: { createdAt: 'desc' }, select: { id: true, createdAt: true, } })
    console.log(lastMessageId)
    return (
        <main className={cn("relative w-full max-w-lg")}>
            <Header />
            {children}
            <FooterNav lastMessageId={lastMessageId?.id ?? ''} />
        </main>
    )
}