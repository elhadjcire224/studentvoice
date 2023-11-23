import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default async function Login() {
    const session = await getServerSession()

    if(session) redirect(routes.CAMPAGNE)
    return (
        <Card className="">
            <CardHeader className="">
                <CardTitle >Login</CardTitle>
            </CardHeader>
            <CardContent className="">
                <LoginForm/>
                <div className="text-center p-4 ">
                    Vous n&rsquo;avez pas encore de compte ? <Link href={routes.REGISTER} className="underline text-blue-500"> Enregistrez vous ici</Link>
                </div>
            </CardContent>

        </Card>
    )
}
