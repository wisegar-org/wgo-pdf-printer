import { readFileSync, writeFileSync } from 'fs';
import { PageSizes, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const createDocument = async (filename: string) => {
  const pdfDoc = await PDFDocument.create();
  // Embed the Times Roman font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.insertPage(0, PageSizes.A4);
  const { width, height } = page.getSize();

  const fontSize = 30;
  page.drawText(filename, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0.53, 0.71),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  // Write the PDF to a file

  writeFileSync(filename, pdfBytes);
  console.log(`PDF saved to ${filename}`);
};

export const mergeDocuments = async (documentPaths: string[], outputDocumentPath: string) => {
  const outputDocument = await PDFDocument.create();
  for (let documentPathIndex = 0; documentPathIndex < documentPaths.length; documentPathIndex++) {
    const documentPath = documentPaths[documentPathIndex];
    const documentBytes = readFileSync(documentPath);
    const document = await PDFDocument.load(documentBytes);
    const documentPagesIndices = document.getPageIndices();
    const copiedPages = await outputDocument.copyPages(document, documentPagesIndices);
    for (let copiedPageIndex = 0; copiedPageIndex < copiedPages.length; copiedPageIndex++) {
      const page = copiedPages[copiedPageIndex];
      outputDocument.addPage(page);
    }
  }
  const outputDocumentBytes = await outputDocument.save();
  writeFileSync(outputDocumentPath, outputDocumentBytes);
};

export const mergeeDocuments = async () => {
  const documentPaths: string[] = ['file-a.pdf', 'file-b.pdf'];
  const outputDocumentPath: string = 'output.pdf';
  const outputDocument = await PDFDocument.create();
  for (let documentPathIndex = 0; documentPathIndex < documentPaths.length; documentPathIndex++) {
    const documentBytes = readFileSync(documentPaths[documentPathIndex]);
    const document = await PDFDocument.load(documentBytes);
    const copiedPages = await outputDocument.copyPages(document, document.getPageIndices());
    for (let copiedPageIndex = 0; copiedPageIndex < copiedPages.length; copiedPageIndex++) {
      outputDocument.addPage(copiedPages[copiedPageIndex]);
    }
  }
  const outputDocumentBytes = await outputDocument.save();
  writeFileSync(outputDocumentPath, outputDocumentBytes);
};
