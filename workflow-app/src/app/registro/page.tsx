'use client'

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { professions } from '@/data/profession';
import { registerUser, checkEmailAvailability, checkUsernameAvailability } from '@/lib/register';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    profession: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    profession: '',
    general: ''
  });
  const [isAdult, setIsAdult] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [active, setActive] = useState(false);
  
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

  // Validate firstName and lastName
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      firstName: formData.firstName.length < 2 && formData.firstName !== '' 
        ? 'El nombre debe tener al menos 2 caracteres' 
        : '',
      lastName: formData.lastName.length < 2 && formData.lastName !== '' 
        ? 'Los apellidos deben tener al menos 2 caracteres' 
        : ''
    }));
  }, [formData.firstName, formData.lastName]);

  // Validate username
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      username: formData.username.length < 5 && formData.username !== '' 
        ? 'El nombre de usuario debe tener al menos 5 caracteres' 
        : ''
    }));
  }, [formData.username]);

  // Validate email format and availability
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(formData.email);
    setIsEmailValid(formData.email === '' || isValid);
  
    setErrors(prevErrors => ({
      ...prevErrors,
      email: !isValid && formData.email !== '' ? 'El correo electrónico no es válido' : ''
    }));

    if (isValid && formData.email !== '') {
      const checkEmail = async () => {
        try {
          const available = await checkEmailAvailability(formData.email);
          setIsEmailAvailable(available);
          setErrors(prev => ({
            ...prev,
            email: !available ? 'El correo electrónico ya está registrado' : prev.email
          }));
        } catch (error) {
          setErrors(prev => ({ ...prev, email: 'Error al verificar el correo' }));
          console.error('Error al verificar el correo:', error);
        }
      };
      checkEmail();
    } else {
      setIsEmailAvailable(true);
    }
  }, [formData.email]);

  // Validate username availability
  useEffect(() => {
    if (formData.username.length >= 5) {
      const checkUsername = async () => {
        try {
          const available = await checkUsernameAvailability(formData.username);
          setIsUsernameAvailable(available);
          setErrors(prev => ({
            ...prev,
            username: !available ? 'El nombre de usuario ya está en uso' : prev.username
          }));
        } catch (error) {
          setErrors(prev => ({ ...prev, username: 'Error al verificar el nombre de usuario' }));
          console.error('Error al verificar el nombre de usuario:', error);
        }
      };
      checkUsername();
    } else {
      setIsUsernameAvailable(true);
    }
  }, [formData.username]);

  // Validate age
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

  // Validate password strength
  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isStrong = passwordRegex.test(formData.password);
    setIsPasswordStrong(formData.password === '' || isStrong);
    
    setErrors(prev => ({
      ...prev,
      password: !isStrong && formData.password !== '' 
        ? 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales'
        : ''
    }));
  }, [formData.password]);

  // Validate password match
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

  // Validate profession
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      profession: formData.profession === '' ? 'Debe seleccionar una profesión' : ''
    }));
  }, [formData.profession]);

  // Check if form is valid
  useEffect(() => {
    const isFormValid = 
      formData.firstName.length >= 2 &&
      formData.lastName.length >= 2 &&
      formData.username.length >= 5 &&
      isEmailValid &&
      isEmailAvailable &&
      isUsernameAvailable &&
      isAdult &&
      isPasswordStrong &&
      passwordsMatch &&
      formData.profession !== '' &&
      Object.values(errors).every(error => error === '');
    
    setActive(isFormValid);
  }, [formData, isEmailValid, isEmailAvailable, isUsernameAvailable, isAdult, isPasswordStrong, passwordsMatch, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      firstName: formData.firstName.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '',
      lastName: formData.lastName.length < 2 ? 'Los apellidos deben tener al menos 2 caracteres' : '',
      username: formData.username.length < 5 ? 'El nombre de usuario debe tener al menos 5 caracteres' : '',
      email: !isEmailValid ? 'El correo electrónico no es válido' : !isEmailAvailable ? 'El correo electrónico ya está registrado' : '',
      birthDate: !isAdult ? 'Debes ser mayor de edad para registrarte' : '',
      password: !isPasswordStrong ? 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales' : '',
      confirmPassword: !passwordsMatch ? 'Las contraseñas no coinciden' : '',
      profession: formData.profession === '' ? 'Debe seleccionar una profesión' : '',
      general: ''
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === '')) {
      try {
        await registerUser({
          id_profession: parseInt(formData.profession),
          username: formData.username,
          email: formData.email,
          first_name: formData.firstName,
          middle_name: '',
          first_surname: formData.lastName,
          second_surname: '',
          date_of_birth: formData.birthDate,
          direction: '',
          password: formData.password,
        });
        router.push('/');
        
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors(prev => ({ ...prev, general: 'Error al registrar usuario' }));
      }
    }

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100 my-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-tertiary">Registrarse</h2>
        </div>
        
        {errors.general && (
          <p className="text-sm text-red-600 text-center">{errors.general}</p>
        )}
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
                className={`block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.firstName ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
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
                className={`block w-full px-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.lastName ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
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
                  className={`block w-full px-3 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.username ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                  required
                />
                {formData.username && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {isUsernameAvailable && formData.username.length >= 5 ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
          </div>
          
          {/* Correo electrónico */}
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
                className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
              {formData.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isEmailValid && isEmailAvailable ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <div className="relative">
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className={`block w-full px-3 py-2 border ${errors.birthDate ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.birthDate ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
            </div>
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
            )}
          </div>
          
          {/* Profesión */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
              Profesión
            </label>
            <div className="relative">
              <Select
                value={formData.profession}
                onValueChange={(value) => setFormData({ ...formData, profession: value })}
                required
              >
                <SelectTrigger className={`w-full px-3 py-2 border ${errors.profession ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.profession ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}>
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
            </div>
            {errors.profession && (
              <p className="mt-1 text-sm text-red-600">{errors.profession}</p>
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
                className={`block w-full px-3 py-2 pr-10 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
                minLength={8}
              />
              <Button
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales</p>
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
                className={`block w-full px-3 py-2 pr-10 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="mt-6">
            <Button
              variant='default'
              size='xl'
              type="submit"
              disabled={!active}
            >
              Registrarse
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta? <Link href="#" className="font-medium text-blue-600 hover:text-blue-800">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}