# 👥 GUÍA DE USUARIOS Y ROLES - CONDOMINIO360

## 🔐 SISTEMA DE ROLES

El sistema tiene **3 tipos de usuarios** con diferentes permisos:

### 1️⃣ **ADMIN (Administrador)**
```
✅ Puede hacer TODO:
   - Ver todos los condominios
   - Crear/editar/eliminar condominios
   - Ver todos los pagos
   - Gestionar usuarios
   - Acceso completo al sistema
```

### 2️⃣ **RESIDENTE**
```
✅ Puede:
   - Ver sus condominios asignados
   - Hacer pagos de cuotas
   - Crear reservas de áreas comunes
   - Ver su historial de pagos
   - Actualizar su perfil

❌ NO puede:
   - Crear condominios
   - Eliminar condominios
   - Ver datos de otros residentes
```

### 3️⃣ **CONSERJE**
```
✅ Puede:
   - Ver condominios asignados
   - Gestionar reservas
   - Ver pagos (solo lectura)
   - Registro de visitantes

❌ NO puede:
   - Crear/eliminar condominios
   - Modificar pagos
```

---

## 🚪 CÓMO ENTRAR AL SISTEMA

### **OPCIÓN 1: Crear Cuenta Nueva**

1. **Abrir navegador:**
   ```
   http://localhost:5175
   ```

2. **Click en botón verde:** "Crear Cuenta Gratis"

3. **Llenar formulario:**
   ```
   Nombre:     Juan Pérez
   Email:      juan@example.com
   Contraseña: MiPassword123
   Confirmar:  MiPassword123
   ```

4. **Por defecto se crea como RESIDENTE**

5. **Serás redirigido a login automáticamente**

6. **Inicia sesión con tus credenciales**

---

## 👨‍💼 CÓMO CREAR UN ADMINISTRADOR

### **Método 1: Modificar Directamente en la Base de Datos**

Después de crear tu cuenta como residente, cambiar el rol:

```sql
-- Conectar a PostgreSQL
psql "tu-connection-string-de-neon"

-- Cambiar rol de residente a admin
UPDATE users
SET role = 'admin'
WHERE email = 'juan@example.com';

-- Verificar
SELECT name, email, role FROM users;
```

### **Método 2: Crear Admin desde Código (Backend)**

Puedes modificar el registro para permitir crear admins:

**Editar:** `backend/src/controllers/authController.js`

Buscar la función `register` y cambiar temporalmente:

```javascript
// TEMPORAL: Para crear el primer admin
export const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Permitir crear admin si es el primer usuario
  const userCount = await pool.query("SELECT COUNT(*) FROM users");
  const isFirstUser = userCount.rows[0].count === "0";

  let userRole = role || "residente";

  // Si es el primer usuario, hacerlo admin automáticamente
  if (isFirstUser) {
    userRole = "admin";
  }

  // ... resto del código
```

### **Método 3: Registro con Parámetro de Rol**

En el formulario de registro, agregar temporalmente un campo oculto:

**Editar:** `frontend/src/pages/Register.jsx`

```javascript
// Agregar después de la línea 41:
const handleSubmit = async (e) => {
  e.preventDefault();
  // ...

  await axios.post(API_ENDPOINTS.auth.register, {
    name: form.name,
    email: form.email,
    password: form.password,
    role: "admin"  // ← AGREGAR ESTO temporalmente
  });
```

---

## 🎯 FLUJO COMPLETO: CREAR PRIMER ADMIN

### **Paso 1: Registrar Usuario Normal**
```
1. Ir a: http://localhost:5175/register
2. Llenar:
   - Nombre: Admin Principal
   - Email: admin@condominio360.com
   - Contraseña: Admin123456
3. Click "Crear Cuenta"
```

### **Paso 2: Cambiar a Admin en la Base de Datos**

**OPCIÓN A: Usando Neon Dashboard**
```
1. Ir a https://console.neon.tech
2. Tu proyecto → SQL Editor
3. Ejecutar:
   UPDATE users SET role = 'admin' WHERE email = 'admin@condominio360.com';
4. Verificar:
   SELECT * FROM users;
```

**OPCIÓN B: Usando psql (si tienes PostgreSQL local)**
```bash
psql "tu-connection-string" -c "UPDATE users SET role = 'admin' WHERE email = 'admin@condominio360.com';"
```

### **Paso 3: Iniciar Sesión como Admin**
```
1. Ir a: http://localhost:5175/login
2. Ingresar:
   - Email: admin@condominio360.com
   - Contraseña: Admin123456
3. Click "Entrar"
```

### **Paso 4: Verificar Permisos de Admin**
```
En el Dashboard verás:
✅ Botón "+ Agregar Condominio" (solo admins)
✅ Puede crear condominios
✅ Puede editar/eliminar condominios
```

---

## 🔄 DIFERENCIAS EN LA INTERFAZ POR ROL

### **VISTA DE ADMIN:**
```
┌────────────────────────────────────────────┐
│  CONDOMINIO360                   [Salir]  │
│  Bienvenido, Admin Principal              │
├────────────────────────────────────────────┤
│  📊 Dashboard                              │
│                                            │
│  Condominios: 5      Pagos: 120           │
│                                            │
│  [+ Agregar Condominio]  ← SOLO ADMIN    │
│                                            │
│  📋 Lista de Condominios:                 │
│  ┌──────────────────┐                     │
│  │ Torres del Sol   │ [Editar] [Eliminar]│
│  │ Av. Principal 123│                     │
│  └──────────────────┘                     │
└────────────────────────────────────────────┘
```

### **VISTA DE RESIDENTE:**
```
┌────────────────────────────────────────────┐
│  CONDOMINIO360                   [Salir]  │
│  Bienvenido, Juan Pérez                   │
├────────────────────────────────────────────┤
│  📊 Dashboard                              │
│                                            │
│  Mi Condominio: 1    Pagos: 12            │
│                                            │
│  [NO HAY BOTÓN DE AGREGAR] ← DIFERENCIA  │
│                                            │
│  📋 Mi Condominio:                         │
│  ┌──────────────────┐                     │
│  │ Torres del Sol   │ [Ver Detalles]     │
│  │ Departamento A-101│                    │
│  └──────────────────┘                     │
│                                            │
│  [Pagar Cuota] [Reservar Área]           │
└────────────────────────────────────────────┘
```

---

## 🧪 PRUEBA COMPLETA DEL SISTEMA

### **Escenario 1: Crear Administrador**

```bash
# 1. Registrar usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Principal",
    "email": "admin@test.com",
    "password": "Admin123456",
    "role": "admin"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin123456"
  }'

# Respuesta (copiar el token):
# {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","user":{...}}
```

### **Escenario 2: Admin Crea Condominio**

```bash
# 3. Crear condominio (requiere token de admin)
curl -X POST http://localhost:5000/api/condos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "nombre": "Torres del Sol",
    "direccion": "Av. Principal 123"
  }'
```

### **Escenario 3: Crear Residente**

```bash
# 4. Registrar residente
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "password": "Juan123456"
  }'
# Por defecto es "residente"

# 5. Login como residente
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@test.com",
    "password": "Juan123456"
  }'
```

### **Escenario 4: Residente Intenta Crear Condominio (Debe Fallar)**

```bash
# 6. Intentar crear condominio con token de residente
curl -X POST http://localhost:5000/api/condos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_DE_RESIDENTE" \
  -d '{
    "nombre": "Nuevo Condominio",
    "direccion": "Calle 456"
  }'

# Respuesta esperada:
# {"error":"No tienes permisos para crear condominios"}
```

---

## 📋 TABLA DE PERMISOS

| Acción | Admin | Residente | Conserje |
|--------|-------|-----------|----------|
| Ver condominios | ✅ Todos | ✅ Asignados | ✅ Asignados |
| Crear condominio | ✅ | ❌ | ❌ |
| Editar condominio | ✅ | ❌ | ❌ |
| Eliminar condominio | ✅ | ❌ | ❌ |
| Hacer pagos | ✅ | ✅ | ❌ |
| Ver pagos | ✅ Todos | ✅ Propios | ✅ Lectura |
| Crear reservas | ✅ | ✅ | ✅ |
| Gestionar usuarios | ✅ | ❌ | ❌ |

---

## 🔧 MODIFICAR SISTEMA DE REGISTRO (OPCIONAL)

Si quieres permitir que el primer usuario sea admin automáticamente:

**Editar:** `backend/src/controllers/authController.js`

```javascript
export const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Contar usuarios existentes
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const totalUsers = parseInt(userCount.rows[0].count);

    // Si no hay usuarios, el primero es admin
    let userRole = role || "residente";
    if (totalUsers === 0) {
      userRole = "admin";
      console.log("🎉 Primer usuario detectado - Asignando rol ADMIN");
    }

    // Resto del código de validación...

    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [name, email, hashed, userRole]
    );

    res.status(201).json({
      message: totalUsers === 0 ? "¡Administrador principal creado!" : "Usuario registrado exitosamente",
      user: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};
```

---

## 🎯 RESUMEN RÁPIDO

### **Para crear tu primer admin:**

1. **Ir a:** http://localhost:5175/register
2. **Registrarse** con cualquier email
3. **Conectar a la base de datos:**
   ```sql
   UPDATE users SET role = 'admin' WHERE id = 1;
   ```
4. **Login:** http://localhost:5175/login
5. **¡Listo!** Ya eres administrador

### **Para crear residentes:**

1. Solo registrarse normalmente
2. Por defecto son "residente"
3. No necesitan cambios adicionales

---

## 🔒 SEGURIDAD

⚠️ **IMPORTANTE EN PRODUCCIÓN:**

1. **NUNCA** permitir que cualquiera se registre como admin
2. El primer admin debe crearse manualmente en la DB
3. Los admins deben crear otros admins desde el panel
4. Usar emails corporativos para admins
5. Implementar verificación de email

---

¿Quieres que te ayude a:
1. Configurar la base de datos ahora para poder registrarte?
2. Modificar el código para hacer el primer usuario admin automáticamente?
3. Crear una página de administración de usuarios?
