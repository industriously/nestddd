import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';
import { TokenUsecaseProvider } from './application';
import { TokenController } from './presentation/token.controller';

@Module({
  imports: [AccountModule],
  providers: [TokenUsecaseProvider],
  controllers: [TokenController],
})
export class TokenModule {}
