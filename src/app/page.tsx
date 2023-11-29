import BrandName from "@/components/BrandName";
import AuthHeader from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <AuthHeader />
      <section className={cn("flex flex-col items-center py-8 px-4 text-center gap-6 relative")}>
        <BrandName className="text-4xl" />
        <p className={cn(" text-gray-500 text-xl font max-w-xl ")}>
          Echangez des idées et contribuez à façonner une communauté éducative dynamique. Nous croyons en la puissance de la <strong className="underline text-foreground font-bold ">critique constructive</strong> . Chaque commentaire, suggestion et évaluation contribuent à l&lsquo;amélioration continue de nos cours et à l&lsquo;enrichissement de votre expérience d&lsquo;apprentissage.
        </p>

        <Link href={routes.CAMPAGNE}><Button variant={"primary"} size={"lg"}>Participez <ArrowRight /> </Button></Link>
      </section>
    </div>

  )
}