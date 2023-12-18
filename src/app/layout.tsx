import { AuthProvider } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import translations from "@/translations/getTranslation";
import type { Metadata } from "next";
import { Abhaya_Libre, Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const abhayaLibre = Abhaya_Libre({
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
          <Toaster toastOptions={{
            style: {
              borderRadius: '0px',
              padding: '16px',
              border: '2px solid #D6AD60',
            }
          }} />
        </body>
      </AuthProvider>
    </html>
  );
}
