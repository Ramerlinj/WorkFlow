"use client"

import type { Dispatch, SetStateAction } from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Tag, Filter, Banknote, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { locations } from "@/data/location"
import { type_jobs } from "@/data/type-job"
import { professions } from "@/data/profession"

interface JobSidebarProps {
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
}

export function JobSidebar({ filters, setFilters }: JobSidebarProps) {

  //agregarle otra, todos 
  const cities = [...locations.map(location => location.name), "Todos"]

  const jobTypes = [...type_jobs.map((jobType) => jobType.name), "Todos"]
  const profession = [...professions.map((profession) => profession.name), "Todos"]

  const formatSalary = (value: number) => {
    return `${value.toLocaleString("es-ES")}€`
  }

  const resetFilters = () => {
    setFilters({
      city: "Todos",
      jobType: "Todos",
      category: "Todos",
      salaryMin: 0,
      salaryMax: 100000,
      search: "",
      sortBy: "newest",
    });
  };
  return (
    <Sidebar className="border-r border-[#EDECEE]">
      <SidebarHeader className="mt-20 flex items-center justify-between p-4 border-b border-[#EDECEE]">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#0979b0]" />
          <h2 className="text-xl font-bold text-[#112D4E]">Filtros</h2>
        </div>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0979b0]" />
              <Label htmlFor="city" className="text-[#415771] font-medium">
                Ciudad
              </Label>
            </div>
            <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
              <SelectTrigger id="city" className="bg-white w-full border-[#EDECEE]">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city === "Todos" ? "all" : city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0979b0]" />
              <Label htmlFor="jobType" className="text-[#415771] font-medium">
                Tipo de empleo
              </Label>
            </div>
            <Select value={filters.jobType} onValueChange={(value) => setFilters({ ...filters, jobType: value })}>
              <SelectTrigger id="jobType" className="bg-white w-full border-[#EDECEE]">
                <SelectValue placeholder="Selecciona tipo de empleo" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type === "Todos" ? "all" : type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#0979b0]" />
              <Label htmlFor="category" className="text-[#415771] font-medium">
                Categoría
              </Label>
            </div>
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger id="category" className="bg-white w-full border-[#EDECEE]">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {profession.map((profession) => (
                  <SelectItem key={profession} value={profession === "Todos" ? "all" : profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-[#0979b0]" />
              <Label className="text-[#415771] font-medium">Rango salarial</Label>
            </div>
            <div className="px-2">
            <Slider
              value={[filters.salaryMin, filters.salaryMax]}  // Controlado con value no defaultValue
              max={100000}
              step={1000}
              minStepsBetweenThumbs={1}
              onValueChange={(value: number[]) => {  // Agrego tipo explícito
                setFilters({
                  ...filters,
                  salaryMin: value[0],
                  salaryMax: value[1],
                });
              }}
              className="my-6"
/>
              <div className="flex justify-between text-sm text-[#8E8E8E]">
                <span>{formatSalary(filters.salaryMin)}</span>
                <span>{formatSalary(filters.salaryMax)}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-[#EDECEE]" />

          <Button
            variant="outline"
            className="w-full border-[#EDECEE] text-[#415771] hover:bg-[#F5F5F5]"
            onClick={resetFilters}
          >
            Limpiar filtros
          </Button>

          <div className="bg-[#DDE6F6] p-4 rounded-lg mt-6">
            <h3 className="font-medium text-[#112D4E] mb-2">¿Buscas talento?</h3>
            <p className="text-sm text-[#415771] mb-3">
              Publica tu oferta de trabajo y encuentra a los mejores profesionales.
            </p>
            <Button
              className="w-full bg-[#214E83] hover:bg-[#144C8E] text-white"
              onClick={() => {
                // Cerrar el sidebar en móvil si está abierto
                const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
                if (window.innerWidth < 768 && sidebarTrigger) {
                  sidebarTrigger.click()
                }
                // Simular clic en el botón de agregar oferta
                const addJobButton = document.querySelector("button:has(.lucide-plus)") as HTMLButtonElement
                if (addJobButton) {
                  addJobButton.click()
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Publicar Oferta
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
