"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { registerStudent } from "./actions"
import toast from "react-hot-toast"
import { studentFormSchema, studentFormType } from "@/lib/definitions"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import Loader from "@/components/loader"


export default function StudentRegisterForm() {
    const router = useRouter()
    const form = useForm<studentFormType>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    async function onSubmit(values: studentFormType) {

        const response = await registerStudent(values)
        form.reset()
        if (response.success) {
            toast.success("votre compte est enregister avec succees")
            router.refresh()
            router.push(routes.LOGIN)
            return
        }

        form.setError("email", { type: "custom", message: response.message })
        toast.error(response.message, { duration: 5000 })
    }
    return (

        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-1">
                <FormField

                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d&lsquo;utilisateur</FormLabel>
                            <FormControl>
                                <Input type="text"  required placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input required placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /><FormField
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comfirmer mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={form.formState.isSubmitting} className="text-left" type="submit" >{form.formState.isSubmitting && <Loader/>}Creer</Button>
            </form>
        </Form>

    )
}
