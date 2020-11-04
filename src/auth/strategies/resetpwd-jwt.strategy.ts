import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportStrategies } from 'src/constant';

@Injectable()
export class ResetPwdJwtStrategy extends PassportStrategy(
  Strategy,
  passportStrategies.RESET_PASSWORD,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_RESET_PWD_SECRET,
    });
  }
  async validate(payload: any) {
    return payload.username;
  }
}
