import prisma from "@/db/prisma";
import { type ClassValue, clsx } from "clsx"
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function requestpermission() {
  const event = new CustomEvent("askperm", {
    detail: {},
    bubbles: true,
    cancelable: true,
    composed: false,
  })
  document.dispatchEvent(event)
}

export function getInitials(name:string|null) {
  if(!name) return null
  const words = name.split(' ');

  const initials = words.map(word => word.charAt(0).toUpperCase());

  const firstTwoInitials = initials.slice(0, 2).join('').slice(0, 2);
  return firstTwoInitials;
}

export function truncate30(chaine: string): string {
  if (chaine.length > 30) {
    return chaine.slice(0, 27) + "...";
  } else {
    return chaine;
  }
}

export function formatDate(date:Date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
  return formattedDate;
}


