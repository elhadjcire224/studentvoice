import { Check, CheckCheck, XOctagon } from "lucide-react";
import { Badge } from "./ui/badge";

export default function OpenBadge() {
    return (
        <Badge  className="bg-green-400 text-xs gap-1 text-green-900"><Check className="text-green-900 text-xs" />Ouverte</Badge>
    )
}