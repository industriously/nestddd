import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './DB/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { FilterModule } from './filter/filter.module';
import { AopModule } from '@toss/nestjs-aop';

@Module({
  imports: [LoggerModule, PrismaModule, ConfigModule, FilterModule, AopModule],
})
export class InfrastructureModule {}
