"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

const LogoutButton = () => {
    return (
        <Button size="lg" className="bg-theme-secondary w-full" onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
        </Button>
    )
}

export default LogoutButton