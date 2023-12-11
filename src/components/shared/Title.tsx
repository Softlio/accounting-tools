import { cn } from '@/lib/utils'
import React from 'react'

const Title = ({
    children,
    type = "h3",
    className,
}: {
    children: React.ReactNode,
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    className?: string
}) => {

    if (type === "h1") {
        return (
            <h1 className={cn("text-4xl font-bold leading-none tracking-tight font-serif text-theme-primary", className)}>
                {children}
            </h1>
        )
    }

    if (type === "h2") {
        return (
            <h2 className={cn("text-3xl font-bold leading-none tracking-tight font-serif text-theme-primary", className)}>
                {children}
            </h2>
        )
    }

    if (type === "h3") {
        return (
            <h3 className={cn("text-2xl font-bold leading-none tracking-tight font-serif text-theme-primary", className)}>
                {children}
            </h3>
        )
    }

    if (type === "h4") {
        return (
            <h4 className={cn("text-xl font-bold leading-none tracking-tight font-serif text-theme-primary", className)}>
                {children}
            </h4>
        )
    }

    if (type === "h5") {
        return (
            <h5 className={cn("text-lg font-bold leading-none tracking-tight font-serif text-theme-primary", className)}>
                {children}
            </h5>
        )
    }

    if (type === "h6") {
        return (
            <h6 className={cn("text-lg leading-none tracking-tight font-serif text-theme-primary", className)}>
                {children}
            </h6>
        )
    }

    return (
        <h3 className={cn("text-2xl font-bold leading-none tracking-tight font-serif text-theme-primary", className)}>
            {children}
        </h3>
    )
}

export default Title