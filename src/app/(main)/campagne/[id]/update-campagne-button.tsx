'use client'
import { Button } from "@/components/ui/button";
import { DialogContent, Dialog, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { PenLine } from "lucide-react";
import { useState } from "react";
import UpdateCampaignForm from "./update-campagne-form";
import { CampaignHome } from "@/db/queries/campagne.query";
export default function UpdateCampaignButton({campaign}:{campaign:any}) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <DropdownMenuItem onClick={() => setOpen(true)}>
                    <PenLine /><div>Editer</div>
                </DropdownMenuItem> */}
                <Button variant={'outline'} onClick={() => setOpen(true)} size={"sm"} className="mr-4 h-auto px-2 py-1"><PenLine /><div>Editer</div></Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Edit campagne</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <UpdateCampaignForm campaign={campaign} closeDialog={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
