import prisma from '@/db/prisma';
import { unstable_noStore as noStore } from 'next/cache'
export async function fetchSubjectsWithoutUsers() {
    noStore()
    try {
        const subjectsWithoutUsers = await prisma.subject.findMany({
            where: {
                user: { none: {} },

            },
            select: {
                id: true,
                name: true
            }
        });

        return subjectsWithoutUsers;
    } catch (error) {
        console.error('Erreur lors de la récupération des sujets sans utilisateurs :', error);
        throw new Error('Failed to fetch subjects without users.');
    }
}


