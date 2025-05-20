"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Lock, Trash2 } from "lucide-react"

interface AccountTabProps {
  isPublicProfile?: boolean
  setIsPublicProfile?: (value: boolean) => void
  onChangePassword?: () => void
  onDeleteAccount?: () => void
  onSave?: () => void
}

export function AccountTab({
  isPublicProfile = false,
  setIsPublicProfile = () => {},
  onChangePassword = () => {},
  onDeleteAccount = () => {},
  onSave = () => {
    
  },
}: AccountTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Configuración de cuenta</h2>
        <p className="text-sm text-muted-foreground">Administra la configuración de tu cuenta y seguridad.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Privacidad y Seguridad</CardTitle>
          <CardDescription>Administra la configuración de privacidad y seguridad de tu cuenta</CardDescription>
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
            <Button variant="outline" onClick={onChangePassword}>
              <Lock className="mr-2 h-4 w-4" /> Cambiar contraseña
            </Button>
            <Button variant="destructive" onClick={onDeleteAccount}>
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar cuenta
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSave}>Guardar cambios</Button>
      </div>
    </div>
  )
}
