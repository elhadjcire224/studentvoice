import CampagneCard from "@/app/(main)/campagne/CampagneCard";
import Campagne from "@/app/(main)/campagne/CampagneCard";
import { cn } from "@/lib/utils";

export default function Page() {

    return (
        <section className={cn("p-2 flex flex-col h-full w-full gap-4")}>
            <CampagneCard />
            <CampagneCard />
            <CampagneCard />
            <CampagneCard />
            <CampagneCard />
            <CampagneCard />
            <CampagneCard />
        </section>
    )
}