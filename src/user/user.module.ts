import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtAuth } from 'src/config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [jwtAuth] })],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        ...ConfigService.get('auth'),
      }),
    }),
    PassportModule.register({ defaultStrategy: 'auth' }),
    Logger,
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
