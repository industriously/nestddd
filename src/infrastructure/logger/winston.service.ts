import { LoggerService, Injectable, ConsoleLogger } from '@nestjs/common';

/**
 * 나중에 winston을 도입하여 구현할 예정
 * */
@Injectable()
export class WinstonService extends ConsoleLogger implements LoggerService {}
