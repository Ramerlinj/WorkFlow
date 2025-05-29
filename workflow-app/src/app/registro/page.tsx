"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { professions } from "@/data/profession"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { AuthService } from "@/lib/authServices"

type FormData = {
  firstName: string
  lastName: string
  username: string
  email: string
  birthDate: Date
  password: string
  confirmPassword: string
  profession: string
  location: string
}

type FormErrors = {
  firstName: string
  lastName: string
  username: string
  email: string
  birthDate: string
  password: string
  confirmPassword: string
  profession: string
  location: string
  general: string
}

// Añadir estas constantes al inicio del archivo, después de los tipos
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
]
const years = Array.from({ length: 60 }, (_, i) => 2009 - i)

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthDate: new Date(),
    password: "",
    confirmPassword: "",
    profession: "",
    location: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    profession: "",
    location: "",
    general: "",
  })

  // Validation states
  const [isAdult, setIsAdult] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordStrong, setIsPasswordStrong] = useState(false)
  const [isEmailAvailable, setIsEmailAvailable] = useState(true)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Debounced values for API calls
  const debouncedEmail = useDebounce(formData.email, 500)
  const debouncedUsername = useDebounce(formData.username, 500)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle date inputs separately
  const handleDateChange = (field: "day" | "month" | "year", value: string) => {
    const numValue = Number.parseInt(value, 10)
    const newDate = new Date(formData.birthDate)

    if (field === "day") {
      newDate.setDate(numValue || 1)
    } else if (field === "month") {
      newDate.setMonth(numValue - 1 || 0) // Months are 0-indexed in JS
    } else if (field === "year") {
      newDate.setFullYear(numValue || 2000)
    }

    setFormData((prev) => ({ ...prev, birthDate: newDate }))
  }

  // Validate name fields
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      firstName:
        formData.firstName.length < 2 && formData.firstName !== "" ? "El nombre debe tener al menos 2 caracteres" : "",
      lastName:
        formData.lastName.length < 2 && formData.lastName !== ""
          ? "Los apellidos deben tener al menos 2 caracteres"
          : "",
    }))
  }, [formData.firstName, formData.lastName])

  // Validate username
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      username:
        formData.username.length < 5 && formData.username !== ""
          ? "El nombre de usuario debe tener al menos 5 caracteres"
          : "",
    }))
  }, [formData.username])

  // Validate email format
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(formData.email)
    setIsEmailValid(formData.email === "" || isValid)

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !isValid && formData.email !== "" ? "El correo electrónico no es válido" : "",
    }))
  }, [formData.email])

  // Check email availability with debounce
  useEffect(() => {
    if (debouncedEmail && isEmailValid && debouncedEmail.includes("@")) {
      const checkEmail = async () => {
        try {
          const available = await AuthService.checkEmailAvailability(debouncedEmail)
          setIsEmailAvailable(available)
          setErrors((prev) => ({
            ...prev,
            email: !available ? "El correo electrónico ya está registrado" : prev.email,
          }))
        } catch (error) {
          console.error("Error al verificar el correo:", error)
        }
      }
      checkEmail()
    }
  }, [debouncedEmail, isEmailValid])

  // Check username availability with debounce
  useEffect(() => {
    if (debouncedUsername && debouncedUsername.length >= 5) {
      const checkUsername = async () => {
        try {
          const available = await AuthService.checkUsernameAvailability(debouncedUsername)
          setIsUsernameAvailable(available)
          setErrors((prev) => ({
            ...prev,
            username: !available ? "El nombre de usuario ya está en uso" : prev.username,
          }))
        } catch (error) {
          console.error("Error al verificar el nombre de usuario:", error)
        }
      }
      checkUsername()
    }
  }, [debouncedUsername])

  // Validate age
  useEffect(() => {
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate)
      const today = new Date()

      // Verificar si se ha seleccionado una fecha válida
      const hasSelectedDate =
        birthDate.getDate() > 0 &&
        birthDate.getMonth() >= 0 &&
        birthDate.getFullYear() > 1900;

      if (hasSelectedDate) {
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }

        const isAdultNow = age >= 16
        setIsAdult(isAdultNow)

        setErrors((prev) => ({
          ...prev,
          birthDate: !isAdultNow ? "Debes tener al menos 16 años para registrarte" : "",
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          birthDate: ""
        }))
        setIsAdult(false)
      }
    }
  }, [formData.birthDate])

  // Validate password strength
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const isStrong = passwordRegex.test(formData.password)
    setIsPasswordStrong(formData.password === "" || isStrong)

    setErrors((prev) => ({
      ...prev,
      password:
        !isStrong && formData.password !== ""
          ? "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales"
          : "",
    }))
  }, [formData.password])

  // Validate password match
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      const match = formData.password === formData.confirmPassword
      setPasswordsMatch(match)

      setErrors((prev) => ({
        ...prev,
        confirmPassword: !match ? "Las contraseñas no coinciden" : "",
      }))
    }
  }, [formData.password, formData.confirmPassword])

  // Validate profession
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      profession:
        formData.profession === "" && prev.profession !== "" ? "Debe seleccionar una profesión" : prev.profession,
    }))
  }, [formData.profession])

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return (
      formData.firstName.length >= 2 &&
      formData.lastName.length >= 2 &&
      formData.username.length >= 5 &&
      isEmailValid &&
      isEmailAvailable &&
      isUsernameAvailable &&
      isAdult &&
      isPasswordStrong &&
      passwordsMatch &&
      formData.profession !== "" &&
      Object.values(errors).every((error) => error === "")
    )
  }, [formData, isEmailValid, isEmailAvailable, isUsernameAvailable, isAdult, isPasswordStrong, passwordsMatch, errors])

  // En el frontend (RegisterForm.tsx)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      await AuthService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        middle_name: "",
        first_surname: formData.lastName,
        second_surname: "",
        date_of_birth: formData.birthDate.toISOString().split("T")[0],
        direction: formData.location,
        id_profession: Number(formData.profession),
      });

      router.push("/login");
    } catch (error: unknown) {
      console.error("Error al registrar usuario:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Error de registro",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100 my-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-tertiary">Registrarse</h2>
        </div>

        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Nombre */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
                className={`block w-full ${errors.firstName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                required
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-sm text-red-600">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ingrese sus apellidos"
                className={`block w-full ${errors.lastName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                required
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-1 text-sm text-red-600">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario
              </label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre de usuario"
                  className={`block w-full pr-10 ${errors.username ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? "username-error" : undefined}
                  required
                />
                {formData.username && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {isUsernameAvailable && formData.username.length >= 5 ? (
                      <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" aria-hidden="true" />
                    )}
                  </div>
                )}
              </div>
              {errors.username && (
                <p id="username-error" className="mt-1 text-sm text-red-600">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className={`block w-full pr-10 ${errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {formData.email && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {isEmailValid && isEmailAvailable ? (
                      <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" aria-hidden="true" />
                    )}
                  </div>
                )}
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Select
                  value={formData.birthDate.getDate().toString()}
                  onValueChange={(value) => handleDateChange("day", value)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.birthDate ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  >
                    <SelectValue placeholder="Día" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={(formData.birthDate.getMonth() + 1).toString()}
                  onValueChange={(value) => handleDateChange("month", value)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.birthDate ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  >
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value.toString()}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={formData.birthDate.getFullYear().toString()}
                  onValueChange={(value) => handleDateChange("year", value)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.birthDate ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  >
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
          </div>

          {/* Profesión */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
              Profesión
            </label>
            <Select
              value={formData.profession}
              onValueChange={(value) => setFormData({ ...formData, profession: value })}
            >
              <SelectTrigger
                className={`w-full ${errors.profession ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                aria-invalid={!!errors.profession}
                aria-describedby={errors.profession ? "profession-error" : undefined}
              >
                <SelectValue placeholder="Seleccione su profesión" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((profession) => (
                  <SelectItem key={profession.id_profession} value={profession.id_profession.toString()}>
                    {profession.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.profession && (
              <p id="profession-error" className="mt-1 text-sm text-red-600">
                {errors.profession}
              </p>
            )}
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ingrese su ubicación"
              className={`block w-full ${errors.location ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "location-error" : undefined}
              required
            />
            {errors.location && (
              <p id="location-error" className="mt-1 text-sm text-red-600">
                {errors.location}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                className={`block w-full pr-10 ${errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                aria-invalid={!!errors.password}
                aria-describedby="password-requirements password-error"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
            <p id="password-requirements" className="mt-1 text-xs text-gray-500">
              La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres
              especiales
            </p>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme su contraseña"
                className={`block w-full pr-10 ${errors.confirmPassword ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={!isFormValid || isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Registrarse"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
