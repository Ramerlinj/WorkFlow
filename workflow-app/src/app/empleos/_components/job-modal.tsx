"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Briefcase, MapPin, DollarSign, Building, Tag, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
import { useState, useEffect } from "react"
import type { Employment } from "@/types/interfaces"
import { AuthService } from "@/lib/authServices"

interface JobModalProps {
  job: Employment | null
  isOpen: boolean
  onClose: () => void
  onApply: (jobId: string) => void
  onDelete: (jobId: string) => void
}

export function JobModal({ job, isOpen, onClose, onApply, onDelete }: JobModalProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  useEffect(() => {
    const userId = AuthService.getCurrentUserId()
    setCurrentUserId(userId)
  }, [])

  if (!job) return null

  const isOwnJob = currentUserId !== null && job.id_user === currentUserId
  const canApply = !isOwnJob && job.status === "Open"

  const confirmDelete = () => {
    onDelete(job.id_employment.toString())
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
                <span className="text-[#415771] font-medium">{job.location?.city}</span>
              </div>

              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <Briefcase className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">{job.type_job?.name}</span>
              </div>

              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <DollarSign className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">
                  {job.salary_min ? Number(job.salary_min).toFixed(2) : "0.00"}$ - {job.salary_max ? Number(job.salary_max).toFixed(2) : "0.00"}$
                </span>
              </div>

              <div className="flex items-center gap-2 bg-[#F5F5F5] p-3 rounded-md">
                <Tag className="w-5 h-5 text-[#0979b0]" />
                <span className="text-[#415771] font-medium">{job.profession?.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#8E8E8E]">
              <Calendar className="w-4 h-4" />
              <span>Publicado hace {formatDistanceToNow(job.publication_date, { locale: es })}</span>
            </div>

            <Separator className="bg-[#EDECEE]" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#112D4E]">Descripción</h3>
              <div className="text-[#415771] whitespace-pre-line leading-relaxed">{job.description}</div>
            </div>

            <Separator className="bg-[#EDECEE]" />

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-[#EDECEE] text-[#415771] hover:bg-[#F5F5F5] hover:text-[#112D4E]"
                  onClick={onClose}
                >
                  Volver
                </Button>
                {isOwnJob && (
                  <Button
                    variant="destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Eliminar oferta
                  </Button>
                )}
              </div>
              <div className="flex gap-3 items-center">
                {job.status === "Closed" ? (
                  <p className="text-red-500 text-sm">Esta oferta está cerrada y no acepta más aplicaciones</p>
                ) : isOwnJob ? (
                  <p className="text-yellow-600 text-sm">No puedes aplicar a tu propia oferta de empleo</p>
                ) : (
                  <Button
                    className="bg-[#214E83] hover:bg-[#144C8E] text-white"
                    onClick={() => onApply(job.id_employment.toString())}
                    disabled={!canApply}
                  >
                    Aplicar ahora
                  </Button>
                )}
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
