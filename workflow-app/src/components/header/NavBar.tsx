import Link from "next/link";
import locale from "@/locale/root.json"

export const NavBar = () => {
    return(
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
    )
}

