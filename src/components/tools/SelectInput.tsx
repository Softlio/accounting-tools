"use client";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";


export const SelectInput: React.FC<{
    name: string;
    text: {
        label?: string;
        placeholder?: string;
        description?: string;
    };
    options: {
        label: string;
        value: string;
    }[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
}> = ({
    name,
    text,
    options,
    defaultValue,
    className,
    value,
    onChange = () => { },
}) => {
        return (
            <div>
                <Label htmlFor={name} className="text-md">
                    {text.label}
                </Label>
                <Select defaultValue={defaultValue} value={value} name={name} onValueChange={onChange}>
                    <SelectTrigger className={cn(className)}>
                        <SelectValue placeholder={text.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="font-serif font-bold text-sm">{text.description}</p>
            </div>
        );
    };