"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings, User, Shield, Bell, Palette, Link2, BookText, Briefcase, FileCheck, Building } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { User as UserType, UserConfig, SkillResponse, Link as UserLink, WorkExperience } from "@/types/interfaces"

// Importación de los componentes de pestañas
import { ProfileTab } from "./tabs/profile-tab"
import { AccountTab } from "./tabs/account-tab"
import { NotificationsTab } from "./tabs/notifications-tab"
import { AppearanceTab } from "./tabs/appearance-tab"
import { SkillsTab } from "./tabs/skills-tab"
import { LinksTab } from "./tabs/links-tab"
import { ExperienceTab } from "./tabs/experience-tab"
import { ApplicationsTab } from "./tabs/applications-tab"
import { PasswordDialog } from "./dialogs/password-dialog"
import { DeleteAccountDialog } from "./dialogs/delete-account-dialog"
import { PublishedJobsTab } from "./tabs/published-jobs-tab"

interface ConfigurationPanelProps {
  user: UserType
  avatar: string | null
  firstName: string | null
  secondName: string | null
  firstSurname: string | null
  secondSurname: string | null
  username: string | null
  aboutMe: string | null
  email: string | null
  bannerColor: string
  userConfig?: UserConfig
  onAvatarChange: (newAvatar: string) => void
  onBannerColorChange: (newColor: string) => void
  onAboutMeChange: (newAboutMe: string) => void
  onNameChange: (newName: string) => void
  onSurnameChange?: (newSurname: string) => void
  onSecondNameChange?: (newSecondName: string) => void
  onSecondSurnameChange?: (newSecondSurname: string) => void
  onEmailChange?: (newEmail: string) => void
  onSkillsChange?: (skills: SkillResponse[]) => void
  onLinksChange?: (links: UserLink[]) => void
  onExperiencesChange?: (experiences: WorkExperience[]) => void
}

export function ConfigurationPanel({
  user,
  avatar,
  firstName,
  secondName,
  firstSurname,
  secondSurname,
  username,
  aboutMe,
  email,
  bannerColor,
  userConfig,
  onAvatarChange,
  onBannerColorChange,
  onAboutMeChange,
  onNameChange,
  onSurnameChange,
  onSecondNameChange,
  onSecondSurnameChange,
  onEmailChange,
  onSkillsChange,
  onLinksChange,
}: ConfigurationPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)

  // Estados para los formularios
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(avatar)
  const [previewName, setPreviewName] = useState<string | null>(firstName)
  const [previewSecondName, setPreviewSecondName] = useState<string | null>(secondName)
  const [previewSurname, setPreviewSurname] = useState<string | null>(firstSurname)
  const [previewSecondSurname, setPreviewSecondSurname] = useState<string | null>(secondSurname)
  const [previewUsername, setPreviewUsername] = useState<string | null>(username)
  const [previewEmail, setPreviewEmail] = useState<string | null>(email)
  const [previewAboutMe, setPreviewAboutMe] = useState<string | null>(aboutMe)
  const [previewBannerColor, setPreviewBannerColor] = useState<string>(bannerColor)

  // Estados para la configuración
  const [isPublicProfile, setIsPublicProfile] = useState<boolean>(Boolean(userConfig?.public_profile))
  const [notificationByMail, setNotificationByMail] = useState<boolean>(Boolean(userConfig?.job_alert))
  const [language, setLanguage] = useState<string>(userConfig?.language || "Español")
  const [theme, setTheme] = useState<string>("claro")

  // Actualizar los estados cuando cambian las props
  useEffect(() => {
    setPreviewAvatar(avatar)
    setPreviewName(firstName)
    setPreviewSecondName(secondName)
    setPreviewSurname(firstSurname)
    setPreviewSecondSurname(secondSurname)
    setPreviewUsername(username)
    setPreviewEmail(email)
    setPreviewAboutMe(aboutMe)
    setPreviewBannerColor(bannerColor)
    setIsPublicProfile(Boolean(userConfig?.public_profile))
    setNotificationByMail(Boolean(userConfig?.job_alert))
    setLanguage(userConfig?.language || "Español")
  }, [avatar, firstName, secondName, firstSurname, secondSurname, username, email, aboutMe, bannerColor, userConfig])

  const handleSaveProfile = async () => {
    if (previewName) onNameChange(previewName)
    if (onSecondNameChange && previewSecondName !== undefined) onSecondNameChange(previewSecondName || '')
    if (onSurnameChange && previewSurname) onSurnameChange(previewSurname)
    if (onSecondSurnameChange && previewSecondSurname !== undefined) onSecondSurnameChange(previewSecondSurname || '')
    if (onEmailChange && previewEmail) onEmailChange(previewEmail)
    if (previewAboutMe !== null) onAboutMeChange(previewAboutMe || '')
    if (previewAvatar) onAvatarChange(previewAvatar)
    onBannerColorChange(previewBannerColor)
    setIsOpen(false)
  }

  const handleSaveConfig = () => {
    // Aquí iría la lógica para guardar la configuración del usuario que seria enviar a la api
    setIsOpen(false)
    console.log("Guardando configuración:", {
      isPublicProfile,
      notificationByMail,
      language,
      theme,
    })
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Settings className="mr-2 h-4 w-4" /> Configuración
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="flex h-full">
            <div className="w-64 border-r p-4 bg-muted/30">
              <DialogTitle className="text-lg font-semibold">Configuración</DialogTitle>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Button>
                <Button
                  variant={activeTab === "experience" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("experience")}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Experiencia
                </Button>
                <Button
                  variant={activeTab === "applications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("applications")}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Aplicaciones
                </Button>
                <Button
                  variant={activeTab === "skills" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("skills")}
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Habilidades
                </Button>
                <Button
                  variant={activeTab === "links" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("links")}
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Enlaces
                </Button>
                <Button
                  variant={activeTab === "account" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Cuenta
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </Button>
                <Button
                  variant={activeTab === "appearance" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Apariencia
                </Button>
                <Button
                  variant={activeTab === "published-jobs" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("published-jobs")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Empleos Publicados
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6">
              {activeTab === "profile" && (
                <ProfileTab
                  previewAvatar={previewAvatar}
                  setPreviewAvatar={setPreviewAvatar}
                  previewName={previewName}
                  setPreviewName={setPreviewName}
                  previewSecondName={previewSecondName}
                  setPreviewSecondName={setPreviewSecondName}
                  previewSurname={previewSurname}
                  setPreviewSurname={setPreviewSurname}
                  previewSecondSurname={previewSecondSurname}
                  setPreviewSecondSurname={setPreviewSecondSurname}
                  previewUsername={previewUsername}
                  previewEmail={previewEmail}
                  setPreviewEmail={setPreviewEmail}
                  previewAboutMe={previewAboutMe}
                  setPreviewAboutMe={setPreviewAboutMe}
                  previewBannerColor={previewBannerColor}
                  setPreviewBannerColor={setPreviewBannerColor}
                  onSave={handleSaveProfile}
                />
              )}
              {activeTab === "applications" && (
                <ApplicationsTab userId={user.id_user} />
              )}
              {activeTab === "skills" && (
                <SkillsTab
                  userId={user.id_user}
                  skills={user.skills || []}
                  onSave={(updatedSkills) => {
                    if (onSkillsChange) {
                      onSkillsChange(updatedSkills)
                    }
                    setIsOpen(false)
                  }}
                />
              )}
              {activeTab === "links" && (
                <LinksTab
                  idUser={user.id_user}
                  links={user.links || []}
                  onSave={async (updatedLinks) => {
                    if (onLinksChange) {
                      await onLinksChange(updatedLinks)
                    }
                    setIsOpen(false)
                  }}
                />
              )}
              {activeTab === "account" && (
                <AccountTab
                  onChangePassword={() => setPasswordDialogOpen(true)}
                  onDeleteAccount={() => setDeleteAccountDialogOpen(true)}
                />
              )}
              {activeTab === "notifications" && (
                <NotificationsTab
                  notificationByMail={notificationByMail}
                  setNotificationByMail={setNotificationByMail}
                  onSave={handleSaveConfig}
                />
              )}
              {activeTab === "appearance" && (
                <AppearanceTab
                  language={language}
                  setLanguage={setLanguage}
                  theme={theme}
                  setTheme={setTheme}
                  onSave={handleSaveConfig}
                />
              )}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Experiencia Laboral</h3>
                  <ExperienceTab userId={user.id_user} />
                </div>
              )}
              {activeTab === "published-jobs" && (
                <PublishedJobsTab userId={user.id_user} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
      <DeleteAccountDialog
        open={deleteAccountDialogOpen}
        onOpenChange={setDeleteAccountDialogOpen}
        username={username || ""}
      />
    </>
  )
}
