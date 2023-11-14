import { cn } from "@/lib/utils";

export default function BrandName({className}:{className?:String|undefined}) {
    return <h1 className={cn("text-gold text-3xl font-extrabold ",className)}>StudentVoice</h1>
}
