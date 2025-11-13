import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validaciones
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      setLoading(false);
      return;
    }

    try {
      await axios.post(API_ENDPOINTS.auth.register, {
        name: form.name,
        email: form.email,
        password: form.password
      });

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Error de registro:", err);
      setError(
        err.response?.data?.error || "Error al registrarse. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
              Crear Cuenta
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Únete a Condominio360 gratis
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-4">
              ¡Registro exitoso! Redirigiendo al login...
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                placeholder="Juan Pérez"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 8 caracteres, incluye mayúsculas y números
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="btn-success w-full py-3 text-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="loading-spinner mr-2"></span>
                  Registrando...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
            >
              ← Volver al inicio
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
