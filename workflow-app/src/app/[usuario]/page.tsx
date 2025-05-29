
import { getUser } from "@/lib/getUser"
import Profile from "./_components/profile"
import NotFound from "@/app/not-found"

const UserPage = async ({ params }: { params: { usuario: string } }) => {
  const user = await getUser(params.usuario)

  if (!user) {
    return <NotFound />
  }

  return (
    <div>
      <Profile profile={user.profile || null} user={user}/>
    </div>
  )
}

export default UserPage
