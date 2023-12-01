"use client"

import translations from "@/translations/getTranslation";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const LogoutButton = () => {
    return (
        <Button size="lg" className="bg-theme-secondary w-full" onClick={() => signOut({ callbackUrl: "/" })}>
            {translations.logout.button}
        </Button>
    )
}

export default LogoutButton