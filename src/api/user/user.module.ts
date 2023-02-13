import { Module } from '@nestjs/common';
import { UserServiceProvider, UserUsecaseProvider } from './application';
import { UserController } from './presentation/user.controller';

@Module({
  providers: [UserServiceProvider, UserUsecaseProvider],
  controllers: [UserController],
})
export class UserModule {}
