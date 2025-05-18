"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building, FileText } from "lucide-react"
import type { Employment } from "@/types/interfaces"

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobId: string | null
  job: Employment | null
  onSubmit: (data: { jobId: string; coverLetter: string }) => void
}

const applicationSchema = z.object({
  coverLetter: z.string().min(50, { message: "La carta de presentación debe tener al menos 50 caracteres" }),
})

export function ApplicationModal({ isOpen, onClose, jobId, job, onSubmit }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof applicationSchema>) => {
    if (!jobId) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        ...values,
        jobId,
      })
      form.reset()
    } catch (error) {
      console.error("Error al enviar la aplicación:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#112D4E]">Aplicar a la oferta</DialogTitle>
        </DialogHeader>

        <div className="bg-[#F8F9FC] p-4 rounded-md mb-4 flex items-center gap-3">
          <Building className="w-5 h-5 text-[#0979b0]" />
          <div>
            <h3 className="font-medium text-[#112D4E]">{job.title}</h3>
            <p className="text-sm text-[#415771]">
              {job.company} - {job.location?.city}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#415771] font-medium">Carta de presentación</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[200px] border-[#EDECEE]"
                      placeholder="Escribe una breve carta de presentación explicando por qué eres el candidato ideal para este puesto..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[#8E8E8E]">
                    Explica por qué estás interesado en el puesto y qué te hace un buen candidato.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="border-[#EDECEE] text-[#415771]">
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#214E83] hover:bg-[#144C8E] text-white" disabled={isSubmitting}>
                <FileText className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar aplicación"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
