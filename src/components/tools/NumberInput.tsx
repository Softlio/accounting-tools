"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseToNumber } from "@/lib/money";
import { cn } from "@/lib/utils";


export const NumberInput: React.FC<{
    name: string;
    text: {
        label?: string;
        placeholder?: string;
        description?: string;
    };
    defaultValue?: number;
    onChange?: (value: number) => void;
    value?: number;
    className?: string;
    max?: number;
}> = ({
    name,
    text,
    defaultValue,
    className,
    value,
    max,
    onChange = () => { },
}) => {
        return (
            <div className={cn("w-full pb-1", className)}>
                <Label htmlFor={name} className="text-md">
                    {text.label}
                </Label>
                <Input
                    type="number"
                    placeholder={text.placeholder}
                    name={name}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={(e) => onChange(parseToNumber(e.target.value))}
                    max={max}
                />
                <p className="font-serif font-bold text-sm">{text.description}</p>
            </div>
        );
    };