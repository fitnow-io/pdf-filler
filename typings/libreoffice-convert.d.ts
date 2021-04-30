declare module 'libreoffice-convert' {
  type Extension = '.pdf';

  export function convert(
    input: Buffer,
    extension: Extension,
    unknown: undefined,
    callback: (err: any, data?: Buffer) => void,
  ): void;
}
