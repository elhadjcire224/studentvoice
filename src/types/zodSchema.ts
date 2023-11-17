
import { z } from "zod";

export const teacherFormSchema = z.object({
    name: z.string().min(4, "Le nom est trop court"),
    email: z.string().email("entrez un mail valide"),
    subject: z.string({ required_error: "selectionnez votre matiere s'il vous plait" }),
    password: z.string().min(8, "le mot de passe est trop court"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: "les mots de passe doivent correspondre ", path: ["confirmPassword"] })

export const studentFormSchema = z.object({
    username: z.string().min(4, "Le nom d'utilisateur est trop court"),
    email: z.string().email("entrez un mail valide"),
    password: z.string().min(8, "le mot de passe est trop court"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: "les mots de passe doivent correspondre ", path: ["confirmPassword"] })

export type studentFormType = z.infer<typeof studentFormSchema>
export type teacherFormType = z.infer<typeof teacherFormSchema>