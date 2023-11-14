"use client"
import { naveitem } from "@/types/navitem"
import { HomeIcon, LogOut, MailIcon, Mailbox, PenSquare, User2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
export default function FooterNav() {
    const pathname = usePathname();
    const navitems: naveitem[] = [
        {
            href: "/campagne",
            icon: HomeIcon
        }, {
            href: "/profile",
            icon: PenSquare
        }, {
            href: "/contact",
            icon: Mailbox
        }
    ]
    return (
        <nav className={cn(" border-t border-gray-30 gap-4 justify-around fixed bottom-0 w-full bg-background max-w-lg flex items-center py-1 px-4" )}>
            {
                navitems.map((navitem,index) => {
                    const LinkIcon = navitem.icon
                    return (
                        <Link  href={navitem.href} key={index} className={cn('p-2 rounded-lg flex-1 flex items-center justify-center',
                            {
                                "bg-bg": pathname == navitem.href
                            }
                        )}>
                            <LinkIcon size={20}  className={cn("rounded-lg",
                                {
                                "text-gold": pathname == navitem.href
                            })}/>
                    </Link>
                    )
                })
            }
            <Popover >
                <PopoverTrigger  asChild className="flex-1">
                    <Avatar>
                        <AvatarFallback >EC</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent  className=" w-32 flex flex-col p-0 gap-1 bg-secondary">
                    <Link href={'/profile'} className={buttonVariants({variant:'default'})}><User2/>Profile</Link>
                    <Button><LogOut/>deconnexion</Button>
                </PopoverContent>
            </Popover>
        </nav>
    )
}