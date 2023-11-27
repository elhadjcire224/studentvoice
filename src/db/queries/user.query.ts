import prisma from '@/db/prisma';
import { unstable_noStore as noStore } from 'next/cache'
import {Resend} from 'resend'
import {render} from '@react-email/render'
import VerifiedTeacherEmail from '../../../emails/verified-teacher-email'
import { Prisma, User } from '@prisma/client';
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
    const html = render(VerifiedTeacherEmail({name}))

    const data = await resend.emails.send({
        from: 'StudentVoice <onboarding@resend.dev>',
        to: [user.email as string],
        subject: 'Compte verifié',
        html
    });

    return {sucess:true,data:data}
}

export default async function fectchTeacherStatsDetails(userId:string){
    const details = await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            subject:{
                select:{
                    name:true
                }
            },
            campagnes:{
                select:{
                    _count:true,
                    closed:true,
                    critiques: {
                        where: {
                            signaled: false
                        },
                        select: {
                            rate:true
                        }
                    }
                }
            },
        }
        
    })
    const critiques = details?.campagnes.map((camp) => camp.critiques).flat() as Array<any>

    const totalReviews = critiques.flat().length
    const totalRating = critiques.reduce((acc: number, critique) => acc + critique.rate, 0) ?? 0
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.1';
    console.log(averageRating)
    const closed = details?.campagnes.filter((cam) => cam.closed).length
    return {
        ...details,
        averageRating,
        closed
    }
}

export type teacherProfileDetailsType = Prisma.PromiseReturnType<typeof fectchTeacherStatsDetails>
