import { zipFiles } from './services/file.service';
import { createDocument, mergeDocuments } from './services/pdf.service';

export * from './services/ExportPdfService';
export * from './services/file.service';
export * from './services/pdf.service';

// async function runDemo() {
//   const sourceDocuments = ['1.pdf', '2.pdf', '3.pdf', '4.pdf'];
//   for (let index = 0; index < sourceDocuments.length; index++) {
//     const file = sourceDocuments[index];
//     await createDocument(file);
//   }
//   const outputDocument = 'output.pdf';
//   await mergeDocuments(sourceDocuments, outputDocument);

//   const result = await zipFiles(sourceDocuments, 'output.zip');
//   console.log(`Zipped to: ${result}`);
// }
// runDemo();
