"use client"

import translations from "@/translations/getTranslation";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const LoginAlert = () => {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window?.location?.search)
        const error = urlParams.get("error")
        setError(error);
    }, [])

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{translations.login.alert.title}</AlertTitle>
                <AlertDescription>
                    {translations.login.alert.error}
                </AlertDescription>
            </Alert>
        )
    }

    return null
}

export default LoginAlert