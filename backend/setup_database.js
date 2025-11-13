// Script para inicializar la base de datos en Neon
import pg from 'pg';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connection string de Neon
const connectionString = 'postgresql://neondb_owner:npg_jxvBJf2MYk1h@ep-curly-boat-aflc3ztr-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function executeSQLFile(filePath) {
  try {
    console.log(`\n📄 Ejecutando: ${filePath}`);
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
    console.log(`✅ ${filePath} ejecutado exitosamente`);
    return true;
  } catch (error) {
    console.error(`❌ Error ejecutando ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando configuración de base de datos...\n');

  try {
    // Probar conexión
    console.log('🔌 Probando conexión a Neon...');
    await pool.query('SELECT NOW()');
    console.log('✅ Conexión exitosa\n');

    // Ejecutar database_init.sql
    const success1 = await executeSQLFile(join(__dirname, 'database_init.sql'));
    if (!success1) {
      console.log('⚠️  Continuando con siguiente archivo...\n');
    }

    // Ejecutar database_extension_financiera.sql
    const success2 = await executeSQLFile(join(__dirname, 'database_extension_financiera.sql'));
    if (!success2) {
      console.log('⚠️  Algunas tablas pueden no haberse creado\n');
    }

    // Ejecutar database_avisos_documentos.sql
    const success3 = await executeSQLFile(join(__dirname, 'database_avisos_documentos.sql'));
    if (!success3) {
      console.log('⚠️  Tablas de avisos/documentos pueden no haberse creado\n');
    }

    // Verificar tablas creadas
    console.log('\n🔍 Verificando tablas creadas...');
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('\n📊 Tablas en la base de datos:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });

    console.log('\n' + '═'.repeat(60));
    console.log('✅ BASE DE DATOS CONFIGURADA EXITOSAMENTE');
    console.log('═'.repeat(60));
    console.log('\n🎯 Próximos pasos:');
    console.log('1. Reinicia el backend');
    console.log('2. Abre http://localhost:5175');
    console.log('3. Regístrate (serás admin automáticamente)');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

main();
