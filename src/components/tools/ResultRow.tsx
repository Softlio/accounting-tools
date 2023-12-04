"use client";
import { parseToEuro } from "@/lib/money";
import { cn } from "@/lib/utils";
import React from "react";
import InfoBubble from "./InfoBubble";

interface ResultRowProps {
    label: string;
    value: number;
    className?: string;
    valueClassName?: string;
    negative?: boolean;
    infoLabel?: {
        read_more?: string;
        description?: string;
    }
}

export const ResultRow: React.FC<ResultRowProps> = ({
    label,
    value,
    className,
    valueClassName,
    negative,
    infoLabel,
}) => {
    return (
        <li className={cn("flex justify-between items-center", className)}>
            <span className="text-lg">
                {label} {infoLabel && <InfoBubble {...infoLabel} title={label} />}
            </span>
            <span className={cn("font-serif text-2xl", valueClassName)}>
                {parseToEuro(value, negative)}
            </span>
        </li>
    );
};