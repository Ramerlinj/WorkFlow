"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Check, Lock, Settings, Upload, User, Bell, Shield, Palette, Trash2 } from "lucide-react"
import avatarColors from "./ColorAvatar"
import bannerColors from "./ColorBanner-fixed"
import { AnimatePresence, motion } from "framer-motion"
import type { User as UserType, UserConfig } from "@/types/user"

interface ConfigurationPanelProps {
    user: UserType
    avatar: string | null
    firstName: string | null
    firstSurname: string | null
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
    //user,
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
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const imageUrl = reader.result as string
            setPreviewAvatar(imageUrl)
        }
        reader.readAsDataURL(file)
    }

    const handleBannerColorChange = (color: string) => {
        setPreviewBannerColor(color)
        setColorPickerOpen(false)
    }

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

    const initial = previewName ? previewName.charAt(0).toUpperCase() : ""
    const backgroundColor = avatarColors[initial] || "#999"

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
                                <div className="space-y-6">
                                    <div>
                                        <DialogTitle className="text-xl font-semibold">Editar perfil</DialogTitle>
                                        <DialogDescription>
                                            Personaliza tu perfil para destacar en la plataforma.
                                        </DialogDescription>
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
                                                    <label
                                                        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                                                    >   
                                                        <Upload className="w-4 h-4" />
                                                        <span>Subir imagen</span>
                                                        <Input
                                                            id="avatar-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                            
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Color del banner</Label>

                                                {/* Botón que abre/cierra la paleta */}
                                                <Button
                                                    variant="outline"
                                                    className="w-full flex justify-between items-center"
                                                    onClick={() => setColorPickerOpen(!colorPickerOpen)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-5 h-5 rounded-full"
                                                            style={{ backgroundColor: previewBannerColor }}
                                                        />
                                                        <span>Seleccionar color</span>
                                                    </div>
                                                </Button>

                                                {/* Animación de aparición */}
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
                                                                    <button
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
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>


                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">Nombre</Label>
                                                <Input
                                                    id="firstName"
                                                    value={previewName || ""}
                                                    onChange={(e) => setPreviewName(e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="firstSurname">Apellido</Label>
                                                <Input
                                                    id="firstSurname"
                                                    value={previewSurname || ""}
                                                    onChange={(e) => setPreviewSurname(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Nombre de usuario</Label>
                                                <Input
                                                    id="username"
                                                    value={previewUsername || ""}
                                                    onChange={(e) => setPreviewUsername(e.target.value)}
                                                    disabled
                                                />
                                                <p className="text-xs text-muted-foreground">El nombre de usuario no se puede cambiar.</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Correo electrónico</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={previewEmail || ""}
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
                                        <Button onClick={handleSaveProfile}>Guardar cambios</Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "account" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold">Configuración de cuenta</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Administra la configuración de tu cuenta y seguridad.
                                        </p>
                                    </div>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Privacidad y Seguridad</CardTitle>
                                            <CardDescription>
                                                Administra la configuración de privacidad y seguridad de tu cuenta
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-sm font-semibold">Perfil público</h3>
                                                    <p className="text-sm text-muted-foreground">Permite que los reclutadores vean tu perfil</p>
                                                </div>
                                                <Switch checked={isPublicProfile} onCheckedChange={setIsPublicProfile} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Preferencias de Cuenta</CardTitle>
                                            <CardDescription>Gestiona tu contraseña y cuenta</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex gap-4">
                                                <Button variant="outline" onClick={() => setPasswordDialogOpen(true)}>
                                                    <Lock className="mr-2 h-4 w-4" /> Cambiar contraseña
                                                </Button>
                                                <Button variant="destructive" onClick={() => setDeleteAccountDialogOpen(true)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar cuenta
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveConfig}>Guardar cambios</Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold">Notificaciones</h2>
                                        <p className="text-sm text-muted-foreground">Configura cómo y cuándo recibes notificaciones.</p>
                                    </div>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Preferencias de notificación</CardTitle>
                                            <CardDescription>Configura tus preferencias de notificación</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-sm font-semibold">Recibir notificaciones por correo</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Recibe notificaciones sobre nuevas ofertas de trabajo
                                                    </p>
                                                </div>
                                                <Switch checked={notificationByMail} onCheckedChange={setNotificationByMail} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveConfig}>Guardar cambios</Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "appearance" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold">Apariencia</h2>
                                        <p className="text-sm text-muted-foreground">Personaliza la apariencia de la plataforma.</p>
                                    </div>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Preferencias</CardTitle>
                                            <CardDescription>Configura el perfil a tu gusto</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-sm font-semibold">Tema</h3>
                                                    <p className="text-sm text-muted-foreground">Seleccione el tema de su preferencia</p>
                                                </div>
                                                <Select value={theme} onValueChange={setTheme}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Tema" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="claro">Claro</SelectItem>
                                                        <SelectItem value="oscuro" disabled>
                                                            Oscuro
                                                        </SelectItem>
                                                        <SelectItem value="sistema" disabled>
                                                            Sistema
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-sm font-semibold">Idioma</h3>
                                                    <p className="text-sm text-muted-foreground">Selecciona el idioma de la plataforma</p>
                                                </div>
                                                <Select value={language} onValueChange={setLanguage}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Idioma" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Español">Español</SelectItem>
                                                        <SelectItem value="English" disabled>
                                                            English
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    
                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveConfig}>Guardar cambios</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Diálogo para cambiar contraseña */}
            <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cambiar contraseña</DialogTitle>
                        <DialogDescription>Introduce tu contraseña actual y la nueva que deseas usar.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Contraseña actual</Label>
                            <Input id="current-password" type="password" placeholder="Contraseña actual" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">Nueva contraseña</Label>
                            <Input id="new-password" type="password" placeholder="Nueva contraseña" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                            <Input id="confirm-password" type="password" placeholder="Confirmar nueva contraseña" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Diálogo para eliminar cuenta */}
            <Dialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Eliminar cuenta</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="delete-confirm">Escribe eliminar para confirmar</Label>
                            <Input id="delete-confirm" placeholder='Escribe "ELIMINAR"' />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="destructive" type="submit">
                            Eliminar cuenta
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
