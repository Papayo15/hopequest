#!/bin/bash

# ===================================================================
# Script de Actualización Automática
# ===================================================================
# Actualiza el proyecto desde GitHub sin perder configuración
# ===================================================================

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🔄 Actualizando Condominio360 Full                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar que estamos en un repo git
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ No es un repositorio git${NC}"
    exit 1
fi

# ===================================================================
# 1. RESPALDAR CONFIGURACIÓN
# ===================================================================

echo "📦 Respaldando configuración actual..."

# Crear carpeta de backups si no existe
mkdir -p .backups

# Respaldar .env files
if [ -f "backend/.env" ]; then
    cp backend/.env .backups/backend.env.$(date +%Y%m%d_%H%M%S)
    echo -e "${GREEN}✅ Backend .env respaldado${NC}"
fi

if [ -f "frontend/.env" ]; then
    cp frontend/.env .backups/frontend.env.$(date +%Y%m%d_%H%M%S)
    echo -e "${GREEN}✅ Frontend .env respaldado${NC}"
fi

echo ""

# ===================================================================
# 2. GUARDAR CAMBIOS LOCALES
# ===================================================================

echo "💾 Guardando cambios locales..."

# Ver si hay cambios
if ! git diff-index --quiet HEAD --; then
    git stash save "Backup automático antes de actualizar $(date)"
    STASHED=true
    echo -e "${GREEN}✅ Cambios guardados temporalmente${NC}"
else
    STASHED=false
    echo "   No hay cambios locales"
fi

echo ""

# ===================================================================
# 3. ACTUALIZAR CÓDIGO
# ===================================================================

echo "⬇️  Descargando actualizaciones desde GitHub..."

# Obtener nombre del branch actual
CURRENT_BRANCH=$(git branch --show-current)

# Fetch y pull
git fetch origin
git pull origin $CURRENT_BRANCH

echo -e "${GREEN}✅ Código actualizado${NC}"
echo ""

# ===================================================================
# 4. RESTAURAR CONFIGURACIÓN
# ===================================================================

echo "📂 Restaurando configuración..."

# Buscar los backups más recientes
LATEST_BACKEND_BACKUP=$(ls -t .backups/backend.env.* 2>/dev/null | head -1)
LATEST_FRONTEND_BACKUP=$(ls -t .backups/frontend.env.* 2>/dev/null | head -1)

if [ -n "$LATEST_BACKEND_BACKUP" ]; then
    cp "$LATEST_BACKEND_BACKUP" backend/.env
    echo -e "${GREEN}✅ Backend .env restaurado${NC}"
fi

if [ -n "$LATEST_FRONTEND_BACKUP" ]; then
    cp "$LATEST_FRONTEND_BACKUP" frontend/.env
    echo -e "${GREEN}✅ Frontend .env restaurado${NC}"
fi

echo ""

# ===================================================================
# 5. ACTUALIZAR DEPENDENCIAS
# ===================================================================

echo "📦 Actualizando dependencias..."

# Backend
echo "   Backend..."
cd backend
npm install --silent
cd ..
echo -e "${GREEN}   ✅ Backend actualizado${NC}"

# Frontend
echo "   Frontend..."
cd frontend
npm install --silent
cd ..
echo -e "${GREEN}   ✅ Frontend actualizado${NC}"

# Apps móviles (si existen)
if [ -d "mobile/ResidenteApp/node_modules" ]; then
    echo "   ResidenteApp..."
    cd mobile/ResidenteApp
    npm install --silent
    cd ../..
    echo -e "${GREEN}   ✅ ResidenteApp actualizado${NC}"
fi

if [ -d "mobile/VigilanciaApp/node_modules" ]; then
    echo "   VigilanciaApp..."
    cd mobile/VigilanciaApp
    npm install --silent
    cd ../..
    echo -e "${GREEN}   ✅ VigilanciaApp actualizado${NC}"
fi

echo ""

# ===================================================================
# 6. RESTAURAR CAMBIOS LOCALES
# ===================================================================

if [ "$STASHED" = true ]; then
    echo "🔄 Restaurando cambios locales..."
    if git stash pop; then
        echo -e "${GREEN}✅ Cambios restaurados${NC}"
    else
        echo -e "${YELLOW}⚠️  Hubo conflictos al restaurar cambios${NC}"
        echo "   Revisa manualmente los archivos en conflicto"
    fi
    echo ""
fi

# ===================================================================
# 7. VERIFICAR MIGRACIONES DE BASE DE DATOS
# ===================================================================

echo "🗄️  Verificando migraciones de base de datos..."

# Buscar archivos SQL nuevos (modificados en el último pull)
NEW_SQL_FILES=$(git diff HEAD@{1} HEAD --name-only --diff-filter=A | grep '\.sql$' || true)

if [ -n "$NEW_SQL_FILES" ]; then
    echo -e "${YELLOW}⚠️  Se encontraron nuevos archivos SQL:${NC}"
    echo "$NEW_SQL_FILES"
    echo ""
    echo "   Ejecuta manualmente las migraciones:"
    for file in $NEW_SQL_FILES; do
        echo "   psql \"\$DATABASE_URL\" -f $file"
    done
    echo ""
else
    echo "   No hay nuevas migraciones"
fi

echo ""

# ===================================================================
# 8. RESUMEN
# ===================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ Actualización Completada                               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Ver últimos commits
echo "📝 Últimos cambios:"
git log --oneline -5
echo ""

echo "🚀 Para iniciar el sistema:"
echo "   cd backend && npm run dev"
echo "   cd frontend && npm run dev"
echo ""

echo "📋 Backups guardados en: .backups/"
echo ""

echo -e "${GREEN}¡Actualización exitosa! 🎉${NC}"
echo ""
