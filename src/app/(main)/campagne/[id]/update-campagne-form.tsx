'use client'
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCampaignFormSchema, createCampaignFormType } from "@/lib/definitions"
import { updateCampaign } from "../(mainpage)/actions"
import { useSession } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { CampaignHome } from "@/db/queries/campagne.query"
import Loader from "@/components/loader"
type Props = {
    closeDialog: Dispatch<SetStateAction<boolean>>,
    campaign: CampaignHome
}
export default function UpdateCampaignForm({ campaign, closeDialog }: Props) {
    const form = useForm<createCampaignFormType>({
        resolver: zodResolver(CreateCampaignFormSchema),
        defaultValues: {
            title: campaign.title,
            onemore: campaign.mutiple_critique
        }

    })
    const session = useSession()
    const router = useRouter()
    if (!session?.data?.user) return

    const user = session.data.user




    async function onSubmit(values: createCampaignFormType) {
        
        const result = await updateCampaign(values, campaign.id)
        if (result.success) {
            toast.success(result.message)
            router.refresh()
            closeDialog(false)
            return
        }
        else {
            toast.error(result.message)
        }
        form.reset()

    }



    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-1 w-full  ">
                <FormField

                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input type="text" required placeholder="le but de cette campagne est ...." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="onemore"
                    render={({ field }) => (
                        <FormItem className=" flex gap-4 items-center flex-row-reverse justify-end px-2">
                            <FormLabel className="text-base">
                                Permettre plusieurs critiques par personnes
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    className="m-0"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button disabled={form.formState.isSubmitting} className="text-left" type="submit" >{form.formState.isSubmitting && <Loader />}Enregistrer les modifications</Button>
            </form>
        </Form>

    )
}
