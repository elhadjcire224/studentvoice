"use server"
import { isEmailUsed } from "@/lib/utils"

export async function registerStudent(formData: any) {

    return isEmailUsed(formData.email)
}

export async function registerTeacher(formData: any) {


}