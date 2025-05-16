"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings, User, Shield, Bell, Palette } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { User as UserType, UserConfig } from "@/types/user"

// Importación de los componentes de pestañas
import { ProfileTab } from "./tabs/profile-tab"
import { AccountTab } from "./tabs/account-tab"
import { NotificationsTab } from "./tabs/notifications-tab"
import { AppearanceTab } from "./tabs/appearance-tab"
import { PasswordDialog } from "./dialogs/password-dialog"
import { DeleteAccountDialog } from "./dialogs/delete-account-dialog"

interface ConfigurationPanelProps {
  user: UserType
  avatar: string | null
  firstName: string | null
  lastName: string | null
  firstSurname: string | null
  secondSurname: string | null
  username: string | null
  aboutMe: string | null
  email: string | null
  bannerColor: string
  userConfig: UserConfig
  onAvatarChange: (newAvatar: string) => void
  onBannerColorChange: (newColor: string) => void
  onAboutMeChange: (newAboutMe: string) => void
  onNameChange: (newName: string) => void
  onSurnameChange?: (newSurname: string) => void
  onEmailChange?: (newEmail: string) => void
}

export function ConfigurationPanel({
  avatar,
  firstName,
  firstSurname,
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
  onEmailChange,
}: ConfigurationPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)

  // Estados para los formularios
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(avatar)
  const [previewName, setPreviewName] = useState<string | null>(firstName)
  const [previewSurname, setPreviewSurname] = useState<string | null>(firstSurname)
  const [previewUsername, setPreviewUsername] = useState<string | null>(username)
  const [previewEmail, setPreviewEmail] = useState<string | null>(email)
  const [previewAboutMe, setPreviewAboutMe] = useState<string | null>(aboutMe)
  const [previewBannerColor, setPreviewBannerColor] = useState<string>(bannerColor)

  // Estados para la configuración
  const [isPublicProfile, setIsPublicProfile] = useState<boolean>(Boolean(userConfig?.public_profile))
  const [notificationByMail, setNotificationByMail] = useState<boolean>(Boolean(userConfig?.notification_by_mail))
  const [language, setLanguage] = useState<string>(userConfig?.language || "Español")
  const [theme, setTheme] = useState<string>("claro")

  // Actualizar los estados cuando cambian las props
  useEffect(() => {
    setPreviewAvatar(avatar)
    setPreviewName(firstName)
    setPreviewSurname(firstSurname)
    setPreviewUsername(username)
    setPreviewEmail(email)
    setPreviewAboutMe(aboutMe)
    setPreviewBannerColor(bannerColor)
    setIsPublicProfile(Boolean(userConfig?.public_profile))
    setNotificationByMail(Boolean(userConfig?.notification_by_mail))
    setLanguage(userConfig?.language || "Español")
  }, [avatar, firstName, firstSurname, username, email, aboutMe, bannerColor, userConfig])

  const handleSaveProfile = () => {
    if (previewAvatar !== avatar) {
      onAvatarChange(previewAvatar || "")
    }

    if (previewName !== firstName) {
      onNameChange(previewName || "")
    }

    if (onSurnameChange && previewSurname !== firstSurname) {
      onSurnameChange(previewSurname || "")
    }

    if (onEmailChange && previewEmail !== email) {
      onEmailChange(previewEmail || "")
    }

    if (previewAboutMe !== aboutMe) {
      onAboutMeChange(previewAboutMe || "")
    }

    if (previewBannerColor !== bannerColor) {
      onBannerColorChange(previewBannerColor)
    }
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
              </div>
            </div>

            <div className="flex-1 p-6">
              {activeTab === "profile" && (
                <ProfileTab
                  previewAvatar={previewAvatar}
                  setPreviewAvatar={setPreviewAvatar}
                  previewName={previewName}
                  setPreviewName={setPreviewName}
                  previewSurname={previewSurname}
                  setPreviewSurname={setPreviewSurname}
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

              {activeTab === "account" && (
                <AccountTab
                  isPublicProfile={isPublicProfile}
                  setIsPublicProfile={setIsPublicProfile}
                  onOpenPasswordDialog={() => setPasswordDialogOpen(true)}
                  onOpenDeleteAccountDialog={() => setDeleteAccountDialogOpen(true)}
                  onSave={handleSaveConfig}
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
                  theme={theme}
                  setTheme={setTheme}
                  language={language}
                  setLanguage={setLanguage}
                  onSave={handleSaveConfig}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
      <DeleteAccountDialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen} />
    </>
  )
}
