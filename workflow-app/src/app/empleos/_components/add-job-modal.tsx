"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Building, MapPin, Briefcase, Tag, DollarSign, FileText } from "lucide-react"
import type { Job } from "@/lib/types"

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  onAddJob: (job: Omit<Job, "id" | "createdAt">) => void
}

export function AddJobModal({ isOpen, onClose, onAddJob }: AddJobModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    city: "",
    description: "",
    salary: "",
    jobType: "",
    category: "",
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const jobTypes = ["Tiempo completo", "Medio tiempo", "Freelancer", "Prácticas"]
  const categories = ["Desarrollo web", "Diseño", "Marketing", "Análisis de datos", "Infraestructura"]
  const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

      if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "El título es obligatorio"
    if (!formData.company.trim()) newErrors.company = "La empresa es obligatoria"
    if (!formData.city) newErrors.city = "La ciudad es obligatoria"
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    if (!formData.salary.trim()) newErrors.salary = "El salario es obligatorio"
    if (!formData.jobType) newErrors.jobType = "El tipo de empleo es obligatorio"
    if (!formData.category) newErrors.category = "La categoría es obligatoria"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onAddJob(formData)
      setFormData({
        title: "",
        company: "",
        city: "",
        description: "",
        salary: "",
        jobType: "",
        category: "",
      })
      setActiveTab("basic")
    } else {
      // Switch to the tab with errors
      if (errors.title || errors.company || errors.city) {
        setActiveTab("basic")
      } else if (errors.description) {
        setActiveTab("description")
      } else if (errors.salary || errors.jobType || errors.category) {
        setActiveTab("details")
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#112D4E]">Publicar Oferta de Trabajo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Información Básica</TabsTrigger>
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#415771] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0979b0]" />
                  Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej: Desarrollador Frontend"
                  className={`border-[#EDECEE] ${errors.title ? "border-red-500" : ""}`}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-[#415771] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#0979b0]" />
                  Empresa o Institución
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ej: TechSolutions Inc."
                  className={`border-[#EDECEE] ${errors.company ? "border-red-500" : ""}`}
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-[#415771] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0979b0]" />
                  Ciudad
                </Label>
                <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                  <SelectTrigger id="city" className={`border-[#EDECEE] ${errors.city ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
            </TabsContent>

            <TabsContent value="description" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#415771] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0979b0]" />
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe los detalles del puesto, requisitos, responsabilidades, etc."
                  className={`min-h-[250px] border-[#EDECEE] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                <p className="text-sm text-[#8E8E8E]">
                  Consejo: Incluye información sobre responsabilidades, requisitos, beneficios y proceso de selección.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-[#415771] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#0979b0]" />
                  Salario ($)
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Ej: 30000-40000"
                  className={`border-[#EDECEE] ${errors.salary ? "border-red-500" : ""}`}
                />
                {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-[#415771] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0979b0]" />
                  Tipo de Empleo
                </Label>
                <Select value={formData.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                  <SelectTrigger id="jobType" className={`border-[#EDECEE] ${errors.jobType ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Selecciona tipo de empleo" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#415771] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#0979b0]" />
                  Categoría
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger
                    id="category"
                    className={`border-[#EDECEE] ${errors.category ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="bg-[#EDECEE]" />

          <div className="pt-4 flex justify-between gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="border-[#EDECEE] text-[#415771]">
              Cancelar
            </Button>

            <div className="flex gap-2">
              {activeTab === "basic" ? (
                <Button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className="bg-[#0979b0] hover:bg-[#0979b0]/90 text-white"
                >
                  Siguiente
                </Button>
              ) : activeTab === "description" ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("basic")}
                    className="border-[#EDECEE] text-[#415771]"
                  >
                    Anterior
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className="bg-[#0979b0] hover:bg-[#0979b0]/90 text-white"
                  >
                    Siguiente
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("description")}
                    className="border-[#EDECEE] text-[#415771]"
                  >
                    Anterior
                  </Button>
                  <Button type="submit" className="bg-[#214E83] hover:bg-[#144C8E] text-white">
                    Publicar Oferta
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
