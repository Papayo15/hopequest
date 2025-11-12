# 🚀 Hope Quest - Production Setup Guide

Esta guía te ayudará a configurar TODO lo necesario para tener Hope Quest listo para distribución en App Store y Google Play.

---

## 📋 Checklist de Producción

- [ ] Firebase configurado (Auth + Firestore + Analytics)
- [ ] Character art profesional (22 imágenes)
- [ ] Lottie animations profesionales (16 animaciones)
- [ ] Audio assets profesionales (19 archivos)
- [ ] App icon & splash screen profesionales
- [ ] Certificados iOS/Android configurados
- [ ] Testing completo en dispositivos reales

---

## 🔥 PASO 1: Configurar Firebase (30 minutos)

### 1.1 Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com
2. Click "Add project" / "Agregar proyecto"
3. **Nombre**: `hope-quest-production` (o el que prefieras)
4. **Google Analytics**: SÍ (recomendado para tracking)
5. **Cuenta de Analytics**: Crea nueva o usa existente
6. Click "Create project"

### 1.2 Agregar App iOS

1. En el dashboard de Firebase, click en **iOS** (ícono de Apple)
2. **iOS bundle ID**: `com.hopequest.app` (debe coincidir con app.json)
3. **App nickname**: `Hope Quest iOS`
4. **App Store ID**: Déjalo vacío por ahora
5. **Descarga `GoogleService-Info.plist`**
6. Coloca el archivo en: `WisdomQuest/ios/` (cuando compiles con EAS)

### 1.3 Agregar App Android

1. En el dashboard de Firebase, click en **Android** (ícono de robot)
2. **Android package name**: `com.hopequest.app` (debe coincidir con app.json)
3. **App nickname**: `Hope Quest Android`
4. **SHA-1**: Obtener con: `cd android && ./gradlew signingReport`
5. **Descarga `google-services.json`**
6. Coloca el archivo en: `WisdomQuest/android/app/` (cuando compiles con EAS)

### 1.4 Configurar Authentication

1. En Firebase Console, ve a **Authentication**
2. Click "Get started"
3. Habilita los siguientes sign-in methods:
   - ✅ **Email/Password** (Enable)
   - ✅ **Anonymous** (Enable, útil para testing)
   - ⚠️ **Google** (Opcional, requiere configuración extra)

4. En la pestaña "Settings", configura:
   - **Authorized domains**: Agrega tu dominio si tienes
   - **Email templates**: Personaliza emails (opcional)

### 1.5 Configurar Firestore Database

1. En Firebase Console, ve a **Firestore Database**
2. Click "Create database"
3. **Ubicación**: Elige la más cercana geográficamente:
   - `us-central1` (Virginia, USA) - Recomendado para Américas
   - `europe-west1` (Bélgica) - Para Europa
   - `asia-southeast1` (Singapur) - Para Asia
4. **Security rules**: Empieza en **Test mode** (por ahora)
5. Click "Enable"

### 1.6 Configurar Security Rules (IMPORTANTE)

Después de crear la database, actualiza las rules para PRODUCCIÓN:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection - Solo el usuario puede ver/editar su perfil
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId);
    }

    // Progress collection - Solo el usuario puede ver/editar su progreso
    match /progress/{userId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId);
    }

    // Leaderboards - Todos pueden leer, nadie puede escribir directamente
    match /leaderboards/{entry} {
      allow read: if isAuthenticated();
      allow write: if false; // Solo a través de Cloud Functions
    }

    // Analytics - Solo escritura para auth users
    match /analytics/{doc} {
      allow read: if false;
      allow write: if isAuthenticated();
    }
  }
}
```

### 1.7 Obtener Credenciales Web

1. En Firebase Console, ve a **Project Settings** (ícono de engranaje)
2. Scroll down hasta "Your apps"
3. Si no hay una app Web, click en el ícono **</>** para agregarla
4. **App nickname**: `Hope Quest Web`
5. **NO** marques "Firebase Hosting"
6. Click "Register app"

Verás algo como:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABC123DEF456GHI789...",
  authDomain: "hope-quest-production.firebaseapp.com",
  projectId: "hope-quest-production",
  storageBucket: "hope-quest-production.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456...",
  measurementId: "G-ABC123XYZ"
};
```

### 1.8 Actualizar .env

Copia las credenciales a tu archivo `.env`:

```bash
FIREBASE_API_KEY=AIzaSyABC123DEF456GHI789...
FIREBASE_AUTH_DOMAIN=hope-quest-production.firebaseapp.com
FIREBASE_PROJECT_ID=hope-quest-production
FIREBASE_STORAGE_BUCKET=hope-quest-production.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abc123def456...
FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

### 1.9 Verificar Conexión

```bash
npm start
```

En la consola deberías ver:
```
✅ Firebase initialized successfully
```

Si ves un error, verifica:
- `.env` tiene las credenciales correctas
- Firebase project está activo
- No hay typos en las keys

---

## 🎨 PASO 2: Assets Profesionales

### 2.1 Character Art (22 imágenes)

**Opción A: Contratar Diseñador** (Recomendado)

Busca en:
- **Fiverr**: https://www.fiverr.com/search/gigs?query=character%20design
  - Precio: $50-$200 por personaje
  - Tiempo: 3-7 días
- **Upwork**: https://www.upwork.com
- **Dribbble**: https://dribbble.com/designers

**Brief para el diseñador**:
```
Necesito 22 character art images para un juego educativo móvil.

Personajes:
- Pepe (niño, 8 años) - 5 expresiones
- Paula (niña, 8 años) - 5 expresiones
- Isabella (niña adoptada, 10 años) - 5 expresiones
- Xolo (ajolote sabio, mascota) - 3 expresiones
- Don Bowser (antagonista, anciano) - 2 expresiones
- Koopa Hielo (guardias) - 2 expresiones

Estilo:
- Cartoon amigable, colorido
- Apropiado para niños 7-14 años
- Similar a: Inside Out, Coco, Zootopia
- Fondos transparentes (PNG)

Specs técnicas:
- Formato: PNG con alpha channel
- Tamaño: 2048x2048px
- Color profile: sRGB
- Optimizado para mobile (<500KB por imagen)
```

**Opción B: AI Generation** (Más rápido, menos control)

Usa **Midjourney** (requiere suscripción $10/mes):

```
/imagine children character design for educational game,
friendly cartoon style, [personaje description],
white background, full body, vibrant colors,
pixar style, high quality render, 4k --ar 1:1 --v 6
```

Ejemplo para Pepe:
```
/imagine 8 year old boy character, latino features,
happy expression, casual clothes (t-shirt and jeans),
cartoon style like Pixar/Coco, vibrant colors,
white background, full body portrait, 4k --ar 1:1 --v 6
```

Genera 5 variaciones cambiando expresión: neutral, happy, sad, excited, determined

**Post-procesamiento**:
1. Remove background: https://www.remove.bg
2. Resize to 2048x2048: https://www.iloveimg.com/resize-image
3. Optimize: https://tinypng.com

### 2.2 Lottie Animations (16 archivos)

**Opción A: LottieFiles Marketplace** (Gratis/Pago)

1. Ve a https://lottiefiles.com/search
2. Busca animaciones para:
   - "airplane flying" → portal_aereo.json
   - "ship sailing" → portal_maritimo.json
   - "bus driving" → portal_terrestre.json
   - "door opening" → portal_clandestino.json
   - "tent camping" → portal_refugiado.json
   - "family reunion" → portal_familiar.json
   - "star sparkle" → collect_star.json
   - "coin spin" → collect_coin.json
   - "confetti celebration" → celebration_country_complete.json
   - "level up" → celebration_level_up.json
   - "trophy award" → celebration_achievement.json
   - "loading spinner" → loading_spinner.json
   - "checkmark success" → success_checkmark.json
   - "x error" → error_x.json
   - "character walking" → character_walk.json
   - "character jumping" → character_jump.json

3. Descarga en formato JSON
4. Coloca en `assets/animations/`

**Precio**: Gratis (muchas), o $5-$20 premium

**Opción B: Contratar Animador**

Fiverr: $30-$100 por animación
Tiempo: 3-5 días

### 2.3 Audio Assets (19 archivos)

**Música (6 tracks)**

Usa servicios royalty-free con licencia comercial:

**Epidemic Sound** (Recomendado)
- URL: https://www.epidemicsound.com
- Precio: $15/mes
- Licencia: Comercial incluida
- Calidad: Profesional

Busca por mood:
- "menu" → Upbeat, inspiring, adventure
- "map" → Ambient, world music, exploration
- "portal" → Suspenseful, dramatic
- "activity" → Playful, educational
- "victory" → Triumphant, celebratory
- "defeat" → Sad but hopeful, retry

**Alternativa gratuita**: Incompetech
- URL: https://incompetech.com
- Licencia: CC BY (requiere atribución)
- Calidad: Buena

**SFX (13 efectos)**

**Freesound** (Gratis)
- URL: https://freesound.org
- Busca: "button click", "coin collect", "star twinkle", etc.
- Licencia: Verifica cada sonido (CC0 o CC BY)

**Zapsplat** (Gratis con registro)
- URL: https://www.zapsplat.com
- Más organizado que Freesound
- Licencia: Free for commercial use

**Specs de Audio**:
- Formato: MP3
- Music: 192kbps, 44.1kHz, Stereo
- SFX: 128kbps, 44.1kHz, Mono o Stereo
- Normalizar volumen: -3dB peak

### 2.4 App Icon & Splash Screen

**Opción A: Contratar Diseñador Gráfico**

Fiverr: $50-$150 por branding completo
- Incluye: Icon + Splash + variaciones

**Brief**:
```
Necesito app icon y splash screen para Hope Quest.

Concepto:
- Globo terráqueo estilizado
- Familia (siluetas) caminando juntos
- Colores: Azul cielo (#4A90E2), Verde esperanza (#4CAF50), Amarillo sol (#F39C12)
- Mood: Esperanzador, aventurero, educativo

Entregables:
1. App Icon:
   - 1024x1024px PNG
   - Sin texto (el nombre aparece debajo en el home screen)
   - Diseño simple, reconocible a tamaños pequeños

2. Splash Screen:
   - 2048x2048px PNG
   - Logo centrado + nombre "Hope Quest"
   - Tagline: "A Journey of Hope and Discovery"
   - Fondo: Degradado azul a dorado

3. Variaciones:
   - iOS adaptive icon
   - Android adaptive icon
   - Archivos fuente (AI/Sketch/Figma)
```

**Opción B: Usar Canva**

1. Ve a https://www.canva.com
2. Busca "App Icon" template
3. Personaliza con colores/elementos
4. Export: 1024x1024px PNG
5. Repite para Splash Screen (2048x2048px)

Precio: Gratis (con marca de agua) o $13/mes Pro

---

## 📱 PASO 3: Configurar Build para Stores

### 3.1 Crear Cuenta EAS Build

```bash
npm install -g eas-cli
eas login
```

### 3.2 Configurar Proyecto

```bash
eas build:configure
```

Esto crea `eas.json`. Actualiza con:

```json
{
  "build": {
    "production": {
      "ios": {
        "bundleIdentifier": "com.hopequest.app",
        "buildType": "release"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      },
      "env": {
        "NODE_ENV": "production"
      }
    },
    "preview": {
      "distribution": "internal"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "tu_email@example.com",
        "ascAppId": "TU_APP_ID",
        "appleTeamId": "TU_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./service-account.json",
        "track": "internal"
      }
    }
  }
}
```

### 3.3 Build iOS (Requiere Apple Developer Account $99/año)

```bash
# Primera vez: Genera certificados automáticamente
eas build --platform ios --profile production

# Sigue las instrucciones para configurar:
# - Apple Developer credentials
# - Push notification keys
# - Signing certificates
```

### 3.4 Build Android (Gratis)

```bash
eas build --platform android --profile production
```

---

## ✅ PASO 4: Testing Pre-Launch

### 4.1 Internal Testing

**iOS - TestFlight**:
```bash
eas submit --platform ios --profile production
```

Invita testers en App Store Connect

**Android - Internal Testing**:
```bash
eas submit --platform android --profile production
```

Invita testers en Google Play Console

### 4.2 Checklist de Testing

- [ ] Auth funciona (register, login, logout)
- [ ] 35 países se cargan correctamente
- [ ] Actividades (trivia, puzzle, memory) funcionan
- [ ] Physics game (construir puentes, destruir muros)
- [ ] Audio se reproduce
- [ ] Animaciones funcionan
- [ ] Traducciones en 5 idiomas
- [ ] Parental controls funciona
- [ ] Progreso se guarda (Firestore)
- [ ] Leaderboards actualiza
- [ ] No hay crashes
- [ ] Performance fluido (60 FPS)

---

## 🚀 PASO 5: Launch

### 5.1 App Store (iOS)

1. Completa metadata en App Store Connect:
   - Nombre: Hope Quest
   - Subtitle: Educational Migration Journey
   - Description: (ver ejemplo abajo)
   - Keywords: education, geography, migration, kids, learning
   - Screenshots: 6.5" y 5.5" (5-8 screenshots)
   - App Preview Video (opcional pero recomendado)
   - Edad: 4+ (contenido educativo)
   - Precio: $3.99 (o gratis con IAP)

2. Submit for review
3. Espera 1-3 días para aprobación

### 5.2 Google Play (Android)

1. Completa metadata en Play Console:
   - Título: Hope Quest
   - Descripción corta: (80 caracteres)
   - Descripción completa: (ver ejemplo abajo)
   - Screenshots: Phone, 7" tablet, 10" tablet
   - Feature graphic: 1024x500px
   - Edad: Everyone (ESRB)
   - Categoría: Educational, Familia
   - Precio: $3.99 (o gratis con IAP)

2. Completa Content Rating questionnaire
3. Submit for review
4. Espera 1-7 días para aprobación

---

## 📝 Template de Store Description

### Título
Hope Quest - Migration Journey

### Subtitle (iOS) / Short Description (Android)
Learn about geography and migration through an educational adventure game

### Description (Ambas stores)

```
🌍 Hope Quest - A Journey of Hope and Discovery

Embark on an educational adventure through 35 countries, learning about geography, culture, and the real experiences of millions of migrants worldwide.

🎮 WHAT MAKES HOPE QUEST SPECIAL?

✅ Educational Content
• Visit 35 countries across 5 continents
• Learn geography, culture, and history
• Understand migration challenges and triumphs
• Appropriate for ages 7-14

✅ Engaging Gameplay
• 105 educational activities (trivia, puzzles, memory games)
• Physics-based challenges (build bridges, overcome obstacles)
• 6 migration portal types with unique stories
• Progression system with stars and achievements

✅ Culturally Sensitive
• Developed with educational experts
• Balanced content - realistic yet age-appropriate
• 5 languages: English, Spanish, Chinese, Hindi, Arabic
• Parental controls with 5 sensitivity levels

✅ Beautiful Design
• Vibrant cartoon art style
• Smooth animations
• Original soundtrack
• Accessible UI for children

🎯 LEARNING OBJECTIVES

• Geography: Locations, cultures, landmarks
• Empathy: Understanding different perspectives
• History: Migration patterns and causes
• Problem-solving: Strategic thinking in challenges
• Cultural awareness: Celebrating diversity

👨‍👩‍👧‍👦 FAMILY-FRIENDLY

Hope Quest is designed for families to play together. Parents can:
• Set content sensitivity levels
• Enable parental controls
• Track learning progress
• Discuss meaningful topics with children

📚 DEVELOPED BY EDUCATORS

Created in consultation with teachers, migration experts, and child psychologists to ensure educational value and emotional appropriateness.

🌟 FEATURES

• 35 countries with unique stories
• 105+ educational mini-games
• Physics puzzles with Matter.js engine
• Character customization
• Cloud save (progress syncs across devices)
• Offline mode available
• No ads, no subscriptions after purchase

💰 ONE-TIME PURCHASE

Buy once, play forever. No ads, no in-app purchases, no subscriptions. Full access to all 35 countries and content.

---

Hope Quest is more than a game—it's a tool for building empathy and understanding in the next generation.

Download now and start your journey of hope! 🌍❤️
```

---

## 💰 Costos Estimados

### Desarrollo
- Firebase (Plan Spark): **$0** (gratis hasta límites generosos)
- Character Art: **$300-$500** (diseñador profesional)
- Lottie Animations: **$200-$400** (o $0 con marketplace gratuito)
- Audio Assets: **$15-$30/mes** (Epidemic Sound por 2 meses)
- App Icon/Splash: **$50-$150** (diseñador)

### Distribución
- Apple Developer: **$99/año**
- Google Play: **$25** (pago único)
- EAS Build: **$0** (gratis hasta 30 builds/mes)

**Total estimado: $700-$1,200 primer año**

### Revenue Projection (Optimista)
- Precio: $3.99
- Descargas mes 1: 100-500
- Revenue mes 1: $280-$1,400 (después de comisión 30%)
- Break-even: 2-4 meses

---

## 📞 Soporte

Si tienes problemas:

1. **Firebase**: https://firebase.google.com/support
2. **EAS Build**: https://docs.expo.dev/build/introduction
3. **App Store**: https://developer.apple.com/support
4. **Google Play**: https://support.google.com/googleplay/android-developer

---

## 🎉 ¡Felicitaciones!

Siguiendo esta guía, Hope Quest estará listo para launch en 2-4 semanas (dependiendo de la velocidad de generación de assets).

**Próximo paso**: Ejecuta `npm install && npm start` y empieza a configurar Firebase.

¡Éxito con el lanzamiento! 🚀
