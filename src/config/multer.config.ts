import { registerAs } from '@nestjs/config';
import { diskStorage } from 'multer';

export default registerAs('multer', () => ({
  storage: diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
}));
