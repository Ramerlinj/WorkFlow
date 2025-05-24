// src/lib/api/user.ts

import type { User } from "@/types/interfaces";

/**
 * Obtiene los datos de un usuario por su nombre de usuario.
 * @param username - Nombre de usuario a consultar.
 * @returns El usuario, o null si hubo un error o no existe.
 */
export async function getUser(username: string): Promise<User | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`http://localhost:8000/user/${username}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("Error al obtener el usuario:", response.statusText);
      return null;
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error("Error en getUser:", error);
    return null;
  }
}

/**
 * Actualiza los datos de un usuario existente.
 * @param username - Nombre de usuario cuyo perfil queremos actualizar.
 * @param data - Objeto con los campos a actualizar.
 * @returns El usuario actualizado, o null si hubo un error.
 */
export async function updateUser(
  username: string,
  data: Partial<
    Pick<
      User,
      | "first_name"
      | "middle_name"
      | "first_surname"
      | "second_surname"
      | "email"
      | "profile"
    >
  >
): Promise<User | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`http://localhost:8000/user/${username}`, {
      method: "PUT", // o "PATCH" si tu endpoint lo requiere
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("Error al actualizar el usuario:", response.statusText);
      return null;
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error en updateUser:", error);
    return null;
  }
}

export async function deleteUser(username: string): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:8000/user/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return false;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al eliminar usuario");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteUser:", error);
    throw error;
  }
}