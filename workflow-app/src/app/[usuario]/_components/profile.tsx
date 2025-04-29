
import { Profile as ProfileTypes, User} from '@/types/user';
import Image from 'next/image';


interface ProfileProps {
    profile: ProfileTypes;
}
interface UserProps {
    user: User;
}
interface ProfileFullProps extends ProfileProps, UserProps { }

function Profile({profile,user }: ProfileFullProps) {

    const cv = profile.cv || null;
    const avatar = profile.avatar || null;
    const about_me = profile.about_me || null;

    const first_name = user.first_name || null;;
    const middle_name = user.middle_name || null;
    const first_surname = user.first_surname || null;
    const second_surname = user.second_surname || null;
    const email = user.email || null;
    const address = user.address || null;
 




    return (
        <div className="h-96 p-4">

            <div className="w-full h-full bg-default-50 rounded-t-lg shadow-lg flex flex-col items-center">

                <div className="w-full h-44 bg-variant-1 mt-2 rounded-t-lg flex relative">
                    <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-28 h-28 left-20 top-32 absolute">
                        <Image
                        src="https://www.headshotpro.com/_nuxt/img/2.1ae7c7e.png"
                        alt="Avatar"
                        width={128}
                        height={128}
                        className='w-full h-full object-cover'
                        />
                        </div>
                    </div>

                <div className="w-full p-4 mt-15 ml-15 ">
                    <h2 className="text-xl font-bold text-tertiary">{first_name} {first_surname}  </h2>
                    <p className=" text-light">{address} agregar a la db</p>
                </div>
            </div>
        </div>




    );
}


export default Profile;