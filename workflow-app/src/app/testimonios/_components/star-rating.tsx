import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  max?: number
  className?: string
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < rating ? "fill-[#0979b0] text-[#0979b0]" : "text-[#B8C0CA]")} />
      ))}
    </div>
  )
}
