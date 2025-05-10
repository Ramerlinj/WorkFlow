// components/MobileNav.tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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
                    <a href="#" className="text-lg font-medium">Inicio</a>
                    <a href="#" className="text-lg font-medium">Perfil</a>
                    <a href="#" className="text-lg font-medium">Configuración</a>
                    <a href="#" className="text-lg font-medium">Cerrar sesión</a>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
