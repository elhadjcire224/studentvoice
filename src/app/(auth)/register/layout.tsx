import BrandName from "@/components/BrandName";
import Logo from "@/components/Logo";
import { PropsWithChildren } from "react";

export default function layout({children}:PropsWithChildren) {
    return (
        <section className="m-h-screen p-2 flex flex-col gap-3">
            <div className="flex items-center justify-center gap-1">
                <Logo/><BrandName/>
            </div>
            {children}
        </section>
    )
}
