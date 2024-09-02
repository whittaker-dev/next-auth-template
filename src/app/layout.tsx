import { EdgeStoreProvider } from "@/lib/edgstore";
import { NextUIProvider } from "@/providers/NextUIProvider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
      url: "/images/logo-trysomethign.png",
      href: "/images/logo-trysomethign.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/images/logo-trysomethign.png",
      href: "/images/logo-trysomethign.png",
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
      <body
        className={`${montserrat.className} bg-green-primary-400 h-[calc(100vh - 73px)]`}
      >
        <NextUIProvider>
          <EdgeStoreProvider>
            <NextTopLoader
              color="#27AE60"
              height={5}
              showSpinner
              crawlSpeed={500}
              speed={350}
              easing="ease"
              zIndex={20000}
            />
            {children}
            <ToastContainer />
          </EdgeStoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
