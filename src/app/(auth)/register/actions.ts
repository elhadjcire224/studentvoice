"use server"
import prisma from "@/db/prisma";
import { hash } from "bcrypt";
import { Role, studentFormType, teacherFormType } from "@/lib/definitions";
import { getUserByEmail } from "@/db/queries/user.query";
import {unstable_noStore as noStore} from 'next/cache'


export async function registerTeacher(values: teacherFormType) {
    noStore()
    try {
        const existingUser = await getUserByEmail(values.email)
        
        if (existingUser) {
            return { success: false, message: 'un utilisateur avec cet email exist deja' };
        }

        const hashedPassword = await hash(values.password, 10);
        const newUser = await prisma.user.create({
            data: {
                email: values.email,
                password: hashedPassword,
                name:values.username,
                subjectId: values.subject,
                role:Role.TEACHER
            },
        });

        return { success: true, message: 'Enseignant enregistré avec succès' };
    } catch (erreur) {
        console.error('Erreur lors de l\'enregistrement de l\'enseignant :', erreur);
        return { success: false, message: 'Une erreur s\'est produite lors de l\'enregistrement de l\'enseignant' };
    }
}


export async function registerStudent(values: studentFormType) {
    noStore()
    try {
        const existingUser = await getUserByEmail(values.email)

        if (existingUser) {
            return { success: false, message: 'un utilisateur avec cet email exist deja' };
        }

        const hashedPassword = await hash(values.password, 10);
        const newUser = await prisma.user.create({
            data: {
                email: values.email,
                password: hashedPassword,
                name: values.username,
                role:Role.STUDENT
            },
        });

        return { success: true, message: 'Etudiant enregistré avec succès' };
    } catch (erreur) {
        console.error('Erreur lors de l\'enregistrement de l\'etudiant :', erreur);
        return { success: false, message: 'Une erreur s\'est produite lors de l\'enregistrement de l\'etudiant ' };
    }

}