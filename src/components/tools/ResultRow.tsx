"use client";
import { parseToEuro } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useAnimate } from "framer-motion";
import React, { useEffect, useState } from "react";
import InfoBubble from "./InfoBubble";

interface ResultRowProps {
    label: string;
    value: number | undefined;
    className?: string;
    valueClassName?: string;
    negative?: boolean;
    infoLabel?: {
        read_more?: string;
        description?: string;
    };
    obfuscate?: boolean;
}

export const ResultRow: React.FC<ResultRowProps> = ({
    label,
    value: currentValue,
    className,
    valueClassName,
    negative,
    infoLabel,
    obfuscate
}) => {
    const [value, setValue] = useState(0);
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (value === currentValue) return;
        if (currentValue == undefined) return;

        setValue(currentValue);

        if (obfuscate) return;
        const animation = async () => {
            await animate(scope.current, { opacity: .9, color: "var(--theme-secondary)" }, { duration: .5 });
            await animate(scope.current, { opacity: 1, color: "var(--theme-primary)" }, { duration: .5 });
        }
        animation();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue])


    let formattedValue = (currentValue != undefined) ? parseToEuro(value, negative) : "";

    if (obfuscate) {
        formattedValue = formattedValue.replace(/\d/g, "0");
    };

    return (
        <li className={cn("flex justify-between items-center", className)}>
            <span className="text-lg">
                {label} {infoLabel && <InfoBubble {...infoLabel} title={label} />}
            </span>
            <span ref={scope} className={cn("font-serif text-2xl whitespace-nowrap text-theme-primary overflow-hidden", valueClassName,
                obfuscate && 'blur-md select-none'
            )}>
                {formattedValue}
            </span>
        </li>
    );
};
