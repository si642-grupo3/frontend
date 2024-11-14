import React, { useState } from 'react';
import { authService } from '../services/authService';

const Register = () => {
 const [formData, setFormData] = useState({
   nombre: '',
   apellido: '',
   ruc: '',
   telefono: '',
   direccion: '',
   correo: '',
   password: '',
   confirmPassword: '',
   termsAccepted: false,
   privacyAccepted: false
 });

 const [errors, setErrors] = useState({});
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsSubmitting(true);
   setErrors({});

   try {
     // Validaciones
     if (formData.password !== formData.confirmPassword) {
       setErrors(prev => ({...prev, password: 'Las contraseñas no coinciden'}));
       return;
     }

     if (!formData.termsAccepted || !formData.privacyAccepted) {
       setErrors(prev => ({...prev, terms: 'Debes aceptar los términos y condiciones'}));
       return;
     }

     const response = await authService.register(formData);
     console.log('Registro exitoso:', response);
     alert('¡Registro exitoso!');
     // Aquí podrías redirigir al login
     
   } catch (error) {
     console.error('Error en el registro:', error);
     setErrors(prev => ({
       ...prev, 
       submit: 'Error al registrar usuario. Por favor intente nuevamente.'
     }));
   } finally {
     setIsSubmitting(false);
   }
 };

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: type === 'checkbox' ? checked : value
   }));
   // Limpiar error del campo cuando el usuario empiece a escribir
   if (errors[name]) {
     setErrors(prev => {
       const newErrors = {...prev};
       delete newErrors[name];
       return newErrors;
     });
   }
 };

 return (
   <div className="min-h-screen bg-white">
     {/* Header con logo */}
     <div className="bg-emerald-600 p-3">
       <div className="flex items-center gap-2">
         <img 
           src="/images/logo-factuweb.jpg"
           alt="FactuWeb Icon"
           className="w-8 h-8 bg-white p-1 rounded-full"
         />
         <span className="text-white text-lg">FactuWeb</span>
       </div>
     </div>

     {/* Contenido principal */}
     <div className="max-w-5xl mx-auto px-4 pt-8">
       {/* Título */}
       <div className="text-center mb-12">
         <h1 className="text-2xl text-emerald-600 font-normal mb-4">
           Registrarse
         </h1>
         <div className="h-1.5 bg-emerald-600 rounded-full"></div>
       </div>

       <form onSubmit={handleSubmit}>
         <div className="grid grid-cols-2 gap-8">
           {/* Columna izquierda - Datos */}
           <div>
             <h2 className="text-emerald-600 font-normal mb-6">Datos</h2>
             <div className="space-y-4">
               <input
                 type="text"
                 name="nombre"
                 placeholder="Nombre"
                 className="w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
                 value={formData.nombre}
                 onChange={handleChange}
                 required
               />

               <input
                 type="text"
                 name="apellido"
                 placeholder="Apellido"
                 className="w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
                 value={formData.apellido}
                 onChange={handleChange}
                 required
               />

               <input
                 type="text"
                 name="ruc"
                 placeholder="Ruc"
                 className="w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
                 value={formData.ruc}
                 onChange={handleChange}
                 required
               />

               <input
                 type="tel"
                 name="telefono"
                 placeholder="Teléfono"
                 className="w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
                 value={formData.telefono}
                 onChange={handleChange}
                 required
               />

               <input
                 type="text"
                 name="direccion"
                 placeholder="Dirección"
                 className="w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
                 value={formData.direccion}
                 onChange={handleChange}
                 required
               />

               <input
                 type="email"
                 name="correo"
                 placeholder="Correo"
                 className="w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
                 value={formData.correo}
                 onChange={handleChange}
                 required
               />
             </div>
           </div>

           {/* Columna derecha - Contraseña */}
           <div>
             <h2 className="text-emerald-600 font-normal mb-6">Contraseña</h2>
             <div className="space-y-4">
               <div className="relative">
                 <input
                   type="password"
                   name="password"
                   placeholder="Contraseña"
                   className={`w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none pr-10 ${
                     errors.password ? 'border-red-500' : ''
                   }`}
                   value={formData.password}
                   onChange={handleChange}
                   required
                 />
                 <button 
                   type="button"
                   className="absolute right-2 top-1/2 -translate-y-1/2"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                   </svg>
                 </button>
               </div>

               <div className="relative">
                 <input
                   type="password"
                   name="confirmPassword"
                   placeholder="Confirmar contraseña"
                   className={`w-full py-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none pr-10 ${
                     errors.password ? 'border-red-500' : ''
                   }`}
                   value={formData.confirmPassword}
                   onChange={handleChange}
                   required
                 />
                 <button 
                   type="button"
                   className="absolute right-2 top-1/2 -translate-y-1/2"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                   </svg>
                 </button>
               </div>

               {errors.password && (
                 <p className="text-red-500 text-sm">{errors.password}</p>
               )}

               {/* Checkboxes de términos */}
               <div className="space-y-4 mt-8">
                 <label className="flex items-center gap-3">
                   <input
                     type="checkbox"
                     name="termsAccepted"
                     className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                     checked={formData.termsAccepted}
                     onChange={handleChange}
                     required
                   />
                   <span className="text-sm">Acepto los términos y condiciones</span>
                 </label>

                 <label className="flex items-center gap-3">
                   <input
                     type="checkbox"
                     name="privacyAccepted"
                     className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                     checked={formData.privacyAccepted}
                     onChange={handleChange}
                     required
                   />
                   <span className="text-sm">Acepto términos de privacidad</span>
                 </label>

                 {errors.terms && (
                   <p className="text-red-500 text-sm">{errors.terms}</p>
                 )}
               </div>

               {/* Error general */}
               {errors.submit && (
                 <div className="text-red-500 text-sm text-center">
                   {errors.submit}
                 </div>
               )}

               {/* Botón Registrar */}
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className={`w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition duration-200 mt-8 ${
                   isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                 }`}
               >
                 {isSubmitting ? 'Registrando...' : 'Registrar'}
               </button>
             </div>
           </div>
         </div>
       </form>
     </div>
   </div>
 );
};

export default Register;