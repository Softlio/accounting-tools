"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import translations from "@/translations/getTranslation";
import React from "react";
import Title from "../shared/Title";

interface InfoBubbleProps {
    title?: string;
    read_more?: string;
    description?: string;
}

const InfoBubble: React.FC<InfoBubbleProps> = ({ read_more, description, title }) => {
    if (!description && !read_more) return null;

    return (
        <Popover>
            <PopoverTrigger>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-info stroke-theme-primary"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" className="stroke-theme-secondary" />
                    <path d="M12 8h.01" className="stroke-theme-secondary" />
                </svg>
            </PopoverTrigger>
            <PopoverContent>
                <Title type="h3" className="text-2xl">{title}</Title>
                {title && <hr className="mb-2" />}
                <p>
                    {description}
                    {read_more && (
                        <a
                            href={read_more}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-lg font-serif pl-1 text-theme-secondary whitespace-nowrap"
                        >
                            {translations.global.read_more}
                        </a>
                    )}
                </p>
            </PopoverContent>
        </Popover>
    );
};

export default InfoBubble;
