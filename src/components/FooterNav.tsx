"use client"
import { naveitem } from "@/lib/definitions"
import { HomeIcon, LogOut, Mailbox, PenSquare, Shield, User2 } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { routes } from "@/lib/routes"
import { signOut, useSession } from "next-auth/react"
import { Role } from "@prisma/client"
export default function FooterNav() {
    const pathname = usePathname();
    const session = useSession()

    const navitems: naveitem[] = [
        {
            href: routes.CAMPAGNE,
            icon: HomeIcon
        }, {
            href: routes.PROFILE,
            icon: PenSquare
        }, {
            href: routes.MESSAGE,
            icon: Mailbox
        }
    ]
    return (
        <nav className={cn(" border-t border-gray-30 gap-4 justify-around fixed bottom-0 w-full bg-background max-w-lg flex items-center py-1 px-4")}>
            {
                navitems.map((navitem, index) => {
                    const LinkIcon = navitem.icon
                    return (
                        <Link href={navitem.href} key={index} className={cn('p-2 rounded-lg flex-1 flex items-center justify-center',
                            {
                                "bg-bg": pathname == navitem.href
                            }
                        )}>
                            <LinkIcon size={20} className={cn("rounded-lg",
                                {
                                    "text-gold ": pathname == navitem.href
                                })} />
                        </Link>
                    )
                })
            }
            {
                session?.data?.user.role === Role.ADMIN && (<Link href={routes.ADMIN} key={routes.ADMIN} className={cn('p-2 rounded-lg flex-1 flex items-center justify-center',
                    {
                        "bg-bg": pathname == routes.ADMIN
                    }
                )}>
                    <Shield size={20} className={cn("rounded-lg",
                        {
                            "text-gold ": pathname == routes.ADMIN
                        })} />
                </Link>)
            }
            <Popover >
                <PopoverTrigger asChild className="border-2 border-foreground mr-4 ">
                    <Avatar>
                        <AvatarImage src={session.data?.user.image as string} alt={session.data?.user.name as string} />
                        <AvatarFallback >{getInitials(session.data?.user.name as string)}</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className=" w-32 flex flex-col p-0 gap-1 bg-secondary">

                    <Link href={routes.PROFILE} className={buttonVariants({ variant: 'default' })}><User2 />Profile</Link>
                    <Button onClick={async () => {
                        await signOut({ redirect: true })
                    }}><LogOut />deconnexion</Button>
                </PopoverContent>
            </Popover>
        </nav>
    )
}