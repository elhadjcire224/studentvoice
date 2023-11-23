import Link from 'next/link'
import icon from '../media/logo.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { routes } from '@/lib/routes'
export default function Logo() {
    return (
        <Link href={routes.HOME}><Image src={icon} alt='speacker logo' width={40} height={40} className="drop-shadow-[0px_0px_50px_#f1de5f]" /></Link>
    )
}