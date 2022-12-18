import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error, fileName: string) => void,
) => {
  if (!file) {
    return cb(new Error('File is Empty'), null);
  }

  const ext = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${ext}`;
  cb(null, fileName);
};
