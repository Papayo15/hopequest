# 📱 Apps Móviles - Condominio360

Este directorio contiene las aplicaciones móviles nativas para iOS y Android.

---

## 📦 Apps Incluidas

### 1. **ResidenteApp** 🏠
App para residentes del condominio

**Funcionalidades:**
- ✅ Login/autenticación
- ✅ Generar códigos QR para visitantes
- ✅ Ver historial de códigos generados
- ✅ Recibir notificaciones push cuando ingresan visitas
- ✅ Gestión de perfil

**Tecnologías:**
- React Native (Expo)
- Navigation (React Navigation)
- QR Code generation
- Push Notifications (Expo)
- AsyncStorage para datos locales

### 2. **VigilanciaApp** 🛡️
App para personal de vigilancia/seguridad

**Funcionalidades:**
- ✅ Login/autenticación
- ✅ Escanear códigos QR con la cámara
- ✅ Validación en tiempo real
- ✅ Historial de accesos del día
- ✅ Estadísticas de accesos
- ✅ Interfaz optimizada para uso rápido

**Tecnologías:**
- React Native (Expo)
- Camera y Barcode Scanner (Expo)
- Navigation
- AsyncStorage

---

## 🚀 Inicio Rápido

### Instalar y Probar

```bash
# ResidenteApp
cd ResidenteApp
npm install
npm start
# Presionar 'i' para iOS o 'a' para Android

# VigilanciaApp
cd VigilanciaApp
npm install
npm start
# Presionar 'i' para iOS o 'a' para Android
```

### Configurar API URL

**Editar `src/config.js` en cada app:**

```javascript
export const API_URL = 'http://TU-IP-LOCAL:5000';
// O en producción:
export const API_URL = 'https://tu-backend.onrender.com';
```

**Importante:** Para testing en dispositivo físico, usa tu IP local (no localhost).

---

## 📱 Compilar Apps

### Instalación Previa

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login en Expo
eas login
```

### Build para iOS

```bash
cd ResidenteApp
eas build --platform ios

cd ../VigilanciaApp
eas build --platform ios
```

### Build para Android

```bash
cd ResidenteApp
eas build --platform android

cd ../VigilanciaApp
eas build --platform android
```

**Ver guía completa:** [COMPILAR_APPS.md](./COMPILAR_APPS.md)

---

## 📂 Estructura de Archivos

```
mobile/
│
├── ResidenteApp/
│   ├── App.js                    # Entry point
│   ├── app.json                  # Configuración Expo
│   ├── package.json
│   └── src/
│       ├── config.js             # Configuración API
│       └── screens/
│           ├── LoginScreen.js
│           ├── HomeScreen.js
│           ├── GenerateQRScreen.js
│           └── HistoryScreen.js
│
├── VigilanciaApp/
│   ├── App.js
│   ├── app.json
│   ├── package.json
│   └── src/
│       ├── config.js
│       └── screens/
│           ├── LoginScreen.js
│           ├── HomeScreen.js
│           ├── ScanQRScreen.js
│           ├── HistoryScreen.js
│           └── StatsScreen.js
│
└── COMPILAR_APPS.md              # Guía de compilación
```

---

## 🔧 Desarrollo

### Comandos Útiles

```bash
# Iniciar en modo desarrollo
npm start

# Limpiar cache
npm start -- --clear

# Ver logs
npm start -- --dev-client

# Actualizar dependencias
npm update

# Build local (más rápido)
npx expo run:ios
npx expo run:android
```

### Debugging

**React Native Debugger:**
```bash
npm install -g react-devtools
react-devtools
```

**Ver logs:**
```bash
# iOS
npx react-native log-ios

# Android
npx react-native log-android
```

---

## 📋 Checklist de Desarrollo

### Antes de Publicar:

- [ ] API URL configurada para producción
- [ ] Iconos y splash screens creados
- [ ] Permisos configurados (cámara, notificaciones)
- [ ] Versión incrementada en `app.json`
- [ ] Testing en dispositivos iOS y Android
- [ ] Push notifications probadas
- [ ] Escáner QR funcionando
- [ ] Login/logout funcionando
- [ ] Manejo de errores implementado

---

## 🆘 Troubleshooting

### Error: "Metro bundler failed to start"

```bash
# Limpiar cache
rm -rf node_modules
npm install
npm start -- --clear
```

### Error: "Unable to resolve module"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Expo Go is not compatible"

- Crea un development build: `eas build --profile development`
- O usa el simulador/emulador

### Cámara no funciona en VigilanciaApp

- Verifica permisos en `app.json`
- Asegúrate de dar permisos en el dispositivo
- En iOS: Settings → App → Permisos → Cámara

---

## 📦 Dependencias Principales

**ResidenteApp:**
```json
{
  "expo": "~50.0.0",
  "react-native": "0.73.0",
  "@react-navigation/native": "^6.1.9",
  "axios": "^1.6.0",
  "react-native-qrcode-svg": "^6.2.0",
  "expo-notifications": "~0.27.0"
}
```

**VigilanciaApp:**
```json
{
  "expo": "~50.0.0",
  "react-native": "0.73.0",
  "@react-navigation/native": "^6.1.9",
  "axios": "^1.6.0",
  "expo-barcode-scanner": "~12.9.0",
  "expo-camera": "~14.1.0"
}
```

---

## 🎨 Personalización

### Cambiar Colores

**ResidenteApp (Azul):**
- Primary: `#3B82F6`
- Success: `#10B981`

**VigilanciaApp (Oscuro):**
- Background: `#1F2937`
- Primary: `#10B981`

### Cambiar Iconos

1. Crea tus iconos (1024x1024px)
2. Guárdalos como `assets/icon.png`
3. Regenera builds: `eas build`

---

## 🔗 Conexión con Backend

Las apps se conectan al backend en:
- **Desarrollo:** `http://localhost:5000` o tu IP local
- **Producción:** URL configurada en `src/config.js`

**Endpoints usados:**
- `POST /api/auth/login` - Login
- `POST /api/qr/generar` - Generar QR (ResidenteApp)
- `POST /api/qr/validar` - Validar QR (VigilanciaApp)
- `GET /api/qr/historial` - Historial
- `POST /api/qr/register-push-token` - Registrar notificaciones

Ver documentación completa del backend: `../backend/README.md`

---

## 📱 Publicación

### App Store (iOS)

1. Builds con perfil "production"
2. Subir a App Store Connect
3. Completar metadata, screenshots
4. Submit for review

### Google Play (Android)

1. Build AAB (no APK)
2. Subir a Google Play Console
3. Completar listado
4. Publicar en internal/beta/production

**Guía detallada:** [COMPILAR_APPS.md](./COMPILAR_APPS.md)

---

## 📞 Soporte

**Documentación:**
- Expo: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- React Native: https://reactnative.dev

**Logs y Debugging:**
- Dashboard Expo: https://expo.dev
- Crashlytics (futuro): Para reportes de crashes

---

**Estado:** ✅ Apps completas y listas para compilar

**Siguiente paso:** Compilar con `eas build` o probar localmente con `npm start`
