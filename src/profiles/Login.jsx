import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de login
    console.log('Credenciales:', credentials);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda - Login */}
      <div className="w-1/2 bg-emerald-600 p-8 flex items-center justify-center relative">
        {/* Logo CICLO superior */}
        <div className="absolute top-8 left-8">
          <img 
            src="/images/logo-ciclo.jpg"
            alt="CICLO Logo" 
            className="w-16 h-16 rounded-full bg-white p-1"
          />
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-lg shadow-xl p-8 w-96">
          <h2 className="text-xl text-gray-700 mb-6">¿Ya tienes una cuenta?</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Correo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-200"
            >
              Acceder
            </button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <a href="/register" className="text-emerald-600 hover:text-emerald-700 block">
              Registrarse
            </a>
            <a href="/forgot-password" className="text-emerald-600 hover:text-emerald-700 block">
              Olvidé mi contraseña
            </a>
          </div>
        </div>
      </div>

      {/* Sección derecha - Imagen de fondo y logo */}
      <div className="w-1/2 bg-emerald-600 relative">
        {/* Imagen de fondo semitransparente */}
        <div className="absolute inset-0 bg-emerald-600 bg-opacity-80">
          <img 
            src="/images/background.jpg"
            alt="Background" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        
        {/* Logo FactuWeb centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-6xl text-white font-semibold">FactuWeb</h1>
            <img 
              src="/images/logo-factuweb.jpg"
              alt="FactuWeb Icon" 
              className="w-20 h-20 bg-white p-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;