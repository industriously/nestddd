import { AccountController } from './presentation/account.controller';
import { Module } from '@nestjs/common';
import { GOOGLEOAUTH, GoogleStrategy } from './infrastructure/google.strategy';

@Module({
  providers: [
    {
      provide: GOOGLEOAUTH,
      useClass: GoogleStrategy,
    },
  ],
  controllers: [AccountController],
})
export class AccountModule {}
