"use client"

import { JobBoard } from "./_components/job-board"
import { Toaster } from "sonner"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FC]">
      <Toaster position="top-right" richColors />
      <JobBoard />
    </main>
  )
}
