import { getServerSession } from "next-auth";
import UserAvatarPictureInput from "./user-avatar-picture-input";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Role, User } from "@prisma/client";
import TeacherDetailsStats from "./teacher-details-stats";
import { Separator } from "@/components/ui/separator";
import CampaignList from "./campaign-list";
import StudentDetailsStats from "./student-details-stats";
import CritiqueList from "./user-critique-list";


export default async function page() {
    const session = await getServerSession(options)
    const user = session?.user
    return (
        <section className="flex flex-col gap-8 m-2 ">
            <div className="flex items-center gap-4 ">
                <UserAvatarPictureInput user={user as User}/>
                <div className="text-md">
                    <div className="font-semibold ">@{user?.name}</div>
                    <div>{user?.email}</div>
                </div>
            </div>
            {user?.role == Role.TEACHER ? <TeacherDetailsStats userId={user?.id as string} /> : <StudentDetailsStats userId={user?.id as string} />}
            {/* <Separator  /> */}
            <div>
                {
                    user?.role == Role.TEACHER ? (
                        <>
                            <strong className="text-2xl font-extrabold ">Mes Campagnes </strong>
                            <CampaignList userId={user?.id ?? ''} />
                        </>
                    ):
                    (<>
                            <strong className="text-2xl font-extrabold ">Mes Critiques</strong>
                            <CritiqueList userId={user?.id ?? ''} />
                    </>)
                }
                
            </div>
        </section>
    )
}
