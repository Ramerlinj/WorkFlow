'use client'

import locale from "@/locale/root.json"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NavBar from "./NavBar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNav from "./MobileNav"
import { useState } from "react"

const Header = () => {
    const router = useRouter()
    const handleNavigation = (path: string) => router.push(path)

    const [isMobile, setIsMobile] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-default/90 backdrop-blur-md shadow-md">
            <div className="grid grid-cols-[auto_1fr_auto] items-center h-18 px-6 md:px-10 gap-4">

                <div className="flex items-center gap-2">
                    <Link href="/" aria-label="Ir al inicio">
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

                <div className="hidden md:flex">
                <NavBar />
                    <div className="flex justify-end items-center gap-2">
                        <Button variant="bottomless" onClick={() => handleNavigation(locale.NAVBAR.LINK_REGISTER)}>
                            {locale.NAVBAR.REGISTER_BUTTON}
                        </Button>
                        <Button variant="default" onClick={() => handleNavigation(locale.NAVBAR.LINK_LOGIN)}>
                            {locale.NAVBAR.LOGIN_BUTTON}
                        </Button>
                    </div>
                </div>
                <div className="flex justify-end md:hidden">
                    <Menu className="text-default-30 w-8 h-8" onClick={() => setIsMobile(true)} cursor={'pointer'}/>

                </div>
            </div>
            {isMobile && (
                <MobileNav
                    isOpen={isMobile}
                    onClose={() => setIsMobile(false)}
                />
            )}
        </header>
    )
}

export default Header
