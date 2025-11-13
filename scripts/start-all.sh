#!/bin/bash

# ===================================================================
# Script para Iniciar Todo el Sistema
# ===================================================================
# Inicia backend y frontend simultáneamente
# ===================================================================

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 Iniciando Condominio360 Full                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar que estamos en el directorio correcto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Ejecuta este script desde la carpeta raíz del proyecto"
    exit 1
fi

# Función para manejar Ctrl+C
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Iniciar backend en background
echo "🔧 Iniciando backend en http://localhost:5000..."
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Esperar 3 segundos para que el backend inicie
sleep 3

# Verificar que el backend esté corriendo
if ! curl -s http://localhost:5000 > /dev/null; then
    echo "❌ Backend no pudo iniciar. Ver logs/backend.log"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✅ Backend corriendo (PID: $BACKEND_PID)${NC}"

# Iniciar frontend en background
echo "🌐 Iniciando frontend en http://localhost:5173..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}✅ Frontend corriendo (PID: $FRONTEND_PID)${NC}"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✨ Sistema Iniciado                                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Frontend:  http://localhost:5173"
echo "🔧 Backend:   http://localhost:5000"
echo ""
echo "📋 Ver logs:"
echo "   Backend:  tail -f logs/backend.log"
echo "   Frontend: tail -f logs/frontend.log"
echo ""
echo -e "${YELLOW}Presiona Ctrl+C para detener todos los servicios${NC}"
echo ""

# Mantener el script corriendo
wait
