import { registerAs } from '@nestjs/config';

export const jwtAuth = registerAs('auth', () => ({
  secret: process.env.JWT_AUTH_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRE },
}));

export const jwtResetPwd = registerAs('reset-password', () => ({
  secret: process.env.JWT_RESET_PWD_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRE },
}));
