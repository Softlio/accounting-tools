"use client";
import React from "react";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import translation from "@/translations/getTranslation";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const customerColumns: ColumnDef<User>[] = [
    {
        accessorKey: "firstName",
        header: translation.admin.customer.table.firstName,
    },
    {
        accessorKey: "lastName",
        header: translation.admin.customer.table.lastName,
    },
    {
        accessorKey: "email",
        header: translation.admin.customer.table.email,
        cell(props) {
            const value = props.getValue() as string;
            return <a href={`mailto:${value}`} className="underline" target="_blank">
                {value}
            </a>
        },
    },
    {
        accessorKey: "role",
        header: translation.admin.customer.table.role,
        cell(props) {
            const value = props.getValue() as string;
            return <span
                className="bg-gray-200 font-bold dark:bg-gray-800 px-2 py-1 rounded text-xs"
            >
                {value}
            </span>
        },
    },
    {
        accessorKey: "tools",
        header: translation.admin.customer.table.tools,
        cell(props) {
            const value = props.getValue() as any[];
            const filtered = value.filter((v) => v.access);
            return <p>
                {filtered.length}
            </p>
        },
    },
    {
        accessorKey: "id",
        header: translation.admin.customer.table.edit,
        cell(props) {
            const value = props.getValue() as string;
            return <Link href={`/admin/customers/${value}`}>
                <Button>
                    {translation.admin.customer.table.edit}
                </Button>
            </Link>
        },
    },
];

export const CustomerDataTable = ({ data }: { data: User[] }) => (
    <TooltipProvider>
        <DataTable columns={customerColumns} data={data} />
    </TooltipProvider>
);
