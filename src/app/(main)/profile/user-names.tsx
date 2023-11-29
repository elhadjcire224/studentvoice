'use client'

import { useSession } from "next-auth/react"

export default function UserNames() {
    const session = useSession()
    const user = session.data?.user
    return (
        <div className="text-md">
            <div className="font-semibold ">@{user?.name}</div>
            <div>{user?.email}</div>
        </div>
    )
}
