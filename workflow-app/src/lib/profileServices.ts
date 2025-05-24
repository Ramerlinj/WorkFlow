import type { Profile } from "@/types/interfaces";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
// Cambia la función getProfile para usar username
export async function getProfile(username: string): Promise<Profile | null> {
  try {
    const res = await fetch(`${API_BASE}/profile/${username}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error en getProfile:", err);
    return null;
  }
}

// Cambia updateProfile para usar username
export async function updateProfile(
  username: string,
  updates: {
    about_me: string;
    avatar_url: string;
    cv_url: string;
    id_profile?: number;  // Hacer opcional si no se usará
    id_user?: number;     // Hacer opcional si no se usará
  }
): Promise<Profile | null> {
  try {
    const res = await fetch(`${API_BASE}/profile/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Error al actualizar");
    return await res.json();
  } catch (err) {
    console.error("Error en updateProfile:", err);
    return null;
  }
}