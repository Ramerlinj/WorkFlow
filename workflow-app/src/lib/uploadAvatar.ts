export async function uploadAvatarGetUrl(file: File): Promise<string | null> {
    try {
      // Enviamos el archivo al backend (ej. /api/avatar/upload)
      const formData = new FormData();
      formData.append("avatar", file);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/avatar/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        console.error("Error al subir el avatar");
        return null;
      }
  
      const { imageUrl } = await response.json();
  
      return imageUrl; // URL lista para guardar en la base de datos
    } catch (error) {
      console.error("Error subiendo avatar:", error);
      return null;
    }
  }
  