import PizZip from 'pizzip';
import DocxTemplater from 'docxtemplater';

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
