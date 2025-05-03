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
import { UserConfig } from "@/types/user";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Lock, Trash2} from "lucide-react";

interface ConfigurationTabsProps {
    UserConfig: UserConfig; 
}

function ConfigurationTab({UserConfig}: ConfigurationTabsProps) {
    
    const profilePublic = Boolean(UserConfig.public_profile) || undefined;
    const notification = Boolean(UserConfig.notification_by_mail) || undefined;
    const languaje = UserConfig.language || 'Español';
    
    
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
                    <Button variant="default" size={'sm'} >
                        Guardar Cambios
                    </Button>

                </form>
                <hr className="text-muted h-1 mt-8" />
                <h2 className="text-md text-heading font-semibold mt-8">
                    Privacidad y Seguridad
                </h2>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                    Administra la configuración de privacidad y seguridad de tu cuenta
                </CardDescription>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                    <h3 className="text-sm text-heading font-semibold">Perfil publico</h3>
                    <p className="text-sm text-muted-foreground">Permite que lo reclutadores vean tu perfil</p>
                    </div>
                        <Switch defaultChecked={profilePublic}/>
                </div>

                <hr className="text-muted h-1 mt-8" />

                <h2 className="text-md text-heading font-semibold mt-8">
                    Notificación
                </h2>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                    Administra la configuración de privacidad y seguridad de tu cuenta
                </CardDescription>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-sm text-heading font-semibold">Recibir notoficaciones por correo</h3>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones sobre nuevas ofertas de trabajo</p>
                    </div>
                    <Switch defaultChecked={notification} />
                </div>

                <hr className="text-muted h-1 mt-8" />
                
                <h2 className="text-md text-heading font-semibold mt-8">
                    Preferencias
                </h2>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                    Configura el perfil a tu gusto                
                </CardDescription>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-sm text-heading font-semibold">Tema</h3>
                        <p className="text-sm text-muted-foreground">Seleccione el tema de su preferencia</p>
                    </div>
                    <Select defaultValue='claro'>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="claro">Claro</SelectItem>
                            <SelectItem disabled value="oscuro">Oscuro</SelectItem>
                            <SelectItem disabled value="sistema">Sistema</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-sm text-heading font-semibold">Idioma</h3>
                        <p className="text-sm text-muted-foreground">Selecciona el idioma de la plataforma</p>
                    </div>
                    <Select defaultValue={languaje}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Idioma" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Español">Español</SelectItem>
                            <SelectItem disabled value="English">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                    <div className="flex flex-col">
                        <h3 className="text-sm text-heading font-semibold">Preferencia de Cuenta</h3>
                    <div className="mt-4 space-x-5">
                        <Button variant='outline' size='lg'> <Lock /> Cambiar contraseña</Button>
                        
                        <Button variant='destructive' size='lg'><Trash2 /> Eliminar cuenta</Button>
                        </div>
                     </div>
            </CardFooter>
        </Card>
    );
}

export default ConfigurationTab;
