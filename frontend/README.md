# Condominio360 - Frontend

Frontend para el sistema de gestión de condominios Condominio360.

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## Instalación Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con la URL de tu backend
VITE_API_URL=http://localhost:5000

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend API | `http://localhost:5000` |

## Estructura

```
frontend/
├── src/
│   ├── pages/          # Páginas principales
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── config.js       # Configuración API
│   ├── App.jsx         # Landing page
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Rutas

- `/` - Landing page
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios
- `/dashboard` - Panel principal (requiere autenticación)

## Deploy en Vercel

1. Crear cuenta en [Vercel.com](https://vercel.com)
2. Conectar repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Vite
4. Configurar variable de entorno `VITE_API_URL` en el dashboard
5. Deploy automático con cada push a main

### Deploy Manual

```bash
npm run build
vercel --prod
```

## Características

- Diseño responsive
- Modo oscuro automático
- Validación de formularios
- Manejo de errores
- Loading states
- Autenticación JWT
- Rutas protegidas

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## Estilos

El proyecto usa Tailwind CSS con clases personalizadas:

- `.btn-primary` - Botón primario azul
- `.btn-success` - Botón verde
- `.btn-secondary` - Botón gris
- `.btn-danger` - Botón rojo
- `.card` - Tarjeta con sombra
- `.input-field` - Campo de entrada
- `.error-message` - Mensaje de error
- `.loading-spinner` - Spinner de carga
