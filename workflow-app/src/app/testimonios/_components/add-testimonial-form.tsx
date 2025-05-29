"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TestimonialCreate } from "@/types/interfaces"
import { Star } from "lucide-react"

interface AddTestimonialFormProps {
  onSubmit: (testimonial: TestimonialCreate) => void
}

export function AddTestimonialForm({ onSubmit }: AddTestimonialFormProps) {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [rating, setRating] = useState<number>(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription) {
      return
    }
    onSubmit({
      title: trimmedTitle,
      description: trimmedDescription,
      rating

    })

    // Reset form
    setTitle("")
    setDescription("")
    setRating(5)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-[#112D4E]">
          Título de tu opinión
        </Label>
        <Input
          id="title"
          aria-label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resumen de tu experiencia"
          required
          className="border-[#EDECEE]"
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-[#112D4E]">
          Descripción
        </Label>
        <Textarea
          id="description"
          aria-label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Comparte los detalles de tu experiencia"
          required
          className="min-h-[120px] resize-none border-[#EDECEE]"
        />
      </div>

      {/* Calificación */}
      <div className="space-y-2">
        <Label className="text-[#112D4E]">Calificación</Label>
        <div className="flex items-center gap-4">
          <div className="flex cursor-pointer">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                role="button"
                aria-label={`${value} estrellas`}
                className={`h-6 w-6 transition-colors ${
                  value <= rating
                    ? "fill-[#0979b0] text-[#0979b0]"
                    : "text-[#B8C0CA]"
                }`}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
          <span className="text-sm text-[#8E8E8E]">
            {rating} de 5 estrellas
          </span>
        </div>
      </div>

      {/* Botón */}
      <Button
        type="submit"
        className="mt-6 w-full bg-[#214E83] hover:bg-[#144C8E] text-white"
      >
        Publicar Testimonio
      </Button>
    </form>
  )
}
