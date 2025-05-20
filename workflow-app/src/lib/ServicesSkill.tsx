import axios from "axios";
import type { UserSkillCreate, UserSkillWithName } from "@/types/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Asignar una habilidad a un usuario
export const assignSkillToUser = async (data: UserSkillCreate): Promise<void> => {
  try {
    await axios.post(`${API_URL}/assign`, data);
  } catch (err: unknown) {
    let detail = "Error desconocido al asignar la habilidad.";
    if (axios.isAxiosError(err)) {
      detail = err.response?.data?.detail || err.response?.data || err.message;
    }
    throw new Error(detail);
  }
};

// Eliminar una habilidad de un usuario
export const removeUserSkill = async (data: UserSkillCreate): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/skill/remove`, { data });
  } catch (err: unknown) {
    let detail = "Error desconocido al eliminar la habilidad.";
    if (axios.isAxiosError(err)) {
      detail = err.response?.data?.detail || err.response?.data || err.message;
    }
    throw new Error(detail);
  }
};

export const getUserSkills = async (userId: number): Promise<UserSkillWithName[]> => {
  const res = await axios.get(`${API_URL}/user/skill/${userId}`);
  return res.data;
};
