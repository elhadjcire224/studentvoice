import { Role } from "@prisma/client";
import type { DefaultSession,User } from "next-auth";

declare module 'next-auth'{
    
    interface Session{
        user:DefaultSession["user"] & {
            id?:string,
            role?:Role,
            blocked?:boolean,
            subject?:string,
        }
    }

    interface User{
        role?:Role
        subject?:any
    }
}