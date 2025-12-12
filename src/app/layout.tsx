import type { Metadata } from "next";
import { Inder } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inder = Inder({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inder",
});

export const metadata: Metadata = {
  title: "Mostre seus projetos para o mundo | IndieHub",
  description:
    "Crie sua página e comece a compartilhar seus projetos e acompanhe as métricas detalhadas de cada um.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta
          name="google-site-verification"
          content="PgI_1KQh2yQopijVyfagPenbkZRuBHW8oRcb8pbYJZQ"
        />
      </head>
      <body className={`${inder.variable} dark font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
