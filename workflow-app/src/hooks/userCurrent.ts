"use client";

import { useState, useEffect } from "react";
import { AuthService } from "../lib/authServices";

/**
 * Hook personalizado para obtener el ID del usuario actual.
 * Proporciona el ID del usuario desde caché con actualizaciones automáticas.
 *
 * @returns {number|null} El ID del usuario o null si no está autenticado
 */
export function useCurrentUserId(): number | null {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Función para obtener el userId actual
    const getCurrentId = () => {
      const currentId = AuthService.getCurrentUserId();
      setUserId(currentId);
    };

    // Obtener el ID inicial
    getCurrentId();

    // Escuchar cambios de autenticación
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "currentUserId" ||
        event.key === "auth_token" ||
        event.key === "user"
      ) {
        getCurrentId();
      }
    };

    // Suscribirse a cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return userId;
}

export default useCurrentUserId;