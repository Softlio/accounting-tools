import FadeInAnimation from '@/components/animations/FadeInAnimation'
import NotFoundNavbar from '@/components/not-found/Navbar'
import Footer from '@/components/shared/Footer'
import { Button } from '@/components/ui/button'
import translations from '@/translations/getTranslation'
import Image from 'next/image'
import Link from 'next/link'
import NotFoundImage from '../../public/images/not-found.webp'

const NotFound = () => {
    return (
        <main>
            <NotFoundNavbar />
            <section className='min-h-[80vh] flex flex-col justify-center items-center relative z-auto'>
                <Image placeholder="blur" src={NotFoundImage} alt="Hero 1" className='object-cover absolute z-0 w-full h-full' />
                <FadeInAnimation>
                    <div className='absolute inset-0 bg-theme-dark bg-opacity-60 z-[1] w-full h-full' />
                </FadeInAnimation>
                <h1 className='z-10 font-serif text-[10rem] leading-none text-theme-secondary'>
                    404
                </h1>
                <h2 className='z-10 font-serif text-[2rem] font-bold text-theme-light'>
                    {translations.notFound.description}
                </h2>
                <Link href='/dashboard' passHref className='z-10'>
                    <Button className='mt-8 px-8 py-6 text-lg'>
                        {translations.notFound.button}
                    </Button>
                </Link>
            </section>
            <Footer />
        </main>
    )
}

export default NotFound