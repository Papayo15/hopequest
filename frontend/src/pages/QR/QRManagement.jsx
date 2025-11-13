import { useState, useEffect } from 'react';
import axios from 'axios';
import QRGenerator from '../../components/QR/QRGenerator';
import QRHistory from '../../components/QR/QRHistory';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function QRManagement() {
  const [activeTab, setActiveTab] = useState('generar');
  const [condominios, setCondominios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCondominios();
  }, []);

  const cargarCondominios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/condos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCondominios(response.data.condominios || []);
    } catch (error) {
      console.error('Error al cargar condominios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Códigos QR
        </h1>
        <p className="mt-2 text-gray-600">
          Genera códigos QR para tus visitantes y controla los accesos
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('generar')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'generar'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            📱 Generar QR
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'historial'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            📋 Mi Historial
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'generar' && (
          <QRGenerator condominios={condominios} />
        )}
        {activeTab === 'historial' && (
          <QRHistory />
        )}
      </div>
    </div>
  );
}
