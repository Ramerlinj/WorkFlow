"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building, FileText, CheckCircle2 } from "lucide-react"
import type { Employment } from "@/types/interfaces"
import { createJobApplication } from "@/lib/applicationServices"
import { AuthService } from "@/lib/authServices"
import axios from "axios"

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobId: string | null
  job: Employment | null
}

const applicationSchema = z.object({
  cover_letter: z
    .string()
    .min(50, { message: "La carta de presentación debe tener al menos 50 caracteres" })
    .max(500, { message: "La carta de presentación no debe superar los 500 caracteres" }),
})

export function ApplicationModal({ isOpen, onClose, jobId, job }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [charCount, setCharCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { cover_letter: "" },
  })

  useEffect(() => {
    const id = AuthService.getCurrentUserId()
    if (id) setUserId(id)
  }, [])

  const handleSubmit = async (values: z.infer<typeof applicationSchema>) => {
    if (!job || !jobId || !userId) return

    setIsSubmitting(true)
    try {
      await createJobApplication({
        id_user: userId,
        id_employment: parseInt(jobId, 10),
        cover_letter: values.cover_letter,
        status: "Pending",
        application_date: new Date().toISOString(),
      })
      setSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Respuesta completa del 400:", err.response?.data)
        form.setError("cover_letter", {
          type: "manual",
          message: "Error al enviar la aplicación. Por favor, inténtalo de nuevo.",
        })
      } else {
        console.error("Error desconocido:", err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#112D4E]">
            {submitted ? "¡Aplicación enviada!" : "Aplicar a la oferta"}
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <>
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
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cover_letter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#415771] font-medium">Carta de presentación</FormLabel>
                      <FormControl>
                        <Textarea
                          maxLength={500}
                          className="min-h-[200px] border-[#EDECEE]"
                          placeholder="Escribe una breve carta de presentación..."
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setCharCount(e.target.value.length)
                          }}
                        />
                      </FormControl>
                      <div className="flex justify-between text-sm text-[#8E8E8E] mt-1">
                        <FormDescription>
                          Explica por qué estás interesado en el puesto y qué te hace un buen candidato.
                        </FormDescription>
                        <span>{charCount}/500</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-[#EDECEE] text-[#415771]"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#214E83] hover:bg-[#144C8E] text-white"
                    disabled={isSubmitting}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Enviando..." : "Enviar aplicación"}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium text-[#112D4E] text-center">
              Gracias por tu aplicación. ¡Te contactaremos pronto!
            </p>
            <p>Se paciente, te contactaremos pronto!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
