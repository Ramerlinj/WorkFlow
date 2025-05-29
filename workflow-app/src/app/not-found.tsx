"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users, ArrowLeft, Home, Briefcase } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Ilustración con iconos */}
                <div className="relative">
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <div className="relative">
                            <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <Search className="w-16 h-16 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Elementos decorativos */}
                    <div className="absolute top-0 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-8 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-4 left-1/3 w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-700"></div>
                </div>

                {/* Contenido principal */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h1 className="text-6xl font-bold text-blue-600">404</h1>
                        <h2 className="text-3xl font-semibold text-blue-800">Usuario no encontrado</h2>
                        <p className="text-lg text-blue-700 max-w-md mx-auto">
                            Lo sentimos, el perfil que buscas no existe o ha sido eliminado de nuestra plataforma de empleos.
                        </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                        >
                            <Link href="/">
                                <Home className="w-4 h-4 mr-2" />
                                Ir al inicio
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg transition-all duration-200"
                        >
                            <Link href="/buscar">
                                <Search className="w-4 h-4 mr-2" />
                                Buscar candidatos
                            </Link>
                        </Button>
                    </div>

                    {/* Link de regreso */}
                    <div className="pt-4">
                        <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                            <Link href="#" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver atrás
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-8 text-sm text-blue-600">
                    <p>
                        ¿Necesitas ayuda?{" "}
                        <Link href="/contacto" className="underline hover:text-blue-800">
                            Contáctanos
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
