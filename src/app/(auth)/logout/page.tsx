import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/auth/LogoutButton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import translations from "@/translations/getTranslation";
import { getServerSession } from 'next-auth';
import Image from "next/image";
import { redirect } from 'next/navigation';


const LogoutPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <main className='w-full h-full bg-theme-dark flex justify-center items-center'>
            <Card className='w-[400px] rounded-none'>
                <CardHeader className='space-y-4'>
                    <div className='w-full flex justify-center items-center py-4'>
                        <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} />
                    </div>
                    <CardTitle className='text-center'>{translations.logout.title}</CardTitle>
                    <CardDescription className='text-center'>{translations.logout.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <LogoutButton />
                </CardContent>
            </Card>
        </main>
    )
}

export default LogoutPage