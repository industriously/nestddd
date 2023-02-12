import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
