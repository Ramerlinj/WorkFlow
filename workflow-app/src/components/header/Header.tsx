import locale from "@/locale/root.json"
import Image from "next/image"
import { Navbar } from "./NavBar"

const Header = () => {
    return (
        <header>
            {/* Header */}
            <div className="bg-default shadow-md grid grid-cols-3 items-center h-16 backdrop-blur-2xl px-10">
                <div className="flex items-center">
                    <Image
                        src={locale.NAVBAR.LOGO.src}
                        alt={locale.NAVBAR.LOGO.alt}
                        width={64}
                        height={64}
                        
                    />
                </div>

                {/* Navbar */}
                <Navbar />
                
                <div className="flex justify-end items-center space-x-4">
                    <button className="rounded-sm w-24 h-7 border font-semibold text-tertiary text-[10px] cursor-pointer hover:bg-default-100 transition-colors duration-300">
                        Register
                    </button>
                    <button className="bg-button-primary rounded-sm w-24 h-7 font-semibold text-default-100 cursor-pointer hover:opacity-90 transition-colors duration-300">
                        Login
                    </button>
                </div>
            </div>
        </header>   
    )
}

export default Header;
