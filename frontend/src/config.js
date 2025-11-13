export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/register`,
    profile: `${API_URL}/api/auth/profile`
  },
  condos: {
    list: `${API_URL}/api/condos`,
    byId: (id) => `${API_URL}/api/condos/${id}`,
    create: `${API_URL}/api/condos`,
    update: (id) => `${API_URL}/api/condos/${id}`,
    delete: (id) => `${API_URL}/api/condos/${id}`
  },
  pagos: {
    list: `${API_URL}/api/pagos`,
    byId: (id) => `${API_URL}/api/pagos/${id}`,
    create: `${API_URL}/api/pagos/crear`,
    verify: `${API_URL}/api/pagos/verificar`
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
