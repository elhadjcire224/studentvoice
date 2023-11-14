import { PropsWithChildren } from "react";

export default function layout({children}:PropsWithChildren) {
    return (
        <main className="h-screen bg-red-500">
            
            {children}
        </main>
    )
}
