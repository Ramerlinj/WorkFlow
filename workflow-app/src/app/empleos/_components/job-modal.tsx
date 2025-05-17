"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Briefcase, MapPin, DollarSign, Building, Tag, Calendar, ExternalLink, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import type { Job } from "@/lib/types"

interface JobModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onApply: (jobId: string) => void
  onDelete: (jobId: string) => void
}

export function JobModal({ job, isOpen, onClose, onApply, onDelete }: JobModalProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  if (!job) return null

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    onDelete(job.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0">
          <div className="bg-[#214E83] text-white p-6 rounded-t-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">{job.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Building className="w-5 h-5" />
                <span className="font-medium text-white/90">{job.company}</span>
              </div>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <MapPin className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">{job.city}</span>
              </div>

              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <Briefcase className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">{job.jobType}</span>
              </div>

              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <DollarSign className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">{job.salary}€</span>
              </div>

              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <Tag className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">{job.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#8E8E8E]">
              <Calendar className="w-4 h-4" />
              <span>Publicado hace {formatDistanceToNow(job.createdAt, { locale: es })}</span>
            </div>

            <Separator className="bg-[#EDECEE]" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#112D4E]">Descripción</h3>
              <div className="text-[#415771] whitespace-pre-line leading-relaxed">{job.description}</div>
            </div>

            <Separator className="bg-[#EDECEE]" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#112D4E]">Requisitos</h3>
              <ul className="list-disc pl-5 text-[#415771] space-y-2">
                <li>Experiencia mínima de 2 años en posiciones similares</li>
                <li>Conocimientos avanzados en herramientas específicas del sector</li>
                <li>Capacidad para trabajar en equipo y bajo presión</li>
                <li>Excelentes habilidades de comunicación</li>
              </ul>
            </div>

            <Separator className="bg-[#EDECEE]" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#112D4E]">Beneficios</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#DDE6F6] text-[#144C8E] hover:bg-[#DDE6F6]/80">Horario flexible</Badge>
                <Badge className="bg-[#DDE6F6] text-[#144C8E] hover:bg-[#DDE6F6]/80">Teletrabajo parcial</Badge>
                <Badge className="bg-[#DDE6F6] text-[#144C8E] hover:bg-[#DDE6F6]/80">Seguro médico</Badge>
                <Badge className="bg-[#DDE6F6] text-[#144C8E] hover:bg-[#DDE6F6]/80">Formación continua</Badge>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center sm:justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-[#EDECEE] text-[#415771] hover:bg-[#F5F5F5] hover:text-[#112D4E]"
                  onClick={onClose}
                >
                  Volver
                </Button>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-[#0979b0] text-[#0979b0] hover:bg-[#0979b0]/10">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visitar sitio web
                </Button>
                <Button className="bg-[#214E83] hover:bg-[#144C8E] text-white" onClick={() => onApply(job.id)}>
                  Aplicar ahora
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la oferta de trabajo y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
