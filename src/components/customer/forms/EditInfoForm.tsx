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
            toast.error("Something went wrong!");
            return;
        }

        toast.success("User updated successfully!");
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            <FormDescription>The email address of the user.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>The first name of the user.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormDescription>The last name of the user.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role for the user" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="USER">User</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The role of the user. Admins have full access to the dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update</Button>
            </form>
        </Form>
    );
};

export default EditInfoForm;
