import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { secret } from 'src/constant';
import { verify } from '../utils';

@Injectable()
export class AuthenticatedUser implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['access-token'];
    try {
      const decoded = verify(accessToken, secret.loginSecret);
      const { username } = decoded;
      request.body.username = username;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}


