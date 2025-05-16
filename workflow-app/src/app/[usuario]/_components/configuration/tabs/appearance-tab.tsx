"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface AppearanceTabProps {
  theme: string
  setTheme: (value: string) => void
  language: string
  setLanguage: (value: string) => void
  onSave: () => void
}

export function AppearanceTab({ theme, setTheme, language, setLanguage, onSave }: AppearanceTabProps) {
  return (
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
        <Button onClick={onSave}>Guardar cambios</Button>
      </div>
    </div>
  )
}
