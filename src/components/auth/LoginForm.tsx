"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { signIn } from "next-auth/react"
import translations from "@/translations/getTranslation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2, translations.login.form.passwordError),
})

export const LoginForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: "/dashboard",
        })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{translations.login.form.email}</FormLabel>
                        <FormControl>
                            <Input placeholder={translations.login.form.emailPlaceholder} {...field} />
                        </FormControl>
                        <FormDescription>
                            {translations.login.form.emailDescription}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{translations.login.form.password}</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder={translations.login.form.passwordPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="bg-theme-secondary">{translations.login.form.submit}</Button>
        </form>
    </Form>
}