"use client";

import { inviteUser } from "@/lib/actions";
import translations from "@/translations/getTranslation";
import { Tool } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import AddButton from "../shared/AddButton";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

const initialState = {
    message: '',
    success: false,
};

const InviteUserForm: React.FC<{
    tools: Tool[];
}> = ({
    tools,
}) => {
        const [state, formAction] = useFormState(inviteUser, initialState)
        const navigation = useRouter()

        const [open, setOpen] = useState(false)

        useEffect(() => {
            if (state.success) {
                setOpen(false);
                toast.success(translations.customer.invite.success);
                navigation.refresh();
            }
        }, [state, navigation])

        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <AddButton />
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{translations.customer.invite.title}</DialogTitle>
                    <form action={formAction} className=" flex flex-col gap-2">
                        {(state.message && !state.success) && <p className="text-red-500">{state.message}</p>}
                        <div className='flex gap-2'>
                            <label htmlFor="firstName" className="space-y-2">
                                {translations.customer.add.form.firstName}
                                <Input type="text" name="firstName" placeholder={translations.customer.add.form.firstName} />
                            </label>
                            <label htmlFor="lastName" className="space-y-2">
                                {translations.customer.add.form.lastName}
                                <Input type="text" name="lastName" placeholder={translations.customer.add.form.lastName} />
                            </label>
                        </div>
                        <label htmlFor="email">
                            {translations.customer.add.form.email}
                        </label>
                        <Input type="text" name="email" placeholder={translations.customer.add.form.email} />
                        <br />
                        <ul className="space-x-2">
                            {tools.map((tool) => {
                                return (
                                    <li key={tool.id} className="flex w-full gap-4">
                                        <input type="checkbox" name={tool.id} id={tool.id} className="min-w-[24px] accent-theme-secondary" />
                                        <label htmlFor={tool.id} className="flex-1">
                                            <p className="font-semibold text-theme-primary">{tool.name}</p>
                                            <p className="text-sm text-gray-400">{tool.description}</p>
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                        <br />
                        <Button type="submit" className=" mt-3">{translations.customer.invite.form.submit}</Button>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

export default InviteUserForm