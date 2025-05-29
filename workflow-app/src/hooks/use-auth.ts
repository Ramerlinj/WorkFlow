import { useEffect, useState } from "react"
import { AuthService } from "@/lib/authServices"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setIsAuthenticated(false)
          return
        }

        const isValid = await AuthService.verifyToken()
        setIsAuthenticated(isValid)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    isAuthenticated,
    isLoading,
  }
} 