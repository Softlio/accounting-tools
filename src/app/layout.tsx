import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Abhaya_Libre } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthProvider";
import translations from "@/translations/getTranslation";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const abhayaLibre = Abhaya_Libre({
  subsets: ["latin-ext"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})



export const metadata: Metadata = {
  title: translations.layout.metadata.title,
  description: translations.layout.metadata.description,
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
            inter.variable,
            abhayaLibre.variable
          )}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
