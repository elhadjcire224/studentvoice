"use server"
import prisma from "@/db/prisma";
import { hash } from "bcrypt";
import { isEmailUsed } from "@/lib/utils"
import { teacherFormType } from "@/types/zodSchema";


export async function registerTeacher(values: teacherFormType) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email,
            },
        });

        if (existingUser) {
            return { success: false, message: 'un utilisateur avec cet email exist deja' };
        }


        const hashedPassword = await hash(values.password, 10);
        const subject = await prisma.subject.findFirst()
        const newUser = await prisma.user.create({
            data: {
                email: values.email,
                password: hashedPassword,
                name:values.name,
                subjectId: subject?.id,
                verified:false
            },
        });

        return { success: true, message: 'Enseignant enregistré avec succès' };
    } catch (erreur) {
        console.error('Erreur lors de l\'enregistrement de l\'enseignant :', erreur);
        return { success: false, message: 'Une erreur s\'est produite lors de l\'enregistrement de l\'enseignant' };
    }
}


export async function registerStudent(values: any) {


}