import type { CreateEmploymentDTO, Employment } from "@/types/interfaces";

// URL base de la API
const BASE_URL = "http://localhost:8000";

// Función auxiliar para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
  }
  return response.json();
} 

// lib/api.ts
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout = 5000
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return await handleResponse<T>(response);
  } catch (error) {
    throw error;
  } finally {
    clearTimeout(id);
  }
}


// Obtener todos los trabajos
export async function fetchJobs(): Promise<Employment[]> {
  return fetchWithTimeout<Employment[]>(`${BASE_URL}/employments`);
}

// Obtener trabajo por ID
export async function fetchJobById(id: string): Promise<Employment> {
  return fetchWithTimeout<Employment>(`${BASE_URL}/employments/${id}`);
}

export async function createJob(
  jobData: CreateEmploymentDTO
): Promise<Employment> {
  return fetchWithTimeout<Employment>(`${BASE_URL}/employment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),  // sólo lo que pide el DTO
  });
}


// Actualizar un trabajo existente
export async function updateJob(id: string, jobData: Employment): Promise<Employment> {
  const payload = {
    ...jobData,
    id_employment: parseInt(id, 10),
  };
  return fetchWithTimeout<Employment>(`${BASE_URL}/employment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Eliminar un trabajo
export async function deleteJob(id: string): Promise<{ message: string }> {
  return fetchWithTimeout<{ message: string }>(`${BASE_URL}/employment/${id}`, {
    method: "DELETE",
  });
}

