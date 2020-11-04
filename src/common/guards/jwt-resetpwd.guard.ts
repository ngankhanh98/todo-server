import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtResetPwdGuard extends AuthGuard('reset-password') {}
