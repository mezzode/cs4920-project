import * as multer from 'multer';
import * as path from 'path';

export const uploadRootPath = path.resolve(
    __dirname,
    '../../../database/uploads',
);

export const upload = multer({ dest: uploadRootPath });
