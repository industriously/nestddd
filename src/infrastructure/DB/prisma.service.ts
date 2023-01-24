import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@PRISMA';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // 최초 연결을 더 빠르게 하기위해 구현
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', () => app.close());
  }
}
