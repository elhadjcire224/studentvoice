'use client'
import AvatarProf from "@/app/(main)/campagne/(mainpage)/AvatarProf";
import { User } from "@prisma/client";
import { Button } from "./ui/button";
import verifyTeacher from "@/app/(main)/admin/verify-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function TeacherCard({user}:{user:User}) {
    const router = useRouter()
	
	return (
		<div className="details p-4 flex flex-col gap-4 ">
			<div className="flex items-center gap-4 ">
				<div>
					<AvatarProf
						subject={user.subject.name}
						name={user.name}
						image={user.image}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<div>
						<strong>Mr/Mdme&nbsp;&nbsp;{user.name}</strong>
					</div>
					<div className="italic font-bold ">
						Prof de {user.subject.name}
					</div>
				</div>
			</div>
			
			<div className="text-end">
				<Button onClick={async () => {
                    const data = await verifyTeacher(user.id)
                    if(data?.success){
                        router.refresh()
                        toast.success("success")
                        console.log(data)
                    }
                }}>Verify </Button>
			</div>
		</div>
	);
}
