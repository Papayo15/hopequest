# 🗄️ CONFIGURAR NEON.TECH - PASO A PASO

## ⏱️ Tiempo estimado: 5 minutos

---

## 📝 PASO 1: CREAR CUENTA EN NEON

### 1. Abrir navegador y ir a:
```
https://neon.tech
```

### 2. Click en "Sign Up" (Registrarse)

### 3. Opciones de registro:
- ✅ **Opción A:** Sign up with GitHub (recomendado - más rápido)
- ✅ **Opción B:** Sign up with Google
- ✅ **Opción C:** Email + Password

### 4. Autorizar la aplicación
- Si usas GitHub/Google, autoriza el acceso
- Es seguro, Neon es propiedad de Vercel

---

## 📦 PASO 2: CREAR PROYECTO

### 1. Dashboard de Neon se abrirá automáticamente

### 2. Click en "Create a project" o "+ New Project"

### 3. Configurar proyecto:
```
Project name: condominio360
Region: us-east-2 (o el más cercano a ti)
PostgreSQL version: 16 (última versión)
```

### 4. Click "Create project"
- Toma 10-15 segundos crear el proyecto

---

## 🔑 PASO 3: OBTENER CONNECTION STRING

### 1. En el dashboard verás:
```
┌────────────────────────────────────────────┐
│  📊 condominio360                          │
│                                            │
│  Connection String:                        │
│  ┌──────────────────────────────────────┐ │
│  │ postgresql://user:pass@ep-xxx...     │ │
│  │ [Copy]                                │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### 2. Click en "Copy" o copiar el texto completo

### 3. Debe verse así:
```
postgresql://condominio360_user:ABCD1234xyz@ep-cool-forest-123456.us-east-2.aws.neon.tech/condominio360?sslmode=require
```

---

## ✅ VERIFICAR QUE ESTÁ CORRECTO

Tu connection string debe tener estas partes:

```
postgresql://
  [usuario]:[password]
  @
  [host].aws.neon.tech
  /
  [database]
  ?sslmode=require
```

**Ejemplo real:**
```
postgresql://myuser:AbCd1234XyZ@ep-cool-forest-a5xq5jk2.us-east-2.aws.neon.tech/mydb?sslmode=require
```

---

## 📋 COPIAR CONNECTION STRING

### ⚠️ MUY IMPORTANTE:

1. **Copia TODA la cadena completa**
2. **Incluye el `?sslmode=require` al final**
3. **NO compartas este string con nadie** (tiene tu password)

---

## 🎯 CUANDO TENGAS EL CONNECTION STRING

Me lo pasas y continuaré con los siguientes pasos:

1. ✅ Actualizar el archivo `.env` del backend
2. ✅ Ejecutar el SQL para crear las tablas
3. ✅ Reiniciar el backend
4. ✅ Probar el registro y login

---

## 🆘 AYUDA

### Si no puedes crear cuenta:
- Usa modo incógnito del navegador
- Prueba con otro navegador (Chrome/Firefox)
- Usa email diferente

### Si no ves el connection string:
- Click en tu proyecto
- Click en "Dashboard" en el menú izquierdo
- Busca la sección "Connection Details"
- El string está en "Connection string"

### Si la página no carga:
- Verifica tu conexión a internet
- Neon requiere JavaScript habilitado
- Prueba: https://console.neon.tech

---

## 📸 CAPTURAS DE REFERENCIA

### Vista del Dashboard:
```
┌────────────────────────────────────────────────────────┐
│  NEON                                    [User] [?]    │
├────────────────────────────────────────────────────────┤
│  🏠 Home    📊 Projects    ⚙️ Settings                │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Projects                          [+ New Project]     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │  📦 condominio360                               │  │
│  │  Region: us-east-2                              │  │
│  │  Created: Just now                              │  │
│  │  Status: ● Active                               │  │
│  │                                                  │  │
│  │  Connection string:                             │  │
│  │  postgresql://...                    [Copy] 📋  │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST

- [ ] Crear cuenta en Neon.tech
- [ ] Crear proyecto "condominio360"
- [ ] Copiar connection string completo
- [ ] Verificar que incluye `?sslmode=require`
- [ ] Guardar el string en lugar seguro (lo necesitaremos)

---

**Una vez que tengas el CONNECTION STRING, avísame y continúo con la configuración!** 🚀
