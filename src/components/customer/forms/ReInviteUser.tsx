"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import FadeInAnimation from "@/components/animations/FadeInAnimation";
import { reInviteUser } from "@/lib/actions";
import translations from "@/translations/getTranslation";
import toast from "react-hot-toast";

const initialState = {
    message: '',
    success: false,
};

const ReInviteUser: React.FC<{
    id: string;
    email: string | null;
}> = ({ id, email }) => {
    const [state, formAction] = useFormState(reInviteUser, initialState)

    useEffect(() => {
        if (state.success) {
            toast.success(translations.customer.reInvite.success);
        }
    }, [state])

    return (
        <FadeInAnimation>
            <form action={formAction} className="my-4 ">
                <Input className="hidden" type="email" name="email" value={email ?? ""} />
                <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">{translations.customer.reInvite.form.submit}</Button>
            </form>
        </FadeInAnimation>
    );
};

export default ReInviteUser;
