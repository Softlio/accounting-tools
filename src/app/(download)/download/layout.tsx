import Navbar from "@/components/not-found/Navbar"
import Footer from "@/components/shared/Footer"
import React from "react"

const DownloadLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <main className=" min-h-[100dvh] flex justify-between flex-col">
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default DownloadLayout