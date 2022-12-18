export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file) {
    return cb(new Error('File is Empty'), false);
  }

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png'];

  if (!validExtensions.includes(fileExtension)) {
    return cb(null, false);
  }

  cb(null, true);
};
