import api from "./api"


// Obtener todas las aplicaciones de un usuario
export async function fetchApplicationsByUser(userId: number) {
  const res = await api.get(`/job-applications/user/${userId}`)
  return res.data
}

// Obtener una aplicación específica por ID
export async function fetchApplicationById(id: number) {
  const res = await api.get(`/job-application/${id}`)
  return res.data
}

// Eliminar una aplicación
export async function deleteApplication(id: number) {
  const res = await api.delete(`/job-application/${id}`)
  return res.data
}

// Actualizar una aplicación
export async function updateApplication(id: number, data: Partial<{ status: string; cover_letter: string }>) {
  const res = await api.put(`/job-application/${id}`, data)
  return res.data
}

export const createJobApplication = async (applicationData: {
  id_user: number
  id_employment: number
  cover_letter: string
  status: "Pending" | "Accepted" | "Rejected"
  application_date: string // tipo ISO
}) => {
  const response = await api.post("/job-application", applicationData)
  return response.data
}
