'use server'

import {  emailVeriedUser, verifyUser } from "@/db/queries/user.query"

export default async function verifyTeacher(userId:string){

    const user = await verifyUser(userId)
    
    if(user){
        const data = await emailVeriedUser(user)

        console.log(data.data)

    }
    
    return {success:true,}
}