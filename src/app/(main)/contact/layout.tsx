
import { Input } from '@/components/ui/input'
import React, { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <section className='relative h-[86vh]'>
            {children}
            <div className='absolute bottom-0 left-0 right-0'>
                <Input type='text' className='w-full' />
            </div>
        </section>
    )
}
