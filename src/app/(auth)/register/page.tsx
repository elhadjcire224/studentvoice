import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import TeacherRegisterForm from "./teacher-register-form";
import StudentRegisterForm from "./student-register-form";
import { fetchSubjectsWithoutUsers } from "@/db/queries/subject.queries";
import { routes } from "@/lib/routes";


export default async function Page() {
    const subjects = await fetchSubjectsWithoutUsers()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Creation d&rsquo;un compte</CardTitle>
                <CardDescription>
                    Creer un compte pour participer  mais si vous avez un compte vous pouvez vous en cliquant  <Link className="text-blue-500" href={routes.LOGIN}>ici</Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Tabs defaultValue="student" className="w-full">
                    <TabsList className="w-full flex">
                        <TabsTrigger className="flex-1 " value="student">Etudiant</TabsTrigger>
                        <TabsTrigger className="flex-1 " value="teacher">Professeur</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student">
                        <StudentRegisterForm />
                    </TabsContent>
                    <TabsContent value="teacher">
                        <TeacherRegisterForm subjects={subjects}/>
                    </TabsContent>
                </Tabs>
            </CardContent>


        </Card>
    )
}
