"use client";

import translations from "@/translations/getTranslation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    href: string;
    children: string;
    current?: string;
};
const NavItem: React.FC<Props> = ({ href, children, current }) => {
    return (
        <Link
            href={href}
            className={cn(
                "transition-colors hover:text-theme-secondary",
                href === current ? "text-theme-secondary hover:text-theme-light" : ""
            )}
        >
            {children}
        </Link>
    );
};

const NavMenu = () => {
    const pathname = usePathname();

    return (
        <div
            className={cn(
                "items-center hidden md:flex space-x-4 lg:space-x-6 justify-center text-theme-light font-serif font-bold text-xl"
            )}
        >
            {/* <NavItem current={pathname} href="/admin/settings">
                {translations.admin.navbar.settings}
            </NavItem> */}
        </div>
    );
};

export default NavMenu;
