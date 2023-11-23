import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import CampaignHeader from "./header";


export default function layout({ children }: PropsWithChildren) {
    
    return (
        <section className="relative flex flex-col gap-4 ">
            <CampaignHeader/>
            <div>
                {children}
            </div>
        </section>
    )
}
