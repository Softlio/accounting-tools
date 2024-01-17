import getTranslation from '@/translations/getTranslation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <div className='w-full sticky top-0 z-50 bg-theme-light shadow-md py-4'>
            <nav className='container mx-auto flex justify-between items-center max-sm:px-2 h-14'>
                <a href="https://femfinancialservices.nl/">
                    <Image src="/images/seal-logo.png" alt="FEM Financial Services" width={400} height={600} className='mx-4 max-w-[170px] -m-36 absolute' />
                </a>
                <Button size={"lg"} asChild className='text-xl px-10 py-6 bg-theme-secondary transition-colors duration-300 font-serif font-bold max-sm:hidden'>
                    <Link href='/login'>
                        {getTranslation.landingPage.hero.loginButton}
                    </Link>
                </Button>
            </nav>
        </div>
    )
}

export default Navbar