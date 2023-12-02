import Pb16 from "@/components/pb-16";
import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
    return (
        <>
            <section className="flex flex-col gap-4">
                <div className="sticky text-2xl px-3 pt-4 font-extrabold ">Details de la campagne
                </div>
                {children}
            </section>
            <Pb16 />
        </>
    )
}
