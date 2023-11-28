"use server"
import prisma from '@/db/prisma';
import { routes } from '@/lib/routes';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache';
const clounaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
export async function saveToDatabase(userId:string,public_id:string,url:string){
    const userPublicImageId = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            image_public_id:true
        }
    })

    if (userPublicImageId?.image_public_id != undefined && userPublicImageId?.image_public_id != null){
        const response = await cloudinary.uploader.destroy(userPublicImageId.image_public_id)
        if(!response.ok) throw new Error(`impossible de supprimer l'image avec ${userPublicImageId.image_public_id} `,)
    }

    await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            image_public_id:public_id,
            image:url
        }
    })

    return {sucess:true}
}
export const uploadImage = async (formData: FormData) => {
    try {
        const file = formData.get('file') as File
        const image_public_id = formData.get('image_public_id') as string
        const userId = formData.get('userId')  as string
        if (!file || !userId) throw new Error('invalide image')
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)


        const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder:'studentvoice',
            },(error,result) => {
                if(error) reject(error);

                saveToDatabase(userId,image_public_id,result?.secure_url as string)
                revalidatePath(routes.PROFILE)
                resolve(result)
            }).end(buffer) 
        })
        return result?.secure_url;
    } catch (error) {
        console.error(error);

        throw new Error('Failed to upload image');

    }
};

