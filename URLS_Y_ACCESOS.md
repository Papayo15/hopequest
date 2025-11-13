# 🔗 URLs Y ACCESOS - CONDOMINIO360

## 📍 URLS DEL PROYECTO

### 🌐 **URLs en Producción (Después del Deploy)**

#### **Frontend (Vercel) - URL Principal donde los usuarios entran:**
```
https://condominio360.vercel.app
```
O con tu dominio personalizado:
```
https://tudominio.com
```

**Páginas disponibles:**
- 🏠 Landing: `https://condominio360.vercel.app/`
- 🔐 Login: `https://condominio360.vercel.app/login`
- ✍️ Registro: `https://condominio360.vercel.app/register`
- 📊 Dashboard: `https://condominio360.vercel.app/dashboard`

#### **Backend API (Render) - Solo para desarrollo:**
```
https://condominio360-backend.onrender.com
```

**Endpoints API:**
```
POST   https://condominio360-backend.onrender.com/api/auth/login
POST   https://condominio360-backend.onrender.com/api/auth/register
GET    https://condominio360-backend.onrender.com/api/condos
POST   https://condominio360-backend.onrender.com/api/condos
POST   https://condominio360-backend.onrender.com/api/pagos/crear
```

#### **Base de Datos (Neon) - Solo para administración:**
```
postgresql://user:pass@ep-xxx-123456.us-east-2.aws.neon.tech/condominio360
```

---

## 🖥️ **URLs en Desarrollo Local (En tu computadora)**

### Mientras desarrollas en tu Mac:

#### **Frontend:**
```
http://localhost:5173
```
Páginas:
- `http://localhost:5173/` → Landing
- `http://localhost:5173/login` → Login
- `http://localhost:5173/register` → Registro
- `http://localhost:5173/dashboard` → Dashboard

#### **Backend API:**
```
http://localhost:5000
```
Endpoints:
- `http://localhost:5000/api/auth/login`
- `http://localhost:5000/api/condos`
- etc.

---

## 👥 **¿QUIÉN USA QUÉ URL?**

### **USUARIOS FINALES (Residentes/Admins):**
Solo necesitan la URL del frontend:
```
✅ https://condominio360.vercel.app
```
Desde ahí hacen todo:
- Login
- Ver condominios
- Hacer pagos
- Reservar áreas

### **TÚ (Desarrollador):**
Usas varias URLs según la tarea:

**Para administrar la base de datos:**
```
🗄️ https://console.neon.tech
   → Ver tablas, ejecutar SQL, backups
```

**Para ver logs del backend:**
```
🖥️ https://dashboard.render.com
   → Logs, errores, métricas
```

**Para configurar el frontend:**
```
⚡ https://vercel.com/dashboard
   → Deploy, variables de entorno, dominios
```

**Para gestionar pagos:**
```
💳 https://dashboard.stripe.com
   → Ver transacciones, configurar webhooks
```

---

## 🔧 **CÓMO OBTENER TUS URLs REALES**

### 1️⃣ **URL del Backend (Render)**

Después de hacer deploy en Render, recibirás una URL como:
```
https://condominio360-backend-xyz123.onrender.com
```

**Pasos para obtenerla:**
1. Ir a https://dashboard.render.com
2. Click en tu servicio "condominio360-backend"
3. Copiar la URL que aparece arriba (ej: `https://condominio360-backend-xyz123.onrender.com`)

**⚠️ IMPORTANTE:** Copiar esta URL y actualizar:

**En el código del frontend:**
```bash
# Editar archivo: frontend/.env.production
VITE_API_URL=https://condominio360-backend-xyz123.onrender.com
```

**En Vercel (variables de entorno):**
1. Ir a https://vercel.com/dashboard
2. Proyecto → Settings → Environment Variables
3. Agregar:
   - Name: `VITE_API_URL`
   - Value: `https://condominio360-backend-xyz123.onrender.com`
4. Redeploy

---

### 2️⃣ **URL del Frontend (Vercel)**

Después de hacer deploy en Vercel, recibirás una URL como:
```
https://condominio360-abc123.vercel.app
```

**Pasos para obtenerla:**
1. Ir a https://vercel.com/dashboard
2. Click en tu proyecto "condominio360"
3. La URL aparece en "Domains"

**Esta es la URL que compartes con tus usuarios!** 🎉

**⚠️ IMPORTANTE:** Copiar esta URL y actualizar:

**En Render (variables de entorno del backend):**
1. Ir a https://dashboard.render.com
2. Tu servicio → Environment
3. Editar `FRONTEND_URL`:
   - Value: `https://condominio360-abc123.vercel.app`
4. Save changes (se reiniciará automáticamente)

---

### 3️⃣ **Connection String de Neon (Base de Datos)**

Al crear tu proyecto en Neon, recibirás algo como:
```
postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/dbname?sslmode=require
```

**Pasos para obtenerla:**
1. Ir a https://console.neon.tech
2. Tu proyecto → Dashboard
3. Click "Connection string"
4. Copiar el string completo

**⚠️ IMPORTANTE:** Copiar esta URL y configurar:

**En Render (variables de entorno del backend):**
1. Ir a https://dashboard.render.com
2. Tu servicio → Environment
3. Agregar/Editar `DATABASE_URL`:
   - Value: `postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/dbname?sslmode=require`
4. Save changes

---

## 🎯 **FLUJO COMPLETO DE URLs**

```
USUARIO FINAL
    |
    | Abre navegador y escribe:
    |
    ▼
https://condominio360.vercel.app
    |
    | (FRONTEND VERCEL)
    | Ve la página, hace login, etc.
    |
    | Cuando hace una acción (ej: login):
    |
    ▼
Hace petición a:
https://condominio360-backend.onrender.com/api/auth/login
    |
    | (BACKEND RENDER)
    | Procesa la petición
    |
    ▼
Consulta base de datos:
postgresql://...neon.tech/condominio360
    |
    | (NEON DATABASE)
    | Busca usuario, verifica password
    |
    ▼
Retorna datos al BACKEND
    |
    ▼
BACKEND envía respuesta al FRONTEND
    |
    ▼
FRONTEND muestra resultado al USUARIO
```

---

## 🌍 **DOMINIO PERSONALIZADO (Opcional)**

### ¿Quieres usar tu propio dominio?

En lugar de:
```
https://condominio360-abc123.vercel.app
```

Puedes tener:
```
https://condominio360.com
```

**Pasos:**
1. Comprar dominio en:
   - Namecheap ($10/año)
   - GoDaddy ($15/año)
   - Google Domains ($12/año)

2. En Vercel:
   - Dashboard → Tu proyecto → Settings → Domains
   - Click "Add Domain"
   - Ingresar: `condominio360.com`
   - Seguir instrucciones para configurar DNS

3. Actualizar `FRONTEND_URL` en Render:
   ```
   FRONTEND_URL=https://condominio360.com
   ```

---

## 📱 **URLs PARA COMPARTIR CON USUARIOS**

### Para administradores del condominio:
```
🏢 Sistema de gestión: https://condominio360.vercel.app
📧 Email: admin@condominio360.com
🔑 Crear cuenta: https://condominio360.vercel.app/register
```

### Para residentes:
```
🏠 Portal del residente: https://condominio360.vercel.app
✍️ Registro: https://condominio360.vercel.app/register
🔐 Iniciar sesión: https://condominio360.vercel.app/login
```

---

## 🔒 **SEGURIDAD DE URLs**

### ✅ URLs Públicas (OK compartir):
- Frontend: `https://condominio360.vercel.app`

### ❌ URLs NUNCA compartir:
- Connection string de Neon (tiene password!)
- JWT_SECRET
- STRIPE_SECRET
- Credenciales de admin

---

## 📊 **EJEMPLO REAL DE URLs**

Supongamos que ya hiciste el deploy:

```
┌─────────────────────────────────────────────────────────┐
│ FRONTEND (Lo que los usuarios ven)                      │
├─────────────────────────────────────────────────────────┤
│ URL Principal:                                           │
│ https://condominio360-xyz.vercel.app                    │
│                                                          │
│ Páginas:                                                │
│ • https://condominio360-xyz.vercel.app/                 │
│ • https://condominio360-xyz.vercel.app/login            │
│ • https://condominio360-xyz.vercel.app/register         │
│ • https://condominio360-xyz.vercel.app/dashboard        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ BACKEND (API - los usuarios NO la ven)                  │
├─────────────────────────────────────────────────────────┤
│ URL Base:                                                │
│ https://condominio360-backend-abc.onrender.com          │
│                                                          │
│ El frontend la usa internamente para:                   │
│ • .../api/auth/login                                    │
│ • .../api/condos                                        │
│ • .../api/pagos/crear                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ BASE DE DATOS (Solo tú la administras)                  │
├─────────────────────────────────────────────────────────┤
│ Dashboard: https://console.neon.tech                    │
│                                                          │
│ Connection:                                             │
│ postgresql://user:pass@ep-cool-forest-123456            │
│   .us-east-2.aws.neon.tech/condominio360               │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 **RESUMEN: LA URL QUE NECESITAS**

### **Para usar la aplicación:**
```
✅ https://condominio360.vercel.app
```

**ESA ES LA ÚNICA URL QUE NECESITAN LOS USUARIOS!**

Las demás URLs (backend, database) son solo para configuración interna.

---

## 🚀 **VERIFICAR SI TODO FUNCIONA**

Después del deploy, prueba estas URLs:

### 1. Frontend funcionando:
```bash
# Abrir en navegador:
https://tu-app.vercel.app

# Deberías ver el landing page con el logo azul
```

### 2. Backend funcionando:
```bash
# Abrir en navegador:
https://tu-backend.onrender.com

# Deberías ver:
# { "message": "✅ Condominio360 API activa", "version": "1.0.0" }
```

### 3. Base de datos funcionando:
```bash
# En tu terminal:
psql "tu-connection-string-de-neon" -c "SELECT COUNT(*) FROM users;"

# Debería retornar un número (ej: 2 usuarios de prueba)
```

---

## 📞 **¿NECESITAS AYUDA?**

Si después del deploy algo no funciona:

1. **Frontend no carga:**
   - Verificar que el build terminó sin errores en Vercel
   - Ver logs en Vercel Dashboard

2. **Login no funciona:**
   - Verificar que `VITE_API_URL` apunta al backend correcto
   - Ver logs del backend en Render

3. **Backend da error:**
   - Verificar `DATABASE_URL` en Render
   - Ver logs de PostgreSQL en Neon

---

¿Listo para hacer el deploy y obtener tus URLs? 🚀
