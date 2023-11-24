import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/db/prisma'
import { getUserByEmail } from '@/db/queries/user.query'
import { compare } from 'bcrypt'
import { routes } from '@/lib/routes'
import { Role } from '@/lib/definitions';

export const options : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: routes.LOGIN,
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Mot de Passe", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await getUserByEmail(credentials.email);
                
                console.log(user)
                if (!user) return null

                const passwordMatch = await compare(credentials.password, user.password);
                if (user.role == Role.TEACHER &&!user.verified && passwordMatch) return Promise.reject(new Error("Votre compte n'a pas encore été vérifié. Veuillez attendre la vérification."))

                if (!passwordMatch) return null

                return user
            }
        }),
        
    ],
    callbacks:{
        async jwt({token,user}) {

            
            if(user){
                token = {
                    ...token ,
                    id:user.id,
                    role:user.role,
                    subject:user?.subject?.name
                }
            }
            
            console.log("jwt appele avec =", token)
            return token
        },
        async session({session,user,token}){
            
            // console.warn("session callback" ,session,"user=",user,"token=",token)
            const sessiondata =  {
                ...session,
                user:{
                    ...session.user,
                    id:token.id,
                    role:token.role,
                    subject:token.subject
                }
            }

            console.log("session appele avec =",sessiondata)

            return sessiondata
        }
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
} ;
