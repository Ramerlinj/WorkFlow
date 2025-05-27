"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Building, MapPin, Briefcase, Tag, DollarSign, FileText } from "lucide-react"
import type { CreateEmploymentDTO } from "@/types/interfaces"
import { professions } from "@/data/profession"
import { locations } from "@/data/location"
import { type_jobs } from "@/data/type-job"

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  onAddJob: (job: CreateEmploymentDTO) => Promise<void>
}

type JobFormData = {
  title: string
  company: string
  city: string
  description: string
  salary_min: number
  salary_max: number
  jobType: string
  category: string
  status: string
}

type FormErrors = Partial<Record<keyof JobFormData, string>>

export function AddJobModal({ isOpen, onClose, onAddJob }: AddJobModalProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    city: "",
    description: "",
    salary_min: 0,
    salary_max: 0,
    jobType: "",
    category: "",
    status: "Open",
  })
  const [activeTab, setActiveTab] = useState<string>("basic")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null);
  const jobTypes = Object.values(type_jobs)
  const categories = Object.values(professions)
  const cities = Object.values(locations)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        company: "",
        city: "",
        description: "",
        salary_min: 0,
        salary_max: 0,
        jobType: "",
        category: "",
        status: "Open",
      })
      setErrors({})
      setActiveTab("basic")
      setIsSubmitting(false)
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof JobFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof JobFormData]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: keyof JobFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { title, company, city, description, salary_min, salary_max, jobType, category } = formData;

    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!company.trim()) newErrors.company = "La empresa es obligatoria";
    if (!city) newErrors.city = "La ciudad es obligatoria";
    else if (!locations.some((loc) => loc.id_location.toString() === city)) {
      newErrors.city = "Ciudad no válida";
    }
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!salary_min) newErrors.salary_min = "El salario mínimo es obligatorio";
    else if (isNaN(Number(salary_min))) newErrors.salary_min = "Debe ser un número válido";
    if (!salary_max) newErrors.salary_max = "El salario máximo es obligatorio";
    else if (isNaN(Number(salary_max))) newErrors.salary_max = "Debe ser un número válido";
    if (!newErrors.salary_min && !newErrors.salary_max) {
      if (Number(salary_min) > Number(salary_max)) {
        newErrors.salary_max = "El salario máximo debe ser mayor que el mínimo";
      }
    }
    if (!jobType) newErrors.jobType = "El tipo de empleo es obligatorio";
    else if (!type_jobs.some((type) => type.id_type_job.toString() === jobType)) {
      newErrors.jobType = "Tipo de empleo no válido";
    }
    if (!category) newErrors.category = "La categoría es obligatoria";
    else if (!professions.some((prof) => prof.id_profession.toString() === category)) {
      newErrors.category = "Categoría no válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dto: CreateEmploymentDTO = {
      id_type_job: parseInt(formData.jobType, 10),
      id_profession: parseInt(formData.category, 10),
      title: formData.title.trim(),
      description: formData.description.trim(),
      company: formData.company.trim(),
      salary_min: Number(formData.salary_min),
      salary_max: Number(formData.salary_max),
      id_location: parseInt(formData.city, 10),
      status: formData.status as "Open" | "Closed",
    };

    // Validaciones adicionales de tipos
    if (isNaN(dto.salary_min) || isNaN(dto.salary_max)) {
      setErrors((prev) => ({
        ...prev,
        salary_min: isNaN(dto.salary_min) ? "El salario mínimo debe ser un número" : undefined,
        salary_max: isNaN(dto.salary_max) ? "El salario máximo debe ser un número" : undefined
      }));
      return;
    }

    if (isNaN(dto.id_type_job)) {
      setErrors((prev) => ({ ...prev, jobType: "Selecciona un tipo de empleo válido" }));
      return;
    }
    if (isNaN(dto.id_profession)) {
      setErrors((prev) => ({ ...prev, category: "Selecciona una categoría válida" }));
      return;
    }
    if (isNaN(dto.id_location)) {
      setErrors((prev) => ({ ...prev, city: "Selecciona una ciudad válida" }));
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      await onAddJob(dto);
      onClose();
    } catch (error) {
      console.error("Error al crear empleo:", error);
      if (error instanceof Error) {
        setFormError(`Error al crear la oferta: ${error.message}`);
      } else {
        setFormError("Error al crear la oferta. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
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
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#415771] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0979b0]" /> Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  aria-label="Título del trabajo"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej: Desarrollador Frontend"
                  className={`border-[#EDECEE] ${errors.title ? "border-red-500" : ""}`}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              {/* Empresa */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[#415771] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#0979b0]" /> Empresa o Institución
                </Label>
                <Input
                  id="company"
                  name="company"
                  aria-label="Nombre de la empresa"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ej: TechSolutions Inc."
                  className={`border-[#EDECEE] ${errors.company ? "border-red-500" : ""}`}
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>

              {/* Ciudad */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-[#415771] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0979b0]" /> Ciudad
                </Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleSelectChange("city", value)}
                >
                  <SelectTrigger
                    id="city"
                    className={`border-[#EDECEE] ${errors.city ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id_location} value={city.id_location.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
            </TabsContent>

            <TabsContent value="description" className="space-y-4 pt-4">
              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#415771] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0979b0]" /> Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  aria-label="Descripción del puesto"
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
              {/* Salario */}
              <div className="space-y-2">
                <Label htmlFor="salary_min" className="text-[#415771] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#0979b0]" /> Salario min ($)
                </Label>
                <Input
                  id="salary_min"
                  name="salary_min"
                  aria-label="Salario mínimo en dólares"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="Ej: 30000"
                  className={`border-[#EDECEE] ${errors.salary_min ? "border-red-500" : ""}`}
                />
                <Label htmlFor="salary_max" className="text-[#415771] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#0979b0]" /> Salario max ($)
                </Label>
                <Input
                  id="salary_max"
                  name="salary_max"
                  aria-label="Salario máximo en dólares"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="Ej: 50000"
                  className={`border-[#EDECEE] ${errors.salary_max ? "border-red-500" : ""}`}
                />
                {errors.salary_max && <p className="text-red-500 text-sm">{errors.salary_max}</p>}
              </div>

              {/* Tipo de Empleo */}
              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-[#415771] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0979b0]" /> Tipo de Empleo
                </Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleSelectChange("jobType", value)}
                >
                  <SelectTrigger
                    id="jobType"
                    className={`border-[#EDECEE] ${errors.jobType ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Selecciona tipo de empleo" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.id_type_job} value={type.id_type_job.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#415771] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#0979b0]" /> Categoría
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger
                    id="category"
                    className={`border-[#EDECEE] ${errors.category ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id_profession} value={category.id_profession.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </TabsContent>
            {formError && (
              <div className="text-red-500 text-sm p-2 bg-red-100 rounded">
                {formError}
              </div>
            )}
          </Tabs>

          <Separator className="bg-[#EDECEE]" />

          {/* Acciones */}
          <div className="pt-4 flex justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#EDECEE] text-[#415771]"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <div className="flex gap-2">
              {activeTab === "basic" ? (
                <Button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className="bg-[#0979b0] hover:bg-[#0979b0]/90 text-white"
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  >
                    Anterior
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className="bg-[#0979b0] hover:bg-[#0979b0]/90 text-white"
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  >
                    Anterior
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#214E83] hover:bg-[#144C8E] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Espere...' : 'Publicar Oferta'}
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
