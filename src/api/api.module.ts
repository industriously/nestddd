import { AccountModule } from './account/account.module';
import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';

@Module({
  imports: [AccountModule, TokenModule],
})
export class ApiModule {}
