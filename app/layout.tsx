"use client";
import { StrictMode } from "react";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log("Pathname: ", pathname);
  const enableFooter = pathname === "/listings";
  console.log("DisableFooter: ", enableFooter);

  return (
    <html lang="en">
      <body className={` ${inter.className} min-h-screen`}>
        <Navbar />
        <StrictMode>{children}</StrictMode>
        {!enableFooter ? <Footer /> : null}
      </body>
      <script src="https://kit.fontawesome.com/44b694a7ec.js" async></script>
    </html>
  );
}
