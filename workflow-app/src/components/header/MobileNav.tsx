import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

type MobileNavProps = {
    isOpen: boolean
    onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetTrigger className="p-2">
                <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
                <nav className="flex flex-col space-y-4">
                    <Link href="#" className="text-lg font-medium">Inicio</Link>
                    <Link href="#" className="text-lg font-medium">Perfil</Link>
                    <Link href="#" className="text-lg font-medium">Configuración</Link>
                    <Link href="#" className="text-lg font-medium">Iniciar Sesión</Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
