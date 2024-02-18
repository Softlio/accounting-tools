"use client";
import translation from "@/translations/getTranslation";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
    TooltipProvider
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        accessorKey: "pending",
        header: translation.admin.customer.table.pending,
        cell(props) {
            const value = props.getValue() as string;

            const color = value ? "bg-yellow-200 dark:bg-yellow-800" : "bg-green-200 dark:bg-green-800";

            return <span
                className={cn("px-2 py-1 rounded text-xs font-bold uppercase", color)}
            >
                {value ? translation.global.yes : translation.global.no}
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
