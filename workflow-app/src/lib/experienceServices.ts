
import axios from "axios";
import type { WorkExperience } from "@/types/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getUserExperiences = async (userId: number): Promise<WorkExperience[]> => {
  const res = await axios.get<WorkExperience[]>(`${API_URL}/user/experiences/${userId}`);
  return res.data;
};

export const createExperience = async (exp: WorkExperience): Promise<WorkExperience> => {
  const res = await axios.post<WorkExperience>(`${API_URL}/experience`, exp);
  return res.data;
};

export const deleteExperience = async (id_experience: number): Promise<void> => {
  await axios.delete(`${API_URL}/experience/${id_experience}`);
};
