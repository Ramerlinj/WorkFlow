"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Mail, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Profile as ProfileTypes, User, Link } from "@/types/interfaces"
import {  saveUserLinks } from "@/lib/userServices"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileTab } from "./WorkExperience"
import { LinksCard } from "./linksCard"
import avatarColors from "@/lib/colors/avatar-colors"
import { ConfigurationPanel } from "./configuration/configuration-panel"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import SkillsCard from "./SkillCard"

interface ProfileProps {
  profile: ProfileTypes | null
}

interface UserProps {
  user: User
}

interface ProfileFullProps extends ProfileProps, UserProps {}

function Profile({ profile, user }: ProfileFullProps) {
  const router = useRouter()
  const username = user.username || null
  const about_me = profile?.about_me || null
  const skills = user.skills || null
  const first_name = user.first_name || null
  const middle_name = user.middle_name || null
  const first_surname = user.first_surname || null
  const second_surname = user.second_surname || null
  const email = user.email || null
  const links = user.links || null
  const workexperience = user.work_experience || null
  const configuration = user.user_config || undefined
  const profession = user.profession?.name || null
  const direction = user.direction || null

  const [isOpenCvDialog, setIsOpenCvDialog] = useState(false)
  const [avatar, setAvatar] = useState(profile?.avatar_url || null)
  const [bannerColor, setBannerColor] = useState<string>("#FF5733")
  const [aboutMe, setAboutMe] = useState(about_me)
  const [firstName, setFirstName] = useState(first_name)
  const [secondName, setSecondName] = useState(middle_name)
  const [firstSurname, setFirstSurname] = useState(first_surname)
  const [secondSurname, setSecondSurname] = useState(second_surname)

  const initial = firstName ? firstName.charAt(0).toUpperCase() : ""
  const backgroundColor = avatarColors[initial] || "#9999"

  const handleClick = () => {
    if (profile?.cv_url) {
      window.open(profile?.cv_url, "_blank")
    } else {
      setIsOpenCvDialog(true)
    }
  }

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar)
  }

  const handleBannerColorChange = (newColor: string) => {
    setBannerColor(newColor)
  }

  const handleAboutMeChange = (newAboutMe: string) => {
    setAboutMe(newAboutMe)
  }

  const handleNameChange = (newName: string) => {
    setFirstName(newName)
  }

  const handleSecondNameChange = (newSecondName: string) => {
    setSecondName(newSecondName)
  }

  const handleSurnameChange = (newSurname: string) => {
    setFirstSurname(newSurname)
  }

  const handleSecondSurnameChange = (newSecondSurname: string) => {
    setSecondSurname(newSecondSurname)
  }



  const handleLinksChange = async (newLinks: Link[]) => {
    if (!user.id_user) return
    
    console.log('Actualizando enlaces:', newLinks)
    try {
      await saveUserLinks(user.id_user, newLinks, [])
      
      // Actualizar la UI o mostrar mensaje de éxito
      console.log('Enlaces actualizados correctamente')
      // Refrescar la página para mostrar los cambios
      router.refresh()
    } catch (error) {
      // Mostrar mensaje de error
      console.error('Error al actualizar los enlaces:', error)
    }
  }

  return (
    <div className="@container mx-8">
      <div className="h-96 w-full box-border">
        <div className="w-full h-full bg-default-50 rounded-t-lg shadow-lg flex flex-col items-center">
          <div className="w-full h-44 rounded-t-lg flex relative" style={{ backgroundColor: bannerColor }}>
            <div className="rounded-full overflow-hidden border-6 border-white shadow-lg w-28 h-28 left-20 top-32 absolute">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  style={{ backgroundColor }}
                  className="flex w-full h-full object-cover text-center items-center justify-center text-4xl text-amber-50"
                >
                  {initial}
                </div>
              )}
            </div>
          </div>

          <div className="w-full p-4 mt-16">
            <div className="flex items-center ml-5">
              <h2 className="text-2xl font-bold text-default-400">
                {firstName} {secondName} {firstSurname} {secondSurname}
              </h2>
              <Badge variant="default" className="ml-3 p-[4.3px] align-middle leading-none translate-y-[2px]">
                {profession}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-row gap-0.5 ml-4">
                <MapPin className="text-light w-5 h-auto" />
                <p className="text-light text-size-medium mr-5">{direction}</p>
                <Mail className="text-light w-5 h-auto" />
                <p className="text-light">{email}</p>
              </div>

              <div className="flex gap-2 mr-6">
                <Dialog open={isOpenCvDialog} onOpenChange={setIsOpenCvDialog}>
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

                <ConfigurationPanel
                  user={user}
                  avatar={avatar}
                  firstName={firstName}
                  secondName={secondName}
                  firstSurname={firstSurname}
                  secondSurname={secondSurname}
                  username={username}
                  aboutMe={aboutMe}
                  email={email}
                  bannerColor={bannerColor}
                  userConfig={configuration}
                  onAvatarChange={handleAvatarChange}
                  onBannerColorChange={handleBannerColorChange}
                  onAboutMeChange={handleAboutMeChange}
                  onNameChange={handleNameChange}
                  onSecondNameChange={handleSecondNameChange}
                  onSurnameChange={handleSurnameChange}
                  onSecondSurnameChange={handleSecondSurnameChange}
                  onLinksChange={handleLinksChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-start gap-4 mt-10">
        <div className="flex flex-col gap-4 w-1/3">
          <Card>
            <CardTitle className="text-heading text-md ml-5">Sobre Mí</CardTitle>
            <CardContent className="text-secondary text-sm">{aboutMe}</CardContent>
          </Card>

          <SkillsCard skills={skills} />
          <LinksCard links={links} />
        </div>

        <div className="flex-1">
          <ProfileTab workexperience={workexperience || []} />
        </div>
      </div>
    </div>
  )
}

export default Profile
