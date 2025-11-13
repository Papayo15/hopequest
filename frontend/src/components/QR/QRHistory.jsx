import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function QRHistory() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('todos'); // todos, activos, usados, expirados

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/qr/historial`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistorial(response.data.historial || []);
    } catch (err) {
      setError('Error al cargar el historial');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelarCodigo = async (idCodigo) => {
    if (!confirm('¿Estás seguro de cancelar este código QR?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/qr/cancelar/${idCodigo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Código QR cancelado exitosamente');
      cargarHistorial(); // Recargar
    } catch (err) {
      alert(err.response?.data?.error || 'Error al cancelar el código');
    }
  };

  const getEstadoBadge = (codigo) => {
    const now = new Date();
    const expiracion = new Date(codigo.fecha_expiracion);

    if (codigo.usado) {
      return <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">✓ Usado</span>;
    } else if (expiracion < now) {
      return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">⏰ Expirado</span>;
    } else {
      return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">✅ Activo</span>;
    }
  };

  const historialFiltrado = historial.filter(codigo => {
    if (filtro === 'todos') return true;
    const now = new Date();
    const expiracion = new Date(codigo.fecha_expiracion);

    if (filtro === 'activos') return !codigo.usado && expiracion >= now;
    if (filtro === 'usados') return codigo.usado;
    if (filtro === 'expirados') return !codigo.usado && expiracion < now;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header con filtros */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Mi Historial de Códigos QR</h2>
        <button
          onClick={cargarHistorial}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          🔄 Actualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['todos', 'activos', 'usados', 'expirados'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista */}
      {historialFiltrado.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">No hay códigos QR en esta categoría</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historialFiltrado.map(codigo => (
            <div
              key={codigo.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{codigo.nombre_visitante}</h3>
                    {getEstadoBadge(codigo)}
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Condominio:</strong> {codigo.nombre_condominio}
                      {codigo.numero_unidad && ` - Unidad ${codigo.numero_unidad}`}
                    </p>
                    {codigo.documento_visitante && (
                      <p><strong>Documento:</strong> {codigo.documento_visitante}</p>
                    )}
                    {codigo.telefono_visitante && (
                      <p><strong>Teléfono:</strong> {codigo.telefono_visitante}</p>
                    )}
                    <p>
                      <strong>Creado:</strong>{' '}
                      {new Date(codigo.created_at).toLocaleString('es-ES')}
                    </p>
                    <p>
                      <strong>Expira:</strong>{' '}
                      {new Date(codigo.fecha_expiracion).toLocaleString('es-ES')}
                    </p>
                    {codigo.fecha_uso && (
                      <p className="text-green-600">
                        <strong>Usado:</strong>{' '}
                        {new Date(codigo.fecha_uso).toLocaleString('es-ES')}
                        {codigo.validado_por_nombre && ` por ${codigo.validado_por_nombre}`}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {codigo.codigo}
                    </code>
                  </div>
                </div>

                {/* Acciones */}
                <div className="ml-4">
                  {!codigo.usado && new Date(codigo.fecha_expiracion) > new Date() && (
                    <button
                      onClick={() => cancelarCodigo(codigo.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación (si es necesario) */}
      {historialFiltrado.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Mostrando {historialFiltrado.length} de {historial.length} códigos
        </div>
      )}
    </div>
  );
}
