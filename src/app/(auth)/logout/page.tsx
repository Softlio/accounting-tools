import FadeInAnimation from '@/components/animations/FadeInAnimation';
import LogoutButton from '@/components/auth/LogoutButton';
import Title from '@/components/shared/Title';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { authOptions } from "@/lib/auth";
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
        <main className='w-full h-full bg-theme-accent flex justify-center items-center'>
            <FadeInAnimation>
                <Card className='w-[400px]'>
                    <CardHeader className='space-y-4'>
                        <div className='w-full flex justify-center items-center py-4'>
                            <Image src="/images/logo-gold.svg" alt="FEM Financial Services" width={176} height={104} />
                        </div>
                        <Title type="h1" className='text-center'>
                            {translations.logout.title}
                        </Title>
                        <CardDescription className='text-center'>{translations.logout.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LogoutButton />
                    </CardContent>
                </Card>
            </FadeInAnimation>
        </main>
    )
}

export default LogoutPage