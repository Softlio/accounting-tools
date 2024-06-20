"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import FadeInAnimation from "@/components/animations/FadeInAnimation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { reInviteUser } from "@/lib/actions";
import translations from "@/translations/getTranslation";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const initialState = {
    message: '',
    success: false,
};

const ReInviteUserButton: React.FC<{
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
            <Tooltip>
                <TooltipTrigger className="max-w-xs truncate hover:underline">
                    <form action={formAction} className="my-4 ">
                        <Input className="hidden" type="email" name="email" value={email ?? ""} />
                        <Button type="submit" className="w-10 h-10 p-1 bg-theme-dark hover:bg-theme-dark/80">
                            <Lock size={16} />
                        </Button>
                    </form>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-sm">{translations.customer.reInvite.form.description}</p>
                </TooltipContent>
            </Tooltip>

        </FadeInAnimation>
    );
};

export default ReInviteUserButton;
