import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getInitials } from "@/lib/utils";
type Props = {
    name:string|null,
    image:string|null,
    subject?:string|null,
}
export default function AvatarProf({name,image,subject}:Props) {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar className="h-16 w-16 border-2 border-foreground">
                    <AvatarImage src={image} alt={`profile de ${name}`}/>
                    <AvatarFallback className="text-2xl font-semibold">{getInitials(name)}</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent asChild className="w-auto p-2">
                <div>
                    <div>{name}</div>
                    <div>Prof de {subject}</div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
