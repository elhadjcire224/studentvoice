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
