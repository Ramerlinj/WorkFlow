
import { Profile as ProfileTypes, User} from '@/types/user';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail } from 'lucide-react';
import { TabsDemo } from './Tabs';
import SkillsCard from './SkillCard';
import { LinksCard } from './LinksCard';



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
    {/*const address = user.address || null;*/}

    

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
                                <div className='flex w-full h-full object-cover text-center items-center justify-center bg-blue-700 text-4xl text-amber-50'>R</div>
                                
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
                            <Button variant={'outline'} size={'sm'}>Ver Cv</Button>
                            <Button size={'sm'}>Editar Perfil</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <div className="flex flex-row justify-between items-start gap-4 mt-10">
                {/* — Grupo de cartas (columna) — */}
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

                {/* — TabsDemo sube arriba y se queda a la derecha — */}
                <TabsDemo workexperience={workexperience} />
            </div>

        
    </div>





    );
}


export default Profile;