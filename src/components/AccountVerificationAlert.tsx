"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"
import { requestpermission } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default function AccountVerificationAlert({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter()
    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent className="w-full">
                <AlertDialogHeader>
                    Attente de vérification du compte
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Merci de votre inscription ! Votre compte professeur a été créé avec succès.
                    Veuillez attendre la vérification du compte. Un email vous sera envoyé une fois votre compte validé.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={async () => {
                        await requestpermission()
                        router.push('/')
                    }}>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
