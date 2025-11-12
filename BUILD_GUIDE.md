# 🚀 Guía de Compilación - Hope Quest

**Proyecto**: Hope Quest (WisdomQuest)
**Fecha**: Noviembre 4, 2025
**React Native**: 0.74.5
**Expo**: 51

---

## 📋 Pre-requisitos

### Instalaciones Necesarias

```bash
# Node.js (versión 18 o superior)
node --version  # Debe ser >= 18.0.0

# npm o yarn
npm --version
# o
yarn --version

# Expo CLI
npm install -g expo-cli

# EAS CLI (para builds nativas)
npm install -g eas-cli
```

### Para iOS
- macOS requerido
- Xcode 15+ instalado
- CocoaPods instalado: `sudo gem install cocoapods`
- Cuenta de Apple Developer (para deploy)

### Para Android
- Android Studio instalado
- Java JDK 17+
- Android SDK instalado
- Variables de entorno configuradas (ANDROID_HOME)

---

## 📥 Instalación del Proyecto

```bash
# 1. Navegar al proyecto
cd "/Users/papayo/Desktop/Carmen San Diego/WisdomQuest"

# 2. Instalar dependencias
npm install
# o
yarn install

# 3. Verificar instalación
npm run start
```

---

## 🍎 Compilación para iOS

### Opción 1: Desarrollo Local (Simulator)

```bash
# 1. Instalar pods de iOS
cd ios
pod install
cd ..

# 2. Iniciar Metro bundler
npm run start

# 3. En otra terminal, abrir simulador
npm run ios

# O especificar dispositivo
npm run ios -- --simulator="iPhone 15 Pro"
```

### Opción 2: Build con EAS (Recomendado)

```bash
# 1. Login en Expo
eas login

# 2. Configurar proyecto
eas build:configure

# 3. Build para simulador (testing)
eas build --platform ios --profile development

# 4. Build para TestFlight/App Store
eas build --platform ios --profile production
```

### Troubleshooting iOS

**Error de CocoaPods:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Error de firma:**
- Abrir `ios/HopeQuest.xcworkspace` en Xcode
- Signing & Capabilities → seleccionar tu equipo
- Build

---

## 🤖 Compilación para Android

### Opción 1: Desarrollo Local (Emulator/Device)

```bash
# 1. Iniciar emulador Android o conectar dispositivo físico
# Emulador: Android Studio → AVD Manager → Start

# 2. Verificar dispositivos conectados
adb devices

# 3. Iniciar Metro bundler
npm run start

# 4. En otra terminal, compilar y ejecutar
npm run android

# Build APK para testing
cd android
./gradlew assembleRelease
cd ..
# APK en: android/app/build/outputs/apk/release/app-release.apk
```

### Opción 2: Build con EAS (Recomendado)

```bash
# 1. Build para testing (APK)
eas build --platform android --profile development

# 2. Build para Play Store (AAB)
eas build --platform android --profile production
```

### Troubleshooting Android

**Error de Gradle:**
```bash
cd android
./gradlew clean
./gradlew build
cd ..
```

**Error de memoria:**
```bash
# En android/gradle.properties, agregar:
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

**Error de Kotlin:**
El proyecto ya está configurado para Kotlin. Si hay errores:
```bash
# En android/build.gradle, verificar:
buildscript {
    ext.kotlinVersion = '1.9.0'
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

---

## ⚙️ Configuración de EAS Build

### eas.json (ya creado)

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
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "ios": {
        "bundleIdentifier": "com.hopequest.app"
      },
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "tu-apple-id@email.com",
        "ascAppId": "ID_DE_APP_STORE_CONNECT",
        "appleTeamId": "TU_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

---

## 🔥 Configuración de Firebase

### 1. Crear proyecto en Firebase Console

1. Ir a https://console.firebase.google.com
2. Crear proyecto "Hope Quest"
3. Habilitar Authentication (Email/Password, Anonymous)
4. Crear Firestore database
5. Habilitar Analytics

### 2. Configurar iOS

```bash
# Descargar GoogleService-Info.plist
# Colocar en: ios/HopeQuest/GoogleService-Info.plist
```

### 3. Configurar Android

```bash
# Descargar google-services.json
# Colocar en: android/app/google-services.json
```

### 4. Variables de Entorno

Crear archivo `.env` en la raíz:

```env
FIREBASE_API_KEY=tu_api_key_aqui
FIREBASE_AUTH_DOMAIN=hopequest.firebaseapp.com
FIREBASE_PROJECT_ID=hopequest
FIREBASE_STORAGE_BUCKET=hopequest.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

---

## 📱 Testing

### Expo Go (Desarrollo Rápido)

```bash
# 1. Instalar Expo Go en tu teléfono (App Store / Play Store)

# 2. Iniciar servidor
npm run start

# 3. Escanear QR code con tu teléfono
```

**Nota**: Expo Go tiene limitaciones con módulos nativos. Para testing completo, usar EAS Build.

### TestFlight (iOS)

```bash
# Build y subir a TestFlight
eas build --platform ios --profile production
eas submit --platform ios
```

### Google Play Internal Testing (Android)

```bash
# Build y subir a Play Console
eas build --platform android --profile production
eas submit --platform android
```

---

## 🎨 Assets Faltantes

### Antes de compilar, necesitas:

1. **Icon** (`assets/icon.png`): 1024x1024px
2. **Splash Screen** (`assets/splash.png`): 2048x2048px
3. **Adaptive Icon** (`assets/adaptive-icon.png`): 1024x1024px (Android)
4. **Favicon** (`assets/favicon.png`): 48x48px (Web)

### Character Art (22 imágenes)
- Ver [docs/AI_CHARACTER_ART_GUIDE.md](docs/AI_CHARACTER_ART_GUIDE.md)
- Guardar en `assets/images/characters/`

### Lottie Animations (16 archivos)
- Ver [docs/LOTTIE_ANIMATIONS_GUIDE.md](docs/LOTTIE_ANIMATIONS_GUIDE.md)
- Guardar en `assets/animations/`

### Audio Files
- **Música**: 6 tracks en `assets/audio/music/`
- **SFX**: 13 efectos en `assets/audio/sfx/`
- **Narración**: Según necesidad en `assets/audio/narration/`

---

## 🚀 Deploy a Production

### iOS - App Store

```bash
# 1. Build production
eas build --platform ios --profile production

# 2. Submit a App Store
eas submit --platform ios

# 3. O manualmente en App Store Connect
# https://appstoreconnect.apple.com
```

### Android - Google Play

```bash
# 1. Build production AAB
eas build --platform android --profile production

# 2. Submit a Play Console
eas submit --platform android

# 3. O manualmente en Play Console
# https://play.google.com/console
```

---

## 🐛 Errores Comunes

### "Unable to resolve module"
```bash
# Limpiar cache
npm start -- --reset-cache
# o
expo start -c
```

### "Metro bundler error"
```bash
# Matar procesos de Metro
lsof -ti:8081 | xargs kill -9
npm run start
```

### "Gradle build failed" (Android)
```bash
cd android
./gradlew clean
cd ..
rm -rf android/build
rm -rf android/app/build
npm run android
```

### "Pod install failed" (iOS)
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod repo update
pod install
cd ..
```

---

## 📊 Estructura de Build

```
HopeQuest/
├── android/                 # Proyecto Android nativo
│   ├── app/
│   │   ├── build.gradle    # Config de app Android
│   │   └── google-services.json
│   └── build.gradle        # Config raíz Android
├── ios/                     # Proyecto iOS nativo
│   ├── HopeQuest/
│   │   └── GoogleService-Info.plist
│   ├── Podfile             # Dependencias CocoaPods
│   └── HopeQuest.xcworkspace
├── src/                     # Código fuente
├── assets/                  # Assets del juego
├── package.json
├── app.json                # Config Expo
├── eas.json                # Config EAS Build
├── tsconfig.json           # Config TypeScript
└── .env                    # Variables de entorno (crear)
```

---

## ✅ Checklist de Pre-Deploy

### Código
- [ ] Todos los TypeScript errors resueltos
- [ ] Eslint sin errores
- [ ] Tests pasando (si existen)
- [ ] Variables de entorno configuradas

### Assets
- [ ] Icon y Splash screen creados
- [ ] Character art generado (22 imágenes)
- [ ] Lottie animations creadas (16 archivos)
- [ ] Audio files agregados

### Configuración
- [ ] Firebase proyecto creado y configurado
- [ ] Firestore rules configuradas
- [ ] app.json actualizado con bundle IDs correctos
- [ ] eas.json configurado para tu cuenta

### Stores
- [ ] App Store Connect account (iOS)
- [ ] Google Play Console account (Android)
- [ ] Screenshots y descripciones preparadas
- [ ] Privacy policy y terms of service publicados

---

## 🎯 Comandos Rápidos

```bash
# Desarrollo
npm run start              # Iniciar Metro bundler
npm run ios                # Abrir en iOS simulator
npm run android            # Abrir en Android emulator
npm run web                # Abrir en navegador

# Testing
npm test                   # Ejecutar tests
npm run lint               # Verificar código
npm run format             # Formatear código

# Builds EAS
eas build -p ios           # Build iOS
eas build -p android       # Build Android
eas build -p all           # Build ambos

# Submit
eas submit -p ios          # Submit a App Store
eas submit -p android      # Submit a Play Store
```

---

## 📞 Soporte

Si encuentras problemas:
1. Revisar [Expo documentation](https://docs.expo.dev)
2. Revisar [React Native documentation](https://reactnative.dev)
3. Buscar en [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
4. GitHub Issues del proyecto

---

**¡Éxito con el build!** 🎉

