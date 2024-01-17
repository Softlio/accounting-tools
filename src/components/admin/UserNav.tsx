"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import translations from "@/translations/getTranslation";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

const UserNav = () => {
    const { data: session, status } = useSession();

    const user = session?.user as unknown as User | undefined;
    const userName =
        (user?.firstName?.charAt(0) ?? "A") + (user?.lastName?.charAt(0) ?? "A");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={status != "authenticated"}>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-theme-secondary text-theme-light font-bold">
                            {status != "authenticated" ? "" : userName}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                    <DropdownMenuItem>{translations.admin.navbar.home}</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <Link href="/admin">
                        <DropdownMenuItem>
                            {translations.admin.navbar.dashboard}
                        </DropdownMenuItem>
                    </Link> */}
                    <Link href="/admin/customers">
                        <DropdownMenuItem>
                            {translations.admin.navbar.dashboard}
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/customers">
                        <DropdownMenuItem>
                            {translations.admin.navbar.customers}
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/tools">
                        <DropdownMenuItem>
                            {translations.admin.navbar.tools}
                        </DropdownMenuItem>
                    </Link>
                    {/* <Link href="/admin/settings">
                        <DropdownMenuItem>
                            {translations.admin.navbar.settings}
                        </DropdownMenuItem>
                    </Link> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link href="/logout">
                    <DropdownMenuItem>
                        {translations.admin.navbar.logout}
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
