import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgstore";
import { NextUIProvider } from "@/providers/NextUIProvider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TrySomeThign-Blog",
  description: "Home page of blog app",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/images/logo-app.png",
      href: "/images/logo-app.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/images/logo-app.png",
      href: "/images/logo-app.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-green-primary-400`}>
        <NextUIProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
