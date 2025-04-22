'use client'

import locale from "@/locale/root.json"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NavBar from "./NavBar"

import { Button } from "@/components/ui/button" 

const Header = () => {

    const router = useRouter(); 
    
    const PushLogin = () => {
        router.push(locale.NAVBAR.LINK_LOGIN)
    }

    const PushRegister = () => {
        router.push(locale.NAVBAR.LINK_REGISTER)
    }    

    return (
        <header className="sticky top-0 z-50 opacity-95 backdrop-blur-md ">
            {/* Header */}
            <div className="bg-default shadow-md grid grid-cols-3 items-center h-16 px-10">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src={locale.NAVBAR.LOGO.SRC}
                            alt={locale.NAVBAR.LOGO.ALT}
                            width={64}
                            height={64}
                        />
                    </Link>
                    
                    <h1 className="text-text-primary font-bold text-md ml-2">{locale.NAVBAR.LOGO.TEXT}</h1>
                </div>

                {/* Navbar */}
                <NavBar />
                
                <div className="flex justify-end items-center space-x-4">
                    
                    <Button variant="bottomless" onClick={PushRegister}>
                        {locale.NAVBAR.REGISTER_BUTTON} 
                    </Button>
                    <Button variant="default" onClick={PushLogin}>
                        {locale.NAVBAR.LOGIN_BUTTON}
                    </Button>

                </div>
            </div>
        </header>   
    )
}

export default Header;
