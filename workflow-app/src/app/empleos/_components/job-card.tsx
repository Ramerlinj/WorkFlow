"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Job } from "@/lib/types"

interface JobCardProps {
  job: Job
  onClick: () => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      className="bg-white rounded-lg border border-[#EDECEE] p-5 hover:shadow-md transition-all cursor-pointer hover:border-[#B8C0CA]"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
        <h3 className="text-lg font-semibold text-[#112D4E]">{job.title}</h3>
        <div className="flex items-center text-sm text-[#8E8E8E]">
          <Calendar className="w-4 h-4 mr-1 text-[#8E8E8E]" />
          <span>Hace {formatDistanceToNow(job.createdAt, { locale: es })}</span>
        </div>
      </div>

      <p className="text-[#3F72AF] font-medium mb-3">{job.company}</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center text-[#415771] text-sm bg-[#F8F9FC] px-2 py-1 rounded-md">
          <MapPin className="w-4 h-4 mr-1 text-[#0979b0]" />
          {job.city}
        </div>
        <div className="flex items-center text-[#415771] text-sm bg-[#F8F9FC] px-2 py-1 rounded-md">
          <Briefcase className="w-4 h-4 mr-1 text-[#0979b0]" />
          {job.jobType}
        </div>
        <div className="flex items-center text-[#415771] text-sm bg-[#F8F9FC] px-2 py-1 rounded-md">
          <DollarSign className="w-4 h-4 mr-1 text-[#0979b0]" />
          {job.salary}€
        </div>
      </div>

      <p className="text-[#415771] line-clamp-2 mb-3">{job.description}</p>

      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-[#DDE6F6] text-[#144C8E] border-none">
          {job.category}
        </Badge>
        <span className="text-sm text-[#0979b0] font-medium hover:underline">Ver detalles →</span>
      </div>
    </div>
  )
}
