"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { AddTestimonialForm } from "./add-testimonial-form"
import { TestimonialCreate } from "@/types/interfaces"

interface AddTestimonialDialogProps {
  onSubmit: (testimonial: TestimonialCreate) => void
}

export function AddTestimonialDialog({ onSubmit }: AddTestimonialDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (testimonial: TestimonialCreate) => {
    onSubmit(testimonial)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#214E83] hover:bg-[#144C8E] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Testimonio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#112D4E]">Comparte tu experiencia</DialogTitle>
          <DialogDescription className="text-[#8E8E8E]">
            Cuéntanos sobre tu experiencia y ayuda a otros usuarios a tomar decisiones informadas.
          </DialogDescription>
        </DialogHeader>
        <AddTestimonialForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
