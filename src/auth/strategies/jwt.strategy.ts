import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_LOGIN_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return payload.username;
  }
}
