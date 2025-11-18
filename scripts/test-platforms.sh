#!/bin/bash

# 🧪 Test Platforms Script
# Facilita el testing en diferentes plataformas

set -e

echo "🎮 Hope Quest - Platform Tester"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing dependencies...${NC}"
    npm install
fi

# Menu
echo "Selecciona una plataforma para testear:"
echo ""
echo "  1) 🌐 Web (navegador)"
echo "  2) 🤖 Android (emulador)"
echo "  3) 🍎 iOS (simulador)"
echo "  4) 📦 Build Web (producción)"
echo "  5) ✅ Typecheck"
echo "  6) 🔍 Lint"
echo "  7) 🧹 Clean cache"
echo "  8) 📊 Project info"
echo ""
read -p "Opción: " option

case $option in
    1)
        echo -e "${BLUE}🌐 Iniciando Web...${NC}"
        npm run web
        ;;
    2)
        echo -e "${GREEN}🤖 Iniciando Android...${NC}"
        echo "Asegúrate de tener Android Studio con un emulador corriendo"
        npm run android
        ;;
    3)
        echo -e "${BLUE}🍎 Iniciando iOS...${NC}"
        echo "Requiere macOS con Xcode instalado"
        npm run ios
        ;;
    4)
        echo -e "${YELLOW}📦 Building Web...${NC}"
        npm run build:web
        echo -e "${GREEN}✅ Build completado en: dist/${NC}"
        echo ""
        echo "Para preview local:"
        echo "  npx serve dist"
        ;;
    5)
        echo -e "${BLUE}✅ Type checking...${NC}"
        npm run typecheck
        ;;
    6)
        echo -e "${YELLOW}🔍 Linting...${NC}"
        npm run lint
        ;;
    7)
        echo -e "${RED}🧹 Limpiando cache...${NC}"
        npx expo start -c
        ;;
    8)
        echo -e "${BLUE}📊 Project Info${NC}"
        echo ""
        echo "Node version: $(node --version)"
        echo "npm version: $(npm --version)"
        echo "Expo version: $(npx expo --version)"
        echo ""
        echo "Dependencies:"
        echo "  Total: $(jq '.dependencies | length' package.json)"
        echo "  Dev: $(jq '.devDependencies | length' package.json)"
        echo ""
        echo "Files:"
        echo "  TypeScript: $(find src -name '*.ts' -o -name '*.tsx' | wc -l)"
        echo "  Audio WAV: $(find assets/audio -name '*.wav' 2>/dev/null | wc -l)"
        echo "  Images: $(find assets/images -name '*.png' 2>/dev/null | wc -l)"
        ;;
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✨ Listo!${NC}"
