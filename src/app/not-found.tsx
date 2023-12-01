import NotFoundNavbar from '@/components/not-found/Navbar'
import Footer from '@/components/shared/Footer'
import { Button } from '@/components/ui/button'
import translations from '@/translations/getTranslation'
import Link from 'next/link'

const NotFound = () => {
    return (
        <main>
            <NotFoundNavbar />
            <section className='min-h-[80vh] flex flex-col justify-center items-center'>
                <h1 className='font-serif text-[10rem] leading-none text-theme-secondary'>
                    404
                </h1>
                <h2 className='font-serif text-[2rem] text-theme-dark'>
                    {translations.notFound.description}
                </h2>
                <Link href='/dashboard' passHref>
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