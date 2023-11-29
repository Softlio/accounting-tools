import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthProvider";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Accounting tools",
  description: "Accounting tools for small businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable
          )}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
