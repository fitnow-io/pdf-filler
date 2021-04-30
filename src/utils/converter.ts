import libreConverter from 'libreoffice-convert';

export const converter = (docx: Buffer): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    libreConverter.convert(docx, '.pdf', undefined, (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};
