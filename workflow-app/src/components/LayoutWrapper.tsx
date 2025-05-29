"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideFooterRoutes = ["/login", "/register", "/empleos"];
  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <>
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
}
