"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TestimonialCard } from "./testimonial-card";
import { AddTestimonialDialog } from "./add-testimonial-dialog";
import type { TestimonialResponse, TestimonialComment, TestimonialCreate } from "@/types/interfaces";
import {
  getAllTestimonials,
  createTestimonial as apiCreateTestimonial,
  createComment as apiCreateComment,
  updateTestimonial as apiUpdateTestimonial,
} from "@/lib/testimonialsServices";
import axios from "axios";

// Función para extraer userId de un JWT guardado en localStorage
function getUserIdFromToken(): number | null {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.sub ?? null; 
  } catch {
    return null;
  }
}

// Type guard para TestimonialComment
function isTestimonialComment(obj: TestimonialComment): obj is TestimonialComment {
  return (
    obj &&
    typeof obj.id_comment === "number" &&
    typeof obj.id_user === "number" &&
    typeof obj.id_testimonial === "number" &&
    typeof obj.comment === "string" &&
    typeof obj.created_at === "string" &&
    typeof obj.user === "object"
  );
}

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<TestimonialResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener userId al montar
  const authenticatedUserId = getUserIdFromToken();

  // Cargar testimonios al montar
  useEffect(() => {
    setLoading(true);
    getAllTestimonials()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Datos inválidos recibidos del servidor");
        }
        const normalized = data.map((t) => ({
          ...t,
          comments: Array.isArray(t.comments) ? t.comments : [],
        }));
        setTestimonials(normalized);
      })
      .catch((err) => {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || "Error al cargar testimonios"
          : "Error desconocido al cargar testimonios";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Añadir nuevo testimonio
  const addTestimonial = useCallback(
    async (newData: TestimonialCreate) => {
      if (!authenticatedUserId) {
        setError("Debes iniciar sesión para crear un testimonio.");
        return;
      }
      try {
        const created = await apiCreateTestimonial({
          ...newData,
          id_user_source: authenticatedUserId,
        });
        setTestimonials((prev) => [
          { ...created, comments: Array.isArray(created.comments) ? created.comments : [] },
          ...prev,
        ]);
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || "Error al crear testimonio"
          : "Error desconocido al crear testimonio";
        setError(message);
      }
    },
    [authenticatedUserId]
  );

  // Manejar like
  const handleLike = useCallback(
    async (id: number) => {
      const testimonial = testimonials.find((t) => t.id_testimonial === id);
      if (!testimonial || testimonial.likes > 0) return;
      try {
        const updated = await apiUpdateTestimonial(id, { likes: testimonial.likes + 1 });
        setTestimonials((prev) =>
          prev.map((t) => (t.id_testimonial === id ? updated : t))
        );
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || "Error al actualizar likes"
          : "Error desconocido al actualizar likes";
        setError(message);
      }
    },
    [testimonials]
  );

  // Añadir comentario
  // eslint-disable-next-line
 const addComment = useCallback(
    async (testimonialId: number, commentText: string) => {
      if (!authenticatedUserId) {
        setError("Debes iniciar sesión para comentar.");
        return;
      }
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
        if (!isTestimonialComment(createdComment)) {
          throw new Error("Estructura de comentario inválida del servidor");
        }
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id_testimonial === testimonialId
              ? { ...t, comments: [...(t.comments || []), createdComment] }
              : t
          )
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido al agregar comentario";
        setError(message);
      }
    },
    [authenticatedUserId]
  );

  if (!authenticatedUserId) {
    return (
      <div className="text-center text-red-500">
        No se ha podido autenticar al usuario.
      </div>
    );
  }
  if (loading) return <div className="text-center">Cargando testimonios...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <AddTestimonialDialog onSubmit={addTestimonial} />
      </div>
      {testimonials.length === 0 ? (
        <div className="text-center col-span-full">
          No hay testimonios disponibles.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id_testimonial}
              testimonial={testimonial}
              onLike={() => handleLike(testimonial.id_testimonial)}
              currentUserId={authenticatedUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
