"use client";

import locale from "@/locale/root.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "./NavBar";
import { Menu, User as UserIcon, LogOut } from "lucide-react";
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
    if (!user) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-gray-500" />
        </div>
      );
    }

    if (user.profile?.avatar_url) {
      return (
        <div className="w-10 h-10 relative rounded-full overflow-hidden">
          <Image
            src={user.profile.avatar_url}
            alt={`Avatar de ${user.first_name}`}
            width={48}
            height={48}
            className="object-cover"
            priority
          />
        </div>
      );
    }

    const initial = user.first_name.charAt(0).toUpperCase();
    const bgColor = avatarColors[initial] || "#6B7280";

    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg"
        style={{ backgroundColor: bgColor }}
      >
        {initial}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-18 px-6 md:px-10 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <Link href="/" aria-label="home page" className="flex items-center group">
            <div className="w-[52px] h-[52px] relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo2.png"
                alt={locale.NAVBAR.LOGO.ALT}
                fill
                sizes="72px"
                priority
                className="object-contain"
              />
            </div>
            <span className="text-text-primary font-semibold text-lg hidden sm:inline ml-2 transition-colors duration-300 group-hover:text-primary">
              {locale.NAVBAR.LOGO.TEXT}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavBar />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center justify-end min-w-[200px] gap-6">
          {authenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex cursor-pointer items-center justify-center w-12 h-12 rounded-full hover:bg-gray-50 transition-all duration-300 hover:shadow-md">
                  {renderAvatar()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuItem
                  className="cursor-pointer rounded-md flex items-center gap-2 py-3 px-4 text-sm font-medium hover:bg-gray-50"
                  onClick={() => handleNavigation(`/${user.username}`)}
                >
                  <UserIcon className="w-4 h-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer rounded-md flex items-center gap-2 py-3 px-4 text-sm font-medium text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="font-medium hover:bg-gray-50 transition-colors duration-300"
                onClick={() => handleNavigation(locale.NAVBAR.LINK_REGISTER)}
              >
                {locale.NAVBAR.REGISTER_BUTTON}
              </Button>
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white font-medium shadow-sm hover:shadow transition-all duration-300"
                onClick={() => handleNavigation(locale.NAVBAR.LINK_LOGIN)}
              >
                {locale.NAVBAR.LOGIN_BUTTON}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition-all duration-300"
            onClick={() => setIsMobile(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNav isOpen={isMobile} onClose={() => setIsMobile(false)} />}
    </header>
  );
};

export default Header;