# 🚀 Guía de Instalación Completa - Condominio360 Full

Esta guía te llevará paso a paso para tener el sistema completo funcionando en:
- ✅ **Web** (React)
- ✅ **iOS** (App nativa)
- ✅ **Android** (App nativa)

---

## 📋 REQUISITOS PREVIOS

### Instalaciones Necesarias

**Para todos:**
- ✅ Node.js 18+ (https://nodejs.org)
- ✅ Git
- ✅ Cuenta en Neon.tech (base de datos PostgreSQL gratis)

**Para iOS:**
- ✅ macOS
- ✅ Xcode 15+ (desde App Store)
- ✅ CocoaPods: `sudo gem install cocoapods`

**Para Android:**
- ✅ Android Studio (https://developer.android.com/studio)
- ✅ Java JDK 17+

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version  # Debe ser 18+
npm --version

# Verificar Git
git --version

# Para iOS - Verificar Xcode
xcode-select --version

# Para Android - Verificar Java
java --version  # Debe ser 17+
```

---

## 🗄️ PASO 1: CONFIGURAR BASE DE DATOS

### 1.1 Crear Cuenta en Neon.tech

1. Ir a https://neon.tech
2. Registrarse (gratis, sin tarjeta)
3. Click en "Create Project"
4. Nombre: `condominio360`
5. Región: Elegir la más cercana
6. PostgreSQL version: 15 o superior

### 1.2 Obtener Connection String

1. En el dashboard de Neon, click en tu proyecto
2. Copiar el "Connection string"
3. Se verá algo así:
```
postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 1.3 Guardar Credenciales

Guarda este connection string, lo usaremos en el siguiente paso.

---

## 💻 PASO 2: CONFIGURAR BACKEND

### 2.1 Instalar Dependencias

```bash
cd ~/Desktop/condominio360-full/backend
npm install
```

Esto instalará:
- Express (servidor)
- PostgreSQL client
- Bcrypt (seguridad)
- JWT (autenticación)
- Stripe (pagos)
- Axios (notificaciones push)
- Y más...

### 2.2 Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar archivo .env
nano .env
# O abrir con tu editor preferido:
# open .env
```

**Contenido del .env:**

```env
# Base de datos (IMPORTANTE)
DATABASE_URL=postgresql://tu_usuario:tu_password@tu-host.neon.tech/neondb?sslmode=require

# JWT para autenticación (genera uno aleatorio)
JWT_SECRET=tu_secreto_super_seguro_cambiar_esto_12345

# Stripe (opcional, para pagos - puedes usar claves de prueba)
STRIPE_SECRET_KEY=sk_test_51xxxxx

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Otros
NODE_ENV=development
PORT=5000
```

**Generar JWT_SECRET seguro:**
```bash
# En terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copiar el resultado y pegarlo en JWT_SECRET
```

### 2.3 Inicializar Base de Datos

```bash
# Desde ~/Desktop/condominio360-full/backend

# Ejecutar schema principal
psql "tu_connection_string_completo_aqui" -f database_init.sql

# Ejecutar schema QR (nuevas tablas)
psql "tu_connection_string_completo_aqui" -f database_qr.sql
```

**Ejemplo real:**
```bash
psql "postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require" -f database_init.sql
psql "postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require" -f database_qr.sql
```

**Verificar que las tablas se crearon:**
```bash
psql "tu_connection_string" -c "\dt"
```

Deberías ver:
- users
- condominios
- unidades
- pagos
- codigos_qr ← Nueva
- push_tokens ← Nueva
- historial_accesos ← Nueva
- configuracion_qr ← Nueva
- Y más...

### 2.4 Iniciar Backend

```bash
# En modo desarrollo (recarga automática)
npm run dev

# O en modo producción
npm start
```

**Deberías ver:**
```
🚀 Backend corriendo en puerto 5000
📍 Entorno: development
🔗 CORS habilitado para: http://localhost:5173
```

**Probar que funciona:**

Abrir en navegador: http://localhost:5000

Deberías ver:
```json
{
  "message": "✅ Condominio360 Unified API activa",
  "version": "2.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "condos": "/api/condos",
    "pagos": "/api/pagos",
    "qr": "/api/qr"
  }
}
```

✅ **Backend funcionando!**

---

## 🌐 PASO 3: CONFIGURAR FRONTEND WEB

**Abrir nueva terminal** (dejar backend corriendo)

### 3.1 Instalar Dependencias

```bash
cd ~/Desktop/condominio360-full/frontend
npm install
```

Esto instalará:
- React
- Vite (build tool)
- TailwindCSS
- Axios
- React Router
- QRCode.js ← Para generar códigos QR

### 3.2 Configurar Variables de Entorno

```bash
# Crear archivo .env
echo "VITE_API_URL=http://localhost:5000" > .env
```

### 3.3 Iniciar Frontend

```bash
npm run dev
```

**Deberías ver:**
```
VITE v5.0.0  ready in 324 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3.4 Probar en Navegador

1. Abrir http://localhost:5173
2. Deberías ver la página de login
3. Click en "Crear Cuenta"
4. Registrarte (el primer usuario será **ADMIN** automáticamente)
5. Iniciar sesión

✅ **Frontend Web funcionando!**

### 3.5 Agregar Ruta de Gestión QR

Para acceder a la gestión QR, necesitas agregar la ruta:

**Editar `frontend/src/App.jsx`:**

```jsx
import QRManagement from './pages/QR/QRManagement';

// Dentro de <Routes>:
<Route path="/qr" element={<QRManagement />} />
```

Ahora puedes ir a: http://localhost:5173/qr

---

## 📱 PASO 4: CONFIGURAR APP iOS

### 4.1 Verificar que tienes Xcode

```bash
xcode-select --install
# Si ya está instalado, dirá que ya lo tienes
```

### 4.2 Abrir Proyecto iOS

```bash
cd ~/Desktop/condominio360-full/mobile/iOS

# Ver las apps disponibles
ls -la
# Verás: ResidenteApp y VigilanciaApp (carpetas vacías por ahora)
```

**NOTA:** Las apps móviles están en estructura básica. Para compilarlas necesitas:

### 4.3 Crear App iOS con React Native Expo

Si quieres apps móviles funcionales, te recomiendo crearlas con Expo:

```bash
cd ~/Desktop/condominio360-full/mobile

# Instalar Expo CLI
npm install -g expo-cli

# Crear ResidenteApp
npx create-expo-app ResidenteApp
cd ResidenteApp
npm install axios @react-navigation/native expo-barcode-scanner

# Configurar API URL
echo "export const API_URL = 'http://localhost:5000';" > config.js
```

**Iniciar app en simulador:**
```bash
npm start
# Presionar 'i' para iOS simulator
```

### 4.4 VigilanciaApp

Similar a ResidenteApp:
```bash
cd ~/Desktop/condominio360-full/mobile
npx create-expo-app VigilanciaApp
cd VigilanciaApp
npm install axios @react-navigation/native expo-barcode-scanner expo-camera
```

---

## 🤖 PASO 5: CONFIGURAR APP ANDROID

### 5.1 Verificar Android Studio

```bash
# Verificar que Android Studio está instalado
which android
```

Si no está instalado:
1. Descargar de https://developer.android.com/studio
2. Instalar
3. Abrir Android Studio
4. Tools → SDK Manager → Instalar Android SDK

### 5.2 Configurar Variables de Entorno

Agregar a `~/.zshrc` o `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Recargar:
```bash
source ~/.zshrc
```

### 5.3 Iniciar Apps Android

Usando Expo (mismas apps que iOS):

```bash
cd ~/Desktop/condominio360-full/mobile/ResidenteApp
npm start
# Presionar 'a' para Android emulator
```

---

## 🧪 PASO 6: PROBAR EL SISTEMA COMPLETO

### 6.1 Flujo de Prueba

**En Web:**
1. Login como admin
2. Crear un condominio
3. Ir a `/qr`
4. Generar código QR para visitante
5. Descargar el QR

**En App Móvil (VigilanciaApp):**
1. Login
2. Escanear el QR generado
3. Validar acceso

**Resultado esperado:**
- ✅ Backend valida el código
- ✅ Registra en `historial_accesos`
- ✅ Envía notificación push al residente

### 6.2 Verificar Base de Datos

```bash
psql "tu_connection_string" -c "SELECT * FROM codigos_qr;"
psql "tu_connection_string" -c "SELECT * FROM historial_accesos;"
```

---

## 📦 RESUMEN DE COMANDOS RÁPIDOS

```bash
# Terminal 1: Backend
cd ~/Desktop/condominio360-full/backend
npm install
cp .env.example .env
# Editar .env
npm run dev

# Terminal 2: Frontend Web
cd ~/Desktop/condominio360-full/frontend
npm install
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev

# Terminal 3: App iOS
cd ~/Desktop/condominio360-full/mobile/ResidenteApp
npm start
# Presionar 'i'

# Terminal 4: App Android
cd ~/Desktop/condominio360-full/mobile/VigilanciaApp
npm start
# Presionar 'a'
```

---

## 🎯 CHECKLIST DE INSTALACIÓN

Marca lo que ya completaste:

- [ ] Node.js instalado
- [ ] Cuenta en Neon.tech creada
- [ ] Backend: dependencias instaladas
- [ ] Backend: .env configurado
- [ ] Backend: base de datos inicializada
- [ ] Backend: servidor corriendo en puerto 5000
- [ ] Frontend: dependencias instaladas
- [ ] Frontend: corriendo en puerto 5173
- [ ] Frontend: login funcionando
- [ ] Frontend: ruta QR agregada
- [ ] iOS: Xcode instalado
- [ ] iOS: App compilando
- [ ] Android: Android Studio instalado
- [ ] Android: App compilando

---

## 🆘 PROBLEMAS COMUNES

### Backend no inicia

**Error:** `Cannot find module 'express'`
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Error:** `Error: connect ECONNREFUSED`
→ Verifica que `DATABASE_URL` en `.env` sea correcto

### Frontend no conecta al backend

**Error:** `Network Error`
```bash
# Verificar que backend esté corriendo
curl http://localhost:5000

# Verificar VITE_API_URL
cat frontend/.env
```

### Apps móviles no compilan

```bash
# Limpiar cache
cd mobile/ResidenteApp
rm -rf node_modules
npm install
npm start -- --clear
```

---

## 📞 SOPORTE

Si tienes problemas:
1. Ver logs del backend (terminal donde corre)
2. Revisar documentación: `docs/INTEGRACION_QR.md`
3. Verificar que todas las variables de entorno están configuradas

---

## ✨ PRÓXIMO PASO

Una vez todo funcionando, ver: **`ACTUALIZAR_DESDE_GITHUB.md`** para aprender a mantener tu código actualizado.

---

**¡Listo! Ahora tienes el sistema completo funcionando en Web, iOS y Android.** 🚀
