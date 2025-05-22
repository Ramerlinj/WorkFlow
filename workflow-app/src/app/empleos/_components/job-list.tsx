"use client"

import type { Dispatch, SetStateAction } from "react"
import { JobCard } from "./job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Employment } from "@/types/interfaces"
import { Plus, Search, Briefcase } from "lucide-react"

interface JobListProps {
  jobs: Employment[]
  filters: {
    city: string
    jobType: string
    category: string
    salaryMin: number
    salaryMax: number
    search: string
    sortBy: string
  }
  setFilters: Dispatch<
    SetStateAction<{
      city: string
      jobType: string
      category: string
      salaryMin: number
      salaryMax: number
      search: string
      sortBy: string
    }>
  >
  onJobClick: (job: Employment) => void
  onAddJobClick: () => void
}

export function JobList({ jobs, filters, setFilters, onJobClick, onAddJobClick }: JobListProps) {
  const filteredJobs = jobs.filter((job) => {
    const matchesCity = filters.city === "all" || job.location?.city === filters.city
    const matchesJobType = filters.jobType === "all" || job.type_job?.name === filters.jobType
    const matchesCategory = filters.category === "all" || job.type_job?.name === filters.category

    const salary_min = Number.parseInt(job.salary_min?.toString() || "0")
    const salary_max = Number.parseInt(job.salary_max?.toString() || "0")
    const matchesSalary = salary_min >= filters.salaryMin && salary_max <= filters.salaryMax

    const matchesSearch =
      !filters.search ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase())

    return matchesCity && matchesJobType && matchesCategory && matchesSalary && matchesSearch
  })

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (filters.sortBy === "newest") {
      return new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
    } else {
      return new Date(a.publication_date).getTime() - new Date(b.publication_date).getTime()
    }
  })

  return (
    <div className="flex-1 p-4 md:p-6 bg-[#F8F9FC] overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#112D4E]">Ofertas de Trabajo</h1>
            <p className="text-[#8E8E8E] mt-1">Encuentra las mejores oportunidades profesionales</p>
          </div>
          <Button onClick={onAddJobClick} className="bg-[#214E83] hover:bg-[#144C8E] text-white">
            <Plus className="mr-2 h-4 w-4" /> Publicar Oferta
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#EDECEE] mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E8E] h-4 w-4" />
              <Input
                placeholder="Buscar por título o empresa"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 border-[#EDECEE]"
              />
            </div>
            <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
              <SelectTrigger className="w-full md:w-[180px] border-[#EDECEE]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0979b0]" />
            <span className="text-[#415771] font-medium">
              {sortedJobs.length} {sortedJobs.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job) => <JobCard key={job.id_employment} job={job} onClick={() => onJobClick(job)} />)
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-[#EDECEE]">
              <p className="text-[#8E8E8E]">No se encontraron ofertas de trabajo con los filtros seleccionados.</p>
              <Button
                variant="link"
                className="text-[#0979b0] mt-2"
                onClick={() =>
                  setFilters({
                    city: "all",
                    jobType: "all",
                    category: "all",
                    salaryMin: 0,
                    salaryMax: 100000,
                    search: "",
                    sortBy: "newest",
                  })
                }
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
