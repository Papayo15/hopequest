# ⚡ COMANDOS RÁPIDOS - CONDOMINIO360

## 🎯 COPIA Y PEGA ESTOS COMANDOS

---

## 1️⃣ CONFIGURAR BASE DE DATOS (SOLO UNA VEZ)

### Después de crear proyecto en Neon.tech:

```bash
# Editar archivo de configuración
open /Users/papayo/Desktop/condominio/backend/.env

# Cambiar esta línea:
# DATABASE_URL=postgresql://localhost/condominio360
# Por tu connection string de Neon

# Ejecutar SQL de inicialización
cd /Users/papayo/Desktop/condominio
psql "TU_CONNECTION_STRING_AQUI" -f backend/database_init.sql
```

**Ejemplo de connection string:**
```
postgresql://user:pass@ep-cool-forest-123.us-east-2.aws.neon.tech/condominio360?sslmode=require
```

---

## 2️⃣ INICIAR SERVIDORES (SI NO ESTÁN CORRIENDO)

```bash
# Terminal 1 - Backend
cd /Users/papayo/Desktop/condominio/backend
npm start

# Terminal 2 - Frontend (nueva terminal)
cd /Users/papayo/Desktop/condominio/frontend
npm run dev
```

---

## 3️⃣ VERIFICAR QUE TODO FUNCIONA

```bash
# Probar backend
curl http://localhost:5000

# Debería retornar:
# {"message":"✅ Condominio360 API activa","version":"1.0.0",...}

# Probar frontend (abrir navegador)
open http://localhost:5175
```

---

## 4️⃣ VER LOGS EN TIEMPO REAL

```bash
# Backend logs (ya se muestran automáticamente)
# Busca la terminal donde corriste npm start

# Ver base de datos
psql "TU_CONNECTION_STRING" -c "SELECT * FROM users;"
psql "TU_CONNECTION_STRING" -c "SELECT * FROM condominios;"
```

---

## 5️⃣ REINICIAR DESPUÉS DE CAMBIOS

```bash
# Si modificaste backend
cd /Users/papayo/Desktop/condominio/backend
# Ctrl+C para detener
npm start

# Si modificaste frontend
cd /Users/papayo/Desktop/condominio/frontend
# Ctrl+C para detener
npm run dev
```

---

## 6️⃣ PROBAR CON CURL (TERMINAL)

### Registrar primer usuario (ADMIN automático):
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Principal",
    "email": "admin@test.com",
    "password": "Admin123456"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin123456"
  }'

# Copiar el TOKEN de la respuesta
```

### Crear condominio (reemplazar TOKEN):
```bash
curl -X POST http://localhost:5000/api/condos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "nombre": "Torres del Sol",
    "direccion": "Av. Principal 123"
  }'
```

### Ver condominios:
```bash
curl -X GET http://localhost:5000/api/condos \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

## 7️⃣ COMANDOS DE BASE DE DATOS

### Conectar a Neon:
```bash
psql "postgresql://user:pass@ep-xxx.neon.tech/condominio360?sslmode=require"
```

### Ver usuarios:
```sql
SELECT id, name, email, role, created_at FROM users;
```

### Ver condominios:
```sql
SELECT * FROM condominios;
```

### Cambiar rol de usuario:
```sql
UPDATE users SET role = 'admin' WHERE email = 'usuario@test.com';
```

### Ver pagos:
```sql
SELECT * FROM pagos ORDER BY fecha_pago DESC LIMIT 10;
```

### Limpiar base de datos (⚠️ CUIDADO):
```sql
TRUNCATE users, condominios, unidades, pagos, reservas CASCADE;
```

---

## 8️⃣ PROBLEMAS COMUNES

### Backend no inicia:
```bash
# Ver si el puerto está ocupado
lsof -i :5000

# Matar proceso si es necesario
kill -9 PROCESS_ID

# Reinstalar dependencias
cd /Users/papayo/Desktop/condominio/backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend no inicia:
```bash
# Ver si el puerto está ocupado
lsof -i :5173

# Limpiar caché de Vite
cd /Users/papayo/Desktop/condominio/frontend
rm -rf node_modules/.vite
npm run dev
```

### Error de conexión a DB:
```bash
# Probar conexión
psql "TU_CONNECTION_STRING" -c "SELECT 1;"

# Si falla, verificar:
# 1. El string incluye ?sslmode=require
# 2. La contraseña no tiene caracteres especiales sin escapar
# 3. El proyecto Neon está activo
```

---

## 9️⃣ ACTUALIZAR CÓDIGO

```bash
cd /Users/papayo/Desktop/condominio

# Ver cambios
git status

# Añadir cambios
git add .

# Commit
git commit -m "Actualización: descripción del cambio"

# Push a GitHub (si ya lo configuraste)
git push origin main
```

---

## 🔟 DEPLOY RÁPIDO

### Subir a GitHub:
```bash
cd /Users/papayo/Desktop/condominio

git init
git add .
git commit -m "Initial commit - Condominio360"

# Crear repo en GitHub primero, luego:
git remote add origin https://github.com/TU_USUARIO/condominio360.git
git branch -M main
git push -u origin main
```

### Deploy Backend (Render):
```
1. Ir a render.com
2. New Web Service
3. Connect GitHub repo
4. Root Directory: backend
5. Build: npm install
6. Start: npm start
7. Agregar variables de entorno
8. Deploy
```

### Deploy Frontend (Vercel):
```bash
cd /Users/papayo/Desktop/condominio/frontend
npx vercel

# Seguir instrucciones en pantalla
# O conectar repo en vercel.com
```

---

## 🆘 AYUDA RÁPIDA

### Ver este archivo en el navegador:
```bash
open /Users/papayo/Desktop/condominio/COMANDOS_RAPIDOS.md
```

### Ver todos los archivos MD:
```bash
ls -la /Users/papayo/Desktop/condominio/*.md
```

### Abrir proyecto en VS Code:
```bash
code /Users/papayo/Desktop/condominio
```

### Ver estructura del proyecto:
```bash
cd /Users/papayo/Desktop/condominio
tree -L 3 -I 'node_modules'
```

---

## 📊 URLS IMPORTANTES

```
Frontend Local:     http://localhost:5175
Backend Local:      http://localhost:5000
Backend Health:     http://localhost:5000/health
Neon Dashboard:     https://console.neon.tech
Render Dashboard:   https://dashboard.render.com
Vercel Dashboard:   https://vercel.com/dashboard
Stripe Dashboard:   https://dashboard.stripe.com
```

---

## 🎯 WORKFLOW DIARIO

```bash
# 1. Abrir proyecto
cd /Users/papayo/Desktop/condominio

# 2. Iniciar backend
cd backend && npm start &

# 3. Iniciar frontend (nueva terminal)
cd frontend && npm run dev

# 4. Abrir navegador
open http://localhost:5175

# 5. Hacer cambios...

# 6. Ver logs de errores en las terminales

# 7. Al finalizar: Ctrl+C en ambas terminales
```

---

## 📝 NOTAS

- **Backend puerto:** 5000 (puede cambiar a 5001 si está ocupado)
- **Frontend puerto:** 5175 (Vite autoselecciona si 5173 está ocupado)
- **Database:** Neon PostgreSQL (serverless)
- **Auth:** JWT con 24h de expiración
- **Password:** Mínimo 8 chars, mayúsculas y números

---

## ✅ CHECKLIST ANTES DE CERRAR

- [ ] Ambos servidores detenidos (Ctrl+C)
- [ ] Cambios guardados
- [ ] Commit hecho (si modificaste código)
- [ ] Base de datos respaldada (si hiciste cambios importantes)

---

**¡Guarda este archivo! Lo necesitarás frecuentemente.** 📌
