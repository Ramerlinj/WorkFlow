// src/lib/getUser.ts

import { User } from "@/types/user";

/**
 * 
 * @param username 
 * @returns 
 */

export async function getUser(username: string): Promise<User | null> {
  try {
    const response = await fetch(`http://localhost:5000/user/${username}`, {
      cache: 'no-store' 
    });

    if (!response.ok) {
      console.error('Error al obtener el usuario');
      return null;
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error en getUser:', error);
    return null;
  }
}
