"use client";

import locale from "@/locale/root.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "./NavBar";
import { Menu, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";
import { AuthService } from "@/lib/authServices";
import { User } from "@/types/interfaces";
import avatarColors from "@/lib/colors/avatar-colors";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setAuthenticated(true);
      AuthService.getProfile()
        .then((profile) => setUser(profile))
        .catch(() => {
          AuthService.logout();
          setAuthenticated(false);
        });
    }
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    AuthService.logout();
    setAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  const renderAvatar = () => {
    if (user) {
      const avatarUrl = (user as User).profile?.avatar_url;
      if (avatarUrl) {
        return (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full border border-gray-200"
          />
        );
      }
      const initial = user.first_name.charAt(0).toUpperCase();
      const bgColor = avatarColors[initial] || "#6B7280";
      return (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: bgColor }}
        >
          {initial}
        </div>
      );
    }
    return <UserIcon className="w-8 h-8 text-default-30" />;
  };

  return (
    <header className="sticky top-0 z-50 bg-default/90 backdrop-blur-md shadow-md">
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-18 px-6 md:px-10 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="home page">
            <Image
              src={locale.NAVBAR.LOGO.SRC}
              alt={locale.NAVBAR.LOGO.ALT}
              width={64}
              height={64}
              priority
            />
          </Link>
          <span className="text-text-primary font-semibold text-lg">
            {locale.NAVBAR.LOGO.TEXT}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          <NavBar />

          {authenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100 cursor-pointer">
                  {renderAvatar()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation(`/${user.username}`)}>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="bottomless" onClick={() => handleNavigation(locale.NAVBAR.LINK_REGISTER)}>
                {locale.NAVBAR.REGISTER_BUTTON}
              </Button>
              <Button variant="default" onClick={() => handleNavigation(locale.NAVBAR.LINK_LOGIN)}>
                {locale.NAVBAR.LOGIN_BUTTON}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex justify-end md:hidden">
          <Menu
            className="text-default-30 w-8 h-8"
            onClick={() => setIsMobile(true)}
            cursor="pointer"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNav isOpen={isMobile} onClose={() => setIsMobile(false)} />}
    </header>
  );
};

export default Header;