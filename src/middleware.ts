export {default} from 'next-auth/middleware'
export const config = {
    matcher: ["/campagne/:path*","/profile/:path*","/contact/:path*"] 
};
