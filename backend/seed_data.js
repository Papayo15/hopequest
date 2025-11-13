// Script para llenar la base de datos con datos de prueba
import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;

const connectionString = 'postgresql://neondb_owner:npg_jxvBJf2MYk1h@ep-curly-boat-aflc3ztr-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function seedData() {
  try {
    console.log('🌱 Iniciando seed de datos de prueba...\n');

    // 1. Crear usuarios (admin y residentes)
    console.log('👥 Creando usuarios...');
    const hashedPassword = await bcrypt.hash('Admin123', 10);

    // Admin
    const adminResult = await pool.query(
      `INSERT INTO users (name, email, password, role, telefono, cuota_mensual)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      ['Juan Administrador', 'admin@condominio360.com', hashedPassword, 'admin', '5512345678', 0]
    );

    let adminId;
    if (adminResult.rows.length > 0) {
      adminId = adminResult.rows[0].id;
      console.log(`   ✓ Admin creado (email: admin@condominio360.com, password: Admin123)`);
    } else {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@condominio360.com']);
      adminId = existing.rows[0].id;
      console.log(`   ✓ Admin ya existe (email: admin@condominio360.com)`);
    }

    // 2. Crear múltiples condominios
    console.log('\n🏢 Creando condominios...');
    const condominios = [
      { nombre: 'Torres del Valle', direccion: 'Av. Insurgentes Sur 1234, CDMX' },
      { nombre: 'Residencial Las Palmas', direccion: 'Calle Reforma 456, CDMX' },
      { nombre: 'Conjunto Habitacional Sol', direccion: 'Boulevard Norte 789, CDMX' }
    ];

    const condoIds = [];
    for (const condo of condominios) {
      const condoResult = await pool.query(
        `INSERT INTO condominios (nombre, direccion)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING
         RETURNING id`,
        [condo.nombre, condo.direccion]
      );

      if (condoResult.rows.length > 0) {
        condoIds.push(condoResult.rows[0].id);
        console.log(`   ✓ ${condo.nombre} creado`);
      }
    }

    if (condoIds.length === 0) {
      const existing = await pool.query('SELECT id FROM condominios LIMIT 1');
      if (existing.rows.length > 0) {
        condoIds.push(existing.rows[0].id);
        console.log(`   ✓ Usando condominio existente`);
      } else {
        console.log('❌ Error: No se pudo crear condominios');
        return;
      }
    }

    const condoId = condoIds[0]; // Usar el primero para el resto del seed

    // 3. Crear unidades
    console.log('\n🏠 Creando unidades...');
    const unidades = [];
    for (let i = 1; i <= 10; i++) {
      const unidadResult = await pool.query(
        `INSERT INTO unidades (numero, id_condominio)
         VALUES ($1, $2)
         ON CONFLICT (numero, id_condominio) DO NOTHING
         RETURNING id`,
        [`${i}01`, condoId]
      );

      if (unidadResult.rows.length > 0) {
        unidades.push(unidadResult.rows[0].id);
        console.log(`   ✓ Unidad ${i}01 creada`);
      }
    }

    // 4. Crear residentes
    console.log('\n👨‍👩‍👧‍👦 Creando residentes...');
    const residentes = [
      { name: 'María García', email: 'maria@gmail.com', telefono: '5523456789', cuota: 2500, unidad: 0 },
      { name: 'Carlos López', email: 'carlos@gmail.com', telefono: '5534567890', cuota: 2500, unidad: 1 },
      { name: 'Ana Martínez', email: 'ana@gmail.com', telefono: '5545678901', cuota: 3000, unidad: 2 },
      { name: 'Pedro Sánchez', email: 'pedro@gmail.com', telefono: '5556789012', cuota: 2500, unidad: 3 },
      { name: 'Laura Rodríguez', email: 'laura@gmail.com', telefono: '5567890123', cuota: 2800, unidad: 4 }
    ];

    const residenteIds = [];
    for (const residente of residentes) {
      const result = await pool.query(
        `INSERT INTO users (name, email, password, role, telefono, cuota_mensual, unidad_id, condominio_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (email) DO NOTHING
         RETURNING id`,
        [
          residente.name,
          residente.email,
          hashedPassword,
          'residente',
          residente.telefono,
          residente.cuota,
          unidades[residente.unidad],
          condoId
        ]
      );

      if (result.rows.length > 0) {
        residenteIds.push(result.rows[0].id);
        console.log(`   ✓ ${residente.name} creado (${residente.email}, password: Admin123)`);
      }
    }

    // 5. Crear pagos
    console.log('\n💰 Creando pagos de ejemplo...');
    for (let i = 0; i < residenteIds.length; i++) {
      const residenteId = residenteIds[i];
      const monto = residentes[i].cuota;

      // Pago completado del mes pasado
      await pool.query(
        `INSERT INTO pagos (id_residente, monto, descripcion, estado, metodo_pago, fecha_pago)
         VALUES ($1, $2, $3, $4, $5, NOW() - INTERVAL '1 month')`,
        [residenteId, monto, 'Cuota de mantenimiento', 'completado', i % 2 === 0 ? 'stripe' : 'transferencia']
      );

      // Algunos pagos pendientes del mes actual
      if (i > 2) {
        await pool.query(
          `INSERT INTO pagos (id_residente, monto, descripcion, estado)
           VALUES ($1, $2, $3, $4)`,
          [residenteId, monto, 'Cuota de mantenimiento', 'pendiente']
        );
      } else {
        // Pagos completados del mes actual
        await pool.query(
          `INSERT INTO pagos (id_residente, monto, descripcion, estado, metodo_pago)
           VALUES ($1, $2, $3, $4, $5)`,
          [residenteId, monto, 'Cuota de mantenimiento', 'completado', 'efectivo']
        );
      }
    }
    console.log(`   ✓ ${residenteIds.length * 2} pagos creados`);

    // 6. Crear proveedores
    console.log('\n🏪 Creando proveedores...');
    const proveedores = [
      { nombre: 'CFE (Comisión Federal de Electricidad)', tipo: 'electricidad', contacto: '800-123-4567' },
      { nombre: 'Izzi Internet', tipo: 'internet', contacto: '800-234-5678' },
      { nombre: 'Limpieza Total SA', tipo: 'limpieza', contacto: '5512341234' },
      { nombre: 'Jardinería Verde', tipo: 'jardineria', contacto: '5523452345' }
    ];

    const proveedorIds = [];
    for (const prov of proveedores) {
      const result = await pool.query(
        `INSERT INTO proveedores (id_condominio, nombre, tipo_servicio, contacto)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [condoId, prov.nombre, prov.tipo, prov.contacto]
      );
      proveedorIds.push(result.rows[0].id);
      console.log(`   ✓ ${prov.nombre}`);
    }

    // 7. Crear egresos
    console.log('\n📤 Creando egresos...');
    const egresos = [
      { concepto: 'Pago de electricidad (CFE)', monto: 3500, proveedor: 0, categoria: 'servicios' },
      { concepto: 'Servicio de Internet', monto: 1200, proveedor: 1, categoria: 'servicios' },
      { concepto: 'Servicio de limpieza mensual', monto: 8000, proveedor: 2, categoria: 'servicios' },
      { concepto: 'Mantenimiento de jardines', monto: 2500, proveedor: 3, categoria: 'mantenimiento' }
    ];

    for (const egreso of egresos) {
      await pool.query(
        `INSERT INTO egresos (id_condominio, id_proveedor, concepto, monto, categoria, estado, registrado_por, mes, anio)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          condoId,
          proveedorIds[egreso.proveedor],
          egreso.concepto,
          egreso.monto,
          egreso.categoria,
          'pagado',
          adminId,
          'enero',
          2025
        ]
      );
      console.log(`   ✓ ${egreso.concepto}: $${egreso.monto}`);
    }

    // 8. Crear avisos
    console.log('\n📢 Creando avisos...');
    await pool.query(
      `INSERT INTO avisos (condominio_id, titulo, contenido, tipo, prioridad, publicado_por)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        condoId,
        'Mantenimiento Programado',
        'Se realizará mantenimiento de elevadores el día 15 de enero de 9:00 a 14:00 hrs. Por favor planifiquen sus actividades.',
        'mantenimiento',
        'alta',
        adminId
      ]
    );

    await pool.query(
      `INSERT INTO avisos (condominio_id, titulo, contenido, tipo, prioridad, publicado_por)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        condoId,
        'Asamblea General de Condóminos',
        'Se convoca a todos los condóminos a la asamblea general que se llevará a cabo el 20 de enero a las 18:00 hrs en el salón de eventos.',
        'evento',
        'normal',
        adminId
      ]
    );
    console.log('   ✓ 2 avisos creados');

    // 9. Crear reservas
    console.log('\n📅 Creando reservas...');
    if (residenteIds.length > 0) {
      await pool.query(
        `INSERT INTO reservas (id_residente, id_condominio, area_comun, fecha_reserva, hora_inicio, hora_fin)
         VALUES ($1, $2, $3, CURRENT_DATE + 5, '10:00', '14:00')`,
        [residenteIds[0], condoId, 'Salón de eventos']
      );

      await pool.query(
        `INSERT INTO reservas (id_residente, id_condominio, area_comun, fecha_reserva, hora_inicio, hora_fin)
         VALUES ($1, $2, $3, CURRENT_DATE + 7, '16:00', '20:00')`,
        [residenteIds[1], condoId, 'Alberca']
      );
      console.log('   ✓ 2 reservas creadas');
    }

    console.log('\n✅ ¡Datos de prueba creados exitosamente!\n');
    console.log('═'.repeat(60));
    console.log('📋 CREDENCIALES PARA PRUEBAS:');
    console.log('═'.repeat(60));
    console.log('\n👨‍💼 ADMINISTRADOR (gestiona TODOS los condominios):');
    console.log('   Email: admin@condominio360.com');
    console.log('   Password: Admin123');
    console.log('\n👤 RESIDENTES (todos con password: Admin123):');
    console.log('   - maria@gmail.com');
    console.log('   - carlos@gmail.com');
    console.log('   - ana@gmail.com');
    console.log('   - pedro@gmail.com');
    console.log('   - laura@gmail.com');
    console.log('\n📊 DATOS CREADOS:');
    console.log(`   - ${condoIds.length} Condominios:`);
    condominios.forEach((c, i) => {
      console.log(`     ${i + 1}. ${c.nombre}`);
    });
    console.log(`   - ${unidades.length} Unidades`);
    console.log(`   - 1 Admin + ${residenteIds.length} Residentes`);
    console.log(`   - ${residenteIds.length * 2} Pagos (algunos completados, algunos pendientes)`);
    console.log(`   - ${proveedores.length} Proveedores`);
    console.log(`   - ${egresos.length} Egresos`);
    console.log(`   - 2 Avisos`);
    console.log(`   - 2 Reservas`);
    console.log('\n🔑 IMPORTANTE:');
    console.log('   - El admin puede ver/gestionar TODOS los condominios');
    console.log('   - Los residentes solo ven su condominio asignado');
    console.log('   - Cambia de condominio en el selector del dashboard');
    console.log('\n🌐 URLs:');
    console.log('   Frontend: http://localhost:5173');
    console.log('   Backend: http://localhost:5000');
    console.log('═'.repeat(60));
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

seedData();
