import { X, XOctagon } from "lucide-react";
import { Badge } from "./ui/badge";

export default function CloseBadge() {
  return (
    <Badge className="bg-red-400 text-red-900 gap-1 text-xs"><X/>Fermée</Badge>
  )
}
