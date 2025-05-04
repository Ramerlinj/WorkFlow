'use client';

import { Profile as ProfileTypes, User} from '@/types/user';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, FileText, SquarePen} from 'lucide-react';
import { TabsDemo } from './Tabs';
import SkillsCard from './SkillCard';
import { LinksCard } from './LinksCard';
import { Dialog, DialogTitle, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileProps {
    profile: ProfileTypes;
}

interface UserProps {
    user: User;
}
interface ProfileFullProps extends ProfileProps, UserProps { }

function Profile({profile,user }: ProfileFullProps) {

    {/*const cv = profile.cv || null*/}
    const avatar = profile.avatar || null;
    const about_me = profile.about_me || null;
    const skills = user.skills || null;
    const first_name = user.first_name || null;
    const first_surname = user.first_surname || null;
    const email = user.email || null;
    const links = user.links || null;
    const workexperience = user.work_experience || null;
    const configuration = user.user_config || null;
    {/*const address = user.address || null;*/}

    const [IsOpen, setIsOpen] = useState(false);
    const [IsOpenPerfil, setIsOpenPerfil] = useState(false);
    const handleClick = () => {
        if (profile.cv) {
            window.open(profile.cv, '_blank');
        }
        else {
            setIsOpen(true);
        }
    }
    return (
        <div className="@container mx-8">
            <div className="h-96 w-full box-border">
                <div className="w-full h-full bg-default-50 rounded-t-lg shadow-lg flex flex-col items-center">
                    <div className="w-full h-44 bg-variant-1 mt-2 rounded-t-lg flex relative">
                        <div className="rounded-full overflow-hidden border-6 border-white shadow-lg w-28 h-28 left-20 top-32 absolute">
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    width={128}
                                    height={128}
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                    <div className='flex w-full h-full object-cover text-center items-center justify-center bg-blue-700 text-4xl text-amber-50'>{ first_name ? first_name.charAt(0) : null }</div>
                                
                            )}
                        </div>
                    </div>

                    <div className="w-full p-4 mt-16">
                        <div className="flex items-center ml-5">
                            <h2 className="text-2xl font-bold text-default-400">
                                {first_name} {first_surname}
                            </h2>
                            <Badge
                                variant="default"
                                className="ml-3 align-middle leading-none translate-y-[2px]"
                            >
                                Senior Developer
                            </Badge>
                        </div>
                    <div className="flex justify-between items-center">

                        <div className="flex flex-row gap-0.5 ml-4">
                            <MapPin className='text-light w-5 h-auto' />
                            <p className="text-light text-size-medium mr-5">Agregar a la db direccion addres</p>
                            <Mail className='text-light w-5 h-auto'/>
                            <p className="text-light">{email}</p>
                        </div>

                        <div className="flex gap-2 mr-6">
                                <Dialog open={IsOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleClick}>
                                            <FileText /> Ver CV
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>CV no disponible</DialogTitle>
                                            <DialogDescription>
                                                El usuario no ha subido un CV a su perfil, por lo que no se puede mostrar.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogClose asChild>
                                            <Button>Cerrar</Button>
                                        </DialogClose>
                                    </DialogContent>
                                </Dialog>


                                <Dialog open={IsOpenPerfil} onOpenChange={setIsOpenPerfil}>
                                    <DialogTrigger asChild>
                                        <Button size="sm">
                                            <SquarePen /> Editar Perfil
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-3xl max-h-[500px] overflow-y-auto p-4">
                                        <DialogHeader>
                                            <DialogTitle>Editar perfil</DialogTitle>
                                            <DialogDescription>
                                                Edita el perfil a tu gusto.
                                            </DialogDescription>
                                        </DialogHeader>

                                        
                                        <div className="w-full bg-amber-400 h-32 rounded-t-2xl"></div>

                                        
                                        <div className="mt-4 text-center">
                                            <h4 className="text-heading font-semibold">Cambiar foto de perfil</h4>
                                            <Avatar className="w-28 h-28 mt-2 mx-auto">
                                                <AvatarImage src={avatar || 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg'} alt="Avatar" className="w-full h-full object-cover" />
                                                <AvatarFallback>{first_name ? first_name.charAt(0) : null}</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        
                                        <h4 className="text-heading font-semibold mt-6">Seleccione el color deseado</h4>
                                        <div className="flex space-x-2 mt-2">
                                            <button className="bg-amber-200 w-14 h-14 rounded-lg cursor-pointer hover:opacity-90">A</button>
                                            <button className="bg-blue-200 w-14 h-14 rounded-lg cursor-pointer hover:opacity-90">B</button>
                                            <button className="bg-red-200 w-14 h-14 rounded-lg cursor-pointer hover:opacity-90">C</button>
                                            <button className="bg-gray-200 w-14 h-14 rounded-lg cursor-pointer hover:opacity-90">D</button>
                                        </div>

                                        {/* Botones adicionales */}
                                        <div className="flex flex-col gap-2 mt-4">
                                            <Button className="w-full">Guardar cambios</Button>
                                            <Button className="w-full">Cancelar</Button>
                                        </div>

                                        
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cerrar</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <div className="flex flex-row justify-between items-start gap-4 mt-10">
                <div className="flex flex-col gap-4 w-1/3">
                    <Card className="">
                        <CardTitle className="text-heading text-md ml-5">Sobre Mí</CardTitle>
                        <CardContent className="text-secondary text-sm">
                            {about_me}
                        </CardContent>
                    </Card>

                    <SkillsCard skills={skills} />
                    <LinksCard links={links} />
                </div>

                <TabsDemo workexperience={workexperience} UserConfig={configuration} />
                
                
            </div>

        
    </div>





    );
}


export default Profile;