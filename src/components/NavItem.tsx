"use client"
import { naveitem } from "@/types/navitem";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ReactNode } from "react";

export default function NavItem({item}:{item:naveitem}){
    return (
        <Link href={item.href} className={buttonVariants()}>
            {item.icon as ReactNode}
        </Link>
    )
}