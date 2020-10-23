import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { secret } from 'src/constant';
import { verify } from '../functions';

@Injectable()
export class ResetGrant implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const resetPwdToken = request.query['token'];
    try {
      const decoded = verify(resetPwdToken, secret.resetPwdSecret);
      const { username } = decoded;
      request.body.username = username;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
