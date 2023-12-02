import Time from "@/app/(main)/campagne/(mainpage)/time";
import { Contact } from "@prisma/client";
import { Card, CardContent, CardFooter } from "./ui/card";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { cn } from "@/lib/utils";

export default async function ChatBulle({ message }: { message: Contact }) {
    const session = await getServerSession(options)

    return (
        <Card id={message.id} className={cn(" w-auto max-w-[80vw] self-start p-2 mx-1", session?.user.id == message.userId && "bg-blue-400 self-end")}>
            <CardContent className="p-1 flex flex-col gap-1">
                <div>{message.content}</div>
                <CardFooter className="p-0 text-xs self-end">{message.createdAt.toLocaleString()}</CardFooter>
            </CardContent>
        </Card>
    )
}
