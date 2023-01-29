import { Module } from '@nestjs/common';
import { TokenController } from './presentation/token.controller';

@Module({
  controllers: [TokenController],
})
export class TokenModule {}
