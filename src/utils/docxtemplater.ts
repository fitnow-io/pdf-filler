import PizZip from 'pizzip';
import DocxTemplater from 'docxtemplater';
import createReport from 'docx-templates';
import { generateQr } from './qr';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Templater: typeof DocxTemplater = require('docxtemplater');

export const templateDocx = (
  data: Buffer,
  context: Record<string, string>,
): Buffer => {
  const zip = new PizZip(data);
  const doc = new Templater(zip, {
    nullGetter: () => '',
  });
  doc.setData(context);
  doc.render();
  return doc.getZip().generate({ type: 'nodebuffer' });
};

export const templateDocxExtended = async (
  template: Buffer,
  data: Record<string, string>,
): Promise<Buffer> => {
  const response = await createReport({
    template,
    data,
    additionalJsContext: {
      qrCode: async (url: string) => {
        const dataUrl = await generateQr(url, 500);
        const data = dataUrl.slice('data:image/gif;base64,'.length);
        return { width: 6, height: 6, data, extension: '.gif' };
      },
    },
  });
  return Buffer.from(response);
};
