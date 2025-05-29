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

// Función para obtener el token de autenticación
function getAuthHeader(): { Authorization: string } | undefined {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

// Función para decodificar el token y obtener el ID del usuario
function getUserIdFromToken(): number | null {
  const token = localStorage.getItem("auth_token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
}

// lib/api.ts
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout = 5000
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  // Agregar headers de autorización si existen
  const authHeader = getAuthHeader();
  if (authHeader) {
    options.headers = {
      ...options.headers,
      ...authHeader,
    };
  }

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
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("No estás autenticado");
  }

  return fetchWithTimeout<Employment>(`${BASE_URL}/employment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Obtener trabajos por usuario
export async function fetchJobsByUser(userId: number): Promise<Employment[]> {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("No estás autenticado");
  }

  try {
    return fetchWithTimeout<Employment[]>(`${BASE_URL}/user/${userId}/employments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener empleos: ${error.message}`);
    }
    throw new Error("Error desconocido al obtener empleos");
  }
}

// Crear un nuevo trabajo
export async function createJob(jobData: CreateEmploymentDTO): Promise<Employment> {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("No estás autenticado");
  }

  const userId = getUserIdFromToken();
  if (!userId) {
    throw new Error("No se pudo obtener el ID del usuario");
  }

  try {
    const fullJobData = {
      ...jobData,
      id_user: userId
    };

    return fetchWithTimeout<Employment>(`${BASE_URL}/employment`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fullJobData),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al crear el empleo: ${error.message}`);
    }
    throw new Error("Error desconocido al crear el empleo");
  }
}

// Actualizar un trabajo existente
export async function updateJob(id: string, jobData: Partial<Employment>): Promise<Employment> {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("No estás autenticado");
  }

  try {
    // Verificar que el usuario sea el propietario del empleo
    const currentJob = await fetchJobById(id);
    const userId = getUserIdFromToken();
    if (!userId || currentJob.id_user !== userId) {
      throw new Error("No tienes permiso para editar este empleo");
    }

    return fetchWithTimeout<Employment>(`${BASE_URL}/employment/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...jobData,
        id_employment: parseInt(id, 10),
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar el empleo: ${error.message}`);
    }
    throw new Error("Error desconocido al actualizar el empleo");
  }
}

// Eliminar un trabajo
export async function deleteJob(id: string): Promise<{ message: string }> {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("No estás autenticado");
  }

  try {
    // Verificar que el usuario sea el propietario del empleo
    const currentJob = await fetchJobById(id);
    const userId = getUserIdFromToken();
    if (!userId || currentJob.id_user !== userId) {
      throw new Error("No tienes permiso para eliminar este empleo");
    }

    return fetchWithTimeout<{ message: string }>(`${BASE_URL}/employment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al eliminar el empleo: ${error.message}`);
    }
    throw new Error("Error desconocido al eliminar el empleo");
  }
}

// Cambiar el estado de un empleo (Open/Closed)
export async function updateJobStatus(id: string, status: 'Open' | 'Closed'): Promise<Employment> {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("No estás autenticado");
  }

  try {
    // Verificar que el usuario sea el propietario del empleo
    const currentJob = await fetchJobById(id);
    const userId = getUserIdFromToken();
    if (!userId || currentJob.id_user !== userId) {
      throw new Error("No tienes permiso para modificar este empleo");
    }

    return fetchWithTimeout<Employment>(`${BASE_URL}/employment/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        ...currentJob,
        status,
        id_employment: parseInt(id, 10)
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar el estado: ${error.message}`);
    }
    throw new Error("Error desconocido al actualizar el estado");
  }
}

