import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import translations from '@/translations/getTranslation'

const NotFoundNavbar = () => {
    return (
        <div className='w-full sticky top-0 z-50 bg-theme-dark shadow-md py-4'>
            <nav className='container mx-auto flex justify-center items-center max-sm:px-2'>
                <Link href="/">
                    <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} className='h-16 w-min' />
                </Link>
            </nav>
        </div>
    )
}

export default NotFoundNavbar