"use server"
import prisma from '@/db/prisma';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'



const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME as string
const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
const api_secret = process.env.CLOUDINARY_API_SECRET as string



export const signuploadform = async () => {
    const timestamp = Math.round((new Date).getTime() / 1000);

    cloudinary.config({
        api_key,
        cloud_name,
        api_secret
    })

    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        folder: 'studentvoice'
    }, api_secret);

    return { timestamp, signature, api_key, cloud_name }
}

export async function saveToDatabase(userId: string, public_id: string, url: string) {
    if (!public_id) throw new Error("public_id invalid")

    // console.log(userId, public_id, url)

    const userPublicImageId = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            image_public_id: true
        }
    })

    console.log(userPublicImageId)

    if (userPublicImageId?.image_public_id != undefined && userPublicImageId?.image_public_id != null) {
        console.log('public id exist')

        console.log(userPublicImageId)
        const response = await cloudinary.uploader.destroy(userPublicImageId.image_public_id, {
            invalidate: true,
            resource_type: "image"
        })

        console.log(response)
        // if (!response.ok) {

        //     console.log(response)
        //     throw new Error(`impossible de supprimer l'image avec ${userPublicImageId.image_public_id} `,)
        // }
        console.log('imag supprime')
    }

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            image_public_id: public_id,
            image: url
        }
    })

    return { sucess: true }
}


