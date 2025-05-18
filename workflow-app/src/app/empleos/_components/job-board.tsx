"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { JobSidebar } from "./job-sidebar"
import { JobList } from "./job-list"
import { JobModal } from "./job-modal"
import { AddJobModal } from "./add-job-modal"
import { ApplicationModal } from "./application-modal"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import {
  fetchJobs,
  createJob,
  deleteJob,
  applyToJob,
} from "@/lib/api"
import type { CreateEmploymentDTO, Employment } from "@/types/interfaces"
import { Loader2 } from "lucide-react"


export function JobBoard() {
  const { toast } = useToast()
  const [selectedJob, setSelectedJob] = useState<Employment | null>(null)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [applyingToJobId, setApplyingToJobId] = useState<string | null>(null)
  const [jobs, setJobs] = useState<Employment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      const data = await fetchJobs() // devuelve Employment[]
      setJobs(data)
    } catch (err) {
      console.error("Error loading jobs:", err)
      setError("No se pudieron cargar las ofertas de trabajo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenJobModal = (job: Employment) => {
    setSelectedJob(job)
    setIsJobModalOpen(true)
  }

  const handleAddJob = async (
    newJobData: CreateEmploymentDTO
  ) => {
    try {
      const created: Employment = await createJob(newJobData);
      setJobs([created, ...jobs]);
      setIsAddJobModalOpen(false);
      toast({ 
        title: "Oferta publicada",
        description: "La oferta de trabajo ha sido publicada correctamente.",
      });
    } catch (err) {
      console.error("Error al crear la oferta:", err);
      toast({
        title: "Error",
        description: "No se pudo publicar la oferta.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId)
      setJobs((prev) => prev.filter((j) => j.id_employment.toString() !== jobId))
      setIsJobModalOpen(false)
      toast({
        title: "Oferta eliminada",
        description: "La oferta de trabajo ha sido eliminada correctamente.",
      })
    } catch (err) {
      console.error("Error al eliminar:", err)
      toast({
        title: "Error",
        description: "No se pudo eliminar la oferta.",
        variant: "destructive",
      })
    }
  }

  const handleApplyToJob = (jobId: string) => {
    setApplyingToJobId(jobId)
    setIsJobModalOpen(false)
    setIsApplicationModalOpen(true)
  }

  const handleSubmitApplication = async (applicationData: { jobId: string; coverLetter: string }) => {
    try {
      await applyToJob(applicationData.jobId, { coverLetter: applicationData.coverLetter })
      setIsApplicationModalOpen(false)
      toast({
        title: "Aplicación enviada",
        description: "Tu aplicación ha sido enviada correctamente.",
      })
    } catch (err) {
      console.error("Error al enviar la aplicación:", err)
      toast({
        title: "Error",
        description: "No se pudo enviar la aplicación.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FC]">
        <Loader2 className="h-12 w-12 animate-spin text-[#214E83]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FC]">
        <div className="bg-white p-6 rounded-lg border border-[#EDECEE] text-center">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <Button onClick={loadJobs}>Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
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
        <AddJobModal
          isOpen={isAddJobModalOpen}
          onClose={() => setIsAddJobModalOpen(false)}
          onAddJob={handleAddJob}
        />
        <ApplicationModal
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          jobId={applyingToJobId}
          onSubmit={handleSubmitApplication}
          job={jobs.find((j) => j.id_employment.toString() === applyingToJobId) ?? null}
        />
      </div>
    </SidebarProvider>
  )
}
