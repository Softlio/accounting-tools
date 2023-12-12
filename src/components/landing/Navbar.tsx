import translations from '@/translations/getTranslation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <div className='w-full sticky top-0 z-50 bg-theme-dark shadow-md py-4'>
            <nav className='container mx-auto flex justify-between items-center max-sm:px-2'>
                <Link href="/">
                    <Image src="/images/logo-gold.svg" alt="FEM Financial Services" width={176} height={104} className='h-16 mx-4' />
                </Link>
                <Button size={"lg"} asChild className='text-xl px-10 py-6 bg-theme-secondary transition-colors duration-300 font-serif font-bold max-sm:hidden'>
                    <Link href='/login'>
                        {translations.ladingPage.hero.loginButton}
                    </Link>
                </Button>
            </nav>
        </div>
    )
}

export default Navbar