import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { verify } from '../functions';

@Injectable()
export class Guard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['access-token'];
    try {
      const decoded = verify(accessToken);
      const { username } = decoded;
      request.body.username = username;
      // console.log('username', username)
      // console.log('request', request)
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
