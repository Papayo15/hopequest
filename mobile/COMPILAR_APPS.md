# 📱 Guía Completa: Compilar Apps iOS y Android

Esta guía te enseña cómo compilar las apps móviles para iOS y Android.

---

## 📋 REQUISITOS PREVIOS

### Para Ambas Plataformas:
- ✅ Node.js 18+
- ✅ npm o yarn
- ✅ Cuenta en Expo (https://expo.dev - gratis)
- ✅ EAS CLI instalado

### Para iOS:
- ✅ macOS (obligatorio)
- ✅ Xcode 15+ (desde App Store)
- ✅ Cuenta de Apple Developer ($99/año para publicar)

### Para Android:
- ✅ Cualquier sistema operativo
- ✅ Android Studio (opcional, solo para testing local)

---

## 🚀 CONFIGURACIÓN INICIAL

### 1. Instalar EAS CLI

```bash
npm install -g eas-cli
```

### 2. Login en Expo

```bash
eas login
# Ingresa tu email y contraseña de expo.dev
```

### 3. Configurar Proyecto

**Para ResidenteApp:**

```bash
cd ~/Desktop/condominio360-full/mobile/ResidenteApp

# Instalar dependencias
npm install

# Configurar EAS
eas build:configure
```

**Para VigilanciaApp:**

```bash
cd ~/Desktop/condominio360-full/mobile/VigilanciaApp

# Instalar dependencias
npm install

# Configurar EAS
eas build:configure
```

Esto creará un archivo `eas.json` en cada app.

---

## 📱 COMPILAR PARA iOS

### Paso 1: Crear Build para iOS

**ResidenteApp:**

```bash
cd ~/Desktop/condominio360-full/mobile/ResidenteApp

# Build para desarrollo (simulador)
eas build --platform ios --profile development

# Build para producción (App Store)
eas build --platform ios --profile production
```

**VigilanciaApp:**

```bash
cd ~/Desktop/condominio360-full/mobile/VigilanciaApp

# Build para desarrollo
eas build --platform ios --profile development

# Build para producción
eas build --platform ios --profile production
```

### Paso 2: Durante el Build

EAS te preguntará:

1. **Bundle Identifier:**
   - ResidenteApp: `com.condominio360.residente`
   - VigilanciaApp: `com.condominio360.vigilancia`

2. **Apple Developer Team:**
   - Si tienes cuenta de Apple Developer, selecciónala
   - Si no, se creará un build adhoc (solo para testing)

3. **Push Notifications:**
   - Responde "Yes" para ambas apps

### Paso 3: Descargar el Build

El build tomará 10-20 minutos. Verás el progreso en:
https://expo.dev/accounts/TU-USUARIO/projects

Cuando termine:

```bash
# Ver builds
eas build:list

# Descargar IPA (para instalar en dispositivo)
# El link estará en el dashboard de Expo
```

### Paso 4: Instalar en Dispositivo iOS

**Opción A: TestFlight (recomendado)**

1. Build debe ser de tipo "production"
2. Sube el IPA a App Store Connect
3. Invita testers vía TestFlight

**Opción B: Instalación directa (desarrollo)**

1. Descarga el IPA
2. Usa Apple Configurator 2 o Xcode
3. Arrastra el IPA al dispositivo

---

## 🤖 COMPILAR PARA ANDROID

### Paso 1: Crear Build para Android

**ResidenteApp:**

```bash
cd ~/Desktop/condominio360-full/mobile/ResidenteApp

# Build APK (desarrollo)
eas build --platform android --profile development

# Build AAB (producción - Google Play)
eas build --platform android --profile production
```

**VigilanciaApp:**

```bash
cd ~/Desktop/condominio360-full/mobile/VigilanciaApp

# Build APK
eas build --platform android --profile development

# Build AAB
eas build --platform android --profile production
```

### Paso 2: Durante el Build

EAS preguntará:

1. **Package Name:**
   - ResidenteApp: `com.condominio360.residente`
   - VigilanciaApp: `com.condominio360.vigilancia`

2. **Keystore:**
   - Primera vez: "Generate new keystore" (se guardará automáticamente)
   - Siguientes: Usará el mismo keystore

### Paso 3: Descargar el Build

Build toma 5-15 minutos:

```bash
# Ver builds
eas build:list

# El APK/AAB se puede descargar desde el dashboard
```

### Paso 4: Instalar APK en Android

**Para testing:**

```bash
# Descargar APK
# Instalar en dispositivo Android:
adb install app-release.apk

# O enviarlo por WhatsApp/Email e instalar manualmente
```

**Para publicar en Google Play:**

1. Descarga el AAB (no APK)
2. Ve a Google Play Console
3. Sube el AAB
4. Completa el listado de la app
5. Publica

---

## ⚙️ CONFIGURACIÓN EAS.JSON

Crea o edita `eas.json` en cada app:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "simulator": false
      },
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "tu-email@apple.com",
        "ascAppId": "1234567890",
        "appleTeamId": "XXXXXXXXXX"
      },
      "android": {
        "serviceAccountKeyPath": "./service-account.json",
        "track": "internal"
      }
    }
  }
}
```

---

## 🎨 ASSETS NECESARIOS

### Iconos y Splash Screens

Cada app necesita:

**1. Icon (1024x1024px)**
- Guarda como: `assets/icon.png`
- Sin transparencia
- Esquinas rectas (iOS las redondeará automáticamente)

**2. Adaptive Icon Android (1024x1024px)**
- Guarda como: `assets/adaptive-icon.png`
- Con transparencia OK

**3. Splash Screen (varias resoluciones)**
- Guarda como: `assets/splash.png`
- Recomendado: 2048x2048px
- Fondo sólido

**Herramienta para generar:**
```bash
npx expo install expo-asset
# O usar: https://www.appicon.co/
```

---

## 🧪 TESTING LOCAL

### iOS Simulator:

```bash
cd ResidenteApp  # o VigilanciaApp
npm start
# Presionar 'i' para iOS simulator
```

### Android Emulator:

```bash
cd ResidenteApp  # o VigilanciaApp
npm start
# Presionar 'a' para Android emulator
```

### Dispositivo Físico:

```bash
npm start
# Escanear QR con Expo Go app
```

---

## 📦 BUILDS AUTOMÁTICOS CON GITHUB ACTIONS

Crea `.github/workflows/build.yml`:

```yaml
name: Build Apps

on:
  push:
    branches: [main]
    paths:
      - 'mobile/**'

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install EAS CLI
        run: npm install -g eas-cli
      - name: Build iOS
        run: |
          cd mobile/ResidenteApp
          npm install
          eas build --platform ios --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install EAS CLI
        run: npm install -g eas-cli
      - name: Build Android
        run: |
          cd mobile/ResidenteApp
          npm install
          eas build --platform android --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

---

## 🔐 VARIABLES DE ENTORNO EN BUILDS

Para cambiar la API URL en producción:

**Editar `src/config.js` en cada app:**

```javascript
export const API_URL = __DEV__
  ? 'http://localhost:5000'  // Desarrollo
  : 'https://condominio360-backend.onrender.com';  // Producción
```

O usar variables de entorno con `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "API_URL": "https://condominio360-backend.onrender.com"
      }
    }
  }
}
```

---

## 📝 CHECKLIST DE COMPILACIÓN

### Antes de Compilar:

- [ ] Backend desplegado y funcionando
- [ ] URL de producción configurada en `src/config.js`
- [ ] Dependencias instaladas (`npm install`)
- [ ] EAS CLI instalado y login hecho
- [ ] Assets (iconos, splash) creados
- [ ] Permisos configurados en `app.json`

### ResidenteApp:
- [ ] Build iOS development completado
- [ ] Build iOS production completado
- [ ] Build Android APK completado
- [ ] Build Android AAB completado
- [ ] App instalada y probada en dispositivo
- [ ] Notificaciones push funcionando

### VigilanciaApp:
- [ ] Build iOS development completado
- [ ] Build iOS production completado
- [ ] Build Android APK completado
- [ ] Build Android AAB completado
- [ ] Cámara y scanner QR funcionando
- [ ] Validación de códigos exitosa

---

## 🆘 PROBLEMAS COMUNES

### Error: "Expo account not found"

```bash
eas logout
eas login
```

### Error: "Invalid bundle identifier"

Edita `app.json`:
```json
{
  "ios": {
    "bundleIdentifier": "com.condominio360.residente"
  }
}
```

### Error: "Keystore not found" (Android)

```bash
# Generar nuevo keystore
eas build --platform android
# Selecciona: "Generate new keystore"
```

### Build toma mucho tiempo

- Normal: 10-20 minutos para iOS, 5-15 para Android
- Puedes cerrar la terminal, el build continúa en la nube
- Revisa progreso en: https://expo.dev

---

## 💰 COSTOS

**Expo EAS:**
- Free tier: 30 builds/mes
- Paid: $29/mes = builds ilimitados

**Apple:**
- Developer account: $99/año (requerido para publicar)

**Google:**
- Developer account: $25 única vez

**Total para publicar ambas apps:**
- iOS: $99/año
- Android: $25 única vez
- Expo (opcional): $0 - $29/mes

---

## 📚 RECURSOS

- **Expo Docs:** https://docs.expo.dev/build/introduction/
- **EAS Build:** https://docs.expo.dev/build-reference/variants/
- **App Store Connect:** https://appstoreconnect.apple.com
- **Google Play Console:** https://play.google.com/console

---

**¡Listo! Tus apps están preparadas para compilar.** 🚀

**Siguiente:** Ejecuta `eas build --platform android` o `eas build --platform ios`
