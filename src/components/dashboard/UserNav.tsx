"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tool, User } from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import translations from "@/translations/getTranslation";
import Link from "next/link";

const UserNav = ({
    tools
}: {
    tools: Tool[];
}) => {
    const { data: session, status } = useSession();

    const user = session?.user as unknown as User | undefined;
    const userName =
        (user?.firstName?.charAt(0) ?? "A") + (user?.lastName?.charAt(0) ?? "A");

    const isAdmin = user?.role === "ADMIN";

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
                    <DropdownMenuItem>{translations.dashboard.navbar.home}</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        tools.map((tool) => (
                            <Link key={tool.id} href={`/dashboard?tool=${tool.slug}`}>
                                <DropdownMenuItem>
                                    {tool.name}
                                </DropdownMenuItem>
                            </Link>
                        ))
                    }
                </DropdownMenuGroup>
                {isAdmin && (
                    <>
                        <DropdownMenuSeparator />
                        <Link href="/admin">
                            <DropdownMenuItem>
                                {translations.dashboard.navbar.admin}
                            </DropdownMenuItem>
                        </Link>
                    </>
                )}
                <Link href="/dashboard/settings">
                    <DropdownMenuItem>
                        {translations.dashboard.navbar.settings}
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/logout" passHref>
                    <DropdownMenuItem>
                        {translations.dashboard.navbar.logout}
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
