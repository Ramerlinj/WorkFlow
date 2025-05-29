// lib/authServices.ts

export const AuthService = {
    // ...register
  
    async login(username: string, password: string) {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
  
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error en el login");
      }
  
      const data = await response.json();
      localStorage.setItem("auth_token", data.access_token);
      const payload = JSON.parse(atob(data.access_token.split(".")[1]));
      localStorage.setItem("currentUserId", payload.sub);
      return data;
    },
  };
  