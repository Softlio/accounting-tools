import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavMenu from "./NavMenu";



type Props = {
    firstName: string;
    lastName: string;
    image?: string;
};

const Navbar: React.FC<Props> = ({
    firstName,
    lastName,
    image,
}) => {
    return (
        <header className='w-full bg-theme-dark shadow-lg sticky'>
            <nav className='mx-auto container flex py-3 justify-between items-center'>
                <div className="flex-1">
                    <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} className='h-16 w-min' />
                </div>
                <div className="flex-1">
                    <NavMenu />
                </div>
                <div className="flex-1 justify-end flex">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={image} />
                        <AvatarFallback>{firstName.charAt(0)}{lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </header>
    )
}

export default Navbar