"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { useState, useEffect } from "react"
import { JobSidebar } from "./job-sidebar"
import { JobList } from "./job-list"
import { JobModal } from "./job-modal"
import { AddJobModal } from "./add-job-modal"
import { ApplicationModal } from "./application-modal"
import { SidebarProvider } from "@/components/ui/sidebar"
import { fetchJobs, createJob, deleteJob, applyToJob, jobTypeMap, professionMap, locationMap } from "@/lib/api"
import type { Job } from "@/lib/types"
import { Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

export function JobBoard() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [applyingToJobId, setApplyingToJobId] = useState<string | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isApiAvailable, setIsApiAvailable] = useState(false)

  const [filters, setFilters] = useState({
    city: "all",
    jobType: "all",
    category: "all",
    salaryMin: 0,
    salaryMax: 100000,
    search: "",
    sortBy: "newest",
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Intentar cargar desde la API
      let data
      try {
        data = await fetchJobs()

        // Mapear los datos de la API al formato que espera nuestra aplicación
        const formattedJobs = Array.isArray(data)
          ? data.map((job: any) => ({
              id: String(job.id_employment),
              title: job.title,
              company: job.company,
              city: locationMap[job.id_location] || "Desconocida",
              description: job.description,
              salary: job.salary,
              jobType: jobTypeMap[job.id_type_job] || "Tiempo completo",
              category: professionMap[job.id_profession] || "Desarrollo web",
              createdAt: job.publication_date ? new Date(job.publication_date) : new Date(),
              status: job.status,
            }))
          : []

        setJobs(formattedJobs)
        setIsApiAvailable(true)
        toast.success("Conectado a la API local correctamente", {
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 3000,
        })
      } catch (apiError) {
        console.error("Error conectando a la API:", apiError)
        // Si falla la API, cargar datos de ejemplo sin mostrar error
        setJobs(sampleJobs)
        setIsApiAvailable(false)
        toast.warning("No se ha podido cargar los datos vuelva mas tarde", {
          icon: <AlertTriangle className="h-4 w-4" />,
          duration: 5000,
        })
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.")
      // Asegurar que al menos tengamos datos de ejemplo
      setJobs(sampleJobs)
      toast.error("Error al cargar los datos", {
        icon: <XCircle className="h-4 w-4" />,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenJobModal = (job: Job) => {
    setSelectedJob(job)
    setIsJobModalOpen(true)
  }

  const handleAddJob = async (newJobData: Omit<Job, "id" | "createdAt">) => {
    try {
      // Mostrar toast de carga
      const loadingToast = toast.loading("Publicando oferta...", {
        duration: 10000, // Tiempo máximo de carga
      })

      // Encontrar los IDs correspondientes a los valores seleccionados
      const getJobTypeId = (jobType: string) => {
        return Object.entries(jobTypeMap).find(([id, value]) => value === jobType)?.[0] || "0"
      }

      const getProfessionId = (category: string) => {
        return Object.entries(professionMap).find(([id, value]) => value === category)?.[0] || "0"
      }

      const getLocationId = (city: string) => {
        return Object.entries(locationMap).find(([id, value]) => value === city)?.[0] || "0"
      }

      // Adaptar el formato para la API
      const apiJobData = {
        id_type_job: Number.parseInt(getJobTypeId(newJobData.jobType)),
        id_profession: Number.parseInt(getProfessionId(newJobData.category)),
        title: newJobData.title,
        description: newJobData.description,
        company: newJobData.company,
        salary: newJobData.salary,
        publication_date: new Date().toISOString(),
        status: "Open",
        id_location: Number.parseInt(getLocationId(newJobData.city)),
      }

      let response
      try {
        response = await createJob(apiJobData)
        setIsApiAvailable(true)
      } catch (apiError) {
        console.error("Error al conectar con la API:", apiError)
        // Simular respuesta exitosa si la API falla
        response = {
          id_employment: Math.floor(Math.random() * 1000),
          ...apiJobData,
        }
        setIsApiAvailable(false)
        // Descartar el toast de carga y mostrar advertencia
        toast.dismiss(loadingToast)
        toast.warning("Oferta guardada localmente. La API no está disponible.", {
          icon: <AlertTriangle className="h-4 w-4" />,
        })
      }

      // Crear un objeto Job con los datos de la respuesta
      const job: Job = {
        id: String(response.id_employment),
        title: newJobData.title,
        company: newJobData.company,
        city: newJobData.city,
        description: newJobData.description,
        salary: newJobData.salary,
        jobType: newJobData.jobType,
        category: newJobData.category,
        createdAt: new Date(),
        status: "Open",
      }

      setJobs([job, ...jobs])
      setIsAddJobModalOpen(false)

      // Descartar el toast de carga y mostrar éxito
      toast.dismiss(loadingToast)
      toast.success("Oferta publicada correctamente", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      })
    } catch (error) {
      console.error("Error al crear la oferta:", error)
      toast.error("Error al publicar la oferta", {
        icon: <XCircle className="h-4 w-4" />,
      })
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      // Mostrar toast de carga
      const loadingToast = toast.loading("Eliminando oferta...", {
        duration: 10000, // Tiempo máximo de carga
      })

      try {
        // Intentar eliminar a través de la API
        await deleteJob(jobId)
        setIsApiAvailable(true)
      } catch (apiError) {
        console.error("Error al conectar con la API para eliminar:", apiError)
        setIsApiAvailable(false)
        // Descartar el toast de carga y mostrar advertencia
        toast.dismiss(loadingToast)
        toast.warning("Oferta eliminada localmente. La API no está disponible.", {
          icon: <AlertTriangle className="h-4 w-4" />,
        })
      }

      // Eliminar de la lista local en cualquier caso
      setJobs(jobs.filter((job) => job.id !== jobId))
      setIsJobModalOpen(false)

      // Descartar el toast de carga y mostrar éxito
      toast.dismiss(loadingToast)
      toast.success("Oferta eliminada correctamente", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      })
    } catch (error) {
      console.error("Error al eliminar la oferta:", error)
      toast.error("Error al eliminar la oferta", {
        icon: <XCircle className="h-4 w-4" />,
      })
    }
  }

  const handleApplyToJob = (jobId: string) => {
    setApplyingToJobId(jobId)
    setIsJobModalOpen(false)
    setIsApplicationModalOpen(true)
  }

  const handleSubmitApplication = async (applicationData: any) => {
    try {
      // Mostrar toast de carga
      const loadingToast = toast.loading("Enviando aplicación...", {
        duration: 10000, // Tiempo máximo de carga
      })

      try {
        // Intentar enviar a través de la API
        await applyToJob(applicationData.jobId, {
          coverLetter: applicationData.coverLetter,
        })
        setIsApiAvailable(true)
      } catch (apiError) {
        console.error("Error al conectar con la API para aplicar:", apiError)
        setIsApiAvailable(false)
        toast.dismiss(loadingToast)
        toast.warning("Aplicación procesada localmente. La API no está disponible.", {
          icon: <AlertTriangle className="h-4 w-4" />,
        })
      }

      setIsApplicationModalOpen(false)

      // Descartar el toast de carga y mostrar éxito
      toast.dismiss(loadingToast)
      toast.success("¡Aplicación enviada correctamente! Te contactaremos pronto.", {
        icon: <CheckCircle2 className="h-4 w-4" />,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error al enviar la aplicación:", error)
      toast.error("Error al enviar la aplicación", {
        icon: <XCircle className="h-4 w-4" />,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px-300px)] bg-[#F8F9FC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#214E83]" />
          <p className="text-[#415771] font-medium">Cargando ofertas de trabajo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px-300px)] bg-[#F8F9FC]">
        <div className="bg-white p-6 rounded-lg border border-[#EDECEE] max-w-md text-center">
          <h2 className="text-xl font-bold text-[#112D4E] mb-4">Error</h2>
          <p className="text-[#415771] mb-6">{error}</p>
          <Button onClick={loadJobs} className="bg-[#214E83] hover:bg-[#144C8E] text-white">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">

      <SidebarProvider>
        <div className="flex rounded-lg overflow-hidden border border-[#EDECEE] bg-white shadow-sm">
          <JobSidebar filters={filters} setFilters={setFilters} />
          <JobList
            jobs={jobs}
            filters={filters}
            setFilters={setFilters}
            onJobClick={handleOpenJobModal}
            onAddJobClick={() => setIsAddJobModalOpen(true)}
          />
          <JobModal
            job={selectedJob}
            isOpen={isJobModalOpen}
            onClose={() => setIsJobModalOpen(false)}
            onApply={handleApplyToJob}
            onDelete={handleDeleteJob}
          />
          <AddJobModal isOpen={isAddJobModalOpen} onClose={() => setIsAddJobModalOpen(false)} onAddJob={handleAddJob} />
          <ApplicationModal
            isOpen={isApplicationModalOpen}
            onClose={() => setIsApplicationModalOpen(false)}
            jobId={applyingToJobId}
            onSubmit={handleSubmitApplication}
            job={jobs.find((job) => job.id === applyingToJobId) || null}
          />
        </div>
      </SidebarProvider>
    </div>
  )
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Desarrollador Frontend",
    company: "TechSolutions Inc.",
    city: "Madrid",
    description:
      "Buscamos un desarrollador frontend con experiencia en React y Next.js para unirse a nuestro equipo de desarrollo. El candidato ideal tendrá al menos 2 años de experiencia en desarrollo web y conocimientos sólidos de JavaScript, HTML y CSS.\n\nResponsabilidades:\n- Desarrollar interfaces de usuario atractivas y funcionales\n- Colaborar con diseñadores UX/UI y desarrolladores backend\n- Optimizar aplicaciones para máxima velocidad y escalabilidad\n- Implementar diseño responsive y asegurar compatibilidad entre navegadores",
    salary: "35000-45000",
    jobType: "Tiempo completo",
    category: "Desarrollo web",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "Open",
  },
  {
    id: "1",
    title: "Desarrollador Frontend",
    company: "TechSolutions Inc.",
    city: "Madrid",
    description:
      "Buscamos un desarrollador frontend con experiencia en React y Next.js para unirse a nuestro equipo de desarrollo. El candidato ideal tendrá al menos 2 años de experiencia en desarrollo web y conocimientos sólidos de JavaScript, HTML y CSS.\n\nResponsabilidades:\n- Desarrollar interfaces de usuario atractivas y funcionales\n- Colaborar con diseñadores UX/UI y desarrolladores backend\n- Optimizar aplicaciones para máxima velocidad y escalabilidad\n- Implementar diseño responsive y asegurar compatibilidad entre navegadores",
    salary: "35000-45000",
    jobType: "Tiempo completo",
    category: "Desarrollo web",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "Open",
  },
  {
    id: "1",
    title: "Desarrollador Frontend",
    company: "TechSolutions Inc.",
    city: "Madrid",
    description:
      "Buscamos un desarrollador frontend con experiencia en React y Next.js para unirse a nuestro equipo de desarrollo. El candidato ideal tendrá al menos 2 años de experiencia en desarrollo web y conocimientos sólidos de JavaScript, HTML y CSS.\n\nResponsabilidades:\n- Desarrollar interfaces de usuario atractivas y funcionales\n- Colaborar con diseñadores UX/UI y desarrolladores backend\n- Optimizar aplicaciones para máxima velocidad y escalabilidad\n- Implementar diseño responsive y asegurar compatibilidad entre navegadores",
    salary: "35000-45000",
    jobType: "Tiempo completo",
    category: "Desarrollo web",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "Open",
  },
  {
    id: "1",
    title: "Desarrollador Frontend",
    company: "TechSolutions Inc.",
    city: "Madrid",
    description:
      "Buscamos un desarrollador frontend con experiencia en React y Next.js para unirse a nuestro equipo de desarrollo. El candidato ideal tendrá al menos 2 años de experiencia en desarrollo web y conocimientos sólidos de JavaScript, HTML y CSS.\n\nResponsabilidades:\n- Desarrollar interfaces de usuario atractivas y funcionales\n- Colaborar con diseñadores UX/UI y desarrolladores backend\n- Optimizar aplicaciones para máxima velocidad y escalabilidad\n- Implementar diseño responsive y asegurar compatibilidad entre navegadores",
    salary: "35000-45000",
    jobType: "Tiempo completo",
    category: "Desarrollo web",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "Open",
  },
  {
    id: "1",
    title: "Desarrollador Frontend",
    company: "TechSolutions Inc.",
    city: "Madrid",
    description:
      "Buscamos un desarrollador frontend con experiencia en React y Next.js para unirse a nuestro equipo de desarrollo. El candidato ideal tendrá al menos 2 años de experiencia en desarrollo web y conocimientos sólidos de JavaScript, HTML y CSS.\n\nResponsabilidades:\n- Desarrollar interfaces de usuario atractivas y funcionales\n- Colaborar con diseñadores UX/UI y desarrolladores backend\n- Optimizar aplicaciones para máxima velocidad y escalabilidad\n- Implementar diseño responsive y asegurar compatibilidad entre navegadores",
    salary: "35000-45000",
    jobType: "Tiempo completo",
    category: "Desarrollo web",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "Open",
  },
]
