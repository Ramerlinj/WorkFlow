import { getUser } from "@/lib/getUser"
import Profile from "./_components/profile"

const UserPage = async ({ params }: { params: { usuario: string } }) => {
  const user = await getUser(params.usuario)

  if (!user) {
    return <p>Usuario no encontrado</p>
  }

  return (
    <div>
      <Profile profile={user.profile || null} user={user}/>
    </div>
  )
}

export default UserPage
