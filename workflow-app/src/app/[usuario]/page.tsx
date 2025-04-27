
import { getUser } from '@/lib/getUser';

const UserPage = async ({ params }: { params: { usuario: string } }) => {
  const user = await getUser(params.usuario);

  if (!user) {
    return <p>Usuario no encontrado</p>;
  }

  
  //const userProfile = user.profile || {};

  
  //const userConfig = user.user_config || {};

  
  //const skills = user.skills || [];
  //const links = user.links || [];
  //const workExperience = user.work_experience || [];

  return (
    <div>
    </div>
  );
};

export default UserPage;
