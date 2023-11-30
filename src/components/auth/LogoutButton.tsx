"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import translations from "@/translations/getTranslation";

const LogoutButton = () => {
    return (
        <Button size="lg" className="bg-theme-secondary w-full" onClick={() => signOut({ callbackUrl: "/" })}>
            {translations.logout.button}
        </Button>
    )
}

export default LogoutButton