import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from '../functions';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const accessToken = req.headers['access-token'];
    try {
      const decoded = await verify(accessToken);
      next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json(error);
    }
  }
}
