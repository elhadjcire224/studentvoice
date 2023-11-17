import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/db/prisma'
const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "Mot de Passe", type: "password"}
            },
            async authorize(credentials,req) {
                // const {email,password} = req.body
                throw new Error("les indentifiant ne corre")
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
})



export {handler as GET ,handler as POST}

