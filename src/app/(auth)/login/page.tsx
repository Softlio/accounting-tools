import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginAlert from "@/components/auth/LoginAlert";
import { LoginForm } from "@/components/auth/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
            <Card className="container border-theme-primary max-sm:shadow-none max-sm:border-none overflow-hidden relative h-[800px] flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0 mx-4">
                <Link
                    href="/register"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Register
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-theme-primary" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image src="/images/logo-gold.svg" alt="Admin by Khadija" width={176} height={104} />
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                Tools to quickly help you get your accounting in
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
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to log into your account
                            </p>
                        </div>
                        <LoginAlert />
                        <LoginForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
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
