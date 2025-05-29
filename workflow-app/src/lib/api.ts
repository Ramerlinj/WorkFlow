import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

console.log('API Base URL:', BASE_URL) // Para depuración

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // Cambiamos a false para evitar problemas de CORS
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // Aumentamos el timeout a 15 segundos
})

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Log para depuración
    console.log(`Enviando ${config.method?.toUpperCase()} a ${config.url}`)
    return config
  },
  (error) => {
    console.error('Error en la configuración de la solicitud:', error)
    return Promise.reject(new Error("Error al configurar la solicitud"))
  }
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    // Log para depuración
    console.log(`Respuesta exitosa de ${response.config.url}:`, response.status)
    return response
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error del servidor:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      })
      
      const message = error.response.data?.detail || 
                     error.response.data?.message || 
                     `Error ${error.response.status}: ${error.response.statusText}`
      
      error.message = message
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error('Error de red:', {
        url: error.config?.url,
        method: error.config?.method,
        error: error.message
      })
      
      error.message = "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet y que el servidor esté funcionando."
    } else {
      // Error al configurar la solicitud
      console.error('Error de configuración:', error.message)
      error.message = "Error al enviar la solicitud. Por favor, inténtalo de nuevo."
    }
    
    return Promise.reject(error)
  }
)

export default api
