#!/bin/bash
# COMANDOS PARA CONECTAR NEON - CONDOMINIO360
# Instrucciones: Reemplaza YOUR_CONNECTION_STRING con tu string de Neon

# ============================================================================
# PASO 1: Definir tu connection string
# ============================================================================
# Copia tu connection string de Neon y pégalo aquí entre las comillas:

CONNECTION_STRING="postgresql://user:pass@ep-xxx.neon.tech/condominio360?sslmode=require"

# ⚠️ IMPORTANTE: Reemplaza la línea de arriba con tu string real de Neon

# ============================================================================
# PASO 2: Ir al directorio del proyecto
# ============================================================================

cd /Users/papayo/Desktop/condominio

# ============================================================================
# PASO 3: Ejecutar SQL de inicialización básica
# ============================================================================

echo "📊 Creando tablas básicas..."
psql "$CONNECTION_STRING" -f backend/database_init.sql

if [ $? -eq 0 ]; then
    echo "✅ Tablas básicas creadas exitosamente"
else
    echo "❌ Error al crear tablas básicas"
    exit 1
fi

# ============================================================================
# PASO 4: Ejecutar SQL de extensión financiera
# ============================================================================

echo ""
echo "💰 Creando tablas financieras..."
psql "$CONNECTION_STRING" -f backend/database_extension_financiera.sql

if [ $? -eq 0 ]; then
    echo "✅ Tablas financieras creadas exitosamente"
else
    echo "❌ Error al crear tablas financieras"
    exit 1
fi

# ============================================================================
# PASO 5: Verificar que todo se creó correctamente
# ============================================================================

echo ""
echo "🔍 Verificando tablas..."
psql "$CONNECTION_STRING" -c "\dt" | grep -E "users|condominios|pagos|proveedores|egresos"

# ============================================================================
# RESUMEN
# ============================================================================

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ BASE DE DATOS LISTA"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Tablas creadas:"
echo "  ✓ users (usuarios)"
echo "  ✓ condominios"
echo "  ✓ unidades"
echo "  ✓ pagos (mejorado con métodos de pago)"
echo "  ✓ reservas"
echo "  ✓ estados_cuenta"
echo "  ✓ proveedores"
echo "  ✓ egresos"
echo "  ✓ ingresos"
echo "  ✓ reporte_cobranza"
echo "  ✓ cuotas_configuracion"
echo "  ✓ morosos"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🚀 SIGUIENTE PASO:"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "1. Reinicia el backend:"
echo "   cd backend && npm start"
echo ""
echo "2. Abre el navegador:"
echo "   http://localhost:5175"
echo ""
echo "3. Regístrate (serás ADMIN automáticamente)"
echo ""
echo "═══════════════════════════════════════════════════════════"
