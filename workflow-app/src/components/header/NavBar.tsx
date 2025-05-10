import Link from "next/link";
import locale from "@/locale/root.json"

const NavBarItems = () => {
    return (
        <nav className="flex justify-center items-center gap-8 w-full">
            {locale.NAVBAR.ITEMS.map((item, index) => (
                <Link
                    href={item.LINK}
                    key={index}
                    className="text-text-primary hover:text-primary font-medium transition-colors duration-300"
                >
                    {item.TEXT}
                </Link>
            ))}
        </nav>
    )
}

export default NavBarItems
