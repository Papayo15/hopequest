import { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function QRGenerator({ condominios }) {
  const [formData, setFormData] = useState({
    id_condominio: '',
    id_unidad: '',
    nombre_visitante: '',
    documento_visitante: '',
    telefono_visitante: '',
    motivo_visita: '',
    horas_validez: 24
  });

  const [qrGenerado, setQrGenerado] = useState(null);
  const [qrImage, setQrImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrGenerado(null);
    setQrImage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/qr/generar`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const qrData = response.data.codigo_qr;
      setQrGenerado(qrData);

      // Generar imagen QR
      const qrImageUrl = await QRCode.toDataURL(qrData.codigo, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrImage(qrImageUrl);

      // Limpiar formulario
      setFormData({
        id_condominio: formData.id_condominio,
        id_unidad: '',
        nombre_visitante: '',
        documento_visitante: '',
        telefono_visitante: '',
        motivo_visita: '',
        horas_validez: 24
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al generar código QR');
    } finally {
      setLoading(false);
    }
  };

  const descargarQR = () => {
    const link = document.createElement('a');
    link.download = `QR-${qrGenerado.nombre_visitante}.png`;
    link.href = qrImage;
    link.click();
  };

  const compartirQR = async () => {
    if (navigator.share && qrGenerado) {
      try {
        const blob = await (await fetch(qrImage)).blob();
        const file = new File([blob], `QR-${qrGenerado.nombre_visitante}.png`, { type: 'image/png' });

        await navigator.share({
          title: 'Código QR de Acceso',
          text: `Código QR para ${qrGenerado.nombre_visitante}\nVálido hasta: ${new Date(qrGenerado.fecha_expiracion).toLocaleString('es-ES')}`,
          files: [file]
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulario */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Generar Código QR</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Condominio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condominio *
            </label>
            <select
              name="id_condominio"
              value={formData.id_condominio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar condominio...</option>
              {condominios.map(condo => (
                <option key={condo.id} value={condo.id}>
                  {condo.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Nombre Visitante */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Visitante *
            </label>
            <input
              type="text"
              name="nombre_visitante"
              value={formData.nombre_visitante}
              onChange={handleChange}
              required
              minLength={2}
              placeholder="Ej: Juan Pérez"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Documento de Identidad
            </label>
            <input
              type="text"
              name="documento_visitante"
              value={formData.documento_visitante}
              onChange={handleChange}
              placeholder="Ej: 12345678"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono_visitante"
              value={formData.telefono_visitante}
              onChange={handleChange}
              placeholder="Ej: +1234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo de la Visita
            </label>
            <textarea
              name="motivo_visita"
              value={formData.motivo_visita}
              onChange={handleChange}
              rows={3}
              placeholder="Ej: Visita familiar, delivery, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Horas de validez */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Válido por (horas)
            </label>
            <select
              name="horas_validez"
              value={formData.horas_validez}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 hora</option>
              <option value={2}>2 horas</option>
              <option value={4}>4 horas</option>
              <option value={8}>8 horas</option>
              <option value={24}>24 horas</option>
              <option value={48}>48 horas</option>
              <option value={72}>3 días</option>
              <option value={168}>1 semana</option>
            </select>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generando...' : '🎫 Generar Código QR'}
          </button>
        </form>
      </div>

      {/* QR Generado */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {qrGenerado ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              ✅ Código QR Generado
            </h2>

            {/* Imagen QR */}
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <img
                src={qrImage}
                alt="Código QR"
                className="mx-auto"
              />
            </div>

            {/* Información */}
            <div className="text-left bg-blue-50 p-4 rounded-lg mb-4 space-y-2">
              <p className="text-sm">
                <strong>Visitante:</strong> {qrGenerado.nombre_visitante}
              </p>
              <p className="text-sm">
                <strong>Estado:</strong>{' '}
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {qrGenerado.estado}
                </span>
              </p>
              <p className="text-sm">
                <strong>Válido hasta:</strong>{' '}
                {new Date(qrGenerado.fecha_expiracion).toLocaleString('es-ES')}
              </p>
              <p className="text-xs text-gray-500 mt-2 font-mono break-all">
                {qrGenerado.codigo}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="space-y-2">
              <button
                onClick={descargarQR}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                📥 Descargar QR
              </button>
              {navigator.share && (
                <button
                  onClick={compartirQR}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  📤 Compartir QR
                </button>
              )}
              <button
                onClick={() => setQrGenerado(null)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                ➕ Generar Otro
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <p className="text-lg">El código QR aparecerá aquí</p>
            <p className="text-sm mt-2">Completa el formulario y genera tu código</p>
          </div>
        )}
      </div>
    </div>
  );
}
