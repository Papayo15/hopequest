# 🔲 Guía de Integración - Sistema QR

## 📋 Índice

1. [Introducción](#introducción)
2. [Arquitectura](#arquitectura)
3. [Configuración Inicial](#configuración-inicial)
4. [Uso del Sistema](#uso-del-sistema)
5. [API Reference](#api-reference)
6. [Apps Móviles](#apps-móviles)
7. [Notificaciones Push](#notificaciones-push)
8. [Troubleshooting](#troubleshooting)

---

## Introducción

El **Sistema QR** permite gestionar el acceso de visitantes a condominios mediante códigos QR digitales. Integra:

- **Backend:** API REST en PostgreSQL
- **Web:** Generación de códigos QR
- **Mobile:** Apps nativas para escanear y validar
- **Push:** Notificaciones en tiempo real

### Beneficios

✅ Sin necesidad de llamadas telefónicas
✅ Registro automático de accesos
✅ Notificaciones al residente
✅ Historial completo
✅ Estadísticas por condominio

---

## Arquitectura

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Residente  │────────▶│   Backend    │◀────────│  Vigilancia  │
│   (Web/App)  │ Genera  │  PostgreSQL  │ Valida  │     (App)    │
└──────────────┘   QR    └──────────────┘   QR    └──────────────┘
       │                        │                        │
       │                        │                        │
       ▼                        ▼                        ▼
 Recibe QR              Envía Push              Registra Acceso
 por WhatsApp           Notificación            en Historial
```

---

## Configuración Inicial

### 1. Ejecutar Schema SQL

```bash
cd backend
psql $DATABASE_URL -f database_qr.sql
```

Esto crea las tablas:
- `codigos_qr`
- `push_tokens`
- `historial_accesos`
- `configuracion_qr`

### 2. Verificar Tablas

```sql
SELECT * FROM codigos_qr LIMIT 1;
SELECT * FROM configuracion_qr;
```

### 3. Configurar Variables de Entorno

Asegúrate de tener en `.env`:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=tu_secreto
```

No se requieren configuraciones adicionales. El sistema usa Expo Push Notifications (gratis).

---

## Uso del Sistema

### Generar Código QR (Residente)

1. Ir a `/qr-management` en el frontend
2. Llenar formulario:
   - Condominio
   - Nombre del visitante
   - Documento (opcional)
   - Teléfono (opcional)
   - Motivo de visita
   - Horas de validez (1-168 horas)
3. Click "Generar Código QR"
4. Descargar o compartir el QR

**Código generado:**
```
QR-1731456789012-1-abc123
     ↑       ↑    ↑   ↑
  timestamp  |   ID  random
         condominio
```

### Compartir QR

- **Descargar:** Guarda imagen PNG
- **Compartir:** WhatsApp, Email, SMS
- **Imprimir:** Para visitantes recurrentes

### Validar QR (Vigilancia)

1. Abrir **VigilanciaApp**
2. Escanear código QR del visitante
3. App valida automáticamente
4. Muestra:
   - ✅ Acceso autorizado
   - Nombre del visitante
   - Documento
   - Residente que generó el código
5. Registra acceso en historial
6. Envía notificación push al residente

### Ver Historial

**Residente:**
- Ve solo sus códigos QR generados
- Puede cancelar códigos activos

**Admin/Vigilancia:**
- Ve todos los accesos del condominio
- Filtra por fecha, estado, visitante
- Exporta reportes

---

## API Reference

### Autenticación

Todas las rutas requieren header:
```
Authorization: Bearer <token_jwt>
```

### Endpoints

#### 1. Generar Código QR

```http
POST /api/qr/generar
```

**Body:**
```json
{
  "id_condominio": 1,
  "id_unidad": 5,
  "nombre_visitante": "Juan Pérez",
  "documento_visitante": "12345678",
  "telefono_visitante": "+573001234567",
  "motivo_visita": "Visita familiar",
  "horas_validez": 24
}
```

**Response 201:**
```json
{
  "mensaje": "Código QR generado exitosamente",
  "codigo_qr": {
    "id": 123,
    "codigo": "QR-1731456789012-1-abc123",
    "nombre_visitante": "Juan Pérez",
    "fecha_expiracion": "2025-11-14T10:30:00Z",
    "estado": "activo"
  }
}
```

#### 2. Validar Código QR

```http
POST /api/qr/validar
```

**Body:**
```json
{
  "codigo": "QR-1731456789012-1-abc123"
}
```

**Response 200 (Válido):**
```json
{
  "mensaje": "Código QR validado exitosamente",
  "valido": true,
  "visitante": {
    "nombre": "Juan Pérez",
    "documento": "12345678",
    "telefono": "+573001234567",
    "motivo": "Visita familiar"
  },
  "fecha_validacion": "2025-11-13T15:30:00Z"
}
```

**Response 400 (Inválido):**
```json
{
  "error": "Este código QR ya fue utilizado",
  "valido": false,
  "codigo_error": "CODIGO_YA_USADO"
}
```

Posibles errores:
- `CODIGO_NO_EXISTE` - El código no existe
- `CODIGO_YA_USADO` - Ya fue utilizado
- `CODIGO_EXPIRADO` - Expiró su validez
- `CODIGO_INACTIVO` - Fue cancelado

#### 3. Obtener Historial

```http
GET /api/qr/historial?limit=50&offset=0
```

**Response 200:**
```json
{
  "historial": [
    {
      "id": 123,
      "codigo": "QR-...",
      "nombre_visitante": "Juan Pérez",
      "nombre_condominio": "Torres del Sol",
      "numero_unidad": "101",
      "estado": "usado",
      "fecha_creacion": "2025-11-13T10:00:00Z",
      "fecha_expiracion": "2025-11-14T10:00:00Z",
      "fecha_uso": "2025-11-13T15:30:00Z",
      "validado_por_nombre": "Carlos Vigilante"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### 4. Cancelar Código

```http
DELETE /api/qr/cancelar/:id_codigo
```

**Response 200:**
```json
{
  "mensaje": "Código QR cancelado exitosamente",
  "codigo_qr": { ... }
}
```

#### 5. Estadísticas

```http
GET /api/qr/estadisticas/:id_condominio?fecha_inicio=2025-11-01&fecha_fin=2025-11-30
```

**Response 200:**
```json
{
  "estadisticas": {
    "total_accesos": "150",
    "accesos_exitosos": "145",
    "accesos_rechazados": "5",
    "visitantes_unicos": "98"
  },
  "periodo": {
    "inicio": "2025-11-01",
    "fin": "2025-11-30"
  }
}
```

#### 6. Registrar Push Token

```http
POST /api/qr/register-push-token
```

**Body:**
```json
{
  "push_token": "ExponentPushToken[xxxxxx]",
  "plataforma": "ios",
  "modelo_dispositivo": "iPhone 14",
  "version_app": "1.0.0"
}
```

**Response 200:**
```json
{
  "mensaje": "Token registrado exitosamente",
  "token": { ... }
}
```

---

## Apps Móviles

### ResidenteApp

**Funcionalidades:**
- Generar códigos QR
- Ver historial de códigos
- Recibir notificaciones push
- Cancelar códigos activos

**Setup:**
```bash
cd mobile/iOS/ResidenteApp
# Abrir en Xcode y compilar
```

### VigilanciaApp

**Funcionalidades:**
- Escanear códigos QR
- Validar automáticamente
- Ver historial del día
- Registrar ingresos/salidas
- Ver estadísticas

**Setup:**
```bash
cd mobile/iOS/VigilanciaApp
# Abrir en Xcode y compilar
```

### Configuración

En ambas apps, configurar:

```swift
let API_URL = "https://tu-backend.onrender.com"
```

---

## Notificaciones Push

### Cómo Funciona

1. **Registro de Token:**
   - App móvil obtiene token de Expo
   - Lo envía al backend: `POST /api/qr/register-push-token`
   - Backend lo guarda en tabla `push_tokens`

2. **Envío de Notificación:**
   - Vigilante valida código QR
   - Backend busca tokens del residente
   - Envía notificación via Expo Push Service
   - Residente recibe notificación instantánea

### Tipos de Notificaciones

**Ingreso de Visita:**
```
🔔 Visita Ingresada
Juan Pérez ha ingresado al condominio
```

**Salida de Visita:**
```
👋 Visita Retirada
Juan Pérez ha salido del condominio
```

**Código Generado:**
```
✅ Código QR Generado
Código QR creado para Juan Pérez
Válido hasta: 14/11/2025 10:30
```

### Sin Configuración Requerida

El sistema usa **Expo Push Notifications** que no requiere:
- ❌ API Keys
- ❌ Certificados iOS
- ❌ Firebase setup
- ❌ Costos adicionales

✅ Funciona automáticamente con apps Expo

---

## Troubleshooting

### Código QR no valida

**Problema:** Error "CODIGO_NO_EXISTE"

**Solución:**
1. Verificar que el código se copió completo
2. Revisar que el QR no esté dañado
3. Verificar conexión a internet

---

### Notificaciones no llegan

**Problema:** Residente no recibe notificación

**Solución:**
1. Verificar que la app tiene permisos de notificaciones
2. Comprobar que el token está registrado:
   ```sql
   SELECT * FROM push_tokens WHERE id_usuario = X;
   ```
3. Ver logs del backend:
   ```
   📬 Notificación enviada: 1 exitosas
   ```

---

### Código expira muy rápido

**Problema:** Códigos QR expiran antes de tiempo

**Solución:**
Ajustar configuración del condominio:
```sql
UPDATE configuracion_qr
SET duracion_default_horas = 48
WHERE id_condominio = 1;
```

---

### Base de datos no tiene tabla codigos_qr

**Problema:** Error "relation codigos_qr does not exist"

**Solución:**
```bash
psql $DATABASE_URL -f backend/database_qr.sql
```

---

## Próximos Pasos

1. **Configurar la base de datos** ejecutando `database_qr.sql`
2. **Probar generación de QR** desde el frontend web
3. **Compilar VigilanciaApp** y probar escaneo
4. **Configurar notificaciones** registrando tokens
5. **Revisar historial y estadísticas**

---

## Soporte

Para problemas o preguntas:
- GitHub Issues: [github.com/Papayo15/condominio360-unified/issues](https://github.com/Papayo15/condominio360-unified/issues)
- Documentación: Ver otros archivos en `/docs`

---

**Última actualización:** Noviembre 2025
**Versión:** 2.0.0
