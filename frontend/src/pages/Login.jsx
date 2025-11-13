import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones básicas
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(API_ENDPOINTS.auth.login, {
        email,
        password
      });

      // Guardar token y datos del usuario
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirigir al dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error de login:", err);
      setError(
        err.response?.data?.error || "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin} className="card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Bienvenido de vuelta a Condominio360
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="loading-spinner mr-2"></span>
                  Iniciando sesión...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Regístrate aquí
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
