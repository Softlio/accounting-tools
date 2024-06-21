import getTranslation from '@/translations/getTranslation'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <div className='sticky top-0 z-50 w-full py-4 shadow-md bg-theme-light'>
            <nav className='container flex items-center justify-between mx-auto max-sm:px-2 h-14'>
                <a href="https://femfinancialservices.nl/">
                    <Image src="/images/seal-logo.png" alt="FEM Financial Services" width={400} height={600} className='mx-4 max-w-[170px] -m-36 absolute' />
                </a>
                <Button size={"lg"} asChild className='px-10 py-6 font-serif text-xl font-bold transition-colors duration-300 bg-theme-secondary max-sm:hidden'>
                    <Link href='/login'>
                        {getTranslation.landingPage.hero.loginButton}
                    </Link>
                </Button>
                <Button size={'lg'} className='hidden w-10 h-10 p-1 mr-3 bg-transparent max-sm:flex'>
                    <User size={32} className='text-theme-secondary' />
                </Button>

            </nav>
        </div>
    )
}

export default Navbar