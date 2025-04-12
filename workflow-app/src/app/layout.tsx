import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header  from "@/components/header/Index";
import Footer  from "@/components/Footer/Index";

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
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />

        {children}
        <Footer />
      </body>
    </html>
  );
}
