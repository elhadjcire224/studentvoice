import TeacherCard from "@/components/teacher-card"
import { Separator } from "@/components/ui/separator"
import prisma from "@/db/prisma"

export default async function Page() {
  const unverifiedTeachers = await prisma.user.findMany({
    where: {
      verified: false,
      role: 'TEACHER'
    },
    include: { subject: true }
  })
  return (
    <section className="flex flex-col gap-4 ">
      <div className="font-extrabold text-2xl p-4">
        Unverified Teachers
      </div>
      <div>
        <Separator />
        {unverifiedTeachers.map((user) => <TeacherCard user={user} key={user.id} />)}
      </div>
    </section>
  )
}
