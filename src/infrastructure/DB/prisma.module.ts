import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientFactory } from './client.prisma';
import { DBClientToken } from './constants';
import { PrismaService } from './prisma.service';
import { TransactionDecorator, TransactionInterceptor } from './transaction';

@Global()
@Module({
  providers: [
    PrismaService,
    TransactionDecorator,
    { provide: APP_INTERCEPTOR, useClass: TransactionInterceptor },
    {
      provide: DBClientToken,
      useFactory: ClientFactory,
      inject: [PrismaService],
    },
  ],
  exports: [DBClientToken],
})
export class PrismaModule {}
