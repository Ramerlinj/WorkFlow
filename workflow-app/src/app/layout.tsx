import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header  from "@/components/header/Header";
import Footer  from "@/components/Footer/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflow",
  description: "Workflow employee management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
