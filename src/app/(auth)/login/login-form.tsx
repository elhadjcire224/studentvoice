"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { loginFormSchema, loginFormType } from "@/lib/definitions"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import Loader from "@/components/loader"




export default function StudentRegisterForm() {
    const router = useRouter()
    const form = useForm<loginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: loginFormType) {
        const r = await signIn("credentials", { ...values, redirect: false },)
        console.log(r)
        if (!r?.error) {
            console.log("no error")
            router.refresh()
            return
        } else if (r?.error == "CredentialsSignin") {
            toast.error("Identifiants incorrects.Veuillez réessayer.",{duration:3000})
            form.setError("email",{message:""})
            form.setError("password",{message:""})
        }else if(r?.error){
            toast.error(r?.error as string, { duration: 5000 })
        }
        form.reset()
        
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-1 w-full ">
                <FormField

                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" required placeholder="moneamil@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" required placeholder="MonSuperMotDePasse224" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={form.formState.isSubmitting} className="text-left" type="submit" >{form.formState.isSubmitting && <Loader />}Se connecter</Button>
            </form>
        </Form>

    )
}
