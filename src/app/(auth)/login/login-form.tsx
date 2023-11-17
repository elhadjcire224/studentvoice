import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    return (
        <form >

            <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email"/>
            </div>
            <div>
                <Label htmlFor="password">mot de passe</Label>
                <Input type="password" id="password" />
            </div>
            <Button>Login</Button>
        </form>
    )
}
