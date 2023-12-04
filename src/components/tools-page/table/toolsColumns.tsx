"use client";
import translation from "@/translations/getTranslation";
import { Tool } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const toolsColumns: ColumnDef<Tool>[] = [
    {
        accessorKey: "name",
        header: translation.admin.tools.table.name,
    },
    {
        accessorKey: "description",
        header: translation.admin.tools.table.description,
        cell(props) {
            const description = props.getValue() as string;

            return (
                <Tooltip>
                    <TooltipTrigger className="truncate max-w-xs hover:underline">
                        {description}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="max-w-sm">{description}</p>
                    </TooltipContent>
                </Tooltip>
            );
        },
    },
    {
        accessorKey: "tags",
        header: translation.admin.tools.table.tags,
        cell(props) {
            const tags = props.getValue() as string[];

            return (
                <div className="flex flex-wrap gap-2 max-w-sm">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "userAccess",
        header: translation.admin.tools.table.users,
        cell(props) {
            const users = props.getValue() as any[];
            return <p>
                {users.length}
            </p>;
        },
    },
    {
        accessorKey: 'slug',
        header: translation.admin.tools.table.actions,
        cell(props) {
            const slug = props.getValue() as string;
            return (
                <Link href={`/dashboard?tool=${slug}`} className="text-theme-light" passHref>
                    <Button className="w-12 h-12">
                        <ExternalLink size={16} />
                    </Button>
                </Link>
            )
        }
    },
];

export const ToolsDataTable = ({ data }: { data: Tool[] }) => (
    <TooltipProvider>
        <DataTable columns={toolsColumns} data={data} />
    </TooltipProvider>
);
