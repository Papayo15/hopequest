# Condominio360 - Backend API

Backend para el sistema de gestión de condominios Condominio360.

## Tecnologías

- Node.js + Express
- PostgreSQL (Neon)
- JWT Authentication
- Stripe Payments
- Cloudinary (imágenes)

## Instalación Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Inicializar base de datos
psql -h tu-host -U usuario -d database -f database_init.sql

# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (default: 5000) |
| `NODE_ENV` | Entorno (development/production) |
| `JWT_SECRET` | Secreto para tokens JWT |
| `DATABASE_URL` | URL de PostgreSQL |
| `CLOUDINARY_URL` | URL de Cloudinary |
| `STRIPE_SECRET` | Clave secreta de Stripe |
| `FRONTEND_URL` | URL del frontend para CORS |

## Endpoints

### Auth
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (requiere token)

### Condominios
- `GET /api/condos` - Listar condominios
- `GET /api/condos/:id` - Ver condominio
- `POST /api/condos` - Crear (admin)
- `PUT /api/condos/:id` - Actualizar (admin)
- `DELETE /api/condos/:id` - Eliminar (admin)

### Pagos
- `POST /api/pagos/crear` - Crear pago
- `GET /api/pagos` - Listar pagos del usuario
- `GET /api/pagos/:id` - Ver pago específico
- `GET /api/pagos/verificar?session_id=xxx` - Verificar pago de Stripe

## Deploy en Render

1. Crear cuenta en [Render.com](https://render.com)
2. Conectar repositorio de GitHub
3. Usar el archivo `render.yaml` para configuración automática
4. Configurar variables de entorno en el dashboard
5. Deploy automático con cada push a main

## Estructura

```
backend/
├── src/
│   ├── controllers/     # Lógica de negocio
│   ├── routes/          # Definición de rutas
│   ├── middleware/      # Auth, errores
│   ├── db.js           # Conexión PostgreSQL
│   └── index.js        # Punto de entrada
├── database_init.sql   # Schema SQL
├── package.json
└── render.yaml         # Config deploy
```

## Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT
- Validación de inputs
- CORS configurado
- SQL injection protegido
- Rate limiting (próximamente)
