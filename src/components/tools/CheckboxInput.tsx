"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import InfoBubble from "./InfoBubble";

export const CheckBoxInput: React.FC<{
    name: string;
    text: {
        question: string;
        description?: string;
    };
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
    value?: boolean;
    className?: string;
    infoLabel?: {
        read_more?: string;
        description?: string;
    }
}> = ({
    name,
    text,
    defaultValue,
    className,
    value,
    onChange = () => { },
    infoLabel
}) => {
        return (
            <div className={cn("items-start flex space-x-2 pt-4", className)}>
                <Checkbox id={name} defaultChecked={defaultValue} checked={value} onCheckedChange={onChange} />
                <div>
                    <label
                        htmlFor={name}
                        className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {text.question} {infoLabel && <InfoBubble {...infoLabel} />}
                    </label>
                    <p className="font-serif font-bold text-sm">{text.description}</p>
                </div>
            </div>
        );
    };