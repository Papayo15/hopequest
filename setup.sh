#!/bin/bash

# ===========================================
# Wisdom Quest - Script de Setup Automatizado
# ===========================================

echo ""
echo "🌍 ======================================"
echo "   Wisdom Quest - Setup Automático"
echo "========================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar sistema operativo
OS="$(uname -s)"
case "${OS}" in
    Darwin*)    MACHINE=Mac;;
    Linux*)     MACHINE=Linux;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

print_info "Sistema operativo detectado: $MACHINE"
echo ""

# ========== PASO 1: Verificar/Instalar Homebrew (solo Mac) ==========
if [ "$MACHINE" = "Mac" ]; then
    print_info "Verificando Homebrew..."
    if ! command -v brew &> /dev/null; then
        print_warning "Homebrew no está instalado. Instalando..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        if [ $? -eq 0 ]; then
            print_success "Homebrew instalado correctamente"
        else
            print_error "Error instalando Homebrew"
            exit 1
        fi
    else
        print_success "Homebrew ya está instalado"
    fi
    echo ""
fi

# ========== PASO 2: Verificar/Instalar Node.js ==========
print_info "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_warning "Node.js no está instalado. Instalando..."

    if [ "$MACHINE" = "Mac" ]; then
        brew install node
    elif [ "$MACHINE" = "Linux" ]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi

    if [ $? -eq 0 ]; then
        print_success "Node.js instalado correctamente"
    else
        print_error "Error instalando Node.js"
        print_info "Por favor, instala Node.js manualmente desde: https://nodejs.org/"
        exit 1
    fi
else
    NODE_VERSION=$(node --version)
    print_success "Node.js ya está instalado (versión: $NODE_VERSION)"
fi
echo ""

# Verificar versión de Node.js
REQUIRED_NODE_VERSION=18
NODE_MAJOR_VERSION=$(node --version | cut -d'.' -f1 | sed 's/v//')

if [ "$NODE_MAJOR_VERSION" -lt "$REQUIRED_NODE_VERSION" ]; then
    print_error "Node.js versión $REQUIRED_NODE_VERSION o superior es requerida"
    print_info "Versión actual: $(node --version)"
    print_info "Por favor, actualiza Node.js"
    exit 1
fi

# ========== PASO 3: Verificar npm ==========
print_info "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
else
    NPM_VERSION=$(npm --version)
    print_success "npm está instalado (versión: $NPM_VERSION)"
fi
echo ""

# ========== PASO 4: Instalar dependencias del proyecto ==========
print_info "Instalando dependencias del proyecto..."
print_warning "Esto puede tardar 3-5 minutos..."
echo ""

npm install

if [ $? -eq 0 ]; then
    print_success "Dependencias instaladas correctamente"
else
    print_error "Error instalando dependencias"
    print_info "Intenta ejecutar manualmente: npm install"
    exit 1
fi
echo ""

# ========== PASO 5: Verificar archivo .env ==========
print_info "Verificando configuración de Firebase..."
if [ ! -f .env ]; then
    print_warning "Archivo .env no encontrado. Creando desde template..."
    cp .env.example .env
    print_success "Archivo .env creado"
    print_warning "IMPORTANTE: Edita el archivo .env con tus credenciales de Firebase"
    print_info "Ver guía: docs/FIREBASE_SETUP.md"
else
    print_success "Archivo .env ya existe"
fi
echo ""

# ========== PASO 6: Verificar Expo CLI ==========
print_info "Verificando Expo CLI..."
if ! command -v expo &> /dev/null; then
    print_info "Instalando Expo CLI globalmente..."
    npm install -g expo-cli

    if [ $? -eq 0 ]; then
        print_success "Expo CLI instalado"
    else
        print_warning "No se pudo instalar Expo CLI globalmente"
        print_info "No es crítico, puedes usar 'npx expo' en su lugar"
    fi
else
    EXPO_VERSION=$(expo --version)
    print_success "Expo CLI ya está instalado (versión: $EXPO_VERSION)"
fi
echo ""

# ========== PASO 7: Verificar estructura del proyecto ==========
print_info "Verificando estructura del proyecto..."
REQUIRED_DIRS=("src" "assets" "docs")
ALL_DIRS_EXIST=true

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        print_error "Directorio faltante: $dir"
        ALL_DIRS_EXIST=false
    fi
done

if [ "$ALL_DIRS_EXIST" = true ]; then
    print_success "Estructura del proyecto correcta"
else
    print_error "Estructura del proyecto incompleta"
    exit 1
fi
echo ""

# ========== RESUMEN FINAL ==========
echo ""
echo "🎉 ======================================"
echo "   Setup Completado Exitosamente"
echo "========================================"
echo ""
print_success "Node.js: $(node --version)"
print_success "npm: $(npm --version)"
print_success "Dependencias: Instaladas"
print_success "Proyecto: Listo para usar"
echo ""

# ========== PRÓXIMOS PASOS ==========
echo "📋 Próximos Pasos:"
echo ""
echo "1️⃣  Configurar Firebase (si aún no lo has hecho):"
echo "   ${BLUE}nano .env${NC}"
echo "   Ver guía: ${BLUE}docs/FIREBASE_SETUP.md${NC}"
echo ""
echo "2️⃣  Iniciar el proyecto:"
echo "   ${GREEN}npm start${NC}"
echo ""
echo "3️⃣  Escanear QR con Expo Go app en tu teléfono"
echo "   iOS: https://apps.apple.com/app/expo-go/id982107779"
echo "   Android: https://play.google.com/store/apps/details?id=host.exp.exponent"
echo ""
echo "4️⃣  Para compilar APK:"
echo "   ${GREEN}npm run build:android${NC}"
echo ""
echo "📚 Documentación completa: ${BLUE}docs/${NC}"
echo ""
echo "🚀 ¡Que comience la aventura educativa!"
echo ""
