import { getUserToolsServer } from "@/lib/access";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";
import UserNav from "./UserNav";

const Navbar = async () => {
    const tools = await getUserToolsServer();
    return (
        <header className='w-full bg-theme-dark shadow-lg sticky top-0 z-50'>
            <nav className='mx-auto container flex py-3 justify-between items-center'>
                <div className="flex-1">
                    <Link href="/dashboard">
                        <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} className='h-16 w-min' />
                    </Link>
                </div>
                <div className="flex-1">
                    <NavMenu />
                </div>
                <div className="flex-1 justify-end flex">
                    <UserNav tools={tools} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar