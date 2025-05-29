import axios from 'axios';
import { Profile } from '@/types/interfaces';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getCurrentProfile(username: string, token: string): Promise<Profile> {
  try {
    console.log('Obteniendo perfil actual para:', username);
    const response = await axios.get(`${API_BASE}/profile/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Perfil actual obtenido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil actual:', error);
    throw error;
  }
}

export async function uploadImage(file: File): Promise<string> {
  try {
    console.log('Iniciando proceso de subida de imagen');
    console.log('Tipo de archivo:', file.type);
    console.log('Tamaño de archivo:', file.size, 'bytes');

    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    // Decodificar y mostrar información del token
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Información del token:', payload);
    const username = payload.sub || payload.username; // Intentamos ambos campos
    console.log('Username extraído:', username);

    if (!username) {
      throw new Error('No se pudo obtener el username del token');
    }

    // Convertir el archivo a Base64
    console.log('Convirtiendo archivo a Base64...');
    const base64 = await fileToBase64(file);
    console.log('Archivo convertido a Base64 (primeros 50 caracteres):', base64.substring(0, 50));

    // Obtener el perfil actual
    console.log('Obteniendo perfil actual...');
    const currentProfile = await getCurrentProfile(username, token);

    // Preparar datos para actualización
    const updateData = {
      about_me: currentProfile.about_me || "No tiene descripción...",
      avatar_url: base64,
      cv_url: currentProfile.cv_url || "",
      banner_color: currentProfile.banner_color || ""
    };
    console.log('Datos a enviar:', {
      ...updateData,
      avatar_url: base64.substring(0, 50) + '...' // Solo mostramos el inicio del base64
    });

    // Actualizar el perfil
    console.log('Enviando solicitud de actualización...');
    const response = await axios.put(`${API_BASE}/profile/${username}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    console.log('Respuesta del servidor:', response.data);

    if (!response.data || !response.data.avatar_url) {
      throw new Error('No se recibió la URL de la imagen en la respuesta');
    }

    return response.data.avatar_url;
  } catch (error) {
    console.error('Error detallado:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('Detalles del error de Axios:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });

      if (error.response?.status === 422) {
        const errorDetail = error.response.data.detail || 'Formato de datos inválido';
        throw new Error(`Error de validación: ${errorDetail}`);
      }
      if (error.response?.status === 404) {
        throw new Error('Perfil no encontrado');
      }
      if (error.response?.status === 413) {
        throw new Error('La imagen es demasiado grande');
      }
      if (error.response?.status === 415) {
        throw new Error('Formato de imagen no soportado');
      }
      
      const errorMessage = error.response?.data?.detail || error.message;
      throw new Error(`Error del servidor: ${errorMessage}`);
    }
    
    throw error; // Re-lanzar error original si no es de Axios
  }
}

export async function uploadCV(file: File): Promise<string> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    // Convertir el archivo a Base64
    const base64 = await fileToBase64(file);
    
    // Obtener el username del token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const username = payload.username; // Cambiado de sub a username

    // Obtener el perfil actual
    const currentProfile = await getCurrentProfile(username, token);

    // Actualizar el perfil manteniendo los valores existentes
    const response = await axios.put(`${API_BASE}/profile/${username}`, {
      about_me: currentProfile.about_me || "No tiene descripción...",
      avatar_url: currentProfile.avatar_url || "",
      cv_url: base64,
      banner_color: currentProfile.banner_color || ""
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.data || !response.data.cv_url) {
      console.log('Respuesta del servidor:', response.data);
      throw new Error('No se recibió la URL del CV');
    }

    return response.data.cv_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error completo:', error.response);
      if (error.response?.status === 422) {
        throw new Error('Formato de datos inválido. Asegúrate de que el CV sea válido.');
      }
      if (error.response?.status === 404) {
        throw new Error('Perfil no encontrado');
      }
      if (error.response?.status === 413) {
        throw new Error('El archivo es demasiado grande');
      }
      if (error.response?.status === 415) {
        throw new Error('Formato de archivo no soportado');
      }
      throw new Error(error.response?.data?.detail || 'Error al subir el CV');
    }
    throw new Error('Error al subir el CV');
  }
}

// Función auxiliar para convertir archivo a Base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      try {
        if (typeof reader.result === 'string') {
          // Eliminar el prefijo de data URL para obtener solo el Base64
          const base64 = reader.result.split(',')[1];
          if (!base64) {
            throw new Error('Error al procesar el archivo como Base64');
          }
          resolve(base64);
        } else {
          throw new Error('El resultado no es una cadena válida');
        }
      } catch (error) {
        console.error('Error en el procesamiento de Base64:', error);
        reject(error);
      }
    };
    reader.onerror = error => {
      console.error('Error en FileReader:', error);
      reject(error);
    };
  });
} 