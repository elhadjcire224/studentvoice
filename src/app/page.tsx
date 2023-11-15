import BrandName from "@/components/BrandName";
import AuthHeader from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function P() {
  return (

          // eslint-disable-next-line react/no-unescaped-entities
    <div>
      <AuthHeader />
      <section className={cn("flex flex-col items-center py-8 px-4 text-center gap-6 ")}>
        <BrandName className="text-4xl"/>
        <p className={cn(" text-gray-500 text-xl font max-w-xl ")}>
          Echangez des idées et contribuez à façonner une communauté éducative dynamique. Nous croyons en la puissance de la <strong className="underline text-foreground font-bold ">critique constructive</strong> . Chaque commentaire, suggestion et évaluation contribuent à l&lsquo;amélioration continue de nos cours et à l&lsquo;enrichissement de votre expérience d&lsquo;apprentissage.
        </p>

        <Link href={"/login"}><Button variant={"primary"} size={"lg"}>Participez <ArrowRight /> </Button></Link>
      </section>
    </div>

  )
}