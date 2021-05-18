import * as QRCode from 'qrcode';

export const generateQr = (data: string, size = 500): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    QRCode.toDataURL(
      data,
      {
        width: size,
        margin: 0,
      },
      (error, url) => {
        if (url) {
          resolve(url);
        } else {
          reject(error);
        }
      },
    );
  });
};
