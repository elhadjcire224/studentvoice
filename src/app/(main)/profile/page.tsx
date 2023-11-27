import { getServerSession } from "next-auth";
import UserAvatarPictureInput from "./user-avatar-picture-input";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@prisma/client";
import TeacherDetailsStats from "./teacher-details-stats";

export default async function page() {
    const session = await getServerSession(options)
    const user = session?.user
    return (
        <section className="flex flex-col gap-8 m-8 ">
            <div className="flex items-center gap-4 ">
                <UserAvatarPictureInput user={user as User}/>
                <div className="text-md">
                    <div className="font-semibold ">@{user?.name}</div>
                    <div>{user?.email}</div>
                </div>
            </div>
            <TeacherDetailsStats userId={user?.id as string}/>
            <div className=""></div>
        </section>
    )
}
