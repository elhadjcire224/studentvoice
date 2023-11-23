'use client'
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCampaignFormSchema, CreateCritiqueFormSchema, createCampaignFormType, createCritiqueFormType } from "@/lib/definitions"
import { useSession } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { createCritique } from "@/db/queries/critique.query"
import RatingStars from "./rating"
import { Textarea } from "@/components/ui/textarea"
import { FileSymlink, Files } from "lucide-react"
import Loader from "@/components/loader"
type Props = {
    closeDialog: Dispatch<SetStateAction<boolean>>,
    campaignId: string
}
export default function CreateCritiqueForm({ closeDialog, campaignId }: Props) {
    const form = useForm<createCritiqueFormType>({
        resolver: zodResolver(CreateCritiqueFormSchema),
        defaultValues: {
            content: "",
            rate: 1
        }

    })
    const session = useSession()
    const router = useRouter()
    if (!session?.data?.user) return

    const user = session.data.user




    async function onSubmit(values: createCritiqueFormType) {

        const result = await createCritique(values,campaignId, user.id as string)
        if (result.success) {
            closeDialog(false)
            router.refresh()
            toast.success(result.message)
            return
        }
        else {
            toast.error(result.message)
        }
        form.reset()

    }



    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-1 w-full ">
                <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                        <FormItem className=" flex gap-1 flex-col items-center   px-2">
                            <FormLabel className="">
                                Notez l&lsquo;initiative {field.value}/5
                            </FormLabel>
                            <FormControl>
                                <RatingStars defaultValue={field.value} setter={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField

                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between">
                                <FormLabel>Text de critique </FormLabel>
                                <div>{field.value.length}/500</div>
                            </div>

                            <FormControl>
                                <Textarea maxLength={500} required placeholder="j'aime beaucoup le prof mais ...???" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={form.formState.isSubmitting} className="text-left" type="submit" >{form.formState.isSubmitting && <Loader />}Critiquer</Button>
            </form>
        </Form>

    )
}
