// Servicio de envío de emails
// Usa Nodemailer para enviar notificaciones por email
import nodemailer from 'nodemailer';

// Configuración del transporter (SMTP)
// IMPORTANTE: Configurar variables de entorno para producción
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER, // Tu email
    pass: process.env.SMTP_PASS  // Tu contraseña de aplicación
  }
});

/**
 * Enviar comprobante de pago al residente
 * @param {Object} data - Datos del pago y residente
 */
export async function enviarComprobantePago(data) {
  const {
    residenteEmail,
    residenteNombre,
    monto,
    metodoPago,
    referencia,
    fechaPago,
    comprobanteUrl,
    condominio
  } = data;

  const mailOptions = {
    from: `"Condominio360" <${process.env.SMTP_USER}>`,
    to: residenteEmail,
    subject: `Comprobante de Pago - ${condominio}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
          .info-label { font-weight: bold; color: #2563eb; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Comprobante de Pago</h1>
            <p>${condominio}</p>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${residenteNombre}</strong>,</p>
            <p>Se ha registrado exitosamente su pago con los siguientes detalles:</p>

            <div class="info-row">
              <span class="info-label">Monto:</span> $${Number(monto).toFixed(2)} MXN
            </div>

            <div class="info-row">
              <span class="info-label">Método de Pago:</span> ${metodoPago.toUpperCase()}
            </div>

            ${referencia ? `
              <div class="info-row">
                <span class="info-label">Referencia:</span> ${referencia}
              </div>
            ` : ''}

            <div class="info-row">
              <span class="info-label">Fecha de Pago:</span> ${new Date(fechaPago).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            ${comprobanteUrl ? `
              <div style="text-align: center;">
                <a href="${comprobanteUrl}" class="btn" target="_blank">
                  Ver Comprobante
                </a>
              </div>
            ` : ''}

            <p style="margin-top: 25px;">Gracias por mantener al día sus pagos.</p>
            <p>Si tiene alguna duda, puede contactar a la administración del condominio.</p>
          </div>
          <div class="footer">
            <p>Este es un correo automático, por favor no responder.</p>
            <p>© 2025 Condominio360 - Sistema de Gestión de Condominios</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Comprobante enviado a ${residenteEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Error enviando email a ${residenteEmail}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Enviar notificación de nuevo aviso
 * @param {Object} data - Datos del aviso
 */
export async function enviarNotificacionAviso(data) {
  const {
    residenteEmail,
    residenteNombre,
    tituloAviso,
    contenidoAviso,
    prioridad,
    condominio
  } = data;

  const mailOptions = {
    from: `"Condominio360" <${process.env.SMTP_USER}>`,
    to: residenteEmail,
    subject: `${prioridad === 'urgente' ? '🚨 URGENTE - ' : ''}Nuevo Aviso - ${condominio}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${prioridad === 'urgente' ? '#dc2626' : '#2563eb'}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .aviso-box { background: white; padding: 20px; border-left: 4px solid ${prioridad === 'urgente' ? '#dc2626' : '#2563eb'}; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${prioridad === 'urgente' ? '🚨 ' : ''}Nuevo Aviso</h1>
            <p>${condominio}</p>
          </div>
          <div class="content">
            <p>Estimado/a <strong>${residenteNombre}</strong>,</p>
            <p>Se ha publicado un nuevo aviso:</p>

            <div class="aviso-box">
              <h2 style="margin-top: 0; color: ${prioridad === 'urgente' ? '#dc2626' : '#2563eb'};">${tituloAviso}</h2>
              <p>${contenidoAviso}</p>
            </div>

            <p>Ingresa a la plataforma para más detalles.</p>
          </div>
          <div class="footer">
            <p>Este es un correo automático, por favor no responder.</p>
            <p>© 2025 Condominio360</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Notificación enviada a ${residenteEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Error enviando notificación a ${residenteEmail}:`, error.message);
    return { success: false, error: error.message };
  }
}

export default {
  enviarComprobantePago,
  enviarNotificacionAviso
};
