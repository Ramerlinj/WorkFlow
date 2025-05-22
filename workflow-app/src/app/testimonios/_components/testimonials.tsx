"use client";

import React, { useState, useEffect } from "react";
import { TestimonialCard } from "./testimonial-card";
import { AddTestimonialDialog } from "./add-testimonial-dialog";
import type { TestimonialResponse, TestimonialComment } from "@/types/interfaces";
import {
  getAllTestimonials,
  createTestimonial as apiCreateTestimonial,
  createComment as apiCreateComment,
  updateTestimonial as apiUpdateTestimonial,
} from "@/lib/testimonialsServices";
import axios from "axios";

interface TestimonialsListProps {
  authenticatedUserId: number;
}
// Función de type guard para Comment
function isTestimonialComment(obj: TestimonialComment): obj is TestimonialComment {
  return (
    obj &&
    typeof obj.id_comment === 'number' &&
    typeof obj.id_user === 'number' &&
    typeof obj.id_testimonial === 'number' &&
    typeof obj.comment === 'string' &&
    typeof obj.created_at === 'string' &&
    typeof obj.user === 'object'
  );
}

export default function TestimonialsList({ authenticatedUserId }: TestimonialsListProps) {
  const [testimonials, setTestimonials] = useState<TestimonialResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllTestimonials()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Datos de getAllTestimonials no son un array:", data);
          setError("Datos inválidos recibidos del servidor");
          setTestimonials([]);
          return;
        }
        const normalized = data.map((t) => ({
          ...t,
          comments: Array.isArray(t.comments) ? t.comments : [],
        }));
        setTestimonials(normalized);
      })
      .catch((error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message || "Error al cargar testimonios"
          : "Error desconocido al cargar testimonios";
        setError(message);
        console.error("Error en getAllTestimonials:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const addTestimonial = async (
    newData: Omit<TestimonialResponse, "id_testimonial" | "likes" | "created_at" | "comments">
  ) => {
    try {
      const created = await apiCreateTestimonial({
        ...newData,
        title: newData.title || "",
        id_user_source: authenticatedUserId,
        rating: newData.rating || 5,
        description: newData.description || "",
      });
      setTestimonials((prev) => [
        { ...created, comments: Array.isArray(created.comments) ? created.comments : [] },
        ...prev,
      ]);
      setError(null);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Error al crear testimonio"
        : "Error desconocido al crear testimonio";
      setError(message);
      console.error("Error al crear testimonio:", error);
    }
  };

  const handleLike = async (id: number) => {
    const testimonial = testimonials.find((t) => t.id_testimonial === id);
    if (!testimonial) return;

    const newLikes = testimonial.likes + 1;
    try {
      const updated = await apiUpdateTestimonial(id, { likes: newLikes });
      setTestimonials((prev) =>
        prev.map((t) => (t.id_testimonial === id ? updated : t))
      );
      setError(null);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Error al actualizar likes"
        : "Error desconocido al actualizar likes";
      setError(message);
      console.error("Error al actualizar likes:", error);
    }
  };

  const addComment = async (testimonialId: number, commentText: string) => {
    if (!commentText.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }
  
    try {
      const createdComment = await apiCreateComment({
        id_user: authenticatedUserId,
        id_testimonial: testimonialId,
        comment: commentText,
      });
  
      console.log("Comentario recibido:", createdComment);
  
      if (!isTestimonialComment(createdComment)) {
        throw new Error("Estructura de comentario inválida del servidor");
      }
  
      setTestimonials((prev) =>
        prev.map((t) => 
          t.id_testimonial === testimonialId
            ? {
                ...t,
                comments: [...(t.comments || []), createdComment]
              }
            : t
        )
      );
      setError(null);
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : "Error desconocido al agregar comentario";
      setError(message);
      console.error("Error al crear comentario:", error);
    }
  };

  if (loading) return <div className="text-center">Cargando testimonios...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-8">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="flex justify-end">
        <AddTestimonialDialog onSubmit={addTestimonial} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.length === 0 ? (
          <div className="text-center">No hay testimonios disponibles.</div>
        ) : (
          testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id_testimonial}
              testimonial={testimonial}
              onLike={() => handleLike(testimonial.id_testimonial)}
              onAddComment={(comment) => addComment(testimonial.id_testimonial, comment)}
            />
          ))
        )}
      </div>
    </div>
  );
}