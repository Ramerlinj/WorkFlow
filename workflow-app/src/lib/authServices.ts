// lib/authServices.ts

import axios from "axios";
import { UserCreate, AuthResponse, User } from "@/types/interfaces";

const API_BASE = "http://localhost:8000";

export const AuthService = {
  // ——————————————————————————————————————————————————————————————
  // Registro
  // ——————————————————————————————————————————————————————————————
  async register(userData: UserCreate): Promise<User> {
    try {
      const { data } = await axios.post<User>(
        `${API_BASE}/auth/register`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data)?.detail || err.message;
        throw new Error(message);
      }
      throw new Error("Error inesperado al registrar usuario");
    }
  },

  // ——————————————————————————————————————————————————————————————
  // Login
  // ——————————————————————————————————————————————————————————————
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);

      const { data } = await axios.post<AuthResponse>(
        `${API_BASE}/auth/login`,
        form.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      // Guardar token y userId en caché
      localStorage.setItem("auth_token", data.access_token);
      const payload = JSON.parse(atob(data.access_token.split(".")[1]));
      localStorage.setItem("currentUserId", payload.sub);

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data)?.detail || err.message;
        throw new Error(message);
      }
      throw new Error("Error inesperado al iniciar sesión");
    }
  },

  // ——————————————————————————————————————————————————————————————
  // Obtener perfil del usuario logueado
  // ——————————————————————————————————————————————————————————————
  async getProfile(): Promise<User> {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("No autenticado");

    try {
      const { data } = await axios.get<User>(
        `${API_BASE}/auth/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch {
      // Si token inválido o expirado, haz logout
      this.logout();
      throw new Error("No autorizado");
    }
  },

  // ——————————————————————————————————————————————————————————————
  // Chequeos de disponibilidad
  // ——————————————————————————————————————————————————————————————
  async checkEmailAvailability(email: string): Promise<boolean> {
    const { data } = await axios.get<{ available: boolean }>(
      `${API_BASE}/user/check-availability`,
      { params: { email } }
    );
    return data.available;
  },

  async checkUsernameAvailability(username: string): Promise<boolean> {
    const { data } = await axios.get<{ available: boolean }>(
      `${API_BASE}/user/check-availability`,
      { params: { username } }
    );
    return data.available;
  },

  // ——————————————————————————————————————————————————————————————
  // Cache / Estado
  // ——————————————————————————————————————————————————————————————
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("currentUserId");
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("auth_token"));
  },

  getCurrentUserId(): number | null {
    const id = localStorage.getItem("currentUserId");
    return id ? parseInt(id, 10) : null;
  },
};
