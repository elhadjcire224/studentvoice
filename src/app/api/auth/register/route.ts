import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
export async function POST(request:Request) {
    
    try {
        const {username,password,lol}  = await request.json()
        const hashedp = await hash(password,10)
        console.log(username,password,lol)

        return NextResponse.json({pwd:hashedp})

    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({pw:"succes"})
    
}