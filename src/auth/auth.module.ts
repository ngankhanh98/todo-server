import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { User } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResetPwdJwtStrategy } from './strategies/resetpwd-jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_RESET_PWD_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    PassportModule.register({ defaultStrategy: 'reset-password' }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, ResetPwdJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
