"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface NotificationsTabProps {
  notificationByMail: boolean
  setNotificationByMail: (value: boolean) => void
  onSave: () => void
}

export function NotificationsTab({ notificationByMail, setNotificationByMail, onSave }: NotificationsTabProps) {
  return (
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
              <p className="text-sm text-muted-foreground">Recibe notificaciones sobre nuevas ofertas de trabajo</p>
            </div>
            <Switch checked={notificationByMail} onCheckedChange={setNotificationByMail} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSave}>Guardar cambios</Button>
      </div>
    </div>
  )
}
