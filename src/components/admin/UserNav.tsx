"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import translations from "@/translations/getTranslation";
import Link from "next/link";

const UserNav = () => {

    const { data: session, status } = useSession();


    const user = session?.user as unknown as User;
    const userName = (user?.firstName?.charAt(0) ?? "A") + (user?.lastName?.charAt(0) ?? "A");

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={status != 'authenticated'}>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-theme-secondary text-theme-light font-bold">
                            {status != 'authenticated' ? "" : userName}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/home">
                        {translations.admin.navbar.home}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/admin">
                            {translations.admin.navbar.dashboard}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/admin/customers">
                            {translations.admin.navbar.customers}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/admin/tools">
                            {translations.admin.navbar.tools}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/admin/settings">
                            {translations.admin.navbar.settings}
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/logout">
                        {translations.admin.navbar.logout}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav