import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import { PropsWithChildren } from "react";

export default function Layout({children}:PropsWithChildren){
    return (
        <main className="relative pb-16">
            <Header />
            {children}
            <FooterNav/>
        </main>
    )
}