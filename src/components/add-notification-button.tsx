'use client'
import { askpermission, ispermitted } from "@/lib/serviceworker"
import { Button } from "./ui/button"
import { Bell } from "lucide-react"
export default function AddNotificationButton() {
    // if (!ispermitted()) return
    return (
        <div>
            <Button className="p-0 " size={'icon'} onClick={async () => {
                await askpermission()
            }}><Bell /></Button>
        </div>
    )
}
