import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { AuthController } from './presentation';

@Module({
  providers: [UserRepository],
  controllers: [AuthController],
})
export class UserModule {}
