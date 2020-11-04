import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportStrategies } from 'src/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, passportStrategies.AUTH) {
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
