# ⚡ Inicio Rápido - 5 Minutos

Tienes el proyecto en tu Desktop. Sigue estos pasos para ponerlo en marcha rápidamente.

---

## 🚀 OPCIÓN 1: SCRIPT AUTOMÁTICO (Recomendado)

```bash
cd ~/Desktop/condominio360-full
./scripts/setup-complete.sh
```

Este script:
- ✅ Verifica requisitos (Node.js, npm, git)
- ✅ Instala dependencias del backend
- ✅ Instala dependencias del frontend
- ✅ Crea archivos .env
- ✅ Verifica conexión a base de datos

**Después del script:**

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🔧 OPCIÓN 2: PASO A PASO MANUAL

### 1. Backend (3 minutos)

```bash
cd ~/Desktop/condominio360-full/backend

# Instalar dependencias
npm install

# Configurar .env
cp .env.example .env
nano .env  # Editar con tus credenciales

# Inicializar DB
psql "tu_connection_string" -f database_init.sql
psql "tu_connection_string" -f database_qr.sql

# Iniciar
npm run dev
```

**Backend corriendo en:** http://localhost:5000

### 2. Frontend (2 minutos)

**En otra terminal:**

```bash
cd ~/Desktop/condominio360-full/frontend

# Instalar dependencias
npm install

# Crear .env
echo "VITE_API_URL=http://localhost:5000" > .env

# Iniciar
npm run dev
```

**Frontend corriendo en:** http://localhost:5173

---

## 🎯 PROBAR QUE FUNCIONA

1. Abrir: http://localhost:5173
2. Click en "Crear Cuenta"
3. Registrarte (serás admin automáticamente)
4. ¡Listo! Estás dentro

---

## 🆘 SI ALGO FALLA

### Backend no inicia

```bash
cd ~/Desktop/condominio360-full/backend

# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Frontend no conecta

```bash
# Verificar que backend esté corriendo
curl http://localhost:5000
# Debe responder con JSON
```

### Error de Base de Datos

```bash
# Verificar .env
cat backend/.env | grep DATABASE_URL

# Debe verse algo así:
# DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
```

---

## 📚 DOCUMENTACIÓN COMPLETA

Si necesitas más detalles:

- **INSTALACION_COMPLETA.md** - Guía paso a paso detallada
- **ACTUALIZAR_DESDE_GITHUB.md** - Cómo actualizar el proyecto
- **docs/INTEGRACION_QR.md** - Sistema QR completo

---

## 🎉 ¡LISTO!

En 5 minutos deberías tener:
- ✅ Backend corriendo en puerto 5000
- ✅ Frontend corriendo en puerto 5173
- ✅ Base de datos inicializada
- ✅ Sistema QR funcionando

**Siguiente:** Ir a http://localhost:5173 y crear tu cuenta 🚀
