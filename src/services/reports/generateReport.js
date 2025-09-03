import PDFDocument from 'pdfkit';
import fs from 'fs';

function generarReporte() {
  const doc = new PDFDocument();

  // Guardar en archivo
  doc.pipe(fs.createWriteStream('reporte.pdf'));

  // Título
  doc.fontSize(20).text('Reporte de Invitados', { align: 'center' });

  // Texto normal
  doc.moveDown().fontSize(12).text('Listado de invitados confirmados:');

  // Datos de ejemplo
  const invitados = ['Ana', 'Luis', 'María', 'Carlos'];
  invitados.forEach((nombre, i) => {
    doc.text(`${i + 1}. ${nombre}`);
  });

  // Finalizar
  doc.end();
}

generarReporte();