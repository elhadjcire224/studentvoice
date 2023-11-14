"use client"
import { Form } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    username:z.string().min(4,"Le nom d'utilisateur est trop court"),
    email: z.string().email("entrez un mail valide"),
    password: z.string().min(8,"le mot de passe est trop court"),
    confirmPassword: z.string()
})

export default function TeacherRegisterForm() {

    return (
        <Form>

        </Form>
    )
}