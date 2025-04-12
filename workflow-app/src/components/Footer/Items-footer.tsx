import locale from "@/locale/root.json" 
import Link from "next/link";
import Image from "next/image";
import { Github, Instagram } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

const itemsFooter = () => {
    return (
        <div className="flex item-center justify-between items-start m-10 ">
            <div className="w-1/4 mt-14 flex flex-col items-start">
                <Link href="/" className="flex items-center">
                    <Image 
                    src={locale.NAVBAR.LOGO_BLANK.SRC} 
                    alt={locale.NAVBAR.LOGO_BLANK.ALT}
                    width={82}
                    height={82}
                    />
                    <h3 className="font-bold text-default-100">WorkFlow</h3>
                </Link>
                <p className="text-muted text-sm px-4 max-w-60 font-semibold">Los mejores trabajos del mundo WorkFlow</p>
                <div className="mt-4 ml-3 flex items-center">
                    <Link href="https://www.facebook.com" className="mr-3">
                        <FaFacebook className="w-6 h-6"/>
                    </Link>
                    <Link href="https://www.instagram.com" className="mr-3">
                        <Instagram width={24} height={24}/>
                    </Link>
                    <Link href="https://www.github.com" className="mr-3">
                        <Github width={24} height={24} />
                    </Link>
                    <Link href="https://www.linkedin.com" className="mr-3">
                        <FaLinkedin className="w-6 h-6" />
                    </Link>
                    <Link href="https://www.x.com" className="mr-3">
                        <FaXTwitter className="w-6 h-6"/>
                    </Link>
                    
                    

                

                </div>
        </div>

        <div className="grid grid-cols-3 gap-20 w-3/4 py-10 pt-20">
            {locale.FOOTER.map((item, index) => (
                <div key={index} className="w-full">
                    <h3 className="text-lg font-bold text-default-100 mb-2">{item.TITLE}</h3>
                    <ul className="space-y-1">
                        {item.ITEMS.map((listItem, listIndex) => (
                            <li key={listIndex} className="">
                                <Link 
                                className="text-muted hover:text-primary hover:underline hover:decoration-primary transition-all duration-300"
                                    href={`${listItem.LINK}`}>{listItem.TEXT}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
    )
}

export default itemsFooter