import Link from "next/link";
import locale from "@/locale/root.json"
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NavBarItems = () => {
    const pathname = usePathname();

    return (
        <nav className="flex-1 flex justify-center items-center">
            <div className="flex items-center gap-12">
                {locale.NAVBAR.ITEMS.map((item, index) => {
                    const isActive = pathname === item.LINK;
                    return (
                        <Link
                            href={item.LINK}
                            key={index}
                            className="relative group py-2"
                        >
                            <span className={`text-base font-medium transition-colors duration-300 ${isActive
                                ? "text-primary"
                                : "text-text-primary/80 hover:text-primary"
                                }`}>
                                {item.TEXT}
                            </span>
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    scale: isActive ? 1 : 0.8
                                }}
                                transition={{ duration: 0.2 }}
                            />
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                        </Link>
                    );
                })}
            </div>
        </nav>
    )
}

export default NavBarItems
