import ToggleTheme from "@/theme/ToggleTheme";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import BrandName from "./BrandName";

export default function Header(){

    return (
        <nav className={cn('flex justify-between p-2 border-b border-gray-30 items-center')}>
            <div className={cn("flex items-center gap-2")}>
                <Logo />
                <BrandName/>
            </div>
            <ToggleTheme/>
        </nav>
    )
}