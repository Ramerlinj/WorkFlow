"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Check, Upload } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import avatarColors from "@/lib/colors/avatar-colors"
import bannerColors from "@/lib/colors/banner-colors"
import { updateUser } from "@/lib/getUser"
import { getProfile, updateProfile } from "@/lib/profileServices"
import { useEffect } from "react"
import { Profile } from "@/types/interfaces"
import { uploadImage } from "@/lib/uploadServices"


interface ProfileTabProps {
  previewAvatar: string | null
  setPreviewAvatar: (avatar: string | null) => void
  previewName: string | null
  setPreviewName: (name: string | null) => void
  previewSecondName: string | null
  setPreviewSecondName: (secondName: string | null) => void
  previewSurname: string | null
  setPreviewSurname: (surname: string | null) => void
  previewSecondSurname: string | null
  setPreviewSecondSurname: (secondSurname: string | null) => void
  previewUsername: string | null
  previewEmail: string | null
  setPreviewEmail: (email: string | null) => void
  previewAboutMe: string | null
  setPreviewAboutMe: (aboutMe: string | null) => void
  previewBannerColor: string
  setPreviewBannerColor: (color: string) => void
  onSave: () => void
}

export function ProfileTab({
  previewAvatar,
  setPreviewAvatar,
  previewName,
  setPreviewName,
  previewSecondName,
  setPreviewSecondName,
  previewSurname,
  setPreviewSurname,
  previewSecondSurname,
  setPreviewSecondSurname,
  previewUsername,
  previewEmail,
  setPreviewEmail,
  previewAboutMe,
  setPreviewAboutMe,
  previewBannerColor,
  setPreviewBannerColor,
  onSave,
}: ProfileTabProps) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar el tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Solo se permiten imágenes en formato JPG, PNG, GIF o WebP');
      return;
    }

    // Validar el tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      setUploadError('La imagen no debe superar los 5MB');
      return;
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const imageUrl = await uploadImage(file)
      setPreviewAvatar(imageUrl)
      setUploadError(null)
    } catch (error) {
      console.error('Error al subir la imagen:', error)
      setUploadError(error instanceof Error ? error.message : 'Error al subir la imagen')
      setPreviewAvatar(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleBannerColorChange = (color: string) => {
    setPreviewBannerColor(color);
    setColorPickerOpen(false);
  }

  const initial = previewName ? previewName.charAt(0).toUpperCase() : ""
  const backgroundColor = avatarColors[initial] || "#999"




  useEffect(() => {
    const loadProfile = async () => {
      if (previewUsername) {
        const profileData = await getProfile(previewUsername);
        if (profileData) {
          setCurrentProfile(profileData);
          setPreviewAvatar(profileData.avatar_url || null);
          setPreviewAboutMe(profileData.about_me || "");
          setPreviewBannerColor(profileData.banner_color ? `#${profileData.banner_color}` : "#FFFFFF");
        }
      }
    };
    loadProfile();
  }, [previewUsername]);



  const handleSave = async () => {
    if (!previewUsername || !currentProfile) {
      console.error("Datos incompletos para guardar")
      return
    }

    setIsSaving(true)

    try {
      // 1. Actualizar usuario
      const userPayload = {
        first_name: previewName || "",
        middle_name: previewSecondName || "",
        first_surname: previewSurname || "",
        second_surname: previewSecondSurname || "",
        email: previewEmail || ""
      }

      const updatedUser = await updateUser(previewUsername, userPayload)

      // 2. Actualizar perfil
      const profilePayload = {
        about_me: previewAboutMe || "No tiene descripción...",
        avatar_url: previewAvatar || "",
        cv_url: currentProfile.cv_url || "",
        banner_color: (previewBannerColor || "#000000").replace("#", "")
      }

      const updatedProfile = await updateProfile(previewUsername, profilePayload)

      if (updatedUser && updatedProfile) {
        console.log("Actualización exitosa!")
        onSave()
      }
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <DialogTitle className="text-xl font-semibold">Editar perfil</DialogTitle>
        <DialogDescription>Personaliza tu perfil para destacar en la plataforma.</DialogDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Foto de perfil</Label>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-muted">
                <AvatarImage src={previewAvatar ?? undefined} className="object-cover" />
                <AvatarFallback style={{ backgroundColor }} className="text-2xl text-white">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <Label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">{isUploading ? "Subiendo..." : "Subir imagen"}</span>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </Label>
              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color del banner</Label>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center"
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: previewBannerColor }} />
                <span>Seleccionar color</span>
              </div>
            </Button>

            <AnimatePresence>
              {colorPickerOpen && (
                <motion.div
                  key="color-grid"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-4 gap-2 p-4 border rounded-md">
                    {Object.entries(bannerColors).map(([name, color]) => (
                      <Button
                        key={name}
                        className="w-12 h-12 rounded-md flex items-center justify-center hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          handleBannerColorChange(color)
                          setColorPickerOpen(false)
                        }}
                        title={name}
                      >
                        {color === previewBannerColor && <Check className="text-white" />}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input id="firstName" value={previewName || ""} onChange={(e) => setPreviewName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondName">Segundo nombre</Label>
            <Input id="secondName" value={previewSecondName || ""} onChange={(e) => setPreviewSecondName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstSurname">Apellido</Label>
            <Input id="firstSurname" value={previewSurname || ""} onChange={(e) => setPreviewSurname(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondSurname">Segundo apellido</Label>
            <Input id="secondSurname" value={previewSecondSurname || ""} onChange={(e) => setPreviewSecondSurname(e.target.value)} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input id="username" value={previewUsername || ""} readOnly />
            <p className="text-xs text-muted-foreground">El nombre de usuario no se puede cambiar.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={previewEmail || ""}
              readOnly
              onChange={(e) => setPreviewEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutMe">Sobre mí</Label>
            <Textarea
              id="aboutMe"
              value={previewAboutMe || ""}
              onChange={(e) => setPreviewAboutMe(e.target.value)}
              className="h-32 resize-none"
              placeholder="Escribe algo sobre ti..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  )
}
