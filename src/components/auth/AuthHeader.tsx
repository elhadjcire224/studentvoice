import { cn } from "@/lib/utils";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import ToggleTheme from "@/theme/ToggleTheme";

export default function AuthHeader(){

    return (
        <div className={cn('flex justify-between p-2 border-b border-gray-30 items-center w-full')}>
            <Logo/>
            
            <div className={cn("flex items-center gap-2")}>
                <Button className="p-2">Login <LogInIcon /> </Button>
                <ToggleTheme/>
            </div>
        </div>
    )
}