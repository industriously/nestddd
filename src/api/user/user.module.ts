import { Module } from '@nestjs/common';
import { TokenModule } from '@TOKEN';

import {
  AuthController,
  UserController,
  UsersController,
} from './presentation';
import { providers } from './providers';

@Module({
  imports: [TokenModule],
  providers,
  controllers: [AuthController, UserController, UsersController],
})
export class UserModule {}
