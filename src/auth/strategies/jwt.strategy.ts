import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
    console.log('this.jwtFromRequest', this.jwtFromRequest);
    console.log('this.secretOrKey', this.secretOrKey);
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return payload.username;
  }
}
