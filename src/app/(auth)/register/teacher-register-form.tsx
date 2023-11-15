"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registerTeacher } from "./actions"
const formSchema = z.object({
    name: z.string().min(4, "Le nom est trop court"),
    email: z.string().email("entrez un mail valide"),
    subject:z.string({required_error:"selectionnez votre matiere s'il vous plait"}),
    password: z.string().min(8, "le mot de passe est trop court"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: "les mots de passe doivent correspondre ", path: ["confirmPassword"] })

export default function TeacherRegisterForm() {

    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset()
        const r = await registerTeacher(values)
        alert(r)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-1">
                    <mark className="italic bg-background  text-foreground underline">NB:Les comptes profs vont necessités une validation coté moderateur donc votre compte ne sera pas disponible tout de suite</mark>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom et Prenom</FormLabel>
                                <FormControl>
                                    <Input required placeholder="Mr/Mdam" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Matiere</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="droit">droit</SelectItem>
                                        <SelectItem value="saari">sarri</SelectItem>
                                        <SelectItem value="compta societe">compta societe</SelectItem>
                                    </SelectContent>
                                </Select>
                                
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
                                    <Input required placeholder="MonSuperMotDePasse224" {...field} />
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
                                    <Input required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="text-left" type="submit">Creer</Button>
                </form>
            </Form>
        </>
    )
}
