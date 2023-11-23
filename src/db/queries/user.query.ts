import prisma from '@/db/prisma';
import { unstable_noStore as noStore } from 'next/cache'
import {Resend} from 'resend'
import VerifiedTeacherEmail from '../../../emails/verified-teacher-email';
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

export async function emailVeriedUser(user:User){

    const resend = new Resend(process.env.RESEND_API_KEY);

    const name = user.name
    const data = await resend.emails.send({
        from: 'StudentVoice <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Compte vefied',
        react: VerifiedTeacherEmail({name})
    });

    return {sucess:true,data:data}
}
