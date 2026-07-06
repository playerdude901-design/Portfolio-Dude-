function doPost(e) {
  try {
    const data = e.parameter;
    const nombre   = data.nombre   || 'No especificado';
    const email    = data.email    || 'No especificado';
    const servicio = data.servicio || 'No especificado';
    const mensaje  = data.mensaje  || 'No especificado';

    const asunto = `Nuevo contacto desde Portfolio - ${nombre}`;
    const cuerpo = `Nombre: ${nombre}
Email: ${email}
Servicio: ${servicio}

Mensaje:
${mensaje}`;

    GmailApp.sendEmail('playerdude901@gmail.com', asunto, cuerpo);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return HtmlService.createHtmlOutput('<h2>Contacto endpoint activo</h2>');
}
