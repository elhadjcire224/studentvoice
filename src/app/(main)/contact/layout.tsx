'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'
import React, { PropsWithChildren, useRef, useState } from 'react'
import { z } from 'zod'
import { createMessage } from './actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { routes } from '@/lib/routes'
import Loader from '@/components/loader'

export default function Layout({ children }: PropsWithChildren) {
    const { data: session } = useSession()
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const r = useRouter()
    return (
        <section className='relative h-[86vh]'>
            {/* children with message componnent */}
            {children}
            <div className='fixed  bottom-14 left-0 right-0 flex items-center gap-2 px-3 max-w-lg mx-auto'>

                <Textarea placeholder={"entrez votre message ici"} value={content} onChange={(e) => {

                    setContent(e.target.value)
                }} className='min-h-[35px] max-h-[80px] focus-visible:outline-none' rows={1} draggable={false} />
                <Button disabled={content.length < 2 || loading} onClick={async () => {
                    setLoading(true)
                    const id = await createMessage(session?.user.id ?? '', content)
                    setLoading(false)
                    setContent('')
                    r.push(`${routes.MESSAGE}#${id.id}`)
                }} className='rounded-full  p-2 h-10 w-10 flex justify-center items-center  bg-gold text-white' size={'sm'} variant={'default'}> {loading ? <Loader /> : <Send className={cn()} />}</Button>
            </div>
        </section>
    )
}
