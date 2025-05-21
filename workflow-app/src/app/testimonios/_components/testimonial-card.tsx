"use client"

import { useState } from "react"
import { Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TestimonialResponse } from "@/types/interfaces"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { CommentsDialog } from "./comments-dialog"
import { StarRating } from "./star-rating"

interface TestimonialCardProps {
  testimonial: TestimonialResponse
  onLike: (id: string) => void
  onAddComment: (id: string, comment: string) => void
}

export function TestimonialCard({ testimonial, onLike, onAddComment }: TestimonialCardProps) {
  const [showCommentsDialog, setShowCommentsDialog] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="flex flex-col rounded-lg border border-[#EDECEE] bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-[#DDE6F6] text-[#112D4E]">
            <AvatarFallback>{getInitials(testimonial.user_source.first_name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-[#112D4E]">{testimonial.user_source.first_name} {testimonial.user_source.second_surname} {testimonial.user_source.first_surname} {testimonial.user_source.second_surname}</h3>
            <p className="text-sm text-[#8E8E8E]">{testimonial.user_source.username}</p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      <div className="flex-1 px-6 pb-4">
        <h4 className="mb-2 text-lg font-semibold text-[#112D4E]">{testimonial.title}</h4>
        <p className="text-[#415771]">{testimonial.description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-[#EDECEE] px-6 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(testimonial.id_testimonial.toString())}
          className={cn("flex items-center gap-1 text-[#8E8E8E]", testimonial.likes && "text-red-500")}
        >
          <Heart className={cn("h-4 w-4", testimonial.likes && "fill-current")} />
          <span>{testimonial.likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCommentsDialog(true)}
          className="flex items-center gap-1 text-[#8E8E8E]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{testimonial.comments?.length}</span>
        </Button>
      </div>

      <CommentsDialog
        open={showCommentsDialog}
        onOpenChange={setShowCommentsDialog}
        testimonial={testimonial}
        onAddComment={onAddComment}
      />
    </div>
  )
}
