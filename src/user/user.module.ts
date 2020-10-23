import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { VerifyMiddleware } from '../common/middleware/verify.middleware';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
