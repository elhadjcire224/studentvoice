import { Role } from "@prisma/client";
import type { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {

    interface Session {
        user: DefaultSession["user"] & {
            id?: string,
            role?: Role,
            blocked?: boolean,
            subject?: string,
            image_public_id?: any
            image
        }
    }

    interface User extends DefaultUser {
        role?: Role,
        subject?: any
        id?: string,
        image_public_id?: any
    }
}