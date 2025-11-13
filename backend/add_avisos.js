// Script para agregar tablas de avisos y documentos
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
    console.log('📋 Agregando tablas de avisos y documentos...\n');

    const sql = fs.readFileSync(join(__dirname, 'database_avisos_documentos.sql'), 'utf8');
    await pool.query(sql);

    console.log('✅ Tablas creadas exitosamente\n');

    // Verificar
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('avisos', 'documentos', 'lecturas_avisos')
      ORDER BY table_name
    `);

    console.log('📊 Nuevas tablas:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

main();
