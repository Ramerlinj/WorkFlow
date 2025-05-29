"use client"

import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash2, Building2, Calendar, FileText, AlertCircle, BriefcaseIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { JobApplication } from "@/types/interfaces"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

interface ApplicationsTabProps {
    userId: number
}

export function ApplicationsTab({ userId }: ApplicationsTabProps) {
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    const loadApplications = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = localStorage.getItem("auth_token")
            if (!token) {
                throw new Error("No estás autenticado")
            }

            // Obtener las aplicaciones del usuario
            const response = await fetch(`${API_BASE}/job-applications/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            if (!Array.isArray(data)) {
                console.warn("La respuesta no es un array:", data)
                setApplications([])
                return
            }

            // Para cada aplicación, obtener los detalles completos del empleo
            const applicationsWithDetails = await Promise.all(
                data.map(async (application) => {
                    try {
                        const employmentResponse = await fetch(
                            `${API_BASE}/employment/${application.id_employment}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )

                        if (!employmentResponse.ok) {
                            console.error(`Error al obtener detalles del empleo ${application.id_employment}:`, employmentResponse.statusText)
                            return application
                        }

                        const employmentData = await employmentResponse.json()
                        return {
                            ...application,
                            employment: employmentData
                        }
                    } catch (error) {
                        console.error(`Error al obtener detalles del empleo ${application.id_employment}:`, error)
                        return application
                    }
                })
            )

            setApplications(applicationsWithDetails)
        } catch (err: any) {
            console.error("Error al cargar aplicaciones:", err)
            if (err.message.includes("No estás autenticado")) {
                setError("Debes iniciar sesión para ver tus aplicaciones")
            } else if (err.response?.status === 404) {
                setError("No se encontraron aplicaciones")
                setApplications([])
            } else {
                setError("No se pudieron cargar tus aplicaciones")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userId) {
            loadApplications()
        }
    }, [userId])

    const handleStatusChange = async (applicationId: number, newStatus: string) => {
        try {
            setUpdatingId(applicationId.toString())
            setError(null)

            const token = localStorage.getItem("auth_token")
            if (!token) throw new Error("No estás autenticado")

            const application = applications.find(app => app.id_application === applicationId)
            if (!application) throw new Error("Aplicación no encontrada")

            const updateData = {
                id_user: application.id_user,
                id_employment: application.id_employment,
                cover_letter: application.cover_letter,
                application_date: application.application_date,
                status: newStatus as "Pending" | "Accepted" | "Rejected"
            }

            const response = await fetch(`${API_BASE}/job-application/${applicationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || "Error al actualizar el estado")
            }

            // Actualizar estado local
            setApplications(prev =>
                prev.map(app =>
                    app.id_application === applicationId
                        ? { ...app, status: newStatus as "Pending" | "Accepted" | "Rejected" }
                        : app
                )
            )
        } catch (err: any) {
            console.error("Error al actualizar estado:", err)
            setError(err.message || "No se pudo actualizar el estado de la aplicación")
        } finally {
            setUpdatingId(null)
        }
    }

    const handleDelete = async (applicationId: number) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta aplicación?")) return

        try {
            setUpdatingId(applicationId.toString())
            setError(null)

            const token = localStorage.getItem("auth_token")
            if (!token) throw new Error("No estás autenticado")

            const response = await fetch(`${API_BASE}/job-application/${applicationId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || "Error al eliminar la aplicación")
            }

            setApplications(prev => prev.filter(app => app.id_application !== applicationId))
            setError(null)
        } catch (err: any) {
            console.error("Error al eliminar aplicación:", err)
            setError(err.message || "No se pudo eliminar la aplicación")
        } finally {
            setUpdatingId(null)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
            case "Accepted":
                return <Badge variant="outline" className="bg-green-100 text-green-700">Aceptada</Badge>
            case "Rejected":
                return <Badge variant="destructive">Rechazada</Badge>
            default:
                return <Badge variant="secondary">Desconocido</Badge>
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Cargando aplicaciones...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Mis Aplicaciones</h2>
                <p className="text-sm text-muted-foreground">
                    Gestiona tus aplicaciones a empleos y revisa su estado.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {applications.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <BriefcaseIcon className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No hay aplicaciones</h3>
                            <p className="text-muted-foreground text-center">
                                No has aplicado a ningún empleo aún.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => window.location.href = '/empleos'}
                            >
                                Ver empleos disponibles
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    applications.map((application) => (
                        <Card key={application.id_application}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{application.employment?.title || "Empleo no disponible"}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Building2 className="w-4 h-4" />
                                            {application.employment?.company || "Empresa no especificada"}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(application.status)}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(application.id_application)}
                                            disabled={updatingId === application.id_application.toString()}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        {format(new Date(application.application_date), "d 'de' MMMM, yyyy", {
                                            locale: es,
                                        })}
                                    </div>
                                    <div className="flex items-start gap-2 mt-2">
                                        <FileText className="w-4 h-4 mt-1" />
                                        <p className="text-sm">{application.cover_letter || "Sin carta de presentación"}</p>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {application.employment?.type_job && (
                                            <Badge variant="secondary">
                                                {application.employment.type_job.name}
                                            </Badge>
                                        )}
                                        {application.employment?.profession && (
                                            <Badge variant="secondary">
                                                {application.employment.profession.name}
                                            </Badge>
                                        )}
                                        {application.employment?.location && (
                                            <Badge variant="secondary">
                                                {application.employment.location.city}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
} 