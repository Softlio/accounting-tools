import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginAlert from "@/components/auth/LoginAlert";
import { LoginForm } from "@/components/auth/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import translations from "@/translations/getTranslation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const LoginPage = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return (
        <main className="w-full h-full flex justify-center items-center bg-theme-dark">
            <Card className="container rounded-none border-theme-primary max-sm:shadow-none max-sm:border-none overflow-hidden relative h-[800px] flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0 mx-4">
                <Link
                    href="/register"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    {translations.login.registerButton}
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-theme-primary" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} />
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                {translations.login.slogan}
                            </p>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="relative z-20 flex items-center text-lg w-full justify-center font-medium lg:hidden">
                            <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} />
                        </div>
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {translations.login.title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {translations.login.description}
                            </p>
                        </div>
                        <LoginAlert />
                        <LoginForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            {translations.login.agreement}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                {translations.global.terms}
                            </Link>{" "}
                            {translations.global.and}{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                {translations.global.privacy}
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </Card>
        </main>
    );
};

export default LoginPage;
