"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { professions } from "@/data/profession"
import { motion } from "framer-motion"
import { BriefcaseIcon } from "lucide-react"

interface ProfessionWithJobCount {
  id_profession: number
  name: string
  jobCount: number
}

interface Job {
  id_profession: number
  status: string
}

export default function Category() {
  const router = useRouter()
  const [topProfessions, setTopProfessions] = useState<ProfessionWithJobCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfessionJobCounts = async () => {
      try {
        // Obtener todos los empleos
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/employments`)
        if (!response.ok) throw new Error('Error al obtener empleos')

        const jobs = await response.json()

        // Contar empleos por profesión
        const professionCounts = jobs.reduce((acc: { [key: number]: number }, job: Job) => {
          if (job.id_profession && job.status === "Open") {
            acc[job.id_profession] = (acc[job.id_profession] || 0) + 1
          }
          return acc
        }, {})

        // Combinar con la información de las profesiones y ordenar
        const professionsWithCounts = professions.map(profession => ({
          id_profession: profession.id_profession,
          name: profession.name,
          jobCount: professionCounts[profession.id_profession] || 0
        }))
          .sort((a, b) => b.jobCount - a.jobCount)
          .slice(0, 6) // Tomar solo las 6 primeras

        setTopProfessions(professionsWithCounts)
      } catch (error) {
        console.error('Error al cargar las profesiones:', error)
        setTopProfessions([])
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionJobCounts()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <section className="w-full py-20 overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4"
            style={{ background: "#DDE6F6", color: "#3F72AF" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Categorías</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading bg-clip-text text-transparent bg-gradient-to-r from-[#112D4E] to-[#3F72AF]">
            Explora oportunidades por sector
          </h2>
          <p className="text-lg text-tertiary">
            Encuentra empleos en las industrias más demandadas y con mejores perspectivas de crecimiento.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {loading ? (
            // Mostrar placeholders mientras carga
            Array(6).fill(0).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm animate-pulse"
                style={{ border: "1px solid #EDECEE" }}
                variants={item}
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </motion.div>
            ))
          ) : (
            topProfessions.map((profession) => (
              <motion.div
                key={profession.id_profession}
                onClick={() => router.push('/empleos')}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                style={{ border: "1px solid #EDECEE" }}
                variants={item}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(17, 45, 78, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#DDE6F6] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <h3 className="text-lg font-bold mb-2 text-[#112D4E] group-hover:text-[#3F72AF] transition-colors duration-300">
                  {profession.name}
                </h3>
                <p className="text-[#3F72AF] flex items-center gap-2">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span>
                    {profession.jobCount} {profession.jobCount === 1 ? 'empleo disponible' : 'empleos disponibles'}
                  </span>
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}