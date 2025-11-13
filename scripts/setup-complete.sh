#!/bin/bash

# ===================================================================
# Script de Instalación Completa - Condominio360 Full
# ===================================================================
# Este script instala y configura todo el sistema automáticamente
# ===================================================================

set -e  # Salir si hay errores

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 Condominio360 Full - Instalación Automática           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ===================================================================
# 1. VERIFICAR REQUISITOS
# ===================================================================

echo "📋 Verificando requisitos..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "   Instala desde: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js debe ser versión 18 o superior${NC}"
    echo "   Versión actual: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# Verificar Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git $(git --version | cut -d' ' -f3)${NC}"

echo ""

# ===================================================================
# 2. CONFIGURAR BACKEND
# ===================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  💻 Configurando Backend                                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd backend

# Instalar dependencias
echo "📦 Instalando dependencias del backend..."
npm install --silent

# Verificar .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No se encontró archivo .env${NC}"
    echo "   Creando desde .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}   ⚠️  IMPORTANTE: Edita backend/.env con tus credenciales${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
fi

# Verificar DATABASE_URL
if grep -q "DATABASE_URL=postgresql://tu_usuario" .env; then
    echo -e "${RED}❌ DATABASE_URL no está configurado en .env${NC}"
    echo "   Edita backend/.env y agrega tu connection string de Neon.tech"
    exit 1
fi

echo -e "${GREEN}✅ Backend configurado${NC}"
cd ..

echo ""

# ===================================================================
# 3. CONFIGURAR FRONTEND
# ===================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🌐 Configurando Frontend                                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd frontend

# Instalar dependencias
echo "📦 Instalando dependencias del frontend..."
npm install --silent

# Crear .env si no existe
if [ ! -f ".env" ]; then
    echo "   Creando .env..."
    echo "VITE_API_URL=http://localhost:5000" > .env
fi

echo -e "${GREEN}✅ Frontend configurado${NC}"
cd ..

echo ""

# ===================================================================
# 4. VERIFICAR BASE DE DATOS
# ===================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🗄️  Verificando Base de Datos                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Extraer DATABASE_URL
DATABASE_URL=$(grep DATABASE_URL backend/.env | cut -d '=' -f2)

if command -v psql &> /dev/null; then
    echo "📊 Verificando conexión a la base de datos..."

    if psql "$DATABASE_URL" -c "SELECT 1;" &> /dev/null; then
        echo -e "${GREEN}✅ Conexión a base de datos exitosa${NC}"

        # Verificar si las tablas existen
        TABLE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" | xargs)

        if [ "$TABLE_COUNT" -eq 0 ]; then
            echo -e "${YELLOW}⚠️  Base de datos vacía. Necesitas ejecutar:${NC}"
            echo "   psql \"\$DATABASE_URL\" -f backend/database_init.sql"
            echo "   psql \"\$DATABASE_URL\" -f backend/database_qr.sql"
        else
            echo -e "${GREEN}✅ Base de datos inicializada ($TABLE_COUNT tablas)${NC}"
        fi
    else
        echo -e "${RED}❌ No se pudo conectar a la base de datos${NC}"
        echo "   Verifica DATABASE_URL en backend/.env"
    fi
else
    echo -e "${YELLOW}⚠️  psql no está instalado, saltando verificación de DB${NC}"
    echo "   Instala PostgreSQL: brew install postgresql"
fi

echo ""

# ===================================================================
# 5. RESUMEN
# ===================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ Instalación Completada                                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "📍 Estado de la instalación:"
echo ""
echo -e "${GREEN}✅ Backend configurado${NC}"
echo "   - Dependencias instaladas"
echo "   - Variables de entorno configuradas"
echo ""
echo -e "${GREEN}✅ Frontend configurado${NC}"
echo "   - Dependencias instaladas"
echo "   - API URL configurada"
echo ""

# ===================================================================
# 6. SIGUIENTES PASOS
# ===================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 Siguientes Pasos                                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "1️⃣  Inicializar base de datos (si no lo hiciste):"
echo "   psql \"\$DATABASE_URL\" -f backend/database_init.sql"
echo "   psql \"\$DATABASE_URL\" -f backend/database_qr.sql"
echo ""

echo "2️⃣  Iniciar backend (terminal 1):"
echo "   cd backend && npm run dev"
echo ""

echo "3️⃣  Iniciar frontend (terminal 2):"
echo "   cd frontend && npm run dev"
echo ""

echo "4️⃣  Abrir en navegador:"
echo "   http://localhost:5173"
echo ""

echo "📚 Documentación:"
echo "   - INSTALACION_COMPLETA.md"
echo "   - docs/INTEGRACION_QR.md"
echo ""

echo -e "${GREEN}¡Listo para usar! 🎉${NC}"
echo ""
