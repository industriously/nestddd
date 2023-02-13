import { Module } from '@nestjs/common';
import { UserModule } from '@USER/user.module';

@Module({
  imports: [UserModule],
})
export class ApiModule {}
