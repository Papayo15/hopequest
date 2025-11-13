// Script para BORRAR TODOS LOS DATOS de la base de datos
// ⚠️ CUIDADO: Esto elimina TODA la información
import pg from 'pg';

const { Pool } = pg;

const connectionString = 'postgresql://neondb_owner:npg_jxvBJf2MYk1h@ep-curly-boat-aflc3ztr-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function clearAllData() {
  try {
    console.log('⚠️  ADVERTENCIA: Esto borrará TODOS los datos de la base de datos\n');
    console.log('🗑️  Borrando datos...\n');

    // Borrar en orden (respetando las relaciones de foreign keys)
    await pool.query('TRUNCATE lecturas_avisos CASCADE');
    console.log('   ✓ Lecturas de avisos borradas');

    await pool.query('TRUNCATE avisos CASCADE');
    console.log('   ✓ Avisos borrados');

    await pool.query('TRUNCATE documentos CASCADE');
    console.log('   ✓ Documentos borrados');

    await pool.query('TRUNCATE reservas CASCADE');
    console.log('   ✓ Reservas borradas');

    await pool.query('TRUNCATE morosos CASCADE');
    console.log('   ✓ Morosos borrados');

    await pool.query('TRUNCATE reporte_cobranza CASCADE');
    console.log('   ✓ Reportes de cobranza borrados');

    await pool.query('TRUNCATE estados_cuenta CASCADE');
    console.log('   ✓ Estados de cuenta borrados');

    await pool.query('TRUNCATE egresos CASCADE');
    console.log('   ✓ Egresos borrados');

    await pool.query('TRUNCATE ingresos CASCADE');
    console.log('   ✓ Ingresos borrados');

    await pool.query('TRUNCATE proveedores CASCADE');
    console.log('   ✓ Proveedores borrados');

    await pool.query('TRUNCATE cuotas_configuracion CASCADE');
    console.log('   ✓ Configuración de cuotas borrada');

    await pool.query('TRUNCATE pagos CASCADE');
    console.log('   ✓ Pagos borrados');

    await pool.query('TRUNCATE unidades CASCADE');
    console.log('   ✓ Unidades borradas');

    await pool.query('TRUNCATE users CASCADE');
    console.log('   ✓ Usuarios borrados');

    await pool.query('TRUNCATE condominios CASCADE');
    console.log('   ✓ Condominios borrados');

    console.log('\n✅ TODOS LOS DATOS HAN SIDO BORRADOS\n');
    console.log('═'.repeat(60));
    console.log('🆕 AHORA PUEDES:');
    console.log('═'.repeat(60));
    console.log('1. Registrar tu cuenta de admin en: http://localhost:5173/register');
    console.log('   (Primer usuario = admin automáticamente)');
    console.log('\n2. O cargar datos de ejemplo:');
    console.log('   node seed_data.js');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

clearAllData();
