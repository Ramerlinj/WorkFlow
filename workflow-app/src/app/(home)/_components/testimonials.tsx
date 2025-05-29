"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, MessageCircle, User, ChevronRight } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import type { TestimonialResponse } from "@/types/interfaces"

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialResponse[]>([])
  const [currentGroup, setCurrentGroup] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/testimonials`)
        if (!response.ok) throw new Error('Error al obtener testimonios')
        const data = await response.json()
        setTestimonials(data) // Usar todos los testimonios disponibles
      } catch (error) {
        console.error('Error:', error)
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (loading || testimonials.length === 0) return

    const totalGroups = Math.ceil(testimonials.length / 3)
    const timer = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups) // Rotar entre todos los grupos disponibles
    }, 6000) // Cambiar cada 6 segundos

    return () => clearInterval(timer)
  }, [loading, testimonials.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // Obtener el grupo actual de 3 testimonios
  const getCurrentTestimonials = () => {
    const startIndex = currentGroup * 3
    return testimonials.slice(startIndex, Math.min(startIndex + 3, testimonials.length))
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[#F8F9FC] overflow-hidden">
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
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Testimonios</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#112D4E] to-[#3F72AF]">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-tertiary">
            Descubre las experiencias de quienes ya han encontrado su oportunidad ideal.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[400px] overflow-hidden">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((skeleton) => (
                  <div key={skeleton} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-gray-100 rounded mb-4"></div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-4 h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <AnimatePresence initial={false} mode="wait" custom={1}>
                <motion.div
                  key={currentGroup}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getCurrentTestimonials().map((testimonial) => (
                      <div
                        key={testimonial.id_testimonial}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <Quote className="absolute top-4 right-4 w-6 h-6 text-[#DDE6F6] opacity-30" />

                        <div className="flex items-center gap-3 mb-4">
                          {testimonial.user_source.profile?.avatar_url ? (
                            <Image
                              src={testimonial.user_source.profile.avatar_url}
                              alt={testimonial.user_source.first_name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-[#DDE6F6] flex items-center justify-center">
                              <User className="w-6 h-6 text-[#3F72AF]" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-[#112D4E]">
                              {testimonial.user_source.first_name} {testimonial.user_source.first_surname}
                            </h3>
                            <p className="text-sm text-[#3F72AF]">
                              {testimonial.user_source.profession?.name || "Profesional"}
                            </p>
                          </div>
                        </div>

                        <h4 className="text-base font-medium text-[#3F72AF] mb-2">
                          {testimonial.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                          {testimonial.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {format(new Date(testimonial.created_at), "d 'de' MMM", { locale: es })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="flex justify-end -mt-20">
            <Link
              href="/testimonios"
              className="inline-flex cursor-pointer items-center gap-2 text-[#3F72AF] hover:text-[#112D4E] transition-colors text-lg font-medium"
            >
              Ver más testimonios
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}