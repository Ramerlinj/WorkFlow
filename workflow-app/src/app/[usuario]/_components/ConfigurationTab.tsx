import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ConfigurationTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-heading font-semibold">
                    Cuenta
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Administra la configuración de tu cuenta
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Usuario</Label>
                        <Input placeholder="Usuario" className="w-full mb-4 mt-2" />
                        <Label>Nombre</Label>
                        <Input placeholder="Nombre" className="w-full mb-4 mt-2" />
                    </div>
                    <div>
                        <Label>Correo Electrónico</Label>
                        <Input placeholder="Correo Electrónico" className="w-full mb-4 mt-2" />
                        <Label className="mt-2">Apellidos</Label>
                        <Input placeholder="Apellidos" className="w-full mb-4 mt-2" />
                    </div>
                    </div>
                    <Button variant="default" size={'sm'}>
                        Guardar Cambios
                    </Button>

                </form>
                <hr className="w-10 h-1" />
            </CardContent>
            <CardFooter className="">
                
            </CardFooter>
        </Card>
    );
}

export default ConfigurationTab;
