"use client"
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import translations from '../../translations/getTranslation'
import { Button } from '../ui/button'

const DownloadButton: React.FC<{
    link: string
}> = ({
    link
}) => {
        const [isFetching, setIsFetching] = useState(false)


        return (
            <Link passHref prefetch={false} href={link} aria-disabled={isFetching} className={isFetching ? 'pointer-events-none' : 'pointer-events-auto'}>
                <Button className=" hover:bg-theme-secondary" aria-disabled={isFetching} disabled={isFetching} onClick={() => {
                    setIsFetching(true)
                    setTimeout(() => {
                        setIsFetching(false)
                    }, 10000)
                }}>
                    {translations.downloadPages.incomeTax.paid.button} {isFetching && <span className="animate-spin ml-2">
                        <RefreshCw size={15} />
                    </span>}
                </Button>
            </Link>
        )
    }

export default DownloadButton