import translations from '@/translations/getTranslation'
import Image from 'next/image'
import Link from 'next/link'
import HeroImage from '../../../public/images/hero-2.webp'
import FadeInAnimation from '../animations/FadeInAnimation'
import SlideAnimation from '../animations/SlideAnimation'
import { Button } from '../ui/button'

const Hero = () => {
    return (
        <header className='relative z-auto w-full h-[80dvh] flex justify-center flex-col'>
            <Image placeholder="blur" src={HeroImage} alt="Hero 1" className='object-cover absolute z-0 w-full h-full' />
            <FadeInAnimation>
                <div className='absolute inset-0 bg-theme-dark bg-opacity-40 z-[1] w-full h-full' />
            </FadeInAnimation>
            <div className='z-10 container mx-auto space-y-6'>
                <SlideAnimation>
                    <FadeInAnimation index={1}>
                        <h1 className='text-5xl md:text-7xl font-serif text-theme-light lg:max-w-3xl'>
                            {translations.landingPage.hero.slogan}
                        </h1>
                    </FadeInAnimation>
                </SlideAnimation>
                <SlideAnimation index={1}>
                    <FadeInAnimation index={2}>
                        <p className="text-xl font-bold text-theme-light">
                            {translations.landingPage.hero.description}
                        </p>
                    </FadeInAnimation>
                </SlideAnimation>
                <SlideAnimation index={2}>
                    <FadeInAnimation index={3}>
                        <div className='font-serif flex gap-4 flex-wrap'>
                            <Button size={"lg"} asChild className='text-xl px-10 py-6 hover:bg-theme-secondary transition-colors duration-300'>
                                <Link href='/login'>
                                    {translations.landingPage.hero.loginButton}
                                </Link>
                            </Button>
                            <Button size={"lg"} asChild className='text-xl px-10 py-6 hover:bg-theme-secondary transition-colors duration-300'>
                                <Link href='/register'>
                                    {translations.landingPage.hero.registerButton}
                                </Link>
                            </Button>
                        </div>
                    </FadeInAnimation>
                </SlideAnimation>
            </div>
        </header>
    )
}

export default Hero