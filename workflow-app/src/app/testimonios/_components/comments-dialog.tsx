"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TestimonialResponse } from "@/types/interfaces"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface CommentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testimonial: TestimonialResponse
  currentUserId: number // Nuevo prop para el ID del usuario actual
}

export function CommentsDialog({ open, onOpenChange, testimonial, currentUserId }: CommentsDialogProps) {
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedComment = comment.trim()

    if (!trimmedComment) {
      setError("El comentario no puede estar vacío")
      return
    }

    try {
      const response = await fetch("http://localhost:8000/testimonials/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_user: 1, // Usar el ID del usuario actual
          id_testimonial: Number(testimonial.id_testimonial),
          comment: trimmedComment
        })
      })

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`)
      }

      // Limpiar el formulario
      setComment("")
      setError("")
      
      // Forzar recarga de los comentarios
      onOpenChange(false)
      onOpenChange(true)

    } catch (err) {
      console.error("Error al enviar el comentario:", err)
      setError("Hubo un error al enviar tu comentario. Intenta de nuevo.")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#112D4E]">
            Comentarios sobre &quot;{testimonial.title}&quot;
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[300px] pr-4">
            {testimonial.comments?.length > 0 ? (
              <div className="space-y-4">
                {testimonial.comments.map((comment) => (
                  <div key={comment.id_comment} className="rounded-lg border border-[#EDECEE] bg-[#F5F5F5] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-[#DDE6F6] text-[#112D4E]">
                        <AvatarFallback>{getInitials(comment.user.first_name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#112D4E]">
                          {comment.user.first_name} {comment.user.first_surname} {comment.user.second_surname}
                        </div>
                        <div className="text-xs text-[#8E8E8E]">
                          {new Date(comment.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#415771]">{comment.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-[#8E8E8E]">No hay comentarios todavía. Sé el primero en comentar.</p>
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmitComment} className="mt-2 flex gap-2">
            <div className="flex-1 space-y-1">
              <Textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                  setError("")
                }}
                placeholder="Añade un comentario..."
                className="min-h-[80px] resize-none border-[#EDECEE] text-sm"
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={!comment.trim()}
              className="h-[80px] bg-[#214E83] hover:bg-[#144C8E] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar comentario"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}