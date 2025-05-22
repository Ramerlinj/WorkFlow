"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-default">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-center text-text-tertiary mb-4">Recuperar Contraseña</h1>

        <p className="text-center text-text-secondary mb-8">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
        </p>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-text-primary">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              className="bg-default-50 border-default-100 text-text-primary"
            />
          </div>

          <Button type="submit" className="w-full bg-button-primary hover:bg-default-300 text-white">
            Enviar enlace de recuperación
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-text-tertiary hover:underline">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
