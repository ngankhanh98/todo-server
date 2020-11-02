import {
  CacheInterceptor,
  CacheModule,
  CACHE_MANAGER,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
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
    UserModule,
    CacheModule.register(),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ResetPwdJwtStrategy,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
