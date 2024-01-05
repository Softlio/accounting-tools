import FadeInAnimation from "@/components/animations/FadeInAnimation";
import LoginAlert from "@/components/auth/LoginAlert";
import { LoginForm } from "@/components/auth/LoginForm";
import Title from "@/components/shared/Title";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
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
        <main className="w-full h-full flex justify-center items-center bg-theme-accent">
            <section>
                <Card className="container max-w-[96%] border-theme-accent max-sm:shadow-none shadow-xl max-sm:border-none overflow-hidden relative h-[800px] flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0">
                    <Link
                        href="/register"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "absolute right-4 top-4 md:right-8 md:top-8"
                        )}
                    >
                        <FadeInAnimation index={1}>
                            {translations.login.registerButton}
                        </FadeInAnimation>
                    </Link>
                    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                        <div className="absolute inset-0 bg-theme-primary" />
                        <div className="relative z-20 flex items-center text-lg font-medium">
                            <FadeInAnimation index={1}>
                                <Image src="/images/logo-gold.svg" alt="FEM Financial Services" width={176} height={104} />
                            </FadeInAnimation>
                        </div>
                        <div className="relative z-20 mt-auto">
                            <blockquote className="space-y-2">
                                <FadeInAnimation index={1}>
                                    <p className="text-lg">
                                        {translations.login.slogan}
                                    </p>
                                </FadeInAnimation>
                            </blockquote>
                        </div>
                    </div>
                    <div className="lg:p-8">
                        <FadeInAnimation index={1}>
                            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                                <div className="relative z-20 flex items-center text-lg w-full justify-center font-medium lg:hidden">
                                    <Image src="/images/logo-gold.svg" alt="FEM Financial Services" width={176} height={104} />
                                </div>
                                <div className="flex flex-col space-y-2 text-center">
                                    <Title type="h1">
                                        {translations.login.title}
                                    </Title>
                                    <p className="text-sm text-muted-foreground">
                                        {translations.login.description}
                                    </p>
                                </div>
                                <LoginAlert />
                                <LoginForm />
                                <p className="px-8 text-center text-sm text-muted-foreground">
                                    {translations.login.agreement}{" "}
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
                        </FadeInAnimation>
                    </div>
                </Card>
            </section>
        </main>
    );
};

export default LoginPage;
