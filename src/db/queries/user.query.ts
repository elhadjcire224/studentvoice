import prisma from '@/db/prisma';
import { unstable_noStore as noStore } from 'next/cache'
import {Resend} from 'resend'
import {render} from '@react-email/render'
import VerifiedTeacherEmail from '@/components/emails/verified-teacher-email'
import { User } from '@prisma/client';
export async function getUserByEmail(email: string) {
    noStore()
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        include:{
            subject:{
                select:{
                    name:true
                }
            }
        }
    })

    return user
}
export async function verifyUser(userId: string) {
    noStore()
    const user = await prisma.user.update({
        where: {
            id:userId
        },
        data:{
            verified:true
        }
    })

    return user
}

export async function emailVeriedUser(user:any){

    const name = user.name
    const resend = new Resend(process.env.RESEND_API_KEY);
    const text = render(VerifiedTeacherEmail({name}))

    const data = await resend.emails.send({
        from: 'StudentVoice <onboarding@resend.dev>',
        to: [user.email as string],
        subject: 'Compte verifiée',
        html:text
    });

    return {sucess:true,data:data}
}
