// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        nombre: userData.nombre,
        apellido: userData.apellido,
        ruc: userData.ruc,
        telefono: userData.telefono,
        direccion: userData.direccion,
        email: userData.correo,
        password: userData.password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};