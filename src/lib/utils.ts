import prisma from "@/db/prisma";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function isEmailUsed(email: string) {
  const isEmailUsed = !! await prisma.user.count({
    where: {
      email
    },
  });
  return isEmailUsed
}

export async function requestpermission(){
  
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permission accordée pour les notifications.');
        // Enregistre le token de l'utilisateur ou effectue d'autres opérations liées aux notifications
      } else {
        console.warn('Permission refusée pour les notifications.');
      }
    });
  }

}
