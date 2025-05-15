"use client"

import { useState } from "react"
import { TestimonialCard } from "./testimonial-card"
import { AddTestimonialDialog } from "./add-testimonial-dialog"

// Tipos para los testimonios
export type Comment = {
  id: string
  author: string
  content: string
  date: string
}

export type Testimonial = {
  id: string
  author: string
  title: string
  description: string
  rating: number
  likes: number
  liked: boolean
  date: string
  comments: Comment[]
}

// Datos de ejemplo
const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    author: "María García",
    title: "Servicio excepcional",
    description:
      "La atención al cliente fue impecable. El equipo respondió rápidamente a todas mis preguntas y me ayudó a resolver mi problema en tiempo récord.",
    rating: 5,
    likes: 24,
    liked: false,
    date: "15 de abril, 2024",
    comments: [
      {
        id: "c1",
        author: "Carlos Mendoza",
        content: "Totalmente de acuerdo, su servicio es inigualable.",
        date: "16 de abril, 2024",
      },
    ],
  },
  {
    id: "2",
    author: "Juan Pérez",
    title: "Producto de alta calidad",
    description:
      "He probado muchos productos similares, pero este supera todas mis expectativas. La calidad es excelente y el precio es muy competitivo.",
    rating: 4,
    likes: 18,
    liked: false,
    date: "10 de abril, 2024",
    comments: [],
  },
  {
    id: "3",
    author: "Ana Martínez",
    title: "Entrega rápida y segura",
    description:
      "Recibí mi pedido antes de lo esperado y en perfectas condiciones. El empaque era seguro y el producto llegó intacto.",
    rating: 5,
    likes: 32,
    liked: true,
    date: "5 de abril, 2024",
    comments: [
      {
        id: "c2",
        author: "Roberto Sánchez",
        content: "También recibí mi pedido muy rápido. ¡Excelente servicio de envío!",
        date: "6 de abril, 2024",
      },
      {
        id: "c3",
        author: "Laura Díaz",
        content: "¿Cuánto tiempo tardó en llegar exactamente?",
        date: "7 de abril, 2024",
      },
    ],
  },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  //const [showAddForm, setShowAddForm] = useState(false)

  // Función para añadir un nuevo testimonio
  const addTestimonial = (newTestimonial: Omit<Testimonial, "id" | "likes" | "liked" | "date" | "comments">) => {
    const testimonial: Testimonial = {
      ...newTestimonial,
      id: Date.now().toString(),
      likes: 0,
      liked: false,
      date: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      comments: [],
    }

    setTestimonials([testimonial, ...testimonials])
  }

  // Función para dar like a un testimonio
  const handleLike = (id: string) => {
    setTestimonials(
      testimonials.map((testimonial) => {
        if (testimonial.id === id) {
          return {
            ...testimonial,
            likes: testimonial.liked ? testimonial.likes - 1 : testimonial.likes + 1,
            liked: !testimonial.liked,
          }
        }
        return testimonial
      }),
    )
  }

  // Función para añadir un comentario
  const addComment = (testimonialId: string, comment: string) => {
    if (!comment.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Usuario",
      content: comment,
      date: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }

    setTestimonials(
      testimonials.map((testimonial) => {
        if (testimonial.id === testimonialId) {
          return {
            ...testimonial,
            comments: [...testimonial.comments, newComment],
          }
        }
        return testimonial
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <AddTestimonialDialog onSubmit={addTestimonial} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onLike={handleLike}
            onAddComment={addComment}
          />
        ))}
      </div>
    </div>
  )
}
