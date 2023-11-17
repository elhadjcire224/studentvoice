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
import { teacherFormSchema } from "@/types/zodSchema"
import toast from "react-hot-toast"
import { useState } from "react"
import { subject } from "@/lib/definitions"
import { useRouter } from "next/navigation"
import AccountVerificationAlert from "@/components/AccountVerificationAlert"




export default function TeacherRegisterForm({ subjects }: { subjects: subject[] }) {
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof teacherFormSchema>>({
        resolver: zodResolver(teacherFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            subject:"",
        }
    })

    async function onSubmit(values: z.infer<typeof teacherFormSchema>) {

        const response = {success:true,message:'colll'}
        form.reset()
        if(response.success){
            toast.success("votre compte est enregister avec succees")
            setOpenDialog(true)
            return
        }

        form.setError("email", { type:"custom", message: response.message })
        toast.error(response.message)
        // const resutl = await registerTeacher(values)
        // if (resutl.success){
        //     toast.success(resutl.message)
        // }else{
        //     toast.error(resutl.message)
        // }


    }
    return (
        <>
            <AccountVerificationAlert openDialog={openDialog} setOpenDialog={setOpenDialog}/>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            {field.value ? <SelectValue placeholder="selectionnez votre matiere" />:"selectionez votre matiere"}
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {subjects.map((subject) => <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>)}
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
                    <Button  className="text-left" type="submit">Creer</Button>
                </form>
            </Form>
        </>
    )
}
