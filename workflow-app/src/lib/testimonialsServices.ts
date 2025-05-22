import axios from "axios";
import type { TestimonialComment, TestimonialResponse } from "../types/interfaces";

const API_BASE = "http://localhost:8000"; // Cambia esta URL si es necesario

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllTestimonials(): Promise<TestimonialResponse[]> {
  try {
    const response = await api.get<TestimonialResponse[]>(ENDPOINTS.testimonials);
    console.log("Respuesta de la API:", response.data); // Para depuración
    return response.data.map((t) => ({
      ...t,
      comments: Array.isArray(t.comments) ? t.comments : [],
    }));
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
}

function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    console.error("Axios Error", { status, data, message: error.message });

    if (status === 400) return "Solicitud inválida. Revisa los parámetros.";
    if (status === 404) return "No se encontraron testimonios.";
    if (status === 500) return "Error del servidor. Intenta de nuevo más tarde.";
    return "Error al conectar con el servidor.";
  }
  console.error("Error desconocido:", error);
  return "Error inesperado. Por favor, intenta de nuevo.";
}
  
const ENDPOINTS = {
  userTestimonials: (id: number) => `/user/${id}/testimonials`,
  testimonials: "/testimonials",
  testimonialById: (id: number) => `/testimonials/${id}`,
  comments: "testimonials/comment",
  commentById: (id: number) => `/comment/${id}`,
};

export async function getTestimonialById(
  testimonial_id: number
): Promise<TestimonialResponse> {
  try {
    const response = await api.get<TestimonialResponse>(
      ENDPOINTS.testimonialById(testimonial_id)
    );
    const t = response.data;
    // Si quieres parsear fechas:
    // t.created_at = new Date(t.created_at).toISOString();
    return t;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function createTestimonial(data: {
  title: string;
  description: string;
  rating: number;
  id_user_source: number;
}): Promise<TestimonialResponse> {
  try {
    const response = await api.post<TestimonialResponse>(
      ENDPOINTS.testimonials,
      data
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function updateTestimonial(
  testimonial_id: number,
  data: Partial<Pick<TestimonialResponse, "title" | "description" | "rating" | "likes">>
): Promise<TestimonialResponse> {
  try {
    const response = await api.put<TestimonialResponse>(
      ENDPOINTS.testimonialById(testimonial_id),
      data
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function deleteTestimonial(
  testimonial_id: number
): Promise<void> {
  try {
    await api.delete(ENDPOINTS.testimonialById(testimonial_id));
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

// Comentarios
export async function getCommentById(
  comment_id: number
): Promise<Comment> {
  try {
    const response = await api.get<Comment>(
      ENDPOINTS.commentById(comment_id)
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}
export const createComment = async (
  commentData: {
    id_user: number;
    id_testimonial: number;
    comment: string;
  }
): Promise<TestimonialComment> => {
  try {
    console.log("Enviando comentario:", commentData);
    const response = await api.post<TestimonialComment>(
      ENDPOINTS.comments,
      commentData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data) {
      throw new Error("No se recibieron datos en la respuesta");
    }

    console.log("Respuesta de creación de comentario:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en createComment:", error);
    const errorMessage = handleAxiosError(error);
    throw new Error(`Error al crear comentario: ${errorMessage}`);
  }
};

export async function updateComment(
  comment_id: number,
  data: { id_user: number; comment: string }
): Promise<Comment> {
  try {
    const response = await api.put<Comment>(
      ENDPOINTS.commentById(comment_id),
      data
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

export async function deleteComment(comment_id: number): Promise<void> {
  try {
    await api.delete(ENDPOINTS.commentById(comment_id));
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

// Reexportar limpio
export const testimonialsServices = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
