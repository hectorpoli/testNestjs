import * as path from 'path';

export function getExtension(filename) {
  const ext = path.extname(filename);
  return ext.split('.').pop();
}

export function cleanObject(data) {
  return Object.entries(data)
    .filter(([_, value]) => !!value || typeof value === 'boolean')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const pdfFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(new Error('Only pdf file are allowed!'), false);
  }
  callback(null, true);
};
