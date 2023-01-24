import { Controller, Get, Module } from '@nestjs/common';
import typia from 'typia';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Controller()
class AppController {
  @Get()
  get() {
    interface Test {
      /**
       * @format email
       */
      name: string;
    }
    typia.assert<Test>({ name: '' });
  }
}

@Module({
  imports: [InfrastructureModule],
  controllers: [AppController],
})
export class AppModule {}
