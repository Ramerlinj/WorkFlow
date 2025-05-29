import api from "./api"
import type { JobApplication } from "@/types/interfaces"

// Verificar conexión usando un endpoint existente
const checkServerConnection = async () => {
  try {
    // Intentamos obtener la primera página de empleos que es un endpoint que sabemos que existe
    await api.get('/employments?page=1&limit=1')
    return true
  } catch (error) {
    console.error('Error de conexión con el servidor:', error)
    return false
  }
}

// Obtener todas las aplicaciones de un usuario
export async function fetchApplicationsByUser(userId: number) {
  try {
    const res = await api.get(`/job-applications/user/${userId}`)
    return res.data
  } catch (error) {
    console.error('Error al obtener aplicaciones del usuario:', error)
    throw error
  }
}

// Obtener una aplicación específica por ID
export async function fetchApplicationById(id: number) {
  try {
    const res = await api.get(`/job-application/${id}`)
    return res.data
  } catch (error) {
    console.error('Error al obtener aplicación específica:', error)
    throw error
  }
}

// Eliminar una aplicación
export async function deleteApplication(id: number) {
  try {
    const res = await api.delete(`/job-application/${id}`)
    return res.data
  } catch (error) {
    console.error('Error al eliminar aplicación:', error)
    throw error
  }
}

// Actualizar una aplicación
export async function updateApplication(id: number, data: Partial<{ status: string; cover_letter: string }>) {
  try {
    const res = await api.put(`/job-application/${id}`, data)
    return res.data
  } catch (error) {
    console.error('Error al actualizar aplicación:', error)
    throw error
  }
}

interface CreateJobApplicationData {
  id_user: number
  id_employment: number
  cover_letter: string
  status: "Pending" | "Accepted" | "Rejected"
  application_date: string
}

export const createJobApplication = async (applicationData: CreateJobApplicationData): Promise<JobApplication> => {
  try {
    // Verificar que tenemos todos los datos necesarios
    if (!applicationData.id_user || !applicationData.id_employment || !applicationData.cover_letter) {
      throw new Error("Faltan datos requeridos para crear la aplicación")
    }

    console.log('Enviando aplicación:', applicationData)

    const response = await api.post("/job-application", applicationData)
    
    if (!response.data) {
      throw new Error("No se recibió respuesta del servidor al crear la aplicación")
    }
    
    console.log('Aplicación creada exitosamente:', response.data)
    return response.data
  } catch (error) {
    console.error('Error detallado al crear aplicación:', error)
    
    if (error.response) {
      // El servidor respondió con un código de error
      const errorMessage = error.response.data?.detail || "Error al procesar la solicitud"
      throw new Error(errorMessage)
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      throw new Error("No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet y que el servidor esté funcionando.")
    } else {
      // Error al configurar la solicitud
      throw new Error(error.message || "Error al enviar la solicitud")
    }
  }
}
