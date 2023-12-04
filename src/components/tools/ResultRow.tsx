"use client";
import { parseToEuro } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useAnimate } from "framer-motion";
import React, { useEffect, useState } from "react";
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
    };
}

export const ResultRow: React.FC<ResultRowProps> = ({
    label,
    value: currentValue,
    className,
    valueClassName,
    negative,
    infoLabel,
}) => {
    const [value, setValue] = useState(0);
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (value === currentValue) return;

        const animation = async () => {
            await animate(scope.current, { opacity: .9, color: "var(--theme-secondary)" }, { duration: .5 });
            await animate(scope.current, { opacity: 1, color: "black" }, { duration: 2 });
        }

        animation();
        setValue(currentValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue])


    return (
        <li className={cn("flex justify-between items-center", className)}>
            <span className="text-lg">
                {label} {infoLabel && <InfoBubble {...infoLabel} title={label} />}
            </span>
            <span ref={scope} className={cn("font-serif text-2xl whitespace-nowrap", valueClassName)}>
                {parseToEuro(value, negative)}
            </span>
        </li>
    );
};
