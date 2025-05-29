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
import { Separator } from "@/components/ui/separator"
import { Loader2, Trash2, Building2, Calendar, FileText, AlertCircle, BriefcaseIcon, RefreshCcw, Save, ExternalLink, MapPin } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Employment, JobApplication, User } from "@/types/interfaces"
import { fetchJobsByUser, deleteJob } from "@/lib/employments"
import { AuthService } from "@/lib/authServices"
import { useRouter } from "next/navigation"

interface PublishedJobsTabProps {
    userId: number
}

interface JobApplicationsProps {
    jobId: number;
}

// Extender la interfaz JobApplication para incluir el usuario
interface JobApplicationWithUser extends JobApplication {
    user?: User;
}

// Extender el tipo Employment para incluir las aplicaciones
interface EmploymentWithApplications extends Employment {
    applications?: JobApplication[];
}

function JobApplications({ jobId }: JobApplicationsProps) {
    const router = useRouter()
    const [applications, setApplications] = useState<JobApplicationWithUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)

    const loadApplications = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = localStorage.getItem("auth_token")
            if (!token) throw new Error("No estás autenticado")

            const currentUserId = AuthService.getCurrentUserId()
            if (!currentUserId) throw new Error("No se pudo obtener el ID del usuario")

            // Obtener todas las aplicaciones recibidas
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/user/${currentUserId}/received-applications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                if (response.status === 404) {
                    setApplications([])
                    return
                }
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const allApplications = await response.json()
            console.log('Todas las aplicaciones recibidas:', allApplications)

            if (!Array.isArray(allApplications)) {
                console.warn('La respuesta no es un array:', allApplications)
                setApplications([])
                return
            }

            // Filtrar las aplicaciones para este empleo específico
            const jobApplications = allApplications.filter(app => app.id_employment === jobId)
            console.log('Aplicaciones filtradas para este empleo:', jobApplications)

            // Obtener los detalles de cada usuario que aplicó
            const applicationsWithUsers = await Promise.all(
                jobApplications.map(async (application) => {
                    try {
                        // Obtener los datos del usuario usando el endpoint correcto
                        const userResponse = await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/user/id/${application.id_user}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                }
                            }
                        )

                        if (!userResponse.ok) {
                            console.error(`Error al obtener usuario con ID ${application.id_user}:`, userResponse.statusText)
                            return {
                                ...application,
                                user: {
                                    id_user: application.id_user,
                                    username: `usuario_${application.id_user}`,
                                    first_name: "Usuario",
                                    first_surname: `#${application.id_user}`,
                                    email: "No disponible"
                                }
                            }
                        }

                        const userData = await userResponse.json()
                        console.log('Datos del usuario obtenidos:', userData)

                        return {
                            ...application,
                            user: userData
                        }
                    } catch (error) {
                        console.error(`Error al obtener usuario para aplicación ${application.id_application}:`, error)
                        return {
                            ...application,
                            user: {
                                id_user: application.id_user,
                                username: `usuario_${application.id_user}`,
                                first_name: "Usuario",
                                first_surname: `#${application.id_user}`,
                                email: "No disponible"
                            }
                        }
                    }
                })
            )

            console.log('Aplicaciones con datos de usuarios:', applicationsWithUsers)
            setApplications(applicationsWithUsers)
        } catch (error: unknown) {
            console.error('Error detallado al cargar aplicaciones:', error)
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("No se pudieron cargar las aplicaciones")
            }
            setApplications([])
        } finally {
            setLoading(false)
        }
    }

    const navigateToProfile = (username: string) => {
        router.push(`/${username}`)
    }

    useEffect(() => {
        if (jobId) {
            loadApplications()
        }
    }, [jobId])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="ml-2">Cargando aplicaciones...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        )
    }

    if (applications.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                No hay aplicaciones para este empleo
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            {applications.map((application) => (
                <div key={application.id_application}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-medium">
                                        {application.user?.first_name} {application.user?.middle_name} {application.user?.first_surname} {application.user?.second_surname}
                                    </h4>
                                    {application.user?.profession && (
                                        <Badge variant="secondary" className="text-xs">
                                            {application.user.profession.name}
                                        </Badge>
                                    )}
                                </div>
                                <button
                                    onClick={() => application.user?.username && navigateToProfile(application.user.username)}
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 w-fit"
                                >
                                    @{application.user?.username}
                                    <ExternalLink className="h-3 w-3" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{application.user?.email}</p>
                            {application.user?.direction && (
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <MapPin className="h-4 w-4" />
                                    {application.user.direction}
                                </p>
                            )}
                            <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(application.application_date), "d 'de' MMMM, yyyy", {
                                    locale: es,
                                })}
                            </div>
                            <div className="mt-4">
                                <h5 className="text-sm font-medium mb-1">Carta de presentación:</h5>
                                <p className="text-sm whitespace-pre-wrap break-words line-clamp-3 text-gray-600">
                                    {application.cover_letter}
                                </p>
                            </div>
                            {application.user?.skills && application.user.skills.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {application.user.skills.map((skill) => (
                                        <Badge key={skill.id_skill} variant="outline" className="text-xs">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Select
                                value={application.status}
                                onValueChange={async (value) => {
                                    try {
                                        setUpdatingStatus(application.id_application)
                                        const token = localStorage.getItem("auth_token")
                                        if (!token) throw new Error("No estás autenticado")

                                        const updateData = {
                                            id_user: parseInt(String(application.id_user), 10),
                                            id_employment: parseInt(String(application.id_employment), 10),
                                            cover_letter: String(application.cover_letter || ""),
                                            application_date: new Date(application.application_date).toISOString(),
                                            status: value as "Pending" | "Accepted" | "Rejected"
                                        }

                                        console.log('Enviando actualización:', updateData)

                                        const response = await fetch(
                                            `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/job-application/${application.id_application}`,
                                            {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${token}`
                                                },
                                                body: JSON.stringify(updateData)
                                            }
                                        )

                                        if (!response.ok) {
                                            const errorText = await response.text()
                                            throw new Error(errorText)
                                        }

                                        // Actualizar el estado local
                                        setApplications(prev => prev.map(app =>
                                            app.id_application === application.id_application
                                                ? { ...app, status: value as "Pending" | "Accepted" | "Rejected" }
                                                : app
                                        ))
                                    } catch (error) {
                                        console.error('Error al actualizar estado:', error)
                                        setError(error instanceof Error ? error.message : "Error al actualizar el estado")
                                    } finally {
                                        setUpdatingStatus(null)
                                    }
                                }}
                                disabled={updatingStatus === application.id_application}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue>
                                        {application.status === "Pending" && "Pendiente"}
                                        {application.status === "Accepted" && "Aceptada"}
                                        {application.status === "Rejected" && "Rechazada"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pendiente</SelectItem>
                                    <SelectItem value="Accepted">Aceptada</SelectItem>
                                    <SelectItem value="Rejected">Rechazada</SelectItem>
                                </SelectContent>
                            </Select>
                            {updatingStatus === application.id_application && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function getUserIdFromToken(): number | null {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Asegurarnos de que el ID sea un número
        return typeof payload.sub === 'string' ? parseInt(payload.sub, 10) : payload.sub;
    } catch (error) {
        console.error("Error decodificando token:", error);
        return null;
    }
}

interface PendingChange {
    jobId: string;
    newStatus: 'Open' | 'Closed';
    originalStatus: 'Open' | 'Closed';
}

export function PublishedJobsTab({ userId }: PublishedJobsTabProps) {
    const [jobs, setJobs] = useState<EmploymentWithApplications[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([])
    const [isSaving, setIsSaving] = useState(false)

    const loadJobs = async () => {
        try {
            setLoading(true)
            setError(null)

            const currentUserId = getUserIdFromToken()
            if (!currentUserId) {
                setError("No estás autenticado")
                return
            }

            const userIdNum = typeof userId === 'string' ? parseInt(userId, 10) : userId

            if (currentUserId !== userIdNum) {
                setError("No tienes permiso para ver estos empleos")
                return
            }

            const jobsData = await fetchJobsByUser(userIdNum)
            if (Array.isArray(jobsData)) {
                setJobs(jobsData)
                setError(null)
            } else {
                console.warn("La respuesta no es un array:", jobsData)
                setJobs([])
                setError("Error al cargar los empleos publicados")
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error al cargar empleos:", error)
                if (error.message.includes("No estás autenticado")) {
                    setError("Debes iniciar sesión para ver tus empleos publicados")
                } else if (error.message.includes("404")) {
                    setError("No se encontraron empleos publicados")
                    setJobs([])
                } else if (error.message.includes("403")) {
                    setError("No tienes permiso para ver estos empleos")
                } else {
                    setError("No se pudieron cargar tus empleos publicados")
                }
            } else {
                setError("Error desconocido al cargar empleos")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleJobStatusChange = async (jobId: number | string, newStatus: 'Open' | 'Closed') => {
        const jobIdStr = jobId.toString()
        const job = jobs.find(j => j.id_employment.toString() === jobIdStr)

        if (!job) {
            setError("No se encontró el empleo")
            return
        }

        const originalStatus = job.status

        setJobs(prev => prev.map(j =>
            j.id_employment.toString() === jobIdStr
                ? { ...j, status: newStatus }
                : j
        ))

        setPendingChanges(prev => [
            ...prev.filter(change => change.jobId !== jobIdStr),
            { jobId: jobIdStr, newStatus, originalStatus }
        ])
    }

    useEffect(() => {
        if (userId) {
            loadJobs()
        } else {
            setError("ID de usuario no válido")
            setLoading(false)
        }
    }, [userId])

    const handleSaveChanges = async () => {
        if (pendingChanges.length === 0) return;

        setIsSaving(true);
        setError(null);

        try {
            const currentUserId = getUserIdFromToken();
            if (!currentUserId) {
                setError("No estás autenticado");
                return;
            }

            // Procesar los cambios uno por uno
            for (const change of pendingChanges) {
                try {
                    const job = jobs.find(j => j.id_employment.toString() === change.jobId);
                    if (!job) {
                        console.error(`No se encontró el empleo con ID ${change.jobId}`);
                        continue;
                    }

                    // Convertir los IDs a número para la comparación
                    const jobUserId = typeof job.id_user === 'string' ? parseInt(job.id_user, 10) : job.id_user;

                    if (jobUserId !== currentUserId) {
                        throw new Error(`No tienes permiso para modificar el empleo ${job.title}`);
                    }

                    // Preparar el objeto con todos los campos requeridos
                    const updateData = {
                        id_type_job: job.id_type_job,
                        id_profession: job.id_profession,
                        id_user: jobUserId,
                        title: job.title,
                        description: job.description || "",
                        company: job.company,
                        salary_min: Number(job.salary_min) || 0,
                        salary_max: Number(job.salary_max) || 0,
                        publication_date: job.publication_date,
                        status: change.newStatus,
                        id_location: job.id_location || 0
                    };

                    // Realizar la actualización
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/employment/${change.jobId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                        },
                        body: JSON.stringify(updateData)
                    });

                    if (!response.ok) {
                        const errorData = await response.text();
                        throw new Error(errorData || 'Error al actualizar el empleo');
                    }

                } catch (error: unknown) {
                    // Revertir el cambio en la UI
                    setJobs(prev => prev.map(job =>
                        job.id_employment.toString() === change.jobId
                            ? { ...job, status: change.originalStatus }
                            : job
                    ));

                    // Propagar el error
                    if (error instanceof Error) {
                        throw new Error(error.message)
                    }
                    throw new Error("Error desconocido al actualizar el estado del empleo");
                }
            }

            // Si todo sale bien, limpiar los cambios pendientes
            setPendingChanges([]);
            setError(null);
        } catch (error: unknown) {
            console.error("Error al guardar cambios:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido al guardar los cambios");
            }
        } finally {
            setIsSaving(false);
        }
    }

    const handleDelete = async (jobId: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta oferta de empleo?")) return;

        try {
            setUpdatingId(jobId);
            setError(null);

            const currentUserId = getUserIdFromToken();
            if (!currentUserId) {
                setError("No estás autenticado");
                return;
            }

            const job = jobs.find(j => j.id_employment.toString() === jobId);
            if (!job) {
                setError("No se encontró el empleo");
                return;
            }

            if (job.id_user !== currentUserId) {
                setError("No tienes permiso para eliminar este empleo");
                return;
            }

            await deleteJob(jobId);
            setJobs(prev => prev.filter(job => job.id_employment.toString() !== jobId));

            // Eliminar cualquier cambio pendiente para este empleo
            setPendingChanges(prev => prev.filter(change => change.jobId !== jobId));
        } catch (error: unknown) {
            console.error("Error al eliminar empleo:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido al eliminar el empleo");
            }
        } finally {
            setUpdatingId(null);
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Open":
                return <Badge variant="outline" className="bg-green-100 text-green-700">Abierta</Badge>
            case "Closed":
                return <Badge variant="destructive">Cerrada</Badge>
            default:
                return <Badge variant="secondary">Desconocido</Badge>
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Cargando empleos publicados...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Empleos Publicados</h2>
                    <p className="text-sm text-muted-foreground">
                        Gestiona las ofertas de empleo que has publicado.
                    </p>
                </div>
                <div className="flex gap-2">
                    {pendingChanges.length > 0 && (
                        <Button
                            variant="default"
                            onClick={handleSaveChanges}
                            disabled={isSaving}
                            className="flex items-center gap-2"
                        >
                            {isSaving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            Guardar cambios ({pendingChanges.length})
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={loadJobs}
                        className="flex items-center gap-2"
                        disabled={loading || isSaving}
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Actualizar
                    </Button>
                </div>
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
                {jobs.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <BriefcaseIcon className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No hay empleos publicados</h3>
                            <p className="text-muted-foreground text-center">
                                Aún no has publicado ninguna oferta de empleo.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => window.location.href = '/empleos'}
                            >
                                Publicar un empleo
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    jobs.map((job) => (
                        <Card key={job.id_employment} className="overflow-hidden">
                            <CardHeader className="space-y-4">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <CardTitle>{job.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Building2 className="w-4 h-4" />
                                            {job.company}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(job.status)}
                                        <Select
                                            value={job.status}
                                            onValueChange={(value: string) => {
                                                if (value === 'Open' || value === 'Closed') {
                                                    handleJobStatusChange(job.id_employment, value as 'Open' | 'Closed')
                                                }
                                            }}
                                            disabled={isSaving || updatingId === job.id_employment.toString()}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue>
                                                    {job.status === 'Open' ? 'Abierta' : 'Cerrada'}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Open">Abierta</SelectItem>
                                                <SelectItem value="Closed">Cerrada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(job.id_employment.toString())}
                                            disabled={isSaving || updatingId === job.id_employment.toString()}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        {format(new Date(job.publication_date), "d 'de' MMMM, yyyy", {
                                            locale: es,
                                        })}
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <FileText className="w-4 h-4 mt-1" />
                                        <p className="text-sm">{job.description || "Sin descripción"}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {job.type_job && (
                                            <Badge variant="secondary">
                                                {job.type_job.name}
                                            </Badge>
                                        )}
                                        {job.profession && (
                                            <Badge variant="secondary">
                                                {job.profession.name}
                                            </Badge>
                                        )}
                                        {job.location && (
                                            <Badge variant="secondary">
                                                {job.location.city}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-4">
                                    <h4 className="font-medium">Aplicaciones recibidas</h4>
                                    <div className="overflow-x-auto">
                                        <JobApplications
                                            jobId={job.id_employment}
                                        />
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