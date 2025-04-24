import archiver from 'archiver';
import { createWriteStream, promises } from 'fs';

export const zipFiles = async (files: string[], outputPath: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const archive = archiver('zip', {
        zlib: { level: 9 },
      });
      const output = createWriteStream(outputPath);
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileStream = await promises.readFile(file);
        archive.append(fileStream, { name: file });
      }
      archive.finalize();
      archive.pipe(output);
      output.on('close', () => {
        resolve(outputPath);
      });
    } catch (error) {
      console.error('Error zipping files:', error);
      reject();
    }
  });
};
