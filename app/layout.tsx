"use client";
import { StrictMode } from "react";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const enableFooter = pathname !== "/listings";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <StrictMode>{children}</StrictMode>
        <Toaster />
        {enableFooter ? <Footer /> : null}
      </body>
      <script src="https://kit.fontawesome.com/44b694a7ec.js" async></script>
    </html>
  );
}
