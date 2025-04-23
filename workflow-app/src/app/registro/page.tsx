'use client'

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  });
  const [isAdult, setIsAdult] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  
  // Validación de email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(formData.email);
    setIsEmailValid(formData.email === '' || isValid);
  
    setErrors(prevErrors => ({
      ...prevErrors,
      email: !isValid && formData.email !== '' ? 'El correo electrónico no es válido' : ''
    }));
  }, [formData.email]);
  
  
  // Validación de mayoría de edad
  useEffect(() => {
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      const isAdultNow = age >= 18;
      setIsAdult(isAdultNow);
  
      if (!isAdultNow && formData.birthDate !== '') {
        setErrors(prev => ({ ...prev, birthDate: 'Debes ser mayor de edad para registrarte' }));
      } else {
        setErrors(prev => ({ ...prev, birthDate: '' }));
      }
    }
  }, [formData.birthDate]);
  
  
  // Validación de coincidencia de contraseñas
    // Validación de coincidencia de contraseñas

useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      const match = formData.password === formData.confirmPassword;
      setPasswordsMatch(match);
      
      setErrors(prev => ({
        ...prev,
        confirmPassword: match ? '' : 'Las contraseñas no coinciden'
      }));
    }
  }, [formData.password, formData.confirmPassword]);
  
  
  // Validar todo el formulario
  
  const handleSubmit = () => {
    return null
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100 my-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800">Registrarse</h2>
        </div>
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Nombre */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            {/* Apellidos */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ingrese sus apellidos"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                className={`block w-full px-3 py-2 border ${!isEmailValid ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${!isEmailValid ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
              {formData.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isEmailValid ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {!isEmailValid && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${formData.birthDate && !isAdult ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${formData.birthDate && !isAdult ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
              required
            />
            {formData.birthDate && !isAdult && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
            )}
          </div>
          
          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
          </div>
          
          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme su contraseña"
                className={`block w-full px-3 py-2 pr-10 border ${formData.confirmPassword && !passwordsMatch ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${formData.confirmPassword && !passwordsMatch ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
            >
              Registrarse
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta? <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
}