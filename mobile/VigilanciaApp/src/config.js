// Configuración de la API

// IMPORTANTE: Cambiar esta URL según el entorno
export const API_URL = __DEV__
  ? 'http://localhost:5000'  // Desarrollo local
  : 'https://tu-backend.onrender.com';  // Producción

// Para testing en dispositivo físico, usa tu IP local:
// export const API_URL = 'http://192.168.1.X:5000';

export const TIMEOUT = 10000; // 10 segundos
