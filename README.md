# 🌍 Wisdom Quest - Juego Educativo Interactivo

Un juego educativo multiplataforma para niños de 4-12 años que combina **aventura cultural** estilo Carmen Sandiego con **minijuegos físicos** tipo Angry Birds.

![Wisdom Quest Logo](./assets/icon.png)

---

## 🎯 Concepto del Juego

**Wisdom Quest** lleva a los niños en un viaje alrededor del mundo donde:
- Exploran **35 países** de 5 continentes
- Resuelven **105 actividades educativas** sobre cultura, geografía e historia
- Lanzan **5 personajes sabios** en minijuegos físicos para recuperar objetos culturales
- Coleccionan tesoros en su **museo personal**
- Aprenden jugando en **10 idiomas**

---

## ✨ Características Principales

### 🗺️ Modo Aventura
- **35 países completos** con contenido cultural auténtico
- **12 tipos de actividades** educativas diferentes
- **Dificultad progresiva** adaptada a edades 4-12
- **Cutscenes animadas** con personajes carismáticos
- **Sistema de pistas** para aprender de forma guiada

### 🎮 Modo Físico "Lanza Sabios"
- **Motor de física realista** (Matter.js)
- **5 sabios únicos** con habilidades especiales
- **35 niveles temáticos** basados en cada país
- **Estructuras destructibles** con materiales variados
- **Sistema de puntuación** con 3 estrellas por nivel

### 🧑‍🤝‍🧑 6 Personajes Originales

| Personaje | Animal | Color | Especialidad | Habilidad Física |
|-----------|--------|-------|--------------|------------------|
| **Kiko** | Zorro | Azul | Geografía | Golpe clásico |
| **Luna** | Búho | Morado | Ciencia | Vuelo/Planeo |
| **Sol** | León | Amarillo | Música/Arte | Ondas sónicas |
| **Coral** | Delfín | Rosa | Deportes | Super velocidad |
| **Bosque** | Tortuga | Verde | Historia | Peso pesado |
| **Misterio** | Zorro | Rojo | Villano amigable | - |

### 🌐 10 Idiomas Soportados
Español, Inglés, Portugués, Francés, Mandarín, Hindi, Árabe, Alemán, Japonés, Ruso

### 🏆 Sistema de Progresión
- **Sistema de estrellas**: 3 por modo (aventura + física) = 6 por país
- **Museo personal**: Colecciona 35 objetos culturales
- **Pasaporte virtual**: Sella cada país visitado
- **Avatar customizable**: 35+ items de ropa cultural
- **30+ logros** desbloqueables

---

## 🛠️ Stack Tecnológico

### Frontend
- **React Native 0.74** + **Expo 51**
- **TypeScript 5.5** (100% tipado)
- **React Navigation 6** (navegación)
- **Zustand 4.5** (gestión de estado)
- **Matter.js** (motor de física 2D)
- **React Native Reanimated** (animaciones)
- **Lottie** (animaciones vectoriales)

### Backend
- **Firebase**:
  - Authentication (usuarios anónimos + Google)
  - Cloud Firestore (base de datos)
  - Storage (assets dinámicos)
  - Analytics (métricas de juego)

### Localización
- **react-i18next** + **i18next**
- **Expo Localization** (detección automática)

### Audio
- **Expo AV** (música y efectos)

### Monetización
- **Google AdMob** (ads COPPA-compliant)
- **Expo In-App Purchases** (compras)

---

## 📁 Estructura del Proyecto

```
WisdomQuest/
├── src/
│   ├── components/        # 30+ componentes reutilizables
│   │   ├── common/        # Botones, Cards, Modals
│   │   ├── characters/    # Componentes de personajes
│   │   ├── adventure/     # Componentes de modo aventura
│   │   ├── physics/       # Componentes de modo físico
│   │   └── ui/            # HUD, indicators, etc.
│   │
│   ├── screens/           # 12 pantallas principales
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── WorldMapScreen.tsx
│   │   ├── CountryIntroScreen.tsx
│   │   ├── AdventureScreen.tsx
│   │   ├── PhysicsGameScreen.tsx
│   │   ├── VictoryScreen.tsx
│   │   ├── DefeatScreen.tsx
│   │   ├── MuseumScreen.tsx
│   │   ├── AvatarScreen.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   └── SettingsScreen.tsx
│   │
│   ├── game/              # Lógica de juego
│   │   ├── adventure/     # Sistema de actividades
│   │   └── physics/       # Motor de física
│   │
│   ├── data/              # Base de datos estática
│   │   ├── countries/     # 35 archivos JSON de países
│   │   ├── characters/    # Definiciones de personajes
│   │   └── activities/    # Configuraciones de actividades
│   │
│   ├── i18n/              # Sistema de traducción
│   │   └── locales/       # 10 archivos de idiomas
│   │
│   ├── navigation/        # Configuración de navegación
│   ├── store/             # Stores de Zustand
│   ├── services/          # Firebase, Audio, Analytics
│   ├── constants/         # Constantes del juego
│   ├── types/             # Definiciones TypeScript
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Funciones auxiliares
│
├── assets/                # Assets del juego
│   ├── characters/        # Sprites de personajes
│   ├── backgrounds/       # Fondos de países
│   ├── objects/           # Objetos culturales
│   ├── ui/                # Iconos y UI
│   ├── structures/        # Bloques para física
│   ├── sounds/            # Música y SFX
│   └── animations/        # Archivos Lottie
│
├── docs/                  # Documentación completa
└── scripts/               # Scripts de automatización
```

---

## 🚀 Instalación y Setup

### Prerrequisitos

1. **Node.js 18+**
   ```bash
   # macOS con Homebrew
   brew install node

   # O descarga desde: https://nodejs.org/
   ```

2. **Git**
   ```bash
   brew install git
   ```

### Instalación Rápida

#### Opción 1: Script Automatizado (Recomendado)

```bash
# Descargar proyecto
git clone [URL_DEL_REPOSITORIO]
cd WisdomQuest

# Ejecutar script de setup (instala todo automáticamente)
chmod +x setup.sh
./setup.sh

# Iniciar proyecto
npm start
```

#### Opción 2: Manual

```bash
# Clonar repositorio
git clone [URL_DEL_REPOSITORIO]
cd WisdomQuest

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Ejecutar en Dispositivo

1. **Instalar Expo Go** (gratis):
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escanear QR**:
   - Ejecuta `npm start`
   - Escanea el QR con Expo Go
   - ¡El juego corre en tu dispositivo!

---

## 🔥 Configuración de Firebase

### Paso 1: Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Sigue el wizard (habilita Analytics si quieres)

### Paso 2: Obtener Credenciales

1. En Project Overview → Settings (⚙️)
2. En "Tus apps" → Agregar app → Web
3. Copia las credenciales

### Paso 3: Configurar en el Proyecto

1. Crea archivo `.env` (copia de `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales:
   ```env
   FIREBASE_API_KEY=tu_api_key_aquí
   FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   FIREBASE_PROJECT_ID=tu_proyecto_id
   # ... etc
   ```

### Paso 4: Habilitar Servicios

En Firebase Console, habilita:
- **Authentication** → Anonymous + Google
- **Firestore Database** → Modo test (reglas después)
- **Storage** → Modo test
- **Analytics** → Habilitado

Ver guía completa: [docs/FIREBASE_SETUP.md](./docs/FIREBASE_SETUP.md)

---

## 🎮 Cómo Jugar

### Para Jugadores

1. **Selecciona idioma** en primera ejecución
2. **Indica tu edad** para ajustar dificultad
3. **Elige un país** en el mapa mundial
4. **Completa modo aventura**:
   - Explora 3 locaciones
   - Resuelve 3 actividades educativas
   - Colecta pistas culturales
5. **Juega modo físico**:
   - Lanza sabios con la resortera
   - Destruye estructuras
   - Recupera el objeto cultural
6. **Colecciona recompensas**:
   - Objeto en tu museo
   - Sello en tu pasaporte
   - Estrellas y logros

### Para Padres/Educadores

- **Dashboard de progreso**: Ver estadísticas de aprendizaje
- **Control parental**: Deshabilitar compras/ads
- **Modo offline**: Jugar sin conexión
- **Reporte educativo**: Qué aprendieron

Ver manual completo: [docs/GAMEPLAY.md](./docs/GAMEPLAY.md)

---

## 🎨 Assets y Recursos

### Assets Incluidos

Todos los assets visuales y de audio están incluidos en el proyecto:

- ✅ **46 sprites de personajes** (6 personajes × poses)
- ✅ **35 fondos de países** (procesados de fotos reales)
- ✅ **35 objetos culturales** (renders 3D/iconos)
- ✅ **100+ sprites de bloques** (madera, hielo, piedra, etc.)
- ✅ **5 temas musicales** + variaciones regionales
- ✅ **50+ efectos de sonido**
- ✅ **20+ animaciones Lottie**

### Fuentes de Assets (Gratuitos)

Los assets incluidos provienen de:

- **Personajes**: Quaternius (CC0), Sketchfab (CC BY)
- **Fondos**: Unsplash/Pexels (Free License)
- **Objetos**: Flaticon (Free with attribution), Wikimedia Commons
- **Bloques**: OpenGameArt.org, Kenney.nl
- **Música**: Incompetech.com (Kevin MacLeod - CC BY)
- **SFX**: Freesound.org (CC0/CC BY)
- **Animaciones**: LottieFiles (Free)

Ver guía completa de assets: [docs/ASSETS_GUIDE.md](./docs/ASSETS_GUIDE.md)

### Atribuciones

Ver archivo completo de créditos: [docs/ASSETS_CREDITS.md](./docs/ASSETS_CREDITS.md)

---

## 📱 Compilar APK/IPA

### Para Android (APK)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login a Expo (crear cuenta gratis en expo.dev)
eas login

# Configurar build (solo primera vez)
eas build:configure

# Compilar APK
eas build --platform android --profile preview

# Esperar ~15 minutos
# Te da link de descarga de APK
```

### Para iOS (IPA)

```bash
# Requiere Mac + cuenta Apple Developer ($99/año)
eas build --platform ios --profile preview
```

Ver guía completa: [docs/COMPILATION_GUIDE.md](./docs/COMPILATION_GUIDE.md)

---

## 🌍 Los 35 Países

### América (7)
🇲🇽 México • 🇧🇷 Brasil • 🇵🇪 Perú • 🇨🇦 Canadá • 🇦🇷 Argentina • 🇺🇸 USA • 🇨🇱 Chile

### Europa (7)
🇪🇸 España • 🇫🇷 Francia • 🇮🇹 Italia • 🇬🇷 Grecia • 🇬🇧 Reino Unido • 🇩🇪 Alemania • 🇷🇺 Rusia

### Asia (7)
🇯🇵 Japón • 🇨🇳 China • 🇮🇳 India • 🇹🇭 Tailandia • 🇰🇷 Corea del Sur • 🇮🇩 Indonesia • 🇸🇦 Arabia Saudita

### África (7)
🇪🇬 Egipto • 🇰🇪 Kenia • 🇲🇦 Marruecos • 🇿🇦 Sudáfrica • 🇳🇬 Nigeria • 🇪🇹 Etiopía • 🇲🇬 Madagascar

### Oceanía (7)
🇦🇺 Australia • 🇳🇿 Nueva Zelanda • 🇵🇬 Papúa Nueva Guinea • 🇫🇯 Fiji • 🇼🇸 Samoa • 🇹🇴 Tonga • 🇻🇺 Vanuatu

---

## 💰 Monetización

### Modelo Freemium

**Versión Gratuita:**
- 10 países (2 por continente)
- 3 sabios básicos
- Museo limitado
- Ads cada 3 países (no intrusivos)

**Premium "Pasaporte Global" ($4.99):**
- Todos los 35 países
- 5 sabios con habilidades
- Sin publicidad
- Museo completo
- Modo desafío
- Ropa avatar premium

**Packs de Continentes ($1.99 c/u):**
- América, Europa, Asia, África, Oceanía

**Versión Escolar ($49/año por aula):**
- 30 perfiles de estudiantes
- Dashboard para maestro
- Reportes de progreso
- Sin ads garantizado

---

## 📊 Métricas y Analytics

### KPIs Educativos
- Países visitados por usuario
- Actividades completadas
- Tasa de aciertos en preguntas
- Tiempo en modo aventura vs físico

### KPIs de Engagement
- Retention D1/D7/D30
- Sesiones por semana
- Tiempo promedio de sesión
- Nivel de completitud

Ver más: [docs/ANALYTICS.md](./docs/ANALYTICS.md)

---

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

---

## 📚 Documentación Completa

| Documento | Descripción |
|-----------|-------------|
| [INSTALLATION.md](./docs/INSTALLATION.md) | Guía detallada de instalación |
| [GAMEPLAY.md](./docs/GAMEPLAY.md) | Manual de juego completo |
| [COMPILATION_GUIDE.md](./docs/COMPILATION_GUIDE.md) | Cómo compilar APK/IPA |
| [ASSETS_GUIDE.md](./docs/ASSETS_GUIDE.md) | Guía de assets 3D/2D gratuitos |
| [CHARACTERS.md](./docs/CHARACTERS.md) | Diseño de personajes |
| [PHYSICS_GUIDE.md](./docs/PHYSICS_GUIDE.md) | Cómo funciona Matter.js |
| [LEVEL_DESIGN.md](./docs/LEVEL_DESIGN.md) | Crear nuevos países/niveles |
| [LOCALIZATION.md](./docs/LOCALIZATION.md) | Agregar nuevos idiomas |
| [FIREBASE_SETUP.md](./docs/FIREBASE_SETUP.md) | Configurar Firebase |
| [MONETIZATION.md](./docs/MONETIZATION.md) | Configurar AdMob/IAP |
| [CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Guía para colaboradores |
| [FAQ.md](./docs/FAQ.md) | Preguntas frecuentes |

---

## 🤝 Contribuir

¿Quieres agregar un país, traducir a un nuevo idioma, o mejorar el código?

Ver guía de contribución: [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

---

## 📄 Licencia

**Código**: PROPRIETARY - Todos los derechos reservados
**Assets de terceros**: Ver [ASSETS_CREDITS.md](./docs/ASSETS_CREDITS.md) para licencias individuales

---

## 🎯 Roadmap

### Versión 1.0 (Lanzamiento)
- ✅ 35 países completos
- ✅ 10 idiomas
- ✅ Modo aventura + físico
- ✅ Sistema de progresión
- ✅ Firebase backend
- ✅ Monetización

### Versión 1.5 (3 meses)
- Expansión a 50 países
- Modo multijugador cooperativo
- Nuevos sabios
- Eventos temporales

### Versión 2.0 (6 meses)
- Modo AR (realidad aumentada)
- Grabación de voz
- Desafíos diarios
- Ranking global

---

## 📞 Soporte

- **Email**: support@wisdomquest.app
- **Website**: https://wisdomquest.app
- **Discord**: [Comunidad Wisdom Quest](https://discord.gg/wisdomquest)

---

## ⭐ Si te gusta el proyecto

- Dale una estrella ⭐ en GitHub
- Compártelo con educadores y padres
- Deja un review en App Store/Play Store
- Sugiere nuevos países para agregar

---

**🌍 ¡Que comience la aventura educativa!**

*Wisdom Quest - Aprende jugando, explora el mundo*
