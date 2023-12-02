'use server'

import prisma from "@/db/prisma"
import { routes } from "@/lib/routes";
import { revalidatePath } from "next/cache";
import { resolve } from "path";

export async function createMessage(userId: string, content: string) {
    const m = await prisma.contact.create({
        data: {
            userId,
            content
        }
    })

    revalidatePath(routes.MESSAGE);
    return { id: m.id }
}