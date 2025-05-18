import type { CreateApplicationDTO, CreateEmploymentDTO, Employment } from "@/types/interfaces";

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
  // Construye el payload, añadiendo sólo lo que falta:
  const payload = {
    ...jobData,
    publication_date: new Date().toISOString(),
    status: "Open",
  };

  return fetchWithTimeout<Employment>(`${BASE_URL}/employment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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

// Aplicar a un trabajo
export async function applyToJob(
  jobId: string,
  applicationData: CreateApplicationDTO
): Promise<{ success: boolean; message: string }> {
  try {
    return await fetchWithTimeout<{ success: boolean; message: string }>(
      `${BASE_URL}/employment/${jobId}/apply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      }
    );
  } catch (error) {
    console.warn("Endpoint de aplicación no disponible, simulando respuesta:", error);
    return { success: true, message: "Aplicación simulada enviada con éxito" };
  }
}

// Mapeos de IDs a descripciones legibles
export const jobTypeMap: Record<number, string> = {
  0: "Tiempo completo",
  1: "Medio tiempo",
  2: "Freelancer",
  3: "Prácticas",
  4: "Temporal",
};

export const professionMap: Record<number, string> = {
  0: "Desarrollo web",
  1: "Diseño",
  2: "Marketing",
  3: "Análisis de datos",
  4: "Infraestructura",
  5: "Administración",
  6: "Ventas",
  7: "Atención al cliente",
};

export const locationMap: Record<number, string> = {
  0: "Madrid",
  1: "Barcelona",
  2: "Valencia",
  3: "Sevilla",
  4: "Bilbao",
  5: "Zaragoza",
  6: "Málaga",
  7: "Murcia",
};
