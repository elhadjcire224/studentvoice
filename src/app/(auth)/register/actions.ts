import { prisma } from "@/db/prisma"

export async function registerStudent(formData:FormData){
    "use server"
    const users = await prisma.user.findMany()
    console.log(users)
}

export async function registerTeacher(formData:FormData) {
    "use server"

    
}