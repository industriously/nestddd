import { DBManager } from '@INFRA/DB';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly manager: DBManager) {}

  @Get('test')
  async test() {
    try {
      const id = '24991644-e2c1-40b5-9357-fe3bc8fb07as';
      const username = 'test';
      return await this.manager
        .getClient()
        .user.update({ where: { id }, data: { username } });
    } catch (error) {
      console.debug(error);
      return;
    }
  }
}
