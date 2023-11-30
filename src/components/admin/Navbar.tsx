import Image from "next/image";
import React from "react";
import NavMenu from "./NavMenu";
import UserNav from "./UserNav";


const Navbar = () => {
    return (
        <header className='w-full bg-theme-dark shadow-lg sticky top-0 z-50'>
            <nav className='mx-auto container flex py-3 justify-between items-center'>
                <div className="flex-1">
                    <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} className='h-16 w-min' />
                </div>
                <div className="flex-1">
                    <NavMenu />
                </div>
                <div className="flex-1 justify-end flex">
                    <UserNav />
                </div>
            </nav>
        </header>
    )
}

export default Navbar