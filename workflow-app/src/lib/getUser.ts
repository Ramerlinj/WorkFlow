
import type { User } from "@/types/interfaces";

/**
 * @param username 
 * @returns 
 */

export async function getUser(username: string): Promise<User | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    const response = await fetch(`http://localhost:8000/user/${username}`, {
      cache: 'no-store' 
    });

    if (!response.ok) {
      console.error('Error al obtener el usuario');
      return null;
    }

    clearTimeout(timeoutId)
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error en getUser:', error);
    return null;
  }
}
