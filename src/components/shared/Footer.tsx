import translations from '@/translations/getTranslation'
import { FacebookIcon, InstagramIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

    const year = `${new Date().getUTCFullYear()}`;

    return (
        <footer className="w-full bg-theme-primary py-12">
            <div className='container flex gap-12 items-center md:items-end mx-auto justify-between flex-col md:flex-row'>
                <div className='space-y-8 max-w-xl flex flex-col max-md:items-center  mx-4'>
                    <Link href={"https://adminbykhadija.nl/"}>
                        <Image src="/images/logo-gold.svg" alt="FEM Financial Services" width={176} height={104} className='hover:opacity-60' />
                    </Link>
                    <p className='text-theme-offwhite font-serif text-xl text-center md:text-left'>
                        {translations.landingPage.footer.excerpt}
                    </p>
                </div>
                <ul className='grid grid-cols-3 text-center md:text-left md:grid-cols-2 text-theme-offwhite transition-opacity font-serif text-2xl h-min gap-4 md:gap-8 max-w-xl w-full whitespace-nowrap'>
                    <li>
                        <Link href="https://adminbykhadija.nl/over-ons/" target='_blank'>
                            <span className='hover:opacity-50'>
                                {translations.landingPage.footer.aboutUs}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://adminbykhadija.nl/contact-us/" target='_blank'>
                            <span className='hover:opacity-50'>
                                {translations.landingPage.footer.contact}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://adminbykhadija.nl/contact-us/" target='_blank'>
                            <span className='hover:opacity-50'>
                                {translations.landingPage.footer.support}
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='container mx-auto'>
                <hr className='border-theme-secondary my-8 mx-1' />
            </div>
            <div className='container mx-auto py-2 flex items-center'>
                <div className='flex flex-col md:flex-row items-center justify-between w-full mx-4 gap-8'>
                    <div className='space-y-2'>
                        <p className='text-theme-offwhite font-serif max-md:text-center'>
                            {translations.landingPage.footer.copyRight.replace("{{year}}", year)}
                        </p>
                        <p className='text-theme-offwhite font-serif max-md:text-center'>
                            <Link href="https://adminbykhadija.nl/algemene-voorwaarden/">
                                {translations.landingPage.footer.terms}
                            </Link>
                        </p>
                    </div>
                    <div className='flex md:pr-16 gap-4'>
                        <Link href='https://www.instagram.com/adminbykhadija/'>
                            <InstagramIcon size={32} className='text-theme-offwhite hover:text-theme-secondary transition-colors' />
                        </Link>
                        <Link href='https://www.facebook.com/people/Boekhouder-Khadija/100068015234539/'>
                            <FacebookIcon size={32} className='text-theme-offwhite hover:text-theme-secondary transition-colors' />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer