'use client'
import { useSession } from "next-auth/react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import { deleteUserById } from "@/db/queries/user.query";
import { Button } from "@/components/ui/button";
export default  function DeleteUserButton() {
    const session = useSession()
    const user = session.data?.user
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size={'sm'} variant="destructive">Supprimer mon compte</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Etes vous sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irrévocable. Cette action supprimera définitivement votre compte et supprime vos données de nos serveurs.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {
                            await deleteUserById(user?.id ?? '')
                            await signOut()
                            
                        }}>Continuer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
