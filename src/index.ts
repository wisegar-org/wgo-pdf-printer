import { createDocument, mergeDocuments } from './services/pdf.service';

export * from './services/ExportPdfService';

async function runDemo() {
  const sourceDocuments = ['1.pdf', '2.pdf', '3.pdf', '4.pdf'];
  await createDocument(sourceDocuments[0]);
  await createDocument(sourceDocuments[1]);
  const outputDocument = 'output.pdf';
  await mergeDocuments(sourceDocuments, outputDocument);
}
runDemo();
