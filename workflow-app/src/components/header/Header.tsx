'use client'

import locale from "@/locale/root.json"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"



const Header = () => {

    const router = useRouter();
    
    const PushLogin = () => {
    router.push(locale.NAVBAR.LINK_LOGIN)
    }

    const PushRegister = () => {
        router.push(locale.NAVBAR.LINK_REGISTER)
    }    

    return (
        <header>
            {/* Header */}
            <div className="bg-default shadow-md grid grid-cols-3 items-center h-16 backdrop-blur-2xl px-10">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src={locale.NAVBAR.LOGO.src}
                            alt={locale.NAVBAR.LOGO.alt}
                            width={64}
                            height={64}
                            
                        />
                    </Link>
                    <h1 className="text-text-primary font-bold text-md ml-2">{locale.NAVBAR.LOGO.Text}</h1>
                </div>

                {/* Navbar */}
                <nav className="flex justify-center items-center space-x-8">
                    {locale.NAVBAR.ITEMS.map((item, index) => (
                        <Link
                            href={item.LINK}
                            key={index}
                            className="text-text-primary hover:text-primary transition-colors duration-300"
                        >
                            {item.Text}
                        </Link>
                    ))}
                </nav>
                
                <div className="flex justify-end items-center space-x-4">
                    <button onClick={PushRegister} className="rounded-md w-24 h-7 border font-semibold text-tertiary text-[13px] cursor-pointer hover:bg-default-100 transition-colors duration-300">
                        Register
                    </button>
                    <button onClick={PushLogin} className="bg-button-primary rounded-md w-24 h-7 font-semibold text-[13px] text-default-100 cursor-pointer hover:opacity-90 transition-colors duration-300">
                        Login
                    </button>
                </div>
            </div>
        </header>   
    )
}

export default Header;
