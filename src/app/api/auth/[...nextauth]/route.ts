import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {PrismaAdapter} from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials:{
                username:{label:"Username",type:"text",placeholder:"entrez votre nom d'utilisateur"},
                password:{label:"Mot de passe",type:"password",placeholder:"entrez votre mot de passe"}
            },
            async authorize(credentials, req) {
                
            },
        })
    ]
})