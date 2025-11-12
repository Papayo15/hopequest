# ⚡ Quick Start - Hope Quest

**Tiempo estimado**: 5 minutos para empezar a desarrollar

---

## 🚀 Inicio Rápido (3 pasos)

### 1. Instalar Dependencias
```bash
cd WisdomQuest
npm install
```

### 2. Iniciar Development Server
```bash
npm start
```

### 3. Abrir en Simulador
```bash
# iOS (requiere macOS + Xcode)
npm run ios

# Android (requiere Android Studio)
npm run android

# Web (para testing rápido)
npm run web
```

---

## 📱 Sin Simuladores?

Usa **Expo Go** en tu teléfono:

1. Descarga **Expo Go** desde App Store / Google Play
2. Escanea el QR code que aparece después de `npm start`
3. ¡Listo! La app se ejecuta en tu teléfono

---

## ⚠️ Errores Comunes

### "Cannot find module 'matter-js'"
```bash
npm install
```

### "Firebase configuration error"
El proyecto funciona sin Firebase para development local. Para configurarlo:
- Lee `SETUP_FIREBASE.md`
- O comenta temporalmente las líneas Firebase en los services

### "Metro bundler error"
```bash
# Limpia cache
npm start -- --reset-cache
```

---

## 📂 Estructura Importante

```
src/
├── constants/
│   ├── countries/          # 35 países configurados
│   └── gameConfig.ts       # Configuración del juego
├── screens/                # Pantallas de la app
├── components/             # Componentes reutilizables
└── stores/                 # Zustand state management
```

---

## 🎨 Assets Pendientes

El código está completo, pero estos assets están pendientes:

1. **Character art**: 22 imágenes
   - Ver: `assets/images/characters/README.md`

2. **Animations**: 16 Lottie JSON files
   - Ver: `assets/animations/README.md`

3. **Audio**: 19 archivos MP3
   - Ver: `assets/audio/README.md`

4. **Branding**: Icon + Splash
   - Ver: `assets/ICON_AND_SPLASH.md`

**Para testing**: La app funciona sin estos assets, solo muestra placeholders.

---

## 🔧 Scripts Útiles

```bash
# Development
npm start                 # Inicia Expo dev server
npm run ios              # iOS simulator
npm run android          # Android emulator

# Linting & Formatting
npm run lint             # ESLint
npm run format           # Prettier

# Production Builds (requiere EAS CLI)
npm run build:ios        # Build para iOS
npm run build:android    # Build para Android
```

---

## 📖 Documentación Completa

- `PROJECT_COMPLETE.md` - Estado completo del proyecto
- `BUILD_GUIDE.md` - Compilación para producción
- `SETUP_FIREBASE.md` - Configurar Firebase
- `docs/` - 12 guías técnicas adicionales

---

## 🎮 Estructura del Juego

### Países
- **35 países** desde Venezuela hasta Filipinas
- **3 actividades** por país (trivia, puzzle, memory)
- **Sistema de progresión** con estrellas

### Portales
- **6 tipos**: Aéreo, Marítimo, Terrestre, Clandestino, Refugiado, Familiar
- **Packing system**: 33 items para empacar
- **Economía**: Dinero, Salud, Moral

### Physics Game
- **Matter.js** implementado
- **Build bridges** o **Destroy walls**
- **Sistema de helpers** (familia)

---

## 🌍 Idiomas

El juego soporta 5 idiomas:
- 🇪🇸 Español (completo)
- 🇺🇸 English (completo)
- 🇨🇳 中文 (básico)
- 🇮🇳 हिन्दी (básico)
- 🇸🇦 العربية (básico)

Para agregar traducciones: Edita `src/i18n/translations/[lang].json`

---

## 💡 Tips de Desarrollo

### Hot Reload
Guarda archivos y la app se recarga automáticamente.

### Debug
- Shake device/emulator para abrir Developer Menu
- Press `j` en terminal para abrir debugger

### State Management
Usa React DevTools para inspeccionar Zustand stores:
```bash
npm install -g react-devtools
react-devtools
```

---

## 🐛 Troubleshooting

### La app no carga
1. Verifica que Metro bundler esté corriendo
2. Recarga la app (Shake > Reload)
3. Limpia cache: `npm start -- --reset-cache`

### Cambios no se reflejan
1. Guarda el archivo (Cmd+S / Ctrl+S)
2. Espera 2-3 segundos para hot reload
3. Si no funciona, recarga manual

### Errores de TypeScript
```bash
# Verifica tipos
npm run lint
```

---

## 📊 Próximos Pasos

1. ✅ **Testing local** - Prueba la app en simulador
2. 🎨 **Genera assets** - Character art, animations, audio
3. 🔥 **Configura Firebase** - Para auth y database
4. 🧪 **Testing completo** - iOS + Android devices
5. 🚀 **Deploy** - TestFlight / Google Play

---

## 🆘 Ayuda

### Documentación
- **Expo**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **Matter.js**: https://brm.io/matter-js

### Issues
Si encuentras bugs o tienes preguntas:
1. Revisa `PROJECT_COMPLETE.md`
2. Busca en documentación de Expo/React Native
3. Consulta los archivos README en `assets/` y `docs/`

---

## ✨ ¡Listo!

```bash
cd WisdomQuest
npm install
npm start
```

**¡Ya puedes empezar a desarrollar!** 🎉

La app debería abrir en tu navegador/simulador. Explora los 35 países, prueba las actividades, y desarrolla los assets faltantes.

**Happy Coding!** 🚀

---

*Para detalles completos, lee `PROJECT_COMPLETE.md`*
