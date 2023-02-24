import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DBManager } from './db.manager';
import { PrismaService } from './prisma.service';
import { TransactionDecorator, TransactionInterceptor } from './transaction';

@Global()
@Module({
  providers: [
    PrismaService,
    TransactionDecorator,
    { provide: APP_INTERCEPTOR, useClass: TransactionInterceptor },
    DBManager,
  ],
  exports: [DBManager],
})
export class PrismaModule {}
