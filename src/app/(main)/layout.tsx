import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    const session = await getServerSession()
    // if(!session?.user) redirect(`${routes.LOGIN}/cal`)
    return (
        <main className="relative w-full max-w-lg pb-16">
            <Header />
            {children}
            <FooterNav />
        </main>
    )
}