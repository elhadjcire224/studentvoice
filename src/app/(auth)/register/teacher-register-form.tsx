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
import { teacherFormSchema, teacherFormType } from "@/lib/definitions"
import toast from "react-hot-toast"
import { useState } from "react"
import { subject } from "@/lib/definitions"
import AccountVerificationAlert from "@/components/AccountVerificationAlert"
import Loader from "@/components/loader"




export default function TeacherRegisterForm({ subjects }: { subjects: subject[] }) {
    const [openDialog, setOpenDialog] = useState(false)
    const form = useForm<teacherFormType>({
        resolver: zodResolver(teacherFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            subject:"",
        }
    })

    async function onSubmit(values:teacherFormType) {

        const response = await registerTeacher(values)
        form.reset()
        if(response.success){
            toast.success("votre compte est enregister avec succees")
            setOpenDialog(true)
            return
        }

        form.setError("email", { type:"custom", message: response.message })
        toast.error(response.message,{duration:5000})

    }
    return (
        <>
            <AccountVerificationAlert openDialog={openDialog} setOpenDialog={setOpenDialog}/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-1">
                    <mark className="italic bg-background  text-foreground underline">NB:Les comptes profs vont necessités une validation coté moderateur donc votre compte ne sera pas disponible tout de suite</mark>
                    <FormField
                        control={form.control}
                        name="username"
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
                                        <SelectTrigger >
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
                                    <Input type="password" placeholder="MonSuperMotDePasse224" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={form.formState.isSubmitting} className="text-left" type="submit" >{form.formState.isSubmitting && <Loader />}Creer</Button>
                </form>
            </Form>
        </>
    )
}
