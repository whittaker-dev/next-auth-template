import { EdgeStoreProvider } from "@/lib/edgstore";
import { NextUIProvider } from "@/providers/NextUIProvider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { StoreProvider } from "./StoreProvider";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

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
      url: "/images/logo-app.jpg",
      href: "/images/logo-app.jpg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/images/logo-app.jpg",
      href: "/images/logo-app.jpg",
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
            {children}
            <ToastContainer />
          </EdgeStoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
