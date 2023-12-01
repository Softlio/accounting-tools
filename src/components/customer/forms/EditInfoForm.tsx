"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import translations from "@/translations/getTranslation";

const formSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
});

const EditInfoForm: React.FC<{
    id: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    role: string | null;
}> = ({ id, email, firstName, lastName, role }) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email ?? "",
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            role: role ?? "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const res = await fetch(`/api/auth/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            toast.error(translations.customer.edit.toast.error);
            return;
        }

        toast.success(translations.customer.edit.toast.success);
        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.customer.edit.form.email}</FormLabel>
                            <FormControl>
                                <Input placeholder={translations.customer.edit.form.emailPlaceholder} {...field} />
                            </FormControl>
                            <FormDescription>{translations.customer.edit.form.emailDescription}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.customer.edit.form.firstName}</FormLabel>
                            <FormControl>
                                <Input placeholder={translations.customer.edit.form.firstNamePlaceholder} {...field} />
                            </FormControl>
                            <FormDescription>{translations.customer.edit.form.firstNameDescription}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.customer.edit.form.lastName}</FormLabel>
                            <FormControl>
                                <Input placeholder={translations.customer.edit.form.lastNamePlaceholder} {...field} />
                            </FormControl>
                            <FormDescription>{translations.customer.edit.form.lastNameDescription}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.customer.edit.form.role}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={translations.customer.edit.form.rolePlaceholder} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ADMIN">{translations.role.admin}</SelectItem>
                                    <SelectItem value="USER">{translations.role.user}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                {translations.customer.edit.form.roleDescription}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{translations.customer.edit.form.submit}</Button>
            </form>
        </Form>
    );
};

export default EditInfoForm;
