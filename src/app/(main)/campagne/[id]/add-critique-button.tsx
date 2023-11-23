'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CreateCritiqueForm from "./add-critique-form";

export default function AddCritiqueButton({campaignId}:{campaignId:string}) {
    const [open, setOpen] = useState(false)

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} size={"sm"} className="bg-gold capitalize  ">critiquer</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Creer une campagne</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <CreateCritiqueForm campaignId={campaignId} closeDialog={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
