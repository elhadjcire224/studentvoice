import { Button } from "@/components/ui/button";
import { DialogContent, Dialog, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import CreateCampaignForm from "./create-form";
import { useState } from "react";
export default function CreateCampaignButton() {
    const [open,setOpen] = useState(false)
    return (        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button onClick={()=> setOpen(true)} size={"sm"} className="mr-4 "><PlusIcon /></Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Creer une campagne</DialogTitle>
                    
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CreateCampaignForm closeDialog={setOpen}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
