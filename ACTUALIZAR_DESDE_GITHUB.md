# 🔄 Guía de Actualización desde GitHub

Esta guía te enseña cómo descargar actualizaciones del proyecto desde GitHub sin perder tu configuración local.

---

## 📍 INFORMACIÓN DEL REPOSITORIO

**Repositorio:** `Papayo15/hopequest`
**Branch del proyecto:** `claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks`
**URL completa:** https://github.com/Papayo15/hopequest/tree/claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks

---

## 🆕 OPCIÓN 1: PRIMERA VEZ (Ya lo hiciste)

Si **ya tienes** la carpeta `condominio360-full` en tu Desktop, **SALTA A LA OPCIÓN 2**.

Si es tu primera vez:

```bash
cd ~/Desktop

# Clonar el proyecto
git clone -b claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks https://github.com/Papayo15/hopequest.git condominio360-full

cd condominio360-full
```

Luego sigue: **INSTALACION_COMPLETA.md**

---

## 🔄 OPCIÓN 2: ACTUALIZAR PROYECTO EXISTENTE

### Escenario: Ya tienes el proyecto funcionando y quieres actualizaciones

### 2.1 Guardar tu Configuración Actual

**IMPORTANTE:** Guarda tus archivos `.env` antes de actualizar:

```bash
cd ~/Desktop/condominio360-full

# Respaldar configuraciones
cp backend/.env backend/.env.backup
cp frontend/.env frontend/.env.backup

# Ver si tienes cambios locales
git status
```

### 2.2 Guardar Cambios Locales (si los tienes)

Si modificaste archivos y quieres guardarlos:

```bash
# Guardar cambios temporalmente
git stash save "Mis cambios locales antes de actualizar"
```

### 2.3 Descargar Actualizaciones

```bash
# Verificar que estás en el branch correcto
git branch
# Debe mostrar: claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks

# Descargar últimos cambios
git fetch origin

# Actualizar tu código
git pull origin claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks
```

### 2.4 Restaurar tu Configuración

```bash
# Restaurar archivos .env
cp backend/.env.backup backend/.env
cp frontend/.env.backup frontend/.env

# Si usaste git stash:
git stash pop
```

### 2.5 Actualizar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Apps móviles (si las tienes)
cd ../mobile/ResidenteApp
npm install

cd ../VigilanciaApp
npm install
```

### 2.6 Actualizar Base de Datos (si hay cambios)

**Solo si hay nuevas migraciones:**

```bash
cd ~/Desktop/condominio360-full/backend

# Verificar si hay nuevos archivos SQL
ls -la database_*.sql

# Ejecutar nuevas migraciones (si las hay)
psql "tu_connection_string" -f database_nuevas_migraciones.sql
```

### 2.7 Reiniciar Servidores

```bash
# Reiniciar backend
cd ~/Desktop/condominio360-full/backend
npm run dev

# Reiniciar frontend
cd ~/Desktop/condominio360-full/frontend
npm run dev
```

✅ **Actualización completada!**

---

## 🔧 OPCIÓN 3: ACTUALIZACIÓN LIMPIA (Desde Cero)

Si quieres empezar completamente desde cero:

### 3.1 Respaldar tu Base de Datos

```bash
# Exportar datos actuales
pg_dump "tu_connection_string" > ~/Desktop/backup_condominio360.sql
```

### 3.2 Respaldar Configuraciones

```bash
cd ~/Desktop/condominio360-full

# Copiar archivos importantes
cp backend/.env ~/Desktop/env_backend_backup.txt
cp frontend/.env ~/Desktop/env_frontend_backup.txt
```

### 3.3 Eliminar Carpeta Actual

```bash
cd ~/Desktop
rm -rf condominio360-full
```

### 3.4 Clonar de Nuevo

```bash
git clone -b claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks https://github.com/Papayo15/hopequest.git condominio360-full

cd condominio360-full
```

### 3.5 Restaurar Configuraciones

```bash
# Restaurar .env
cp ~/Desktop/env_backend_backup.txt backend/.env
cp ~/Desktop/env_frontend_backup.txt frontend/.env
```

### 3.6 Reinstalar Todo

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

---

## 📋 SCRIPT DE ACTUALIZACIÓN AUTOMÁTICA

Para simplificar, puedes usar este script:

**Crear archivo `actualizar.sh`:**

```bash
cd ~/Desktop/condominio360-full

cat > actualizar.sh << 'EOF'
#!/bin/bash

echo "🔄 Actualizando Condominio360 Full..."

# Respaldar .env
echo "📦 Respaldando configuración..."
cp backend/.env backend/.env.backup
cp frontend/.env frontend/.env.backup

# Guardar cambios locales
echo "💾 Guardando cambios locales..."
git stash save "Backup automático $(date)"

# Actualizar código
echo "⬇️  Descargando actualizaciones..."
git fetch origin
git pull origin claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks

# Restaurar configuración
echo "📂 Restaurando configuración..."
cp backend/.env.backup backend/.env
cp frontend/.env.backup frontend/.env

# Actualizar dependencias
echo "📦 Actualizando dependencias del backend..."
cd backend
npm install

echo "📦 Actualizando dependencias del frontend..."
cd ../frontend
npm install

echo "✅ Actualización completada!"
echo ""
echo "Para iniciar:"
echo "  Backend:  cd backend && npm run dev"
echo "  Frontend: cd frontend && npm run dev"
EOF

# Dar permisos de ejecución
chmod +x actualizar.sh
```

**Usar el script:**

```bash
cd ~/Desktop/condominio360-full
./actualizar.sh
```

---

## 🎯 VERIFICAR ACTUALIZACIÓN

Después de actualizar, verifica:

### 1. Backend Actualizado

```bash
cd backend
npm run dev
```

Abrir: http://localhost:5000

Deberías ver la versión en el JSON:
```json
{
  "version": "2.0.0"
}
```

### 2. Frontend Actualizado

```bash
cd frontend
npm run dev
```

Abrir: http://localhost:5173

### 3. Base de Datos

```bash
# Ver versión de schema (si existe tabla de migraciones)
psql "tu_connection_string" -c "SELECT version FROM schema_migrations ORDER BY version DESC LIMIT 1;"
```

---

## 📊 COMPARAR CAMBIOS

Ver qué cambió entre tu versión y la nueva:

```bash
cd ~/Desktop/condominio360-full

# Ver últimos commits
git log --oneline -10

# Ver archivos modificados
git diff HEAD~1 --name-only

# Ver cambios específicos de un archivo
git diff HEAD~1 backend/src/routes/qr.js
```

---

## 🔀 CONFLICTOS DE MERGE

Si `git pull` da conflictos:

### Ver archivos en conflicto:
```bash
git status
```

### Resolver manualmente:
```bash
# Abrir archivo en conflicto
nano archivo_con_conflicto.js

# Buscar líneas con:
# <<<<<<< HEAD
# Tu versión
# =======
# Nueva versión
# >>>>>>> origin/branch

# Editar y elegir qué mantener

# Guardar cambios
git add archivo_con_conflicto.js
git commit -m "Resuelto conflicto en archivo"
```

### O elegir una versión:
```bash
# Mantener tu versión
git checkout --ours archivo.js

# O usar la versión nueva
git checkout --theirs archivo.js

git add archivo.js
git commit -m "Conflicto resuelto"
```

---

## 🆘 PROBLEMAS COMUNES

### Error: "Your local changes would be overwritten"

```bash
# Opción 1: Descartar tus cambios
git reset --hard origin/claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks

# Opción 2: Guardarlos y aplicarlos después
git stash
git pull
git stash pop
```

### Error: "Cannot find module after update"

```bash
# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Error: "Database migration failed"

```bash
# Restaurar backup
psql "tu_connection_string" < ~/Desktop/backup_condominio360.sql
```

---

## 📅 FRECUENCIA DE ACTUALIZACIONES

Recomendado:
- **Cada semana:** Revisar si hay actualizaciones
- **Cada mes:** Actualizar dependencias (`npm update`)
- **Cuando haya bugs:** Actualizar inmediatamente

**Ver si hay actualizaciones:**
```bash
cd ~/Desktop/condominio360-full
git fetch origin
git status
# Si dice "Your branch is behind", hay actualizaciones
```

---

## 🔔 NOTIFICACIONES DE ACTUALIZACIONES

Para recibir notificaciones cuando haya cambios:

1. Ir a https://github.com/Papayo15/hopequest
2. Click en "Watch"
3. Elegir "Custom" → "Releases" y "Pull requests"
4. Click "Apply"

Recibirás emails cuando haya cambios.

---

## 📝 HISTORIAL DE VERSIONES

Para ver qué cambió en cada versión:

```bash
cd ~/Desktop/condominio360-full

# Ver todos los commits
git log --oneline --graph

# Ver cambios de una versión específica
git show <commit-hash>

# Ver archivos modificados entre versiones
git diff v1.0.0..v2.0.0 --name-only
```

---

## 💾 CREAR TU PROPIO FORK

Si quieres hacer cambios sin perder la conexión con el original:

### 1. Fork en GitHub

1. Ir a https://github.com/Papayo15/hopequest
2. Click "Fork" (arriba derecha)
3. Crear fork en tu cuenta

### 2. Cambiar Remote

```bash
cd ~/Desktop/condominio360-full

# Ver remote actual
git remote -v

# Agregar tu fork
git remote add mifork https://github.com/TU-USUARIO/hopequest.git

# Ahora puedes:
git pull origin claude/condominio360-full-011CV54ntpFsMjbaokAA8Aks  # Actualizar desde original
git push mifork main  # Subir tus cambios a tu fork
```

---

## ✨ MEJORES PRÁCTICAS

1. **Siempre respalda `.env`** antes de actualizar
2. **Lee CHANGELOG.md** (si existe) antes de actualizar
3. **Prueba en local** antes de desplegar a producción
4. **Mantén un backup de la base de datos** semanal
5. **Usa branches** para experimentar: `git checkout -b mi-prueba`

---

## 🎯 CHECKLIST DE ACTUALIZACIÓN

Cada vez que actualices:

- [ ] Respaldar archivos `.env`
- [ ] Respaldar base de datos
- [ ] `git stash` (si tienes cambios)
- [ ] `git pull origin branch-name`
- [ ] Restaurar `.env`
- [ ] `npm install` en backend
- [ ] `npm install` en frontend
- [ ] Ejecutar migraciones SQL (si las hay)
- [ ] Reiniciar servidores
- [ ] Probar que todo funciona
- [ ] `git stash pop` (si guardaste cambios)

---

**¡Listo! Ahora sabes cómo mantener tu proyecto actualizado.** 🚀

**Siguiente:** Ver `INSTALACION_COMPLETA.md` para configurar desde cero.
