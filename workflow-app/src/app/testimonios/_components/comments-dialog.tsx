"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Testimonial } from "./testimonials"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface CommentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testimonial: Testimonial
  onAddComment: (id: string, comment: string) => void
}

export function CommentsDialog({ open, onOpenChange, testimonial, onAddComment }: CommentsDialogProps) {
  const [comment, setComment] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      onAddComment(testimonial.id, comment)
      setComment("")
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
          <DialogTitle className="text-[#112D4E]">Comentarios sobre "{testimonial.title}"</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[300px] pr-4">
            {testimonial.comments.length > 0 ? (
              <div className="space-y-4">
                {testimonial.comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border border-[#EDECEE] bg-[#F5F5F5] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-[#DDE6F6] text-[#112D4E]">
                        <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#112D4E]">{comment.author}</div>
                        <div className="text-xs text-[#8E8E8E]">{comment.date}</div>
                      </div>
                    </div>
                    <p className="text-[#415771]">{comment.content}</p>
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
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Añade un comentario..."
              className="min-h-[80px] flex-1 resize-none border-[#EDECEE] text-sm"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!comment.trim()}
              className="h-[80px] bg-[#214E83] hover:bg-[#144C8E]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
