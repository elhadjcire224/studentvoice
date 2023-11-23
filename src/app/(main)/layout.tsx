import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import { routes } from "@/lib/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({children}:PropsWithChildren){
    const session = await getServerSession()
    // if(!session?.user) redirect(`${routes.LOGIN}/cal`)
    return (
        <main className="relative pb-16">
            <Header />
            {children}
            <FooterNav/>
        </main>
    )
}