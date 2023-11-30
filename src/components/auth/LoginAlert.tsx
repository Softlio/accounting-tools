"use client"

import { Alert, AlertTitle, AlertDescription } from "../ui/alert"
import { AlertCircle } from "lucide-react"

const LoginAlert = () => {
    const urlParams = new URLSearchParams(window?.location?.search)
    const error = urlParams.get("error")

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Error logging in. Please try again.
                </AlertDescription>
            </Alert>
        )
    }

    return null
}

export default LoginAlert