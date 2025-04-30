
import { Profile as ProfileTypes, User} from '@/types/user';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    {/*const address = user.address || null;*/}
 




    return (
        <div className="@container mx-8">
            <div className="h-96 w-full box-border">
                <div className="w-full h-full bg-default-50 rounded-t-lg shadow-lg flex flex-col items-center">
                    <div className="w-full h-44 bg-variant-1 mt-2 rounded-t-lg flex relative">
                        <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-28 h-28 left-20 top-32 absolute">
                            <Image
                            src={avatar ? avatar : 'https://www.headshotpro.com/_nuxt/img/2.1ae7c7e.png'}
                            alt="Avatar"
                            width={128}
                            height={128}
                            className='w-full h-full object-cover'
                            />
                        </div>
                    </div>

                <div className="w-full p-4 mt-16 ">
                    <h2 className="text-xl font-bold text-tertiary">{first_name} {first_surname}</h2>
                    <div className="flex justify-between items-center">

                        <div className="flex flex-row gap-6 ">
                            <p className="text-light">agregar a la db direccion addres</p>
                            <p className="text-light">{email}</p>
                        </div>

                        <div className="flex gap-2 mr-16">
                            <Button variant={'outline'} size={'sm'}>Ver Cv</Button>
                            <Button size={'sm'}>Editar Perfil</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <Card className='w-1/3 mt-10'>
                <CardTitle className='text-heading text-md ml-5'>Sobre Mí</CardTitle>
                <CardContent className="text-secondary text-sm">
                    {about_me}
                </CardContent>
            </Card>

            <Card className='w-1/3 mt-10'>
                <CardTitle className='text-heading text-md ml-5'>Habilidades</CardTitle>
                <CardContent className="text-secondary text-sm">

                        {skills.length === 0 ? (
                            <p>No tiene habilidades registradas.</p>
                        ) : (
                            skills.map((skill) => (
                                <Badge key={skill.id_skill} className="mr-2 mb-2">
                                    {skill.nombre}
                                </Badge>
                            ))
                        )}
                </CardContent>
            </Card>
            <Card className='w-1/3 mt-10'>
                <CardTitle className='text-heading text-md ml-5'>Enlaces</CardTitle>
                <CardContent className="text-secondary text-sm">
                    <ul>
                        {links.length === 0 ? (
                            <p>No tiene enlaces registrados.</p>
                        ) : (
                            links.map((link) => (
                                <li key={link.id_links}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.name}
                                    </a>
                                </li>
                            ))
                        )}
                    </ul>
                </CardContent>
            </Card>
        
    </div>





    );
}


export default Profile;