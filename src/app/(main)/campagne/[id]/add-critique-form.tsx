'use client'
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCritiqueFormSchema, createCritiqueFormType } from "@/lib/definitions"
import { useSession } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { Dispatch, SetStateAction } from "react"
import { createCritique } from "@/db/queries/critique.query"
import RatingStars from "./rating"
import { Textarea } from "@/components/ui/textarea"
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
    if (!session?.data?.user) return

    const user = session.data.user




    async function onSubmit(values: createCritiqueFormType) {

        const result = await createCritique(values, campaignId, user.id as string)
        if (result.success) {
            closeDialog(false)
            toast.success(result.message)

        }
        else {
            toast.error(result.message)
            closeDialog(false)
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
