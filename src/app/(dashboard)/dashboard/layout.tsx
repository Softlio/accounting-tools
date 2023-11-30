import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Navbar from '@/components/dashboard/Navbar';
import Footer from '@/components/shared/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const AdminLayout: React.FC<Props> = async ({
    children
}) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default AdminLayout