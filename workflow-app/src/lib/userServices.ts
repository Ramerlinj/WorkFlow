import axios from "axios";
import type { SkillResponse, Link, LinkType, UserLink } from "@/types/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función genérica para manejar respuestas
async function request<T>(promise: Promise<{ data: T }>): Promise<T> {
  try {
    const { data } = await promise;
    return data;
  } catch (error: unknown) {
    const message =
      (error as { response: { data: string } })?.response?.data ||
      (error as { response: { statusText: string } })?.response?.statusText ||
      (error as { message: string })?.message;
    throw new Error(`API error: ${message}`);
  }
}
// Ahora recibimos userId como primer parámetro
export async function saveUserLinks(
  userId: number,
  previewLinks: UserLink[],
  deletedLinks: number[]
): Promise<void> {
  // Ya no derivamos userId de previewLinks[0]
  if (!userId) {
    throw new Error("ID de usuario no definido");
  }

  // 1) Borrar los marcados
  for (const id_link of deletedLinks) {
    const res = await fetch(`${API_URL}/link/${id_link}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Error al eliminar enlace:", err);
      throw new Error("Error al eliminar enlace");
    }
  }

  // 2) Crear los nuevos (id_link === 0)
  for (const link of previewLinks) {
    if (!link.id_link || link.id_link === 0) {
      const body = {
        id_user: userId,
        id_link_type: link.id_link_type,
        url: link.url,
        id_link: link.id_link, // puedes omitirlo si tu backend no lo necesita
      };
      const res = await fetch(`${API_URL}/link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Error al crear enlace:", err);
        throw new Error("Error al crear nuevo enlace");
      }
    }
  }
}


export function getAllLinkTypes(): Promise<LinkType[]> {
  return request(api.get("/link_types"));
}

export function getLinks(userId?: number): Promise<Link[]> {
  const endpoint = userId != null ? `/links/user/${userId}` : "/links";
  return request(api.get(endpoint));
}

export function createLink(payload: Omit<Link, "id_link">): Promise<Link> {
  return request(api.post("/links", payload));
}


export function deleteLink(id_link: number): Promise<void> {
  return request(api.delete(`/link/${id_link}`));
}


// === Skills ===

export function getAllSkills(): Promise<SkillResponse[]> {
  return request(api.get("/skills"));
}
