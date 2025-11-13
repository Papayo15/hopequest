# 🏢 Condominio360 - Sistema Completo Unificado

Sistema integral de gestión de condominios con funcionalidad de códigos QR para control de acceso de visitantes.

## 📦 Contenido del Proyecto

- **Backend**: API REST (Node.js + Express + PostgreSQL)
- **Frontend Web**: Aplicación web (React + Vite + TailwindCSS)
- **Mobile Apps**: Apps nativas (React Native + Expo)
  - ResidenteApp: Para residentes
  - VigilanciaApp: Para personal de seguridad

---

## 🚀 Inicio Rápido (5 minutos)

### 1. Clonar el Proyecto desde GitHub

```bash
cd ~/Desktop
git clone https://github.com/Papayo15/hopequest.git condominio360-full
cd condominio360-full
git checkout claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks
```

### 2. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configurar Variables de Entorno

**Backend** - Crear `backend/.env`:
```bash
cd backend
cat > .env << 'EOF'
PORT=5000
NODE_ENV=development

# Base de datos PostgreSQL (Neon.tech o local)
DATABASE_URL=postgresql://usuario:password@host/database

# JWT
JWT_SECRET=tu-secreto-super-seguro-cambialo-en-produccion

# Stripe (para pagos)
STRIPE_SECRET_KEY=sk_test_tu_clave_stripe
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
EOF
```

**Frontend** - Crear `frontend/.env`:
```bash
cd ../frontend
cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000
EOF
```

### 4. Inicializar Base de Datos

```bash
cd backend
npm run db:init
# Esto ejecuta los archivos SQL en orden:
# - database.sql (tablas principales)
# - database_qr.sql (sistema QR)
```

### 5. Iniciar el Sistema

**Opción A - Iniciar todo con un script:**
```bash
cd ~/Desktop/condominio360-full
chmod +x scripts/start-all.sh
./scripts/start-all.sh
```

**Opción B - Iniciar manualmente (en terminales separadas):**

Terminal 1 - Backend:
```bash
cd ~/Desktop/condominio360-full/backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd ~/Desktop/condominio360-full/frontend
npm run dev
```

### 6. Acceder a la Aplicación Web

Abre tu navegador en:

🌐 **Frontend:** http://localhost:5173

🔌 **Backend API:** http://localhost:5000

---

## 📱 Compilar Apps Móviles

### Instalar Dependencias Móviles

```bash
# ResidenteApp
cd mobile/ResidenteApp
npm install

# VigilanciaApp
cd ../VigilanciaApp
npm install
```

### Probar en Simulador/Emulador

```bash
cd mobile/ResidenteApp
npm start
# Presiona 'i' para iOS o 'a' para Android
```

### Compilar para Producción

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Compilar iOS
cd mobile/ResidenteApp
eas build --platform ios

# Compilar Android
cd mobile/ResidenteApp
eas build --platform android
```

Ver guía completa: [mobile/COMPILAR_APPS.md](./mobile/COMPILAR_APPS.md)

---

## 📚 Documentación Completa

- **[INSTALACION_COMPLETA.md](./INSTALACION_COMPLETA.md)** - Guía detallada de instalación
- **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - Guía de inicio rápido
- **[ACTUALIZAR_DESDE_GITHUB.md](./ACTUALIZAR_DESDE_GITHUB.md)** - Cómo actualizar el proyecto
- **[mobile/README.md](./mobile/README.md)** - Documentación de apps móviles
- **[mobile/COMPILAR_APPS.md](./mobile/COMPILAR_APPS.md)** - Guía de compilación móvil

---

## 🏗️ Estructura del Proyecto

```
condominio360-full/
│
├── backend/                    # API REST
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── routes/            # Rutas API
│   │   ├── models/            # Modelos de datos
│   │   ├── middleware/        # Middlewares
│   │   └── services/          # Servicios (push, email, etc)
│   ├── database.sql           # Schema principal
│   ├── database_qr.sql        # Schema sistema QR
│   └── package.json
│
├── frontend/                   # Aplicación Web
│   ├── src/
│   │   ├── pages/             # Páginas
│   │   ├── components/        # Componentes reutilizables
│   │   ├── context/           # Context API
│   │   └── services/          # Servicios API
│   └── package.json
│
├── mobile/                     # Apps Móviles
│   ├── ResidenteApp/          # App para residentes
│   │   ├── src/screens/
│   │   └── package.json
│   ├── VigilanciaApp/         # App para seguridad
│   │   ├── src/screens/
│   │   └── package.json
│   ├── README.md
│   └── COMPILAR_APPS.md
│
├── scripts/                    # Scripts de automatización
│   ├── setup-complete.sh      # Instalación automática
│   ├── start-all.sh           # Iniciar todo
│   └── update-project.sh      # Actualizar desde GitHub
│
└── docs/                       # Documentación
```

---

## 🔧 Tecnologías

### Backend
- Node.js 18+
- Express.js
- PostgreSQL (Neon.tech)
- JWT para autenticación
- Stripe para pagos
- Expo Push Notifications

### Frontend Web
- React 18
- Vite 5
- TailwindCSS 3
- React Router 6
- Axios
- QRCode.js

### Mobile
- React Native 0.73
- Expo 50
- React Navigation 6
- Expo Camera
- Expo Barcode Scanner
- Expo Notifications

---

## 🔑 Usuarios de Prueba

Después de inicializar la base de datos, puedes usar estos usuarios:

**Admin:**
- Email: admin@condominio.com
- Password: admin123

**Residente:**
- Email: residente@condominio.com
- Password: residente123

**Conserje/Vigilante:**
- Email: conserje@condominio.com
- Password: conserje123

---

## 🌐 URLs del Sistema

| Componente | URL | Puerto |
|------------|-----|--------|
| Frontend Web | http://localhost:5173 | 5173 |
| Backend API | http://localhost:5000 | 5000 |
| API Docs | http://localhost:5000/api-docs | 5000 |

---

## 📋 Checklist de Instalación

- [ ] Node.js 18+ instalado
- [ ] PostgreSQL configurado (Neon.tech o local)
- [ ] Variables de entorno configuradas (`.env`)
- [ ] Dependencias backend instaladas (`npm install`)
- [ ] Dependencias frontend instaladas (`npm install`)
- [ ] Base de datos inicializada (`npm run db:init`)
- [ ] Backend corriendo (`npm run dev`)
- [ ] Frontend corriendo (`npm run dev`)
- [ ] Acceso a http://localhost:5173 funciona

---

## 🆘 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` en `.env` sea correcto
- Asegúrate de que la base de datos existe
- Revisa que las tablas estén creadas (`npm run db:init`)

### Error: "CORS policy error"
- Verifica que `FRONTEND_URL` en backend/.env sea `http://localhost:5173`
- Reinicia el backend después de cambiar `.env`

### Error: "Module not found"
```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5000 o 5173 ocupado
```bash
# Cambiar puerto del backend en backend/.env
PORT=5001

# O matar el proceso
lsof -ti:5000 | xargs kill -9
```

---

## 🔄 Actualizar el Proyecto

```bash
cd ~/Desktop/condominio360-full
git pull origin claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks

# Actualizar dependencias
cd backend && npm install
cd ../frontend && npm install
```

Ver guía completa: [ACTUALIZAR_DESDE_GITHUB.md](./ACTUALIZAR_DESDE_GITHUB.md)

---

## 📞 Soporte

**Repositorio GitHub:** https://github.com/Papayo15/hopequest

**Branch:** `claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks`

---

## ✅ Estado del Proyecto

- ✅ Backend API completo
- ✅ Frontend Web completo
- ✅ Sistema QR integrado
- ✅ Apps móviles completas (iOS + Android)
- ✅ Documentación completa
- ✅ Scripts de automatización
- ✅ Listo para producción

---

**Última actualización:** 2025-11-13
**Versión:** 2.0.0
