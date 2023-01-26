import { Module } from '@nestjs/common';
import { LoggerServiceToken } from './injection.token';
import { WinstonService } from './winston.service';

//@Global()
@Module({
  providers: [
    {
      provide: LoggerServiceToken,
      useClass: WinstonService,
    },
  ],
  exports: [LoggerServiceToken],
})
export class LoggerModule {}
