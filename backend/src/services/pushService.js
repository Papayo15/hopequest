import axios from 'axios';

/**
 * Servicio de notificaciones push usando Expo Push Notifications
 */

const EXPO_PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

/**
 * Validar formato de token de Expo
 */
function isValidExpoPushToken(token) {
  return token && (
    token.startsWith('ExponentPushToken[') ||
    token.startsWith('ExpoPushToken[')
  );
}

/**
 * Enviar notificación push a uno o más dispositivos
 * @param {Array} tokens - Array de objetos con { push_token, plataforma }
 * @param {Object} notification - { title, body, data }
 */
export async function sendPushNotification(tokens, notification) {
  try {
    if (!tokens || tokens.length === 0) {
      console.warn('⚠️ No hay tokens para enviar notificación');
      return { success: false, message: 'No hay tokens' };
    }

    const { title, body, data = {} } = notification;

    // Filtrar solo tokens válidos
    const validTokens = tokens
      .filter(t => isValidExpoPushToken(t.push_token))
      .map(t => t.push_token);

    if (validTokens.length === 0) {
      console.warn('⚠️ No hay tokens válidos de Expo');
      return { success: false, message: 'No hay tokens válidos' };
    }

    // Construir mensajes
    const messages = validTokens.map(token => ({
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: data,
      priority: 'high',
      channelId: 'default'
    }));

    console.log(`📬 Enviando ${messages.length} notificaciones push...`);

    // Enviar a Expo
    const response = await axios.post(EXPO_PUSH_ENDPOINT, messages, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const results = response.data.data;
    const successCount = results.filter(r => r.status === 'ok').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    console.log(`✅ Notificaciones enviadas: ${successCount} exitosas, ${errorCount} fallidas`);

    // Log de errores
    results.forEach((result, index) => {
      if (result.status === 'error') {
        console.error(`❌ Error en token ${index}:`, result.message);
      }
    });

    return {
      success: true,
      total: messages.length,
      exitosas: successCount,
      fallidas: errorCount,
      resultados: results
    };
  } catch (error) {
    console.error('❌ Error al enviar notificación push:', error.message);
    if (error.response) {
      console.error('Detalles:', error.response.data);
    }
    return {
      success: false,
      message: error.message,
      error: error.response?.data
    };
  }
}

/**
 * Enviar notificación a un usuario específico
 * @param {Array} userTokens - Tokens del usuario
 * @param {String} title - Título de la notificación
 * @param {String} body - Cuerpo de la notificación
 * @param {Object} data - Datos adicionales
 */
export async function sendNotificationToUser(userTokens, title, body, data = {}) {
  return await sendPushNotification(userTokens, {
    title,
    body,
    data
  });
}

/**
 * Enviar notificación de ingreso de visita
 */
export async function notificarIngresoVisita(tokens, nombreVisitante, condominio) {
  return await sendPushNotification(tokens, {
    title: '🔔 Visita Ingresada',
    body: `${nombreVisitante} ha ingresado a ${condominio}`,
    data: {
      tipo: 'ingreso_visita',
      visitante: nombreVisitante,
      condominio: condominio,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Enviar notificación de salida de visita
 */
export async function notificarSalidaVisita(tokens, nombreVisitante, condominio) {
  return await sendPushNotification(tokens, {
    title: '👋 Visita Retirada',
    body: `${nombreVisitante} ha salido de ${condominio}`,
    data: {
      tipo: 'salida_visita',
      visitante: nombreVisitante,
      condominio: condominio,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Enviar notificación de código QR generado
 */
export async function notificarCodigoGenerado(tokens, nombreVisitante, fechaExpiracion) {
  return await sendPushNotification(tokens, {
    title: '✅ Código QR Generado',
    body: `Código QR creado para ${nombreVisitante}. Válido hasta ${new Date(fechaExpiracion).toLocaleString('es-ES')}`,
    data: {
      tipo: 'codigo_generado',
      visitante: nombreVisitante,
      fecha_expiracion: fechaExpiracion
    }
  });
}

/**
 * Enviar notificación de código QR expirado
 */
export async function notificarCodigoExpirado(tokens, nombreVisitante) {
  return await sendPushNotification(tokens, {
    title: '⏰ Código QR Expirado',
    body: `El código QR para ${nombreVisitante} ha expirado`,
    data: {
      tipo: 'codigo_expirado',
      visitante: nombreVisitante
    }
  });
}

export default {
  sendPushNotification,
  sendNotificationToUser,
  notificarIngresoVisita,
  notificarSalidaVisita,
  notificarCodigoGenerado,
  notificarCodigoExpirado
};
