import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Navbar from '@/components/admin/Navbar';
import { User } from '@prisma/client';
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

    const user = session.user as unknown as User;

    if (user?.role !== 'ADMIN') {
        redirect("/dashboard");
    }

    return (
        <main>
            <Navbar firstName={user?.firstName ?? "A"} lastName={user?.lastName ?? "AA"} />
            {children}
        </main>
    )
}

export default AdminLayout