import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function AvatarProf() {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar className="w-20 h-20 border border-foreground">
                    <AvatarFallback className="text-2xl font-semibold">ECB</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent asChild className="w-auto p-2">
                <div>
                    <div>Mr Diallo</div>
                    <div>Prof de Droit informatique</div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
