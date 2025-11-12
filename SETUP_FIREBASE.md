# Firebase Setup Guide

Este proyecto requiere Firebase para authentication, Firestore database y Analytics.

## Paso 1: Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com
2. Click en "Add project"
3. Nombre del proyecto: **Hope Quest** (o el que prefieras)
4. Habilita Google Analytics (recomendado)
5. Click "Create project"

## Paso 2: Configurar Authentication

1. En el menú lateral, click en **Authentication**
2. Click en "Get started"
3. Habilita los siguientes métodos:
   - ✅ Email/Password
   - ✅ Anonymous (para testing)
4. (Opcional) Google Sign-In para login social

## Paso 3: Configurar Firestore Database

1. En el menú lateral, click en **Firestore Database**
2. Click "Create database"
3. **Modo**: Start in **test mode** (para desarrollo)
4. **Ubicación**: Elige la más cercana (ej: `us-central1`)
5. Click "Enable"

### Firestore Security Rules (Production)

Cuando estés listo para producción, actualiza las reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Progress collection
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Leaderboards (read-only for authenticated users)
    match /leaderboards/{entry} {
      allow read: if request.auth != null;
      allow write: if false; // Only through Cloud Functions
    }

    // Analytics (write-only)
    match /analytics/{doc} {
      allow read: if false;
      allow write: if request.auth != null;
    }
  }
}
```

## Paso 4: Obtener Credenciales

1. En la página principal del proyecto, click en el ícono de configuración ⚙️
2. Click en "Project settings"
3. Scroll down hasta "Your apps"
4. Click en el ícono **Web** (`</>`) para agregar una app web
5. **App nickname**: `Hope Quest Web`
6. **NO** marques "Also set up Firebase Hosting"
7. Click "Register app"

Verás algo como esto:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABC123...",
  authDomain: "hopequest-12345.firebaseapp.com",
  projectId: "hopequest-12345",
  storageBucket: "hopequest-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123...",
  measurementId: "G-ABC123..."
};
```

## Paso 5: Configurar .env

Copia las credenciales a tu archivo `.env`:

```bash
FIREBASE_API_KEY=AIzaSyABC123...
FIREBASE_AUTH_DOMAIN=hopequest-12345.firebaseapp.com
FIREBASE_PROJECT_ID=hopequest-12345
FIREBASE_STORAGE_BUCKET=hopequest-12345.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123...
FIREBASE_MEASUREMENT_ID=G-ABC123...
```

## Paso 6: Habilitar Analytics (Opcional)

1. En el menú lateral, click en **Analytics**
2. Click "Enable Google Analytics"
3. Selecciona tu cuenta de Google Analytics o crea una nueva
4. Click "Enable Analytics"

## Paso 7: Crear Colecciones Iniciales

Firestore se auto-crea las colecciones, pero puedes pre-crearlas:

### Colección: `users`
```json
{
  "userId": "example_uid",
  "displayName": "Player Name",
  "email": "player@example.com",
  "createdAt": "2025-01-01T00:00:00Z",
  "lastLoginAt": "2025-01-01T00:00:00Z",
  "settings": {
    "language": "es",
    "soundEnabled": true,
    "musicEnabled": true
  }
}
```

### Colección: `progress`
```json
{
  "userId": "example_uid",
  "currentLevel": 1,
  "completedCountries": ["venezuela", "colombia"],
  "totalStars": 12,
  "money": 500,
  "health": 100,
  "moral": 80,
  "unlockedCharacters": ["marco", "xolo", "patricia"],
  "achievements": ["first_country", "star_collector"],
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

### Colección: `leaderboards`
```json
{
  "userId": "example_uid",
  "playerName": "Player Name",
  "totalStars": 150,
  "completedCountries": 25,
  "rank": 1,
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## Paso 8: Testing

Para verificar que funciona:

```bash
npm install
npm start
```

En la app:
1. Intenta crear una cuenta (Email/Password)
2. Verifica que el usuario aparece en Firebase Console > Authentication
3. Verifica que se creó un documento en Firestore > `users` collection

## Troubleshooting

### Error: "Firebase: Error (auth/operation-not-allowed)"
- Solución: Habilita Email/Password en Authentication

### Error: "Missing or insufficient permissions"
- Solución: Firestore rules muy restrictivas, usa test mode temporalmente

### Error: "PERMISSION_DENIED: Missing or insufficient permissions"
- Solución: Asegúrate de estar autenticado (`auth.currentUser` no null)

### Error: "App named '[DEFAULT]' already exists"
- Solución: Firebase ya está inicializado, no llames `initializeApp()` múltiples veces

## Costos

Firebase tiene un **plan gratuito generoso** (Spark Plan):

- **Authentication**: 10,000 verificaciones/mes gratis
- **Firestore**: 50,000 lecturas, 20,000 escrituras/día gratis
- **Analytics**: Gratis ilimitado
- **Storage**: 1GB gratis

Para este proyecto, el plan gratuito debería ser suficiente durante desarrollo y early beta.

## Próximos Pasos

Una vez configurado Firebase:

1. ✅ Configura `.env` con tus credenciales
2. ✅ Reinicia el servidor de desarrollo
3. ✅ Prueba crear una cuenta
4. ✅ Verifica que los datos se guardan en Firestore
5. 🚀 ¡Ya puedes desarrollar con Firebase!

---

**Nota**: Nunca compartas tu `.env` en GitHub. Ya está incluido en `.gitignore`.
