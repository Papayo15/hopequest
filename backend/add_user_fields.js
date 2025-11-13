// Script para ampliar tabla users
import pg from 'pg';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = 'postgresql://neondb_owner:npg_jxvBJf2MYk1h@ep-curly-boat-aflc3ztr-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    console.log('👤 Ampliando tabla users...\n');

    const sql = fs.readFileSync(join(__dirname, 'database_ampliar_users.sql'), 'utf8');
    await pool.query(sql);

    console.log('✅ Campos agregados exitosamente\n');

    // Verificar columnas
    const result = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'users'
      AND column_name IN ('telefono', 'cuota_mensual', 'unidad_id', 'condominio_id')
      ORDER BY column_name
    `);

    console.log('📊 Nuevos campos en users:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.column_name} (${row.data_type})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

main();
