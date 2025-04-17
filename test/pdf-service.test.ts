describe('PDF Service Tests Description', () => {
  test('Merge pdf docuemnt list', async (done) => {
    const pdfService = require('../src/services/pdf.service');
    const sourceDocuments = ['1.pdf', '2.pdf', '3.pdf', '4.pdf'];
    for (let index = 0; index < sourceDocuments.length; index++) {
      const element = sourceDocuments[index];
      await pdfService.createDocument(element);
    }
    const outputDocument = 'output.pdf';
    await pdfService.mergeDocuments(sourceDocuments, outputDocument);
    expect(outputDocument).toBeDefined();
    done();
  });
});
