import type { Skill, Link, LinkType, User } from "@/types/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Helper genérico para hacer peticiones y parsear JSON, lanzar error si status != 2xx
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${text}`);
  }

  // Si no hay body (204), devolvemos un objeto vacío
  if (res.status === 204) {
    return {} as T;
  }
  return await res.json();
}

// -------------------- Link Types --------------------

/** Obtiene todos los tipos de enlace desde el backend */
export function getAllLinkTypes(): Promise<LinkType[]> {
  return request<LinkType[]>("/link-types/");
}

// -------------------- Links CRUD --------------------

/** Obtiene todos los links (o los de un usuario concreto si userId != null) */
export function getLinks(userId?: number): Promise<Link[]> {
  const endpoint = userId != null ? `/links/user/${userId}` : "/links/";
  return request<Link[]>(endpoint);
}

/** Crea un nuevo link */
export function createLink(payload: Omit<Link, "id_link">): Promise<Link> {
  return request<Link>("/links/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Actualiza un link existente */
export function updateLink(
  id_link: number,
  payload: Omit<Link, "id_link">
): Promise<Link> {
  return request<Link>(`/links/${id_link}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** Elimina un link por su ID */
export function deleteLink(id_link: number): Promise<void> {
  return request<void>(`/links/${id_link}`, {
    method: "DELETE",
  });
}

/** Reemplaza todos los links de un usuario (usa PUT /user/{id}/links/) */
export async function updateUserLinks(
  userId: number,
  links: Link[]
): Promise<void> {
  await request<void>(`/user/${userId}/links/`, {
    method: "PUT",
    body: JSON.stringify({ links }),
  });
}

// -------------------- Skills CRUD --------------------

/** Obtiene todas las skills */
export function getAllSkills(): Promise<Skill[]> {
  return request<Skill[]>("/skills/");
}

/** Crea una nueva skill */
export function createSkill(payload: Omit<Skill, "id_skill">): Promise<Skill> {
  return request<Skill>("/skills/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Actualiza una skill existente */
export function updateSkill(
  id_skill: number,
  payload: Partial<Omit<Skill, "id_skill">>
): Promise<Skill> {
  return request<Skill>(`/skills/${id_skill}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** Elimina una skill por su ID */
export function deleteSkill(id_skill: number): Promise<void> {
  return request<void>(`/skills/${id_skill}`, {
    method: "DELETE",
  });
}

/** Reemplaza todas las skills de un usuario (usa PUT /user/{id}/skills/) */
export async function updateUserSkills(
  userId: number,
  skills: Skill[]
): Promise<void> {
  await request<void>(`/user/${userId}/skills/`, {
    method: "PUT",
    body: JSON.stringify({ skills }),
  });
}

// -------------------- Usuarios --------------------

/** Obtiene los datos de un usuario por su username */
export function getUserData(username: string): Promise<User> {
  return request<User>(`/user/${username}`, { method: "GET" });
}
