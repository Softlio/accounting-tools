import translations from '@/translations/getTranslation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const Hero = () => {
    return (
        <header className='relative z-auto w-full h-[80dvh] flex justify-center flex-col'>
            <Image src="/images/hero-1.jpg" alt="Hero 1" className='object-cover absolute z-0 w-full h-full' width={2000} height={1393} />
            <div className='absolute inset-0 bg-theme-dark bg-opacity-40 z-[1] w-full h-full' />
            <div className='z-10 container mx-auto space-y-6'>
                <h1 className='text-5xl md:text-7xl font-serif text-theme-light lg:max-w-3xl'>
                    {translations.ladingPage.hero.slogan}
                </h1>
                <p className="text-xl font-bold text-theme-light">
                    {translations.ladingPage.hero.description}
                </p>
                <div className='font-serif flex gap-4 flex-wrap'>
                    <Button size={"lg"} asChild className='text-xl px-10 py-6 hover:bg-theme-secondary transition-colors duration-300'>
                        <Link href='/login'>
                            {translations.ladingPage.hero.loginButton}
                        </Link>
                    </Button>
                    <Button size={"lg"} asChild className='text-xl px-10 py-6 hover:bg-theme-secondary transition-colors duration-300'>
                        <Link href='/register'>
                            {translations.ladingPage.hero.registerButton}
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Hero