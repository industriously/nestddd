import { LoggerService, Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class WinstonService extends ConsoleLogger implements LoggerService {}
